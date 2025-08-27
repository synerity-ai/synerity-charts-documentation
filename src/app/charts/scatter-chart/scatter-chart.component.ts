import { Component, OnInit, OnDestroy, ElementRef, ViewChild, AfterViewInit, Input, Output, EventEmitter, ChangeDetectorRef, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScatterPlot, ScatterData } from '@synerity/charts';

export interface ScatterChartConfig {
  data: ScatterData[];
  width?: number;
  height?: number;
  animate?: boolean;
  showGrid?: boolean;
  showTrendLine?: boolean;
  pointRadius?: number;
  pointOpacity?: number;
}

@Component({
  selector: 'app-scatter-chart',
  standalone: false,
  templateUrl: './scatter-chart.component.html',
  styleUrls: ['./scatter-chart.component.scss']
})
export class ScatterChartComponent implements OnInit, OnDestroy, AfterViewInit, OnChanges {
  @ViewChild('chartContainer') chartContainer!: ElementRef;
  
  constructor(private cdr: ChangeDetectorRef) {}
  
  @Input() config: ScatterChartConfig = {
    data: [],
    width: 500,
    height: 300,
    animate: true,
    showGrid: true,
    showTrendLine: false,
    pointRadius: 4,
    pointOpacity: 0.7
  };
  @Input() title: string = 'Scatter Chart';
  @Input() description: string = 'Interactive scatter plot with correlation analysis';
  @Output() chartReady = new EventEmitter<void>();
  @Output() dataUpdate = new EventEmitter<ScatterData[]>();

  private chart: ScatterPlot | null = null;
  public isLoading = true;
  public error: string | null = null;
  private initAttempts = 0;
  private maxInitAttempts = 5;

  ngOnInit() {
    // Component initialization
    // Add window resize listener
    window.addEventListener('resize', this.onResize.bind(this));
  }

  ngOnChanges(changes: SimpleChanges) {
    // Re-initialize chart when config changes
    if (changes['config'] && !changes['config'].firstChange && this.chartContainer) {
      setTimeout(() => {
        this.initializeChart();
        this.cdr.detectChanges();
      }, 100);
    }
  }

  ngAfterViewInit() {
    // Use a more reliable initialization approach
    this.waitForContainer();
  }

  ngOnDestroy() {
    this.destroyChart();
    // Remove window resize listener
    window.removeEventListener('resize', this.onResize.bind(this));
  }

  private waitForContainer(): void {
    const checkContainer = () => {
      if (this.chartContainer && this.chartContainer.nativeElement) {
        const element = this.chartContainer.nativeElement;
        if (element.offsetWidth > 0 && element.offsetHeight > 0) {
          this.initializeChart();
        } else {
          // Container exists but has no dimensions, wait a bit more
          setTimeout(checkContainer, 100);
        }
      } else {
        // Container doesn't exist yet, retry
        if (this.initAttempts < this.maxInitAttempts) {
          this.initAttempts++;
          setTimeout(checkContainer, 100);
        } else {
          this.error = 'Chart container not available';
          this.isLoading = false;
          this.cdr.detectChanges();
        }
      }
    };
    
    checkContainer();
  }

  private initializeChart() {
    try {
      this.isLoading = true;
      this.error = null;

      if (this.chart) {
        this.chart.destroy();
        this.chart = null;
      }

      // Check if container is available
      if (!this.chartContainer || !this.chartContainer.nativeElement) {
        console.warn('Chart container ViewChild not available yet');
        this.error = 'Chart container not available';
        this.isLoading = false;
        this.cdr.detectChanges();
        return;
      }



      // Additional check to ensure the element is in the DOM
      if (!document.contains(this.chartContainer.nativeElement)) {
        console.warn('Chart container element not in DOM');
        this.error = 'Chart container not available';
        this.isLoading = false;
        this.cdr.detectChanges();
        return;
      }

      if (!this.config.data || this.config.data.length === 0) {
        this.error = 'No data available for chart';
        this.isLoading = false;
        this.cdr.detectChanges();
        return;
      }

      console.log('Initializing scatter chart with config:', this.config);
      console.log('Container element:', this.chartContainer.nativeElement);
      console.log('Container dimensions:', {
        width: this.chartContainer.nativeElement.offsetWidth,
        height: this.chartContainer.nativeElement.offsetHeight
      });

      this.chart = new ScatterPlot({
        container: this.chartContainer.nativeElement,
        data: [...this.config.data],
        options: {
          width: this.config.width || this.chartContainer.nativeElement.offsetWidth || 500,
          height: this.config.height || this.chartContainer.nativeElement.offsetHeight || 300,
          animate: this.config.animate ?? true,
          showGrid: this.config.showGrid ?? true,
          showTrendLine: this.config.showTrendLine ?? false,
          pointRadius: this.config.pointRadius || 4,
          pointOpacity: this.config.pointOpacity || 0.7
        }
      });

      console.log('Scatter chart initialized successfully');
      this.isLoading = false;
      this.initAttempts = 0; // Reset attempts on success
      this.chartReady.emit();
      this.cdr.detectChanges();
    } catch (error) {
      console.error('Error initializing scatter chart:', error);
      this.error = error instanceof Error ? error.message : 'Failed to initialize chart';
      this.isLoading = false;
      this.cdr.detectChanges();
    }
  }

  public updateData(newData: ScatterData[]) {
    if (this.chart) {
      this.config.data = [...newData];
      this.chart.update(newData);
      this.dataUpdate.emit(newData);
    }
  }

  public refreshChart() {
    this.initAttempts = 0; // Reset attempts on manual refresh
    this.waitForContainer();
  }

  private destroyChart() {
    if (this.chart) {
      this.chart.destroy();
      this.chart = null;
    }
  }

  public getChartData(): ScatterData[] {
    return this.config.data;
  }

  public getTotalPoints(): number {
    return this.config.data.length;
  }

  public getAverageX(): number {
    if (this.config.data.length === 0) return 0;
    const sum = this.config.data.reduce((acc, point) => acc + point.x, 0);
    return sum / this.config.data.length;
  }

  public getAverageY(): number {
    if (this.config.data.length === 0) return 0;
    const sum = this.config.data.reduce((acc, point) => acc + point.y, 0);
    return sum / this.config.data.length;
  }

  public getMaxX(): number {
    return Math.max(...this.config.data.map(point => point.x));
  }

  public getMaxY(): number {
    return Math.max(...this.config.data.map(point => point.y));
  }

  public getMinX(): number {
    return Math.min(...this.config.data.map(point => point.x));
  }

  public getMinY(): number {
    return Math.min(...this.config.data.map(point => point.y));
  }

  public getCorrelationCoefficient(): number {
    if (this.config.data.length < 2) return 0;
    
    const n = this.config.data.length;
    const sumX = this.config.data.reduce((acc, point) => acc + point.x, 0);
    const sumY = this.config.data.reduce((acc, point) => acc + point.y, 0);
    const sumXY = this.config.data.reduce((acc, point) => acc + (point.x * point.y), 0);
    const sumX2 = this.config.data.reduce((acc, point) => acc + (point.x * point.x), 0);
    const sumY2 = this.config.data.reduce((acc, point) => acc + (point.y * point.y), 0);
    
    const numerator = (n * sumXY) - (sumX * sumY);
    const denominator = Math.sqrt(((n * sumX2) - (sumX * sumX)) * ((n * sumY2) - (sumY * sumY)));
    
    return denominator === 0 ? 0 : numerator / denominator;
  }

  public getCorrelationStrength(): 'strong' | 'moderate' | 'weak' | 'none' {
    const correlation = Math.abs(this.getCorrelationCoefficient());
    if (correlation >= 0.7) return 'strong';
    if (correlation >= 0.3) return 'moderate';
    if (correlation >= 0.1) return 'weak';
    return 'none';
  }

  public getCorrelationDirection(): 'positive' | 'negative' | 'none' {
    const correlation = this.getCorrelationCoefficient();
    if (Math.abs(correlation) < 0.1) return 'none';
    return correlation > 0 ? 'positive' : 'negative';
  }

  public trackByIndex(index: number, item: ScatterData): number {
    return index;
  }

  private onResize(): void {
    if (this.chart) {
      setTimeout(() => {
        this.refreshChart();
      }, 100);
    }
  }
}

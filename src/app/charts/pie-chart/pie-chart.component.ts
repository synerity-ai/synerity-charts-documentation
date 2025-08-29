import { Component, OnInit, OnDestroy, ElementRef, ViewChild, AfterViewInit, Input, Output, EventEmitter, ChangeDetectorRef, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PieChart, ChartData } from '@synerity/charts';

export interface PieChartConfig {
  data: ChartData[];
  width?: number;
  height?: number;
  animate?: boolean;
  showLabels?: boolean;
  showValues?: boolean;
  innerRadius?: number;
  outerRadius?: number;
  labelRadius?: number;
  // Enhanced features
  variant?: 'pie' | 'donut';
  labels?: {
    enabled: boolean;
    position: 'inside' | 'outside' | 'callout';
    format: string;
    fontSize?: number;
    fontWeight?: string;
  };
  animation?: {
    duration: number;
    easing: string;
    explodeOnClick: boolean;
    entranceDelay?: number;
  };
  legend?: {
    interactive: boolean;
    position: 'top' | 'bottom' | 'left' | 'right';
    showValues?: boolean;
    showPercentages?: boolean;
  };
  interactivity?: {
    hoverEffects: boolean;
    clickToExplode: boolean;
    tooltipEnabled: boolean;
    tooltipFormat?: (data: ChartData) => string;
  };
}

@Component({
  selector: 'app-pie-chart',
  standalone: false,
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.scss']
})
export class PieChartComponent implements OnInit, OnDestroy, AfterViewInit, OnChanges {
  @ViewChild('chartContainer') chartContainer!: ElementRef;
  
  constructor(private cdr: ChangeDetectorRef) {}
  
  @Input() config: PieChartConfig = {
    data: [],
    width: 500,
    height: 300,
    animate: true,
    showLabels: true,
    showValues: true,
    innerRadius: 0,
    outerRadius: 0.8,
    labelRadius: 0.9
  };
  @Input() title: string = 'Pie Chart';
  @Input() description: string = 'Interactive pie chart with proportional visualization';
  @Output() chartReady = new EventEmitter<void>();
  @Output() dataUpdate = new EventEmitter<ChartData[]>();

  private chart: PieChart | null = null;
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

      console.log('Initializing pie chart with config:', this.config);
      console.log('Container element:', this.chartContainer.nativeElement);
      console.log('Container dimensions:', {
        width: this.chartContainer.nativeElement.offsetWidth,
        height: this.chartContainer.nativeElement.offsetHeight
      });

      // Calculate actual radius values based on container size
      const containerWidth = this.config.width || this.chartContainer.nativeElement.offsetWidth || 500;
      const containerHeight = this.config.height || this.chartContainer.nativeElement.offsetHeight || 300;
      const maxRadius = Math.min(containerWidth, containerHeight) / 2 - 40; // Leave some margin
      
      // Use fixed radius values for testing
      const innerRadius = 0;
      const outerRadius = 100; // Fixed radius for testing
      const labelRadius = 130; // Fixed label radius for testing

      console.log('Radius calculations:', {
        containerWidth,
        containerHeight,
        maxRadius,
        innerRadius,
        outerRadius,
        labelRadius
      });

      this.chart = new PieChart({
        container: this.chartContainer.nativeElement,
        data: [...this.config.data],
        options: {
          width: containerWidth,
          height: containerHeight,
          animate: this.config.animate ?? true,
          showLabels: this.config.showLabels ?? true,
          showValues: this.config.showValues ?? true,
          innerRadius: innerRadius,
          outerRadius: outerRadius,
          labelRadius: labelRadius
        }
      });

      console.log('Pie chart initialized successfully');
      this.isLoading = false;
      this.initAttempts = 0; // Reset attempts on success
      this.chartReady.emit();
      this.cdr.detectChanges();
    } catch (error) {
      console.error('Error initializing pie chart:', error);
      this.error = error instanceof Error ? error.message : 'Failed to initialize chart';
      this.isLoading = false;
      this.cdr.detectChanges();
    }
  }

  public updateData(newData: ChartData[]) {
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

  public getChartData(): ChartData[] {
    return this.config.data;
  }

  public getTotalValue(): number {
    return this.config.data.reduce((sum, item) => sum + item.value, 0);
  }

  public getAverageValue(): number {
    if (this.config.data.length === 0) return 0;
    return this.getTotalValue() / this.config.data.length;
  }

  public getMaxValue(): number {
    return Math.max(...this.config.data.map(item => item.value));
  }

  public getMinValue(): number {
    return Math.min(...this.config.data.map(item => item.value));
  }

  public getLargestSegment(): ChartData | null {
    if (this.config.data.length === 0) return null;
    return this.config.data.reduce((max, item) => item.value > max.value ? item : max);
  }

  public getSmallestSegment(): ChartData | null {
    if (this.config.data.length === 0) return null;
    return this.config.data.reduce((min, item) => item.value < min.value ? item : min);
  }

  public getSegmentPercentage(item: ChartData): number {
    const total = this.getTotalValue();
    return total > 0 ? (item.value / total) * 100 : 0;
  }

  public getSegmentsCount(): number {
    return this.config.data.length;
  }

  public trackByLabel(index: number, item: ChartData): string {
    return item.label;
  }

  private onResize(): void {
    if (this.chart) {
      setTimeout(() => {
        this.refreshChart();
      }, 100);
    }
  }
}

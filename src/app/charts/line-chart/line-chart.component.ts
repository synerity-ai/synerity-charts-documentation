import { Component, OnInit, OnDestroy, ElementRef, ViewChild, AfterViewInit, Input, Output, EventEmitter, ChangeDetectorRef, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LineChart, ChartData, MultiLineChartData } from '@synerity/charts';

export interface LineChartConfig {
  data: ChartData[] | MultiLineChartData;
  width?: number;
  height?: number;
  animate?: boolean;
  showPoints?: boolean;
  showGrid?: boolean;
  curveType?: 'linear' | 'monotoneX' | 'step' | 'stepAfter' | 'stepBefore' | 'basis' | 'cardinal' | 'catmullRom';
  strokeWidth?: number;
  showLegend?: boolean;
  legendPosition?: 'top' | 'bottom' | 'left' | 'right';
  multiLine?: boolean;
}

@Component({
  selector: 'app-line-chart',
  standalone: false,
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.scss']
})
export class LineChartComponent implements OnInit, OnDestroy, AfterViewInit, OnChanges {
  @ViewChild('chartContainer') chartContainer!: ElementRef;
  
  constructor(private cdr: ChangeDetectorRef) {}
  @Input() config: LineChartConfig = {
    data: [],
    width: 500,
    height: 300,
    animate: true,
    showPoints: true,
    showGrid: true,
    curveType: 'monotoneX',
    strokeWidth: 2
  };
  @Input() title: string = 'Line Chart';
  @Input() description: string = 'Interactive line chart with trend visualization';
  @Output() chartReady = new EventEmitter<void>();
  @Output() dataUpdate = new EventEmitter<ChartData[]>();

  private chart: LineChart | null = null;
  public isLoading = true;
  public error: string | null = null;
  private initAttempts = 0;
  private maxInitAttempts = 5;

  ngOnInit() {
    // Component initialization
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
    // Use a longer timeout to ensure the container is fully rendered
    setTimeout(() => {
      this.initializeChart();
      this.cdr.detectChanges();
    }, 100);
  }

  ngOnDestroy() {
    this.destroyChart();
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
      if (!this.chartContainer) {
        console.warn('Chart container ViewChild not available yet');
        this.error = 'Chart container not available';
        this.isLoading = false;
        this.cdr.detectChanges();
        
        // Retry initialization if we haven't exceeded max attempts
        if (this.initAttempts < this.maxInitAttempts) {
          this.initAttempts++;
          setTimeout(() => {
            this.initializeChart();
          }, 200);
        }
        return;
      }

      if (!this.chartContainer.nativeElement) {
        console.warn('Chart container native element not available');
        this.error = 'Chart container not available';
        this.isLoading = false;
        this.cdr.detectChanges();
        
        // Retry initialization if we haven't exceeded max attempts
        if (this.initAttempts < this.maxInitAttempts) {
          this.initAttempts++;
          setTimeout(() => {
            this.initializeChart();
          }, 200);
        }
        return;
      }

      // Additional check to ensure the element is in the DOM
      if (!document.contains(this.chartContainer.nativeElement)) {
        console.warn('Chart container element not in DOM');
        this.error = 'Chart container not available';
        this.isLoading = false;
        this.cdr.detectChanges();
        
        // Retry initialization if we haven't exceeded max attempts
        if (this.initAttempts < this.maxInitAttempts) {
          this.initAttempts++;
          setTimeout(() => {
            this.initializeChart();
          }, 200);
        }
        return;
      }

      const data = this.getChartData();
      if (!data || data.length === 0) {
        this.error = 'No data available for chart';
        this.isLoading = false;
        this.cdr.detectChanges();
        return;
      }

      console.log('Initializing line chart with config:', this.config);
      console.log('Container element:', this.chartContainer.nativeElement);

      this.chart = new LineChart({
        container: this.chartContainer.nativeElement,
        data: this.config.data,
        options: {
          width: this.config.width || 500,
          height: this.config.height || 300,
          animate: this.config.animate ?? true,
          showPoints: this.config.showPoints ?? true,
          showGrid: this.config.showGrid ?? true,
          curveType: this.config.curveType || 'monotoneX',
          strokeWidth: this.config.strokeWidth || 2,
          showLegend: this.config.showLegend ?? false,
          multiLine: this.config.multiLine ?? false
        }
      });

      console.log('Line chart initialized successfully');
      this.isLoading = false;
      this.initAttempts = 0; // Reset attempts on success
      this.chartReady.emit();
      this.cdr.detectChanges();
    } catch (error) {
      console.error('Error initializing line chart:', error);
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

  public updateChartOptions(options: Partial<LineChartConfig>) {
    if (this.chart) {
      // Update the config with new options
      this.config = { ...this.config, ...options };
      
      // Update the chart with new options
      this.chart.updateOptions(options);
      
      // Trigger change detection
      this.cdr.detectChanges();
    }
  }

  public refreshChart() {
    this.initAttempts = 0; // Reset attempts on manual refresh
    setTimeout(() => {
      this.initializeChart();
      this.cdr.detectChanges();
    }, 100);
  }

  private destroyChart() {
    if (this.chart) {
      this.chart.destroy();
      this.chart = null;
    }
  }

  public getChartData(): ChartData[] {
    if (Array.isArray(this.config.data)) {
      return this.config.data;
    } else {
      // For multi-line data, return the first series data
      const multiData = this.config.data as MultiLineChartData;
      return multiData.series.length > 0 ? multiData.series[0].data : [];
    }
  }

  public getTotalValue(): number {
    if (Array.isArray(this.config.data)) {
      return this.config.data.reduce((sum: number, item: any) => sum + item.value, 0);
    } else {
      // Multi-line data
      const multiData = this.config.data as MultiLineChartData;
      return multiData.series.reduce((sum: number, series: any) => 
        sum + series.data.reduce((seriesSum: number, item: any) => seriesSum + item.value, 0), 0);
    }
  }

  public getAverageValue(): number {
    if (Array.isArray(this.config.data)) {
      if (this.config.data.length === 0) return 0;
      return this.getTotalValue() / this.config.data.length;
    } else {
      // Multi-line data
      const multiData = this.config.data as MultiLineChartData;
      const totalPoints = multiData.series.reduce((sum: number, series: any) => sum + series.data.length, 0);
      return totalPoints > 0 ? this.getTotalValue() / totalPoints : 0;
    }
  }

  public getMaxValue(): number {
    if (Array.isArray(this.config.data)) {
      return Math.max(...this.config.data.map((item: any) => item.value));
    } else {
      // Multi-line data
      const multiData = this.config.data as MultiLineChartData;
      return Math.max(...multiData.series.flatMap((series: any) => series.data.map((item: any) => item.value)));
    }
  }

  public getMinValue(): number {
    if (Array.isArray(this.config.data)) {
      return Math.min(...this.config.data.map((item: any) => item.value));
    } else {
      // Multi-line data
      const multiData = this.config.data as MultiLineChartData;
      return Math.min(...multiData.series.flatMap((series: any) => series.data.map((item: any) => item.value)));
    }
  }

  public getTrend(): 'increasing' | 'decreasing' | 'stable' {
    const data = this.getChartData();
    if (data.length < 2) return 'stable';
    
    const firstValue = data[0].value;
    const lastValue = data[data.length - 1].value;
    const difference = lastValue - firstValue;
    const threshold = (this.getMaxValue() - this.getMinValue()) * 0.1; // 10% threshold
    
    if (difference > threshold) return 'increasing';
    if (difference < -threshold) return 'decreasing';
    return 'stable';
  }

  public getGrowthRate(): number {
    const data = this.getChartData();
    if (data.length < 2) return 0;
    
    const firstValue = data[0].value;
    const lastValue = data[data.length - 1].value;
    
    if (firstValue === 0) return 0;
    return ((lastValue - firstValue) / firstValue) * 100;
  }

  public getDataPointsCount(): number {
    const data = this.getChartData();
    return data.length;
  }

  public getTimeRange(): string {
    const data = this.getChartData();
    if (data.length < 2) return 'Single point';
    
    const firstLabel = data[0].label;
    const lastLabel = data[data.length - 1].label;
    return `${firstLabel} - ${lastLabel}`;
  }
}

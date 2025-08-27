import { Component, OnInit, OnDestroy, ElementRef, ViewChild, AfterViewInit, Input, Output, EventEmitter, ChangeDetectorRef, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BarChart, ChartData } from '@synerity/charts';

export interface BarChartConfig {
  data: ChartData[];
  width?: number;
  height?: number;
  animate?: boolean;
  showValues?: boolean;
  showGrid?: boolean;
  barPadding?: number;
  borderRadius?: number;
}

@Component({
  selector: 'app-bar-chart',
  standalone: false,
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.scss']
})
export class BarChartComponent implements OnInit, OnDestroy, AfterViewInit, OnChanges {
  @ViewChild('chartContainer') chartContainer!: ElementRef;
  
  constructor(private cdr: ChangeDetectorRef) {}
  @Input() config: BarChartConfig = {
    data: [],
    width: 500,
    height: 300,
    animate: true,
    showValues: true,
    showGrid: true,
    barPadding: 0.1,
    borderRadius: 4
  };
  @Input() title: string = 'Bar Chart';
  @Input() description: string = 'Interactive bar chart with data visualization';
  @Output() chartReady = new EventEmitter<void>();
  @Output() dataUpdate = new EventEmitter<ChartData[]>();

  private chart: BarChart | null = null;
  public isLoading = true;
  public error: string | null = null;
  private initAttempts = 0;
  private maxInitAttempts = 5;

  ngOnInit() {
    // Component initialization
  }

  ngOnChanges(changes: SimpleChanges) {
    // Re-initialize chart when config changes
    if (changes['config'] && !changes['config'].firstChange) {
      const currentConfig = changes['config'].currentValue;
      const previousConfig = changes['config'].previousValue;
      
      console.log('Bar chart config changed:', { current: currentConfig, previous: previousConfig });
      
      if (!previousConfig) {
        // First time config is set
        console.log('First time config set, initializing chart');
        setTimeout(() => {
          this.initializeChart();
          this.cdr.detectChanges();
        }, 100);
        return;
      }
      
      // Check if only data changed (same structure)
      if (this.isDataOnlyChange(currentConfig, previousConfig)) {
        console.log('Data only change detected, updating chart data');
        if (this.chart && currentConfig.data) {
          this.chart.update(currentConfig.data);
          this.dataUpdate.emit(currentConfig.data);
          this.cdr.detectChanges();
        }
      } else if (this.isOptionsOnlyChange(currentConfig, previousConfig)) {
        // Only options changed, update chart options
        console.log('Options only change detected, updating chart options');
        if (this.chart) {
          console.log('Calling chart.updateOptions with:', {
            width: currentConfig.width,
            height: currentConfig.height,
            animate: currentConfig.animate,
            showValues: currentConfig.showValues,
            showGrid: currentConfig.showGrid,
            barPadding: currentConfig.barPadding,
            borderRadius: currentConfig.borderRadius
          });
          this.chart.updateOptions({
            width: currentConfig.width,
            height: currentConfig.height,
            animate: currentConfig.animate,
            showValues: currentConfig.showValues,
            showGrid: currentConfig.showGrid,
            barPadding: currentConfig.barPadding,
            borderRadius: currentConfig.borderRadius
          });
          this.cdr.detectChanges();
        } else {
          console.warn('Chart instance not available for options update');
        }
      } else {
        // Full reinitialization needed for any config option changes
        console.log('Full reinitialization needed - config options changed');
        this.destroyChart(); // Ensure clean destruction
        setTimeout(() => {
          this.initializeChart();
          this.cdr.detectChanges();
        }, 50);
      }
    }
  }

  private isDataOnlyChange(current: BarChartConfig, previous: BarChartConfig): boolean {
    // Check if only data values changed but structure remains the same
    if (current.data.length !== previous.data.length) {
      return false;
    }
    
    // Check if data labels changed (structure change)
    for (let i = 0; i < current.data.length; i++) {
      if (current.data[i].label !== previous.data[i].label) {
        return false;
      }
    }
    
    // Check if data values or colors changed
    for (let i = 0; i < current.data.length; i++) {
      if (current.data[i].value !== previous.data[i].value ||
          current.data[i].color !== previous.data[i].color) {
        // This is a data-only change, but we need to update the chart
        return true;
      }
    }
    
    return true;
  }

  private isOptionsOnlyChange(current: BarChartConfig, previous: BarChartConfig): boolean {
    // Check if only configuration options changed (not data)
    if (current.data.length !== previous.data.length) {
      return false;
    }
    
    // Check if data changed
    for (let i = 0; i < current.data.length; i++) {
      if (current.data[i].label !== previous.data[i].label ||
          current.data[i].value !== previous.data[i].value ||
          current.data[i].color !== previous.data[i].color) {
        return false;
      }
    }
    
    // Check if any configuration options changed
    const optionsChanged = current.width !== previous.width ||
        current.height !== previous.height ||
        current.animate !== previous.animate ||
        current.showValues !== previous.showValues ||
        current.showGrid !== previous.showGrid ||
        current.barPadding !== previous.barPadding ||
        current.borderRadius !== previous.borderRadius;
    
    if (optionsChanged) {
      console.log('Options changed detected:', {
        width: { current: current.width, previous: previous.width },
        height: { current: current.height, previous: previous.height },
        animate: { current: current.animate, previous: previous.animate },
        showValues: { current: current.showValues, previous: previous.showValues },
        showGrid: { current: current.showGrid, previous: previous.showGrid },
        barPadding: { current: current.barPadding, previous: previous.barPadding },
        borderRadius: { current: current.borderRadius, previous: previous.borderRadius }
      });
      return true;
    }
    
    return false;
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

      if (!this.config.data || this.config.data.length === 0) {
        this.error = 'No data available for chart';
        this.isLoading = false;
        this.cdr.detectChanges();
        return;
      }

      console.log('Initializing bar chart with config:', this.config);
      console.log('Container element:', this.chartContainer.nativeElement);

      this.chart = new BarChart({
        container: this.chartContainer.nativeElement,
        data: [...this.config.data],
        options: {
          width: this.config.width || 500,
          height: this.config.height || 300,
          animate: this.config.animate ?? true,
          showValues: this.config.showValues ?? true,
          showGrid: this.config.showGrid ?? true,
          barPadding: this.config.barPadding || 0.1,
          borderRadius: this.config.borderRadius || 4
        }
      });

      console.log('Bar chart initialized successfully');
      this.isLoading = false;
      this.initAttempts = 0; // Reset attempts on success
      this.chartReady.emit();
      this.cdr.detectChanges();
    } catch (error) {
      console.error('Error initializing bar chart:', error);
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

  public updateChartOptions(options: Partial<BarChartConfig>) {
    if (this.chart) {
      // Update the config
      this.config = { ...this.config, ...options };
      
      // Update the chart with new options
      this.chart.updateOptions({
        width: this.config.width,
        height: this.config.height,
        animate: this.config.animate,
        showValues: this.config.showValues,
        showGrid: this.config.showGrid,
        barPadding: this.config.barPadding,
        borderRadius: this.config.borderRadius
      });
      
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
    
    // Also clear the container
    if (this.chartContainer && this.chartContainer.nativeElement) {
      this.chartContainer.nativeElement.innerHTML = '';
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
}

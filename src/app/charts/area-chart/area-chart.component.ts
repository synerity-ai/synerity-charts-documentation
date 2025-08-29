import { Component, Input, OnInit, OnDestroy, ViewChild, ElementRef, AfterViewInit, OnChanges, SimpleChanges } from '@angular/core';
import { AreaChart, ChartData, AreaChartOptions } from '@synerity/charts';

@Component({
  selector: 'app-area-chart',
  templateUrl: './area-chart.component.html',
  styleUrls: ['./area-chart.component.scss'],
  standalone: false
})
export class AreaChartComponent implements OnInit, OnDestroy, AfterViewInit, OnChanges {
  @Input() data: ChartData[] = [];
  @Input() options: AreaChartOptions = {};
  @ViewChild('chartContainer', { static: true }) chartContainer!: ElementRef;

  private chart: AreaChart | null = null;

  ngOnInit(): void {
    // Component initialization
  }

  ngAfterViewInit(): void {
    this.initChart();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.chart && (changes['data'] || changes['options'])) {
      // Re-initialize chart when data or options change
      setTimeout(() => {
        this.initChart();
      }, 0);
    }
  }

  ngOnDestroy(): void {
    if (this.chart) {
      this.chart.destroy();
    }
  }

  private initChart(): void {
    console.log('Initializing area chart...', {
      container: this.chartContainer?.nativeElement,
      dataLength: this.data?.length,
      options: this.options
    });

    if (!this.chartContainer?.nativeElement || !this.data || this.data.length === 0) {
      console.warn('Area chart: Missing container or data', {
        container: !!this.chartContainer?.nativeElement,
        data: !!this.data,
        dataLength: this.data?.length
      });
      return;
    }

    try {
      // Destroy existing chart if it exists
      if (this.chart) {
        this.chart.destroy();
        this.chart = null;
      }

      this.chart = new AreaChart({
        container: this.chartContainer.nativeElement,
        data: this.data,
        options: {
          width: this.chartContainer.nativeElement.offsetWidth || 600,
          height: this.chartContainer.nativeElement.offsetHeight || 400,
          animate: true,
          type: 'standard',
          showPoints: true,
          showGrid: true,
          curveType: 'monotoneX',
          strokeWidth: 2,
          pointRadius: 4,
          areaOpacity: 0.3,
          // Enhanced features
          gradient: {
            enabled: false,
            type: 'linear',
            colors: ['#3B82F6', '#1E40AF']
          },
          zoom: {
            enabled: false,
            minZoom: 0.5,
            maxZoom: 5
          },
          tooltip: {
            enabled: true,
            format: (data: ChartData) => `${data.label}: ${data.value}`
          },
          animation: {
            duration: 1000,
            easing: 'cubic-out',
            delay: 0
          },
          ...this.options
        }
      });
      console.log('Area chart initialized successfully');
    } catch (error) {
      console.error('Error initializing area chart:', error);
    }
  }

  public updateChart(newData: ChartData[]): void {
    if (this.chart) {
      this.chart.update(newData);
    }
  }

  public resizeChart(): void {
    if (this.chart && this.chartContainer?.nativeElement) {
      const width = this.chartContainer.nativeElement.offsetWidth;
      const height = this.chartContainer.nativeElement.offsetHeight;
      this.chart.resize(width, height);
    }
  }

  // Enhanced feature methods
  public enableGradient(colors: string[] = ['#3B82F6', '#1E40AF']): void {
    if (this.chart) {
      this.chart.enableGradient(colors);
    }
  }

  public disableGradient(): void {
    if (this.chart) {
      this.chart.disableGradient();
    }
  }

  public enableZoom(minZoom: number = 0.5, maxZoom: number = 5): void {
    if (this.chart) {
      this.chart.enableZoom(minZoom, maxZoom);
    }
  }

  public disableZoom(): void {
    if (this.chart) {
      this.chart.disableZoom();
    }
  }

  public resetZoom(): void {
    if (this.chart) {
      this.chart.resetZoom();
    }
  }

  public setTooltipFormat(format: (data: ChartData) => string): void {
    if (this.chart) {
      this.chart.setTooltipFormat(format);
    }
  }

  public setAnimation(duration: number, easing: string = 'cubic-out'): void {
    if (this.chart) {
      this.chart.setAnimation(duration, easing);
    }
  }
}

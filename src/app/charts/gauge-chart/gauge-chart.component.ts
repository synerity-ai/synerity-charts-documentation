import { Component, Input, OnInit, OnDestroy, ViewChild, ElementRef, AfterViewInit, OnChanges, SimpleChanges } from '@angular/core';
import { GaugeChart, GaugeData, GaugeChartOptions } from '@synerity/charts';

@Component({
  selector: 'app-gauge-chart',
  templateUrl: './gauge-chart.component.html',
  styleUrls: ['./gauge-chart.component.scss'],
  standalone: false
})
export class GaugeChartComponent implements OnInit, OnDestroy, AfterViewInit, OnChanges {
  @Input() data: GaugeData = { value: 0, min: 0, max: 100 };
  @Input() options: GaugeChartOptions = {};
  @ViewChild('chartContainer', { static: true }) chartContainer!: ElementRef;

  private chart: GaugeChart | null = null;
  private isInitialized = false;

  ngOnInit(): void {
    // Component initialization
  }

  ngAfterViewInit(): void {
    this.initChart();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.chart && (changes['data'] || changes['options'])) {
      console.log('Config changed, updating gauge chart:', { data: this.data, options: this.options });
      console.log('Changes detected:', Object.keys(changes));
      
      // If type changed, we need to reinitialize the chart
      if (changes['options'] && changes['options'].currentValue?.type !== changes['options'].previousValue?.type) {
        console.log('Gauge type changed, reinitializing chart');
        this.initChart();
      } else {
        this.updateChartInternal();
      }
    }
  }

  ngOnDestroy(): void {
    this.destroyChart();
  }

  private initChart(): void {
    if (!this.chartContainer?.nativeElement) {
      console.warn('Gauge chart: Missing container');
      return;
    }

    try {
      this.destroyChart(); // Clean up any existing chart
      
      const containerWidth = this.chartContainer.nativeElement.offsetWidth || 400;
      const containerHeight = this.chartContainer.nativeElement.offsetHeight || 400;
      
      this.chart = new GaugeChart({
        container: this.chartContainer.nativeElement,
        data: this.data,
        options: {
          width: containerWidth,
          height: containerHeight,
          margin: { top: 40, right: 40, bottom: 60, left: 40 },
          animate: true,
          type: 'radial',
          min: this.data.min,
          max: this.data.max,
          thresholds: [
            { value: 25, color: '#EF4444' },
            { value: 50, color: '#F59E0B' },
            { value: 75, color: '#10B981' },
            { value: 100, color: '#3B82F6' }
          ],
          showValue: true,
          showLabel: true,
          arcWidth: 20,
          ...this.options
        }
      });
      
      this.isInitialized = true;
    } catch (error) {
      console.error('Error initializing gauge chart:', error);
    }
  }

  private destroyChart(): void {
    if (this.chart) {
      this.chart.destroy();
      this.chart = null;
    }
    this.isInitialized = false;
  }

  public updateChart(newData: GaugeData): void {
    if (this.chart) {
      this.chart.update(newData);
    }
  }

  private updateChartInternal(): void {
    if (this.chart) {
      try {
        console.log('Updating gauge chart with new data/options:', { data: this.data, options: this.options });
        
        // Update chart data
        this.chart.update(this.data);
        
        // Update chart options using available methods
        if (this.chartContainer?.nativeElement) {
          const width = this.chartContainer.nativeElement.offsetWidth;
          const height = this.chartContainer.nativeElement.offsetHeight;
          if (width && height) {
            this.chart.resize(width, height);
          }
        }
      } catch (error) {
        console.error('Error updating gauge chart:', error);
      }
    }
  }

  public resizeChart(): void {
    if (this.chart && this.chartContainer?.nativeElement) {
      const width = this.chartContainer.nativeElement.offsetWidth;
      const height = this.chartContainer.nativeElement.offsetHeight;
      this.chart.resize(width, height);
    }
  }
}

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
    if (this.isInitialized && this.chart) {
      if (changes['data'] && !changes['data'].firstChange) {
        // Update the chart with new data
        this.chart.update(this.data);
      }
      
      if (changes['options'] && !changes['options'].firstChange) {
        // Reinitialize chart with new options
        this.destroyChart();
        setTimeout(() => this.initChart(), 100);
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
      
      this.chart = new GaugeChart({
        container: this.chartContainer.nativeElement,
        data: this.data,
        options: {
          width: this.chartContainer.nativeElement.offsetWidth || 300,
          height: this.chartContainer.nativeElement.offsetHeight || 300,
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

  public resizeChart(): void {
    if (this.chart && this.chartContainer?.nativeElement) {
      const width = this.chartContainer.nativeElement.offsetWidth;
      const height = this.chartContainer.nativeElement.offsetHeight;
      this.chart.resize(width, height);
    }
  }
}

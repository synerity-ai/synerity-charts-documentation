import { Component, Input, OnInit, OnDestroy, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { HeatmapChart, HeatmapData, HeatmapOptions } from '@synerity/charts';

@Component({
  selector: 'app-heatmap-chart',
  templateUrl: './heatmap-chart.component.html',
  styleUrls: ['./heatmap-chart.component.scss'],
  standalone: false
})
export class HeatmapChartComponent implements OnInit, OnDestroy, AfterViewInit {
  @Input() data: HeatmapData[] = [];
  @Input() options: HeatmapOptions = {};
  @ViewChild('chartContainer', { static: true }) chartContainer!: ElementRef;

  private chart: HeatmapChart | null = null;

  ngOnInit(): void {
    // Component initialization
  }

  ngAfterViewInit(): void {
    this.initChart();
  }

  ngOnDestroy(): void {
    if (this.chart) {
      this.chart.destroy();
    }
  }

  private initChart(): void {
    if (!this.chartContainer?.nativeElement || !this.data || this.data.length === 0) {
      console.warn('Heatmap chart: Missing container or data');
      return;
    }

    try {
      this.chart = new HeatmapChart({
        container: this.chartContainer.nativeElement,
        data: this.data,
        options: {
          width: this.chartContainer.nativeElement.offsetWidth || 600,
          height: this.chartContainer.nativeElement.offsetHeight || 400,
          animate: true,
          showValues: true,
          colorScale: 'sequential',
          colorDomain: undefined,
          cellPadding: 2,
          showAxis: true,
          ...this.options
        }
      });
    } catch (error) {
      console.error('Error initializing heatmap chart:', error);
    }
  }

  public updateChart(newData: HeatmapData[]): void {
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

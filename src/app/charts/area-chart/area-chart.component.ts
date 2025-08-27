import { Component, Input, OnInit, OnDestroy, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { AreaChart, ChartData, AreaChartOptions } from '@synerity/charts';

@Component({
  selector: 'app-area-chart',
  templateUrl: './area-chart.component.html',
  styleUrls: ['./area-chart.component.scss'],
  standalone: false
})
export class AreaChartComponent implements OnInit, OnDestroy, AfterViewInit {
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

  ngOnDestroy(): void {
    if (this.chart) {
      this.chart.destroy();
    }
  }

  private initChart(): void {
    if (!this.chartContainer?.nativeElement || !this.data || this.data.length === 0) {
      console.warn('Area chart: Missing container or data');
      return;
    }

    try {
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
          ...this.options
        }
      });
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
}

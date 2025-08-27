import { Component, Input, OnInit, OnDestroy, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { BubbleChart, BubbleData, BubbleChartOptions } from '@synerity/charts';

@Component({
  selector: 'app-bubble-chart',
  templateUrl: './bubble-chart.component.html',
  styleUrls: ['./bubble-chart.component.scss'],
  standalone: false
})
export class BubbleChartComponent implements OnInit, OnDestroy, AfterViewInit {
  @Input() data: BubbleData[] = [];
  @Input() options: BubbleChartOptions = {};
  @ViewChild('chartContainer', { static: true }) chartContainer!: ElementRef;

  private chart: BubbleChart | null = null;

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
      console.warn('Bubble chart: Missing container or data');
      return;
    }

    try {
      this.chart = new BubbleChart({
        container: this.chartContainer.nativeElement,
        data: this.data,
        options: {
          width: this.chartContainer.nativeElement.offsetWidth || 600,
          height: this.chartContainer.nativeElement.offsetHeight || 400,
          animate: true,
          showGrid: true,
          showLabels: true,
          minRadius: 5,
          maxRadius: 30,
          opacity: 0.7,
          ...this.options
        }
      });
    } catch (error) {
      console.error('Error initializing bubble chart:', error);
    }
  }

  public updateChart(newData: BubbleData[]): void {
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

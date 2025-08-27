import { Component, Input, OnInit, OnDestroy, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { SankeyChart, SankeyData, SankeyOptions } from '@synerity/charts';

@Component({
  selector: 'app-sankey-chart',
  templateUrl: './sankey-chart.component.html',
  styleUrls: ['./sankey-chart.component.scss'],
  standalone: false
})
export class SankeyChartComponent implements OnInit, OnDestroy, AfterViewInit {
  @Input() data: SankeyData = { nodes: [], links: [] };
  @Input() options: SankeyOptions = {};
  @ViewChild('chartContainer', { static: true }) chartContainer!: ElementRef;

  private chart: SankeyChart | null = null;

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
    if (!this.chartContainer?.nativeElement) {
      console.warn('Sankey chart: Missing container');
      return;
    }

    try {
      this.chart = new SankeyChart({
        container: this.chartContainer.nativeElement,
        data: this.data,
        options: {
          width: this.chartContainer.nativeElement.offsetWidth || 800,
          height: this.chartContainer.nativeElement.offsetHeight || 600,
          animate: true,
          nodeWidth: 20,
          nodePadding: 10,
          linkOpacity: 0.3,
          showValues: true,
          ...this.options
        }
      });
    } catch (error) {
      console.error('Error initializing Sankey chart:', error);
    }
  }

  public updateChart(newData: SankeyData): void {
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

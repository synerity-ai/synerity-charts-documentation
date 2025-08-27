import { Component, Input, OnInit, OnDestroy, ViewChild, ElementRef, AfterViewInit, OnChanges, SimpleChanges } from '@angular/core';
import { TreemapChart, TreemapData, TreemapOptions } from '@synerity/charts';

@Component({
  selector: 'app-treemap-chart',
  templateUrl: './treemap-chart.component.html',
  styleUrls: ['./treemap-chart.component.scss'],
  standalone: false
})
export class TreemapChartComponent implements OnInit, OnDestroy, AfterViewInit, OnChanges {
  @Input() data: TreemapData = { name: 'Root', value: 0 };
  @Input() options: TreemapOptions = {};
  @ViewChild('chartContainer', { static: true }) chartContainer!: ElementRef;

  private chart: TreemapChart | null = null;

  ngOnInit(): void {
    // Component initialization
  }

  ngAfterViewInit(): void {
    this.initChart();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.chart && changes['data'] && !changes['data'].firstChange) {
      this.chart.update(this.data);
    }
    if (this.chart && changes['options'] && !changes['options'].firstChange) {
      // Reinitialize chart with new options
      this.chart.destroy();
      this.initChart();
    }
  }

  ngOnDestroy(): void {
    if (this.chart) {
      this.chart.destroy();
    }
  }

  private initChart(): void {
    if (!this.chartContainer?.nativeElement) {
      console.warn('Treemap chart: Missing container');
      return;
    }

    try {
      this.chart = new TreemapChart({
        container: this.chartContainer.nativeElement,
        data: [this.data],
        options: {
          width: this.chartContainer.nativeElement.offsetWidth || 600,
          height: this.chartContainer.nativeElement.offsetHeight || 400,
          animate: true,
          showLabels: true,
          showValues: true,
          padding: 2,
          borderWidth: 1,
          borderColor: '#E5E7EB',
          ...this.options
        }
      });
    } catch (error) {
      console.error('Error initializing treemap chart:', error);
    }
  }

  public updateChart(newData: TreemapData): void {
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

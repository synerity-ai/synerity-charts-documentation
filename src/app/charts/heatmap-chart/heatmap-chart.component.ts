import { Component, Input, OnInit, OnDestroy, ViewChild, ElementRef, AfterViewInit, OnChanges, SimpleChanges, ChangeDetectorRef } from '@angular/core';
import { HeatmapChart, HeatmapData, HeatmapOptions } from '@synerity/charts';

@Component({
  selector: 'app-heatmap-chart',
  templateUrl: './heatmap-chart.component.html',
  styleUrls: ['./heatmap-chart.component.scss'],
  standalone: false
})
export class HeatmapChartComponent implements OnInit, OnDestroy, AfterViewInit, OnChanges {
  @Input() data: HeatmapData[] = [];
  @Input() options: HeatmapOptions = {};
  @ViewChild('chartContainer', { static: true }) chartContainer!: ElementRef;

  private chart: HeatmapChart | null = null;

  constructor(private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    // Component initialization
  }

  ngAfterViewInit(): void {
    this.initChart();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.chart && (changes['data'] || changes['options'])) {
      console.log('Config changed, updating heatmap chart:', { data: this.data, options: this.options });
      console.log('Changes detected:', Object.keys(changes));
      this.updateChartInternal(changes);
    }
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
      this.chart.update(newData, this.options);
    }
  }

  private updateChartInternal(changes: SimpleChanges): void {
    if (this.chart) {
      try {
        console.log('Updating heatmap chart with new data/options:', { data: this.data, options: this.options });
        
        // For color scale changes, we need to reinitialize the chart
        // since the color scale is set during initialization
        if (changes['options'] && this.options) {
          console.log('Options changed, reinitializing chart');
          this.chart.destroy();
          this.initChart();
        } else {
          // Update chart data
          if (this.data && this.data.length > 0) {
            this.chart.update(this.data, this.options);
          }
          
          // Update chart options using available methods
          if (this.chartContainer?.nativeElement) {
            const width = this.chartContainer.nativeElement.offsetWidth;
            const height = this.chartContainer.nativeElement.offsetHeight;
            if (width && height) {
              this.chart.resize(width, height);
            }
          }
        }
      } catch (error) {
        console.error('Error updating heatmap chart:', error);
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

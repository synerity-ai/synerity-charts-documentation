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
    if (this.chart && (changes['data'] || changes['options'])) {
      console.log('Config changed, updating treemap chart:', { data: this.data, options: this.options });
      console.log('Changes detected:', Object.keys(changes));
      this.updateChartInternal();
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

  private updateChartInternal(): void {
    if (this.chart) {
      try {
        console.log('Updating treemap chart with new data/options:', { data: this.data, options: this.options });
        
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
        console.error('Error updating treemap chart:', error);
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

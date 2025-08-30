import { Component, Input, OnInit, OnDestroy, ViewChild, ElementRef, AfterViewInit, OnChanges, SimpleChanges, ChangeDetectorRef } from '@angular/core';
import { SankeyChart, SankeyData, SankeyOptions } from '@synerity/charts';

@Component({
  selector: 'app-sankey-chart',
  templateUrl: './sankey-chart.component.html',
  styleUrls: ['./sankey-chart.component.scss'],
  standalone: false
})
export class SankeyChartComponent implements OnInit, OnDestroy, AfterViewInit, OnChanges {
  @Input() data: SankeyData = { nodes: [], links: [] };
  @Input() options: SankeyOptions = {};
  @ViewChild('chartContainer', { static: true }) chartContainer!: ElementRef;

  private chart: SankeyChart | null = null;

  constructor(private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    // Component initialization
  }

  ngAfterViewInit(): void {
    this.initChart();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.chart && (changes['data'] || changes['options'])) {
      console.log('Config changed, updating Sankey chart:', { data: this.data, options: this.options });
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

  private updateChartInternal(): void {
    if (this.chart) {
      try {
        console.log('Updating Sankey chart with new data/options:', { data: this.data, options: this.options });
        
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
        console.error('Error updating Sankey chart:', error);
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

import { Component, Input, OnInit, OnDestroy, ViewChild, ElementRef, AfterViewInit, OnChanges, SimpleChanges, ChangeDetectorRef } from '@angular/core';
import { BubbleChart, BubbleData, BubbleChartOptions } from '@synerity/charts';

@Component({
  selector: 'app-bubble-chart',
  templateUrl: './bubble-chart.component.html',
  styleUrls: ['./bubble-chart.component.scss'],
  standalone: false
})
export class BubbleChartComponent implements OnInit, OnDestroy, AfterViewInit, OnChanges {
  @Input() data: BubbleData[] = [];
  @Input() options: BubbleChartOptions = {};
  @ViewChild('chartContainer', { static: true }) chartContainer!: ElementRef;

  private chart: BubbleChart | null = null;

  constructor(private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    // Component initialization
  }

  ngAfterViewInit(): void {
    this.initChart();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.chart && (changes['data'] || changes['options'])) {
      console.log('Config changed, updating bubble chart:', { data: this.data, options: this.options });
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

  private updateChartInternal(): void {
    if (this.chart) {
      try {
        console.log('Updating bubble chart with new data/options:', { data: this.data, options: this.options });
        
        // Update chart data
        if (this.data && this.data.length > 0) {
          this.chart.update(this.data);
        }
        
        // Update chart options using available methods
        if (this.chartContainer?.nativeElement) {
          const width = this.chartContainer.nativeElement.offsetWidth;
          const height = this.chartContainer.nativeElement.offsetHeight;
          if (width && height) {
            this.chart.resize(width, height);
          }
        }
      } catch (error) {
        console.error('Error updating bubble chart:', error);
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

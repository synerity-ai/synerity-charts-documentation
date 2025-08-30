import { Component, Input, OnInit, OnDestroy, ViewChild, ElementRef, AfterViewInit, OnChanges, SimpleChanges, ChangeDetectorRef } from '@angular/core';
import { NumberCards, NumberCardData, NumberCardOptions } from '@synerity/charts';

@Component({
  selector: 'app-number-cards',
  templateUrl: './number-cards.component.html',
  styleUrls: ['./number-cards.component.scss'],
  standalone: false
})
export class NumberCardsComponent implements OnInit, OnDestroy, AfterViewInit, OnChanges {
  @Input() data: NumberCardData[] = [];
  @Input() options: NumberCardOptions = {};
  @ViewChild('chartContainer', { static: true }) chartContainer!: ElementRef;

  private chart: NumberCards | null = null;

  constructor(private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    // Component initialization
  }

  ngAfterViewInit(): void {
    this.initChart();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.chart && (changes['data'] || changes['options'])) {
      console.log('Config changed, updating number cards:', { data: this.data, options: this.options });
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
      console.warn('Number cards: Missing container or data');
      return;
    }

    try {
      this.chart = new NumberCards({
        container: this.chartContainer.nativeElement,
        data: this.data,
        options: {
          width: this.chartContainer.nativeElement.offsetWidth || 800,
          height: this.chartContainer.nativeElement.offsetHeight || 200,
          animate: true,
          showChange: true,
          showIcon: true,
          formatValue: (value: number) => value.toLocaleString(),
          formatChange: (change: number) => `${change >= 0 ? '+' : ''}${change.toFixed(1)}%`,
          ...this.options
        }
      });
    } catch (error) {
      console.error('Error initializing number cards:', error);
    }
  }

  public updateChart(newData: NumberCardData[]): void {
    if (this.chart) {
      this.chart.update(newData);
    }
  }

  private updateChartInternal(): void {
    if (this.chart) {
      try {
        console.log('Updating number cards with new data/options:', { data: this.data, options: this.options });
        
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
        console.error('Error updating number cards:', error);
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

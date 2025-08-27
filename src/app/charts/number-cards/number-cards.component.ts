import { Component, Input, OnInit, OnDestroy, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { NumberCards, NumberCardData, NumberCardOptions } from '@synerity/charts';

@Component({
  selector: 'app-number-cards',
  templateUrl: './number-cards.component.html',
  styleUrls: ['./number-cards.component.scss'],
  standalone: false
})
export class NumberCardsComponent implements OnInit, OnDestroy, AfterViewInit {
  @Input() data: NumberCardData[] = [];
  @Input() options: NumberCardOptions = {};
  @ViewChild('chartContainer', { static: true }) chartContainer!: ElementRef;

  private chart: NumberCards | null = null;

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

  public resizeChart(): void {
    if (this.chart && this.chartContainer?.nativeElement) {
      const width = this.chartContainer.nativeElement.offsetWidth;
      const height = this.chartContainer.nativeElement.offsetHeight;
      this.chart.resize(width, height);
    }
  }
}

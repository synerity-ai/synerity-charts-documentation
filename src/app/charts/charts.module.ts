import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BarChartComponent } from './bar-chart/bar-chart.component';
import { LineChartComponent } from './line-chart/line-chart.component';
import { PieChartComponent } from './pie-chart/pie-chart.component';
import { ScatterChartComponent } from './scatter-chart/scatter-chart.component';
import { AreaChartComponent } from './area-chart/area-chart.component';
import { BubbleChartComponent } from './bubble-chart/bubble-chart.component';
import { GaugeChartComponent } from './gauge-chart/gauge-chart.component';
import { HeatmapChartComponent } from './heatmap-chart/heatmap-chart.component';
import { TreemapChartComponent } from './treemap-chart/treemap-chart.component';
import { NumberCardsComponent } from './number-cards/number-cards.component';
import { SankeyChartComponent } from './sankey-chart/sankey-chart.component';

@NgModule({
  declarations: [
    BarChartComponent,
    LineChartComponent,
    PieChartComponent,
    ScatterChartComponent,
    AreaChartComponent,
    BubbleChartComponent,
    GaugeChartComponent,
    HeatmapChartComponent,
    TreemapChartComponent,
    NumberCardsComponent,
    SankeyChartComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    BarChartComponent,
    LineChartComponent,
    PieChartComponent,
    ScatterChartComponent,
    AreaChartComponent,
    BubbleChartComponent,
    GaugeChartComponent,
    HeatmapChartComponent,
    TreemapChartComponent,
    NumberCardsComponent,
    SankeyChartComponent
  ]
})
export class ChartsModule { }

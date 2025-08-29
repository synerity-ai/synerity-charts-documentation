import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { BarChartDemoComponent } from './bar-chart-demo/bar-chart-demo.component';
import { BarChartPageComponent } from './bar-chart-demo/bar-chart-page.component';
import { LineChartDemoComponent } from './line-chart-demo/line-chart-demo.component';
import { LineChartPageComponent } from './line-chart-demo/line-chart-page.component';
import { AreaChartDemoComponent } from './area-chart-demo/area-chart-demo.component';
import { AreaChartPageComponent } from './area-chart-demo/area-chart-page.component';
import { PieChartDemoComponent } from './pie-chart-demo/pie-chart-demo.component';
import { PieChartPageComponent } from './pie-chart-demo/pie-chart-page.component';
import { ScatterChartDemoComponent } from './scatter-chart-demo/scatter-chart-demo.component';
import { ScatterChartPageComponent } from './scatter-chart-demo/scatter-chart-page.component';
import { BubbleChartDemoComponent } from './bubble-chart-demo/bubble-chart-demo.component';
import { BubbleChartPageComponent } from './bubble-chart-demo/bubble-chart-page.component';
import { GaugeChartDemoComponent } from './gauge-chart-demo/gauge-chart-demo.component';
import { GaugeChartPageComponent } from './gauge-chart-demo/gauge-chart-page.component';
import { HeatmapChartDemoComponent } from './heatmap-chart-demo/heatmap-chart-demo.component';
import { HeatmapChartPageComponent } from './heatmap-chart-demo/heatmap-chart-page.component';
import { TreemapChartDemoComponent } from './treemap-chart-demo/treemap-chart-demo.component';
import { TreemapChartPageComponent } from './treemap-chart-demo/treemap-chart-page.component';
import { NumberCardsDemoComponent } from './number-cards-demo/number-cards-demo.component';
import { NumberCardsPageComponent } from './number-cards-demo/number-cards-page.component';
import { SankeyChartDemoComponent } from './sankey-chart-demo/sankey-chart-demo.component';
import { SankeyChartPageComponent } from './sankey-chart-demo/sankey-chart-page.component';
import { ChartsModule } from '../charts/charts.module';

@NgModule({
  declarations: [
    BarChartDemoComponent,
    BarChartPageComponent,
    LineChartDemoComponent,
    LineChartPageComponent,
    AreaChartDemoComponent,
    AreaChartPageComponent,
    PieChartDemoComponent,
    PieChartPageComponent,
    ScatterChartDemoComponent,
    ScatterChartPageComponent,
    BubbleChartDemoComponent,
    BubbleChartPageComponent,
    GaugeChartDemoComponent,
    GaugeChartPageComponent,
    HeatmapChartDemoComponent,
    HeatmapChartPageComponent,
    TreemapChartDemoComponent,
    TreemapChartPageComponent,
    NumberCardsDemoComponent,
    NumberCardsPageComponent,
    SankeyChartDemoComponent,
    SankeyChartPageComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    ChartsModule
  ],
  exports: [
    BarChartDemoComponent,
    BarChartPageComponent,
    LineChartDemoComponent,
    LineChartPageComponent,
    AreaChartDemoComponent,
    AreaChartPageComponent,
    PieChartDemoComponent,
    PieChartPageComponent,
    ScatterChartDemoComponent,
    ScatterChartPageComponent,
    BubbleChartDemoComponent,
    BubbleChartPageComponent,
    GaugeChartDemoComponent,
    GaugeChartPageComponent,
    HeatmapChartDemoComponent,
    HeatmapChartPageComponent,
    TreemapChartDemoComponent,
    TreemapChartPageComponent,
    NumberCardsDemoComponent,
    NumberCardsPageComponent,
    SankeyChartDemoComponent,
    SankeyChartPageComponent
  ]
})
export class ChartDemosModule { }

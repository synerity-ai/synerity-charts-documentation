import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { BarChartDemoComponent } from './bar-chart-demo/bar-chart-demo.component';
import { BarChartPageComponent } from './bar-chart-demo/bar-chart-page.component';
import { LineChartDemoComponent } from './line-chart-demo/line-chart-demo.component';
import { LineChartPageComponent } from './line-chart-demo/line-chart-page.component';
import { AreaChartDemoComponent } from './area-chart-demo/area-chart-demo.component';
import { PieChartDemoComponent } from './pie-chart-demo/pie-chart-demo.component';
import { ScatterChartDemoComponent } from './scatter-chart-demo/scatter-chart-demo.component';
import { BubbleChartDemoComponent } from './bubble-chart-demo/bubble-chart-demo.component';
import { GaugeChartDemoComponent } from './gauge-chart-demo/gauge-chart-demo.component';
import { HeatmapChartDemoComponent } from './heatmap-chart-demo/heatmap-chart-demo.component';
import { TreemapChartDemoComponent } from './treemap-chart-demo/treemap-chart-demo.component';
import { NumberCardsDemoComponent } from './number-cards-demo/number-cards-demo.component';
import { SankeyChartDemoComponent } from './sankey-chart-demo/sankey-chart-demo.component';
import { ChartsModule } from '../charts/charts.module';

@NgModule({
  declarations: [
    BarChartDemoComponent,
    BarChartPageComponent,
    LineChartDemoComponent,
    LineChartPageComponent,
    AreaChartDemoComponent,
    PieChartDemoComponent,
    ScatterChartDemoComponent,
    BubbleChartDemoComponent,
    GaugeChartDemoComponent,
    HeatmapChartDemoComponent,
    TreemapChartDemoComponent,
    NumberCardsDemoComponent,
    SankeyChartDemoComponent
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
    PieChartDemoComponent,
    ScatterChartDemoComponent,
    BubbleChartDemoComponent,
    GaugeChartDemoComponent,
    HeatmapChartDemoComponent,
    TreemapChartDemoComponent,
    NumberCardsDemoComponent,
    SankeyChartDemoComponent
  ]
})
export class ChartDemosModule { }

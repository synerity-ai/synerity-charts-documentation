import { Routes } from '@angular/router';
import { BarChartPageComponent } from './chart-demos/bar-chart-demo/bar-chart-page.component';
import { LineChartPageComponent } from './chart-demos/line-chart-demo/line-chart-page.component';
import { AreaChartDemoComponent } from './chart-demos/area-chart-demo/area-chart-demo.component';
import { PieChartDemoComponent } from './chart-demos/pie-chart-demo/pie-chart-demo.component';
import { ScatterChartDemoComponent } from './chart-demos/scatter-chart-demo/scatter-chart-demo.component';
import { BubbleChartDemoComponent } from './chart-demos/bubble-chart-demo/bubble-chart-demo.component';
import { GaugeChartDemoComponent } from './chart-demos/gauge-chart-demo/gauge-chart-demo.component';
import { HeatmapChartDemoComponent } from './chart-demos/heatmap-chart-demo/heatmap-chart-demo.component';
import { TreemapChartDemoComponent } from './chart-demos/treemap-chart-demo/treemap-chart-demo.component';
import { NumberCardsDemoComponent } from './chart-demos/number-cards-demo/number-cards-demo.component';
import { SankeyChartDemoComponent } from './chart-demos/sankey-chart-demo/sankey-chart-demo.component';

export const routes: Routes = [
  { path: '', redirectTo: '/charts/bar', pathMatch: 'full' },
  { path: 'charts', redirectTo: '/charts/bar', pathMatch: 'full' },
  { path: 'charts/bar', component: BarChartPageComponent },
  { path: 'charts/line', component: LineChartPageComponent },
  { path: 'charts/area', component: AreaChartDemoComponent },
  { path: 'charts/pie', component: PieChartDemoComponent },
  { path: 'charts/scatter', component: ScatterChartDemoComponent },
  { path: 'charts/bubble', component: BubbleChartDemoComponent },
  { path: 'charts/gauge', component: GaugeChartDemoComponent },
  { path: 'charts/heatmap', component: HeatmapChartDemoComponent },
  { path: 'charts/treemap', component: TreemapChartDemoComponent },
  { path: 'charts/number-cards', component: NumberCardsDemoComponent },
  { path: 'charts/sankey', component: SankeyChartDemoComponent },
  { path: '**', redirectTo: '/charts/bar' }
];

import { Routes } from '@angular/router';
import { BarChartPageComponent } from './chart-demos/bar-chart-demo/bar-chart-page.component';
import { LineChartPageComponent } from './chart-demos/line-chart-demo/line-chart-page.component';
import { AreaChartPageComponent } from './chart-demos/area-chart-demo/area-chart-page.component';
import { PieChartPageComponent } from './chart-demos/pie-chart-demo/pie-chart-page.component';
import { ScatterChartPageComponent } from './chart-demos/scatter-chart-demo/scatter-chart-page.component';
import { BubbleChartPageComponent } from './chart-demos/bubble-chart-demo/bubble-chart-page.component';
import { GaugeChartPageComponent } from './chart-demos/gauge-chart-demo/gauge-chart-page.component';
import { HeatmapChartPageComponent } from './chart-demos/heatmap-chart-demo/heatmap-chart-page.component';
import { TreemapChartPageComponent } from './chart-demos/treemap-chart-demo/treemap-chart-page.component';
import { NumberCardsPageComponent } from './chart-demos/number-cards-demo/number-cards-page.component';
import { SankeyChartPageComponent } from './chart-demos/sankey-chart-demo/sankey-chart-page.component';

export const routes: Routes = [
  { path: '', redirectTo: '/charts/bar', pathMatch: 'full' },
  { path: 'charts', redirectTo: '/charts/bar', pathMatch: 'full' },
  { path: 'charts/bar', component: BarChartPageComponent },
  { path: 'charts/line', component: LineChartPageComponent },
  { path: 'charts/area', component: AreaChartPageComponent },
  { path: 'charts/pie', component: PieChartPageComponent },
  { path: 'charts/scatter', component: ScatterChartPageComponent },
  { path: 'charts/bubble', component: BubbleChartPageComponent },
  { path: 'charts/gauge', component: GaugeChartPageComponent },
  { path: 'charts/heatmap', component: HeatmapChartPageComponent },
  { path: 'charts/treemap', component: TreemapChartPageComponent },
  { path: 'charts/number-cards', component: NumberCardsPageComponent },
  { path: 'charts/sankey', component: SankeyChartPageComponent },
  { path: '**', redirectTo: '/charts/bar' }
];

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeatmapChartDemoComponent } from './heatmap-chart-demo.component';

@Component({
  selector: 'app-heatmap-chart-page',
  standalone: false,
  templateUrl: './heatmap-chart-page.component.html',
  styleUrls: ['./heatmap-chart-page.component.scss']
})
export class HeatmapChartPageComponent {
  activeTab: 'demo' | 'documentation' | 'how-to-use' = 'demo';

  setActiveTab(tab: 'demo' | 'documentation' | 'how-to-use') {
    this.activeTab = tab;
  }
}

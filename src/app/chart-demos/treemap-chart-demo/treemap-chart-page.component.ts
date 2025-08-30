import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TreemapChartDemoComponent } from './treemap-chart-demo.component';

@Component({
  selector: 'app-treemap-chart-page',
  standalone: false,
  templateUrl: './treemap-chart-page.component.html',
  styleUrls: ['./treemap-chart-page.component.scss']
})
export class TreemapChartPageComponent {
  activeTab: 'demo' | 'documentation' | 'how-to-use' = 'demo';

  setActiveTab(tab: 'demo' | 'documentation' | 'how-to-use') {
    this.activeTab = tab;
  }
}

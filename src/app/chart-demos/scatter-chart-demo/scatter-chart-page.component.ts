import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScatterChartDemoComponent } from './scatter-chart-demo.component';

@Component({
  selector: 'app-scatter-chart-page',
  standalone: false,
  templateUrl: './scatter-chart-page.component.html',
  styleUrls: ['./scatter-chart-page.component.scss']
})
export class ScatterChartPageComponent {
  activeTab: 'demo' | 'documentation' | 'how-to-use' = 'demo';

  setActiveTab(tab: 'demo' | 'documentation' | 'how-to-use') {
    this.activeTab = tab;
  }
}

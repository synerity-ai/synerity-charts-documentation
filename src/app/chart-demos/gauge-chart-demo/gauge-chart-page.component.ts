import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GaugeChartDemoComponent } from './gauge-chart-demo.component';

@Component({
  selector: 'app-gauge-chart-page',
  standalone: false,
  templateUrl: './gauge-chart-page.component.html',
  styleUrls: ['./gauge-chart-page.component.scss']
})
export class GaugeChartPageComponent {
  activeTab: 'demo' | 'documentation' | 'how-to-use' = 'demo';

  setActiveTab(tab: 'demo' | 'documentation' | 'how-to-use') {
    this.activeTab = tab;
  }
}

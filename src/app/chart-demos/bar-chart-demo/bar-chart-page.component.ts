import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-bar-chart-page',
  standalone: false,
  templateUrl: './bar-chart-page.component.html',
  styleUrls: ['./bar-chart-page.component.scss']
})
export class BarChartPageComponent {
  activeTab: 'demo' | 'documentation' | 'how-to-use' = 'demo';

  setActiveTab(tab: 'demo' | 'documentation' | 'how-to-use') {
    this.activeTab = tab;
  }
}

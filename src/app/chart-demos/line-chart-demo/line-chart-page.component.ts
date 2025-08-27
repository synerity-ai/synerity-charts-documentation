import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-line-chart-page',
  standalone: false,
  templateUrl: './line-chart-page.component.html',
  styleUrls: ['./line-chart-page.component.scss']
})
export class LineChartPageComponent {
  activeTab: 'demo' | 'documentation' | 'how-to-use' = 'demo';

  setActiveTab(tab: 'demo' | 'documentation' | 'how-to-use') {
    this.activeTab = tab;
  }
}

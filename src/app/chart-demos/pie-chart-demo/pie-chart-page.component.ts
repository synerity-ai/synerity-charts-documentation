import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PieChartDemoComponent } from './pie-chart-demo.component';

@Component({
  selector: 'app-pie-chart-page',
  standalone: false,
  templateUrl: './pie-chart-page.component.html',
  styleUrls: ['./pie-chart-page.component.scss']
})
export class PieChartPageComponent {
  activeTab: 'demo' | 'documentation' | 'how-to-use' = 'demo';

  setActiveTab(tab: 'demo' | 'documentation' | 'how-to-use') {
    this.activeTab = tab;
  }
}

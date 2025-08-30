import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AreaChartDemoComponent } from './area-chart-demo.component';

@Component({
  selector: 'app-area-chart-page',
  standalone: false,
  templateUrl: './area-chart-page.component.html',
  styleUrls: ['./area-chart-page.component.scss']
})
export class AreaChartPageComponent {
  activeTab: 'demo' | 'documentation' | 'how-to-use' = 'demo';

  setActiveTab(tab: 'demo' | 'documentation' | 'how-to-use') {
    this.activeTab = tab;
  }
}

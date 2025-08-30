import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SankeyChartDemoComponent } from './sankey-chart-demo.component';

@Component({
  selector: 'app-sankey-chart-page',
  standalone: false,
  templateUrl: './sankey-chart-page.component.html',
  styleUrls: ['./sankey-chart-page.component.scss']
})
export class SankeyChartPageComponent {
  activeTab: 'demo' | 'documentation' | 'how-to-use' = 'demo';

  setActiveTab(tab: 'demo' | 'documentation' | 'how-to-use') {
    this.activeTab = tab;
  }
}

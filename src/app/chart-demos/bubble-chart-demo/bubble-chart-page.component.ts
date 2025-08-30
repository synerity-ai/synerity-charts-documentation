import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BubbleChartDemoComponent } from './bubble-chart-demo.component';

@Component({
  selector: 'app-bubble-chart-page',
  standalone: false,
  templateUrl: './bubble-chart-page.component.html',
  styleUrls: ['./bubble-chart-page.component.scss']
})
export class BubbleChartPageComponent {
  activeTab: 'demo' | 'documentation' | 'how-to-use' = 'demo';

  setActiveTab(tab: 'demo' | 'documentation' | 'how-to-use') {
    this.activeTab = tab;
  }
}

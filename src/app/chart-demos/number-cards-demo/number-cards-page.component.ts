import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NumberCardsDemoComponent } from './number-cards-demo.component';

@Component({
  selector: 'app-number-cards-page',
  standalone: false,
  templateUrl: './number-cards-page.component.html',
  styleUrls: ['./number-cards-page.component.scss']
})
export class NumberCardsPageComponent {
  activeTab: 'demo' | 'documentation' | 'how-to-use' = 'demo';

  setActiveTab(tab: 'demo' | 'documentation' | 'how-to-use') {
    this.activeTab = tab;
  }
}

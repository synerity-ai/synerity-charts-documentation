import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  standalone: false,
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {
  isBasicChartsExpanded: boolean = true; // Start expanded by default

  toggleBasicCharts(): void {
    this.isBasicChartsExpanded = !this.isBasicChartsExpanded;
  }
}

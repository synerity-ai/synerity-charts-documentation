import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GaugeChartDemoComponent } from './gauge-chart-demo.component';

@Component({
  selector: 'app-gauge-chart-page',
  standalone: false,
  template: `
    <div class="min-h-screen bg-neutral-50">
      <div class="max-w-7xl mx-auto px-6 py-8">
        <!-- Header Section -->
        <div class="mb-8">
          <div class="flex items-center justify-between">
            <div>
              <h1 class="text-3xl font-bold text-neutral-900 mb-2">Gauge Chart</h1>
              <p class="text-lg text-neutral-600">
                Interactive gauge chart component with comprehensive customization options and real-time updates.
              </p>
            </div>
            <div class="flex items-center space-x-3">
              <span class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                Enhanced Gauge Chart
              </span>
            </div>
          </div>
        </div>

        <!-- Tab Navigation -->
        <div class="mb-8">
          <nav class="flex space-x-8 border-b border-neutral-200">
            <button
              (click)="setActiveTab('demo')"
              [class]="activeTab === 'demo' 
                ? 'border-b-2 border-blue-500 text-blue-600 px-1 py-4 text-sm font-medium' 
                : 'text-neutral-500 hover:text-neutral-700 hover:border-neutral-300 px-1 py-4 text-sm font-medium border-b-2 border-transparent'">
              Demo
            </button>
            <button
              (click)="setActiveTab('documentation')"
              [class]="activeTab === 'documentation' 
                ? 'border-b-2 border-blue-500 text-blue-600 px-1 py-4 text-sm font-medium' 
                : 'text-neutral-500 hover:text-neutral-700 hover:border-neutral-300 px-1 py-4 text-sm font-medium border-b-2 border-transparent'">
              Documentation
            </button>
            <button
              (click)="setActiveTab('how-to-use')"
              [class]="activeTab === 'how-to-use' 
                ? 'border-b-2 border-blue-500 text-blue-600 px-1 py-4 text-sm font-medium' 
                : 'text-neutral-500 hover:text-neutral-700 hover:border-neutral-300 px-1 py-4 text-sm font-medium border-b-2 border-transparent'">
              How To Use
            </button>
          </nav>
        </div>

        <!-- Tab Content -->
        <div class="tab-content">
          <!-- Demo Tab -->
          <div *ngIf="activeTab === 'demo'" class="animate-fade-in">
            <app-gauge-chart-demo></app-gauge-chart-demo>
          </div>

          <!-- Documentation Tab -->
          <div *ngIf="activeTab === 'documentation'" class="animate-fade-in">
            <div class="space-y-8">
              <!-- Overview Section -->
              <div class="bg-white rounded-lg border border-neutral-200 p-8">
                <div class="flex items-center mb-6">
                  <div class="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
                    <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
                    </svg>
                  </div>
                  <div>
                    <h2 class="text-2xl font-bold text-neutral-900">Gauge Chart Documentation</h2>
                    <p class="text-neutral-600 mt-1">Complete API reference and implementation guide</p>
                  </div>
                </div>

                <!-- Features Overview -->
                <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                  <div class="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-6">
                    <div class="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center mb-3">
                      <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                      </svg>
                    </div>
                    <h4 class="font-semibold text-neutral-900 mb-2">High Performance</h4>
                    <p class="text-sm text-neutral-600">Built with D3.js for smooth animations and efficient rendering of large datasets.</p>
                  </div>
                  
                  <div class="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-6">
                    <div class="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center mb-3">
                      <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 10h16M4 14h16M4 18h16"></path>
                      </svg>
                    </div>
                    <h4 class="font-semibold text-neutral-900 mb-2">Highly Customizable</h4>
                    <p class="text-sm text-neutral-600">Extensive configuration options for colors, animations, styling, and behavior.</p>
                  </div>
                  
                  <div class="bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg p-6">
                    <div class="w-8 h-8 bg-purple-500 rounded-lg flex items-center justify-center mb-3">
                      <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
                      </svg>
                    </div>
                    <h4 class="font-semibold text-neutral-900 mb-2">Type Safe</h4>
                    <p class="text-sm text-neutral-600">Full TypeScript support with comprehensive type definitions and IntelliSense.</p>
                  </div>
                </div>

                <!-- API Reference -->
                <div class="space-y-6">
                  <h3 class="text-xl font-semibold text-neutral-900">API Reference</h3>
                  
                  <div class="bg-neutral-50 rounded-lg p-6">
                    <h4 class="text-lg font-medium text-neutral-900 mb-4">Input Properties</h4>
                    <div class="space-y-4">
                      <div>
                        <code class="text-sm bg-neutral-200 px-2 py-1 rounded">data: GaugeChartData</code>
                        <p class="text-sm text-neutral-600 mt-1">Gauge data with value, min, max, and label</p>
                      </div>
                      <div>
                        <code class="text-sm bg-neutral-200 px-2 py-1 rounded">options: GaugeChartConfig</code>
                        <p class="text-sm text-neutral-600 mt-1">Configuration object for the gauge chart</p>
                      </div>
                    </div>
                  </div>

                  <div class="bg-neutral-50 rounded-lg p-6">
                    <h4 class="text-lg font-medium text-neutral-900 mb-4">Features</h4>
                    <div class="space-y-4">
                      <div>
                        <code class="text-sm bg-neutral-200 px-2 py-1 rounded">Multiple Types</code>
                        <p class="text-sm text-neutral-600 mt-1">Radial and linear gauge types</p>
                      </div>
                      <div>
                        <code class="text-sm bg-neutral-200 px-2 py-1 rounded">Real-time Updates</code>
                        <p class="text-sm text-neutral-600 mt-1">Dynamic value updates with smooth animations</p>
                      </div>
                      <div>
                        <code class="text-sm bg-neutral-200 px-2 py-1 rounded">Customizable Styling</code>
                        <p class="text-sm text-neutral-600 mt-1">Arc width, colors, and display options</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- How To Use Tab -->
          <div *ngIf="activeTab === 'how-to-use'" class="animate-fade-in">
            <div class="space-y-8">
              <div class="bg-white rounded-lg border border-neutral-200 p-8">
                <h2 class="text-2xl font-bold text-neutral-900 mb-6">How To Use Gauge Chart</h2>
                
                <div class="space-y-6">
                  <div>
                    <h3 class="text-lg font-semibold text-neutral-900 mb-3">1. Installation</h3>
                    <div class="bg-neutral-50 rounded-lg p-4">
                      <code class="text-sm">npm install synerity-charts</code>
                    </div>
                  </div>

                  <div>
                    <h3 class="text-lg font-semibold text-neutral-900 mb-3">2. Import Module</h3>
                    <div class="bg-neutral-50 rounded-lg p-4">
                      <p class="text-sm text-neutral-600">Import the GaugeChartModule in your Angular module.</p>
                    </div>
                  </div>

                  <div>
                    <h3 class="text-lg font-semibold text-neutral-900 mb-3">3. Basic Usage</h3>
                    <div class="bg-neutral-50 rounded-lg p-4">
                      <p class="text-sm text-neutral-600">Use the app-gauge-chart component with data and configuration.</p>
                    </div>
                  </div>

                  <div>
                    <h3 class="text-lg font-semibold text-neutral-900 mb-3">4. Configuration</h3>
                    <div class="bg-neutral-50 rounded-lg p-4">
                      <p class="text-sm text-neutral-600">Configure gauge type, value range, and styling options.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .animate-fade-in {
      animation: fadeIn 0.3s ease-in-out;
    }
    
    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(10px); }
      to { opacity: 1; transform: translateY(0); }
    }
  `]
})
export class GaugeChartPageComponent {
  activeTab: 'demo' | 'documentation' | 'how-to-use' = 'demo';

  setActiveTab(tab: 'demo' | 'documentation' | 'how-to-use') {
    this.activeTab = tab;
  }
}

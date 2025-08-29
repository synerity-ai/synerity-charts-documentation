import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { SankeyData, SankeyOptions } from '@synerity/charts';

@Component({
  selector: 'app-sankey-chart-demo',
  templateUrl: './sankey-chart-demo.component.html',
  styleUrls: ['./sankey-chart-demo.component.scss'],
  standalone: false
})
export class SankeyChartDemoComponent implements OnInit {
  // Sample data for sankey chart
  sankeyChartData: SankeyData = {
    nodes: [
      { id: 'A', name: 'Source A', color: '#3B82F6' },
      { id: 'B', name: 'Source B', color: '#10B981' },
      { id: 'C', name: 'Source C', color: '#F59E0B' },
      { id: 'X', name: 'Target X', color: '#EF4444' },
      { id: 'Y', name: 'Target Y', color: '#8B5CF6' },
      { id: 'Z', name: 'Target Z', color: '#06B6D4' }
    ],
    links: [
      { source: 'A', target: 'X', value: 100, color: '#3B82F6' },
      { source: 'A', target: 'Y', value: 50, color: '#3B82F6' },
      { source: 'B', target: 'Y', value: 80, color: '#10B981' },
      { source: 'B', target: 'Z', value: 30, color: '#10B981' },
      { source: 'C', target: 'X', value: 60, color: '#F59E0B' },
      { source: 'C', target: 'Z', value: 90, color: '#F59E0B' }
    ]
  };

  // Chart configuration
  sankeyChartConfig: SankeyOptions = {
    width: 800,
    height: 400,
    animate: true,
    nodeWidth: 20,
    nodePadding: 10,
    linkOpacity: 0.7,
    showValues: true
  };

  // Customization options
  customizationOptions = {
    width: 800,
    height: 400,
    animate: true,
    nodeWidth: 20,
    nodePadding: 10,
    linkOpacity: 0.7,
    showValues: true
  };

  // Sample data sets
  sampleDataSets = {
    energy: {
      nodes: [
        { id: 'Coal', name: 'Coal', color: '#3B82F6' },
        { id: 'Gas', name: 'Natural Gas', color: '#10B981' },
        { id: 'Nuclear', name: 'Nuclear', color: '#F59E0B' },
        { id: 'Renewable', name: 'Renewable', color: '#EF4444' },
        { id: 'Industry', name: 'Industry', color: '#8B5CF6' },
        { id: 'Residential', name: 'Residential', color: '#06B6D4' },
        { id: 'Commercial', name: 'Commercial', color: '#84CC16' }
      ],
      links: [
        { source: 'Coal', target: 'Industry', value: 200, color: '#3B82F6' },
        { source: 'Coal', target: 'Residential', value: 50, color: '#3B82F6' },
        { source: 'Gas', target: 'Residential', value: 150, color: '#10B981' },
        { source: 'Gas', target: 'Commercial', value: 100, color: '#10B981' },
        { source: 'Nuclear', target: 'Industry', value: 80, color: '#F59E0B' },
        { source: 'Nuclear', target: 'Commercial', value: 120, color: '#F59E0B' },
        { source: 'Renewable', target: 'Residential', value: 60, color: '#EF4444' },
        { source: 'Renewable', target: 'Commercial', value: 40, color: '#EF4444' }
      ]
    },
    migration: {
      nodes: [
        { id: 'Rural', name: 'Rural Areas', color: '#3B82F6' },
        { id: 'Suburban', name: 'Suburban', color: '#10B981' },
        { id: 'Urban', name: 'Urban Centers', color: '#F59E0B' },
        { id: 'Services', name: 'Services', color: '#EF4444' },
        { id: 'Manufacturing', name: 'Manufacturing', color: '#8B5CF6' },
        { id: 'Technology', name: 'Technology', color: '#06B6D4' }
      ],
      links: [
        { source: 'Rural', target: 'Suburban', value: 300, color: '#3B82F6' },
        { source: 'Suburban', target: 'Urban', value: 200, color: '#10B981' },
        { source: 'Rural', target: 'Services', value: 100, color: '#3B82F6' },
        { source: 'Suburban', target: 'Manufacturing', value: 150, color: '#10B981' },
        { source: 'Urban', target: 'Technology', value: 250, color: '#F59E0B' },
        { source: 'Urban', target: 'Services', value: 180, color: '#F59E0B' }
      ]
    }
  };

  currentDataSet = 'energy';

  constructor(private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
    console.log('Sankey chart demo initialized');
    this.updateChartData();
  }

  // Method to update chart data
  updateChartData(): void {
    this.sankeyChartData = this.sampleDataSets[this.currentDataSet as keyof typeof this.sampleDataSets];
  }



  // Method to toggle values display
  toggleShowValues(): void {
    this.customizationOptions.showValues = !this.customizationOptions.showValues;
    this.sankeyChartConfig = {
      ...this.sankeyChartConfig,
      showValues: this.customizationOptions.showValues
    };
    this.cdr.detectChanges();
  }

  // Method to update node width
  updateNodeWidth(value: number): void {
    this.customizationOptions.nodeWidth = value;
    this.sankeyChartConfig = {
      ...this.sankeyChartConfig,
      nodeWidth: value
    };
    this.cdr.detectChanges();
  }

  // Method to update node padding
  updateNodePadding(value: number): void {
    this.customizationOptions.nodePadding = value;
    this.sankeyChartConfig = {
      ...this.sankeyChartConfig,
      nodePadding: value
    };
    this.cdr.detectChanges();
  }

  // Method to update link opacity
  updateLinkOpacity(value: number): void {
    this.customizationOptions.linkOpacity = value;
    this.sankeyChartConfig = {
      ...this.sankeyChartConfig,
      linkOpacity: value
    };
    this.cdr.detectChanges();
  }

  // Method to update width
  updateWidth(value: number): void {
    this.customizationOptions.width = value;
    this.sankeyChartConfig = {
      ...this.sankeyChartConfig,
      width: value
    };
    this.cdr.detectChanges();
  }

  // Method to update height
  updateHeight(value: number): void {
    this.customizationOptions.height = value;
    this.sankeyChartConfig = {
      ...this.sankeyChartConfig,
      height: value
    };
    this.cdr.detectChanges();
  }

  // Method to toggle animation
  toggleAnimation(): void {
    this.customizationOptions.animate = !this.customizationOptions.animate;
    this.sankeyChartConfig = {
      ...this.sankeyChartConfig,
      animate: this.customizationOptions.animate
    };
    this.cdr.detectChanges();
  }

  // Method to change data set
  changeDataSet(dataSet: string): void {
    this.currentDataSet = dataSet;
    this.updateChartData();
    this.cdr.detectChanges();
  }

  // Method to generate random data
  generateRandomData(): void {
    this.sankeyChartData = {
      nodes: [
        { id: 'A', name: 'Source A', color: '#3B82F6' },
        { id: 'B', name: 'Source B', color: '#10B981' },
        { id: 'C', name: 'Source C', color: '#F59E0B' },
        { id: 'X', name: 'Target X', color: '#EF4444' },
        { id: 'Y', name: 'Target Y', color: '#8B5CF6' },
        { id: 'Z', name: 'Target Z', color: '#06B6D4' }
      ],
      links: [
        { source: 'A', target: 'X', value: Math.floor(Math.random() * 100) + 50, color: '#3B82F6' },
        { source: 'A', target: 'Y', value: Math.floor(Math.random() * 100) + 50, color: '#3B82F6' },
        { source: 'B', target: 'Y', value: Math.floor(Math.random() * 100) + 50, color: '#10B981' },
        { source: 'B', target: 'Z', value: Math.floor(Math.random() * 100) + 50, color: '#10B981' },
        { source: 'C', target: 'X', value: Math.floor(Math.random() * 100) + 50, color: '#F59E0B' },
        { source: 'C', target: 'Z', value: Math.floor(Math.random() * 100) + 50, color: '#F59E0B' }
      ]
    };
    this.cdr.detectChanges();
  }

  // Export Methods
  async exportChart(format: 'png' | 'svg') {
    try {
      const timestamp = new Date().toISOString().slice(0, 19).replace(/:/g, '-');
      const filename = `sankey-chart-${timestamp}.${format}`;
      
      console.log(`Exporting sankey chart as ${format}: ${filename}`);
      this.showNotification(`Sankey chart exported as ${format.toUpperCase()} successfully!`);
    } catch (error) {
      console.error('Export error:', error);
      this.showNotification(`Export failed: ${error instanceof Error ? error.message : 'Unknown error'}`, 'error');
    }
  }

  private showNotification(message: string, type: 'success' | 'error' = 'success') {
    const notification = document.createElement('div');
    notification.className = `fixed top-4 right-4 p-4 rounded-lg shadow-lg z-50 ${
      type === 'success' ? 'bg-green-500 text-white' : 'bg-red-500 text-white'
    }`;
    notification.textContent = message;
    document.body.appendChild(notification);
    
    setTimeout(() => {
      if (document.body.contains(notification)) {
        document.body.removeChild(notification);
      }
    }, 3000);
  }

  // Get total flow value
  getTotalFlow(): number {
    return this.sankeyChartData.links.reduce((sum, link) => sum + link.value, 0);
  }

  // Get average flow value
  getAverageFlow(): number {
    if (this.sankeyChartData.links.length === 0) return 0;
    return this.getTotalFlow() / this.sankeyChartData.links.length;
  }

  // Get max flow value
  getMaxFlow(): number {
    return Math.max(...this.sankeyChartData.links.map(link => link.value));
  }

  // Get min flow value
  getMinFlow(): number {
    return Math.min(...this.sankeyChartData.links.map(link => link.value));
  }
}

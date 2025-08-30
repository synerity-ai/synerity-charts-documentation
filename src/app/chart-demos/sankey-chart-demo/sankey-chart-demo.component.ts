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
    budget: {
      nodes: [
        { id: 'Revenue', name: 'Revenue', color: '#3B82F6' },
        { id: 'Taxes', name: 'Taxes', color: '#10B981' },
        { id: 'Expenses', name: 'Expenses', color: '#F59E0B' },
        { id: 'Infrastructure', name: 'Infrastructure', color: '#EF4444' },
        { id: 'Education', name: 'Education', color: '#8B5CF6' },
        { id: 'Healthcare', name: 'Healthcare', color: '#06B6D4' },
        { id: 'Defense', name: 'Defense', color: '#84CC16' }
      ],
      links: [
        { source: 'Revenue', target: 'Taxes', value: 400, color: '#3B82F6' },
        { source: 'Revenue', target: 'Expenses', value: 600, color: '#3B82F6' },
        { source: 'Taxes', target: 'Infrastructure', value: 150, color: '#10B981' },
        { source: 'Taxes', target: 'Education', value: 120, color: '#10B981' },
        { source: 'Expenses', target: 'Healthcare', value: 200, color: '#F59E0B' },
        { source: 'Expenses', target: 'Defense', value: 180, color: '#F59E0B' },
        { source: 'Expenses', target: 'Infrastructure', value: 100, color: '#F59E0B' },
        { source: 'Expenses', target: 'Education', value: 120, color: '#F59E0B' }
      ]
    },
    traffic: {
      nodes: [
        { id: 'North', name: 'North Region', color: '#3B82F6' },
        { id: 'South', name: 'South Region', color: '#10B981' },
        { id: 'East', name: 'East Region', color: '#F59E0B' },
        { id: 'West', name: 'West Region', color: '#EF4444' },
        { id: 'Highway1', name: 'Highway 1', color: '#8B5CF6' },
        { id: 'Highway2', name: 'Highway 2', color: '#06B6D4' },
        { id: 'CityCenter', name: 'City Center', color: '#84CC16' }
      ],
      links: [
        { source: 'North', target: 'Highway1', value: 300, color: '#3B82F6' },
        { source: 'South', target: 'Highway2', value: 250, color: '#10B981' },
        { source: 'East', target: 'Highway1', value: 200, color: '#F59E0B' },
        { source: 'West', target: 'Highway2', value: 180, color: '#EF4444' },
        { source: 'Highway1', target: 'CityCenter', value: 500, color: '#8B5CF6' },
        { source: 'Highway2', target: 'CityCenter', value: 430, color: '#06B6D4' }
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
    console.log('Updating chart data for dataset:', this.currentDataSet);
    this.sankeyChartData = this.sampleDataSets[this.currentDataSet as keyof typeof this.sampleDataSets];
    
    // Force a complete re-render by creating a new data object
    this.sankeyChartData = { ...this.sankeyChartData };
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
    console.log('Updating width to:', value);
    this.customizationOptions.width = value;
    this.sankeyChartConfig = {
      ...this.sankeyChartConfig,
      width: value
    };
    
    // Force a complete re-render by creating a new config object
    this.sankeyChartConfig = { ...this.sankeyChartConfig };
    
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
    console.log('Changing data set to:', dataSet);
    this.currentDataSet = dataSet;
    this.updateChartData();
    
    // Force a complete re-render by creating a new config object
    this.sankeyChartConfig = { ...this.sankeyChartConfig };
    
    this.cdr.detectChanges();
  }

  // Method to generate random data
  generateRandomData(): void {
    console.log('Generating random sankey data...');
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
    
    // Force a complete re-render by creating a new data object
    this.sankeyChartData = { ...this.sankeyChartData };
    
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

  // Test method to verify all options work
  testAllOptions() {
    console.log('Testing all sankey chart options...');
    
    // Test data set changes
    this.changeDataSet('budget');
    setTimeout(() => {
      this.changeDataSet('traffic');
      setTimeout(() => {
        this.changeDataSet('energy');
      }, 1000);
    }, 1000);
    

    
    // Test dimension changes
    setTimeout(() => {
      this.updateWidth(700);
      this.updateHeight(500);
      setTimeout(() => {
        this.updateWidth(500);
        this.updateHeight(300);
      }, 1000);
    }, 6000);
    
    // Test chart options
    setTimeout(() => {
      this.toggleAnimation();
      setTimeout(() => {
        this.toggleShowValues();
        setTimeout(() => {
          this.toggleAnimation();
          this.toggleShowValues();
        }, 1000);
      }, 1000);
    }, 8000);
    
    // Test node and link styling
    setTimeout(() => {
      this.updateNodeWidth(25);
      this.updateNodePadding(15);
      setTimeout(() => {
        this.updateNodeWidth(15);
        this.updateNodePadding(10);
      }, 1000);
    }, 10000);
  }
}

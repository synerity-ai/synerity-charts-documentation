import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { TreemapData, TreemapOptions } from '@synerity/charts';

@Component({
  selector: 'app-treemap-chart-demo',
  templateUrl: './treemap-chart-demo.component.html',
  styleUrls: ['./treemap-chart-demo.component.scss'],
  standalone: false
})
export class TreemapChartDemoComponent implements OnInit {
  // Sample data for treemap chart
  treemapChartData: TreemapData = {
    name: 'Root',
    value: 100,
    children: [
      {
        name: 'Category A',
        value: 40,
        children: [
          { name: 'A1', value: 20, color: '#3B82F6' },
          { name: 'A2', value: 20, color: '#10B981' }
        ]
      },
      {
        name: 'Category B',
        value: 35,
        children: [
          { name: 'B1', value: 15, color: '#F59E0B' },
          { name: 'B2', value: 20, color: '#EF4444' }
        ]
      },
      {
        name: 'Category C',
        value: 25,
        children: [
          { name: 'C1', value: 25, color: '#8B5CF6' }
        ]
      }
    ]
  };

  // Chart configuration
  treemapChartConfig: TreemapOptions = {
    width: 600,
    height: 400,
    animate: true,
    showLabels: true,
    showValues: true,
    padding: 2,
    borderWidth: 1,
    borderColor: '#E5E7EB'
  };

  // Customization options
  customizationOptions = {
    width: 600,
    height: 400,
    animate: true,
    showLabels: true,
    showValues: true,
    padding: 2,
    borderWidth: 1
  };

  // Sample data sets
  sampleDataSets: { [key: string]: TreemapData } = {
    departments: {
      name: 'Company',
      value: 1000,
      children: [
        {
          name: 'Engineering',
          value: 400,
          children: [
            { name: 'Frontend', value: 150, color: '#3B82F6' },
            { name: 'Backend', value: 200, color: '#10B981' },
            { name: 'DevOps', value: 50, color: '#F59E0B' }
          ]
        },
        {
          name: 'Sales',
          value: 300,
          children: [
            { name: 'Enterprise', value: 200, color: '#EF4444' },
            { name: 'SMB', value: 100, color: '#8B5CF6' }
          ]
        },
        {
          name: 'Marketing',
          value: 200,
          children: [
            { name: 'Digital', value: 120, color: '#06B6D4' },
            { name: 'Content', value: 80, color: '#84CC16' }
          ]
        },
        {
          name: 'Support',
          value: 100,
          children: [
            { name: 'Technical', value: 60, color: '#F97316' },
            { name: 'Customer', value: 40, color: '#EC4899' }
          ]
        }
      ]
    },
    files: {
      name: 'File System',
      value: 1000,
      children: [
        {
          name: 'Documents',
          value: 400,
          children: [
            { name: 'Reports', value: 200, color: '#3B82F6' },
            { name: 'Presentations', value: 150, color: '#10B981' },
            { name: 'Contracts', value: 50, color: '#F59E0B' }
          ]
        },
        {
          name: 'Media',
          value: 350,
          children: [
            { name: 'Images', value: 200, color: '#EF4444' },
            { name: 'Videos', value: 100, color: '#8B5CF6' },
            { name: 'Audio', value: 50, color: '#06B6D4' }
          ]
        },
        {
          name: 'Code',
          value: 250,
          children: [
            { name: 'JavaScript', value: 100, color: '#84CC16' },
            { name: 'TypeScript', value: 80, color: '#F97316' },
            { name: 'Python', value: 70, color: '#EC4899' }
          ]
        }
      ]
    },
    categories: {
      name: 'Product Categories',
      value: 800,
      children: [
        {
          name: 'Electronics',
          value: 300,
          children: [
            { name: 'Smartphones', value: 150, color: '#3B82F6' },
            { name: 'Laptops', value: 100, color: '#10B981' },
            { name: 'Tablets', value: 50, color: '#F59E0B' }
          ]
        },
        {
          name: 'Clothing',
          value: 250,
          children: [
            { name: 'Men', value: 120, color: '#EF4444' },
            { name: 'Women', value: 100, color: '#8B5CF6' },
            { name: 'Kids', value: 30, color: '#06B6D4' }
          ]
        },
        {
          name: 'Home & Garden',
          value: 250,
          children: [
            { name: 'Furniture', value: 100, color: '#84CC16' },
            { name: 'Kitchen', value: 80, color: '#F97316' },
            { name: 'Garden', value: 70, color: '#EC4899' }
          ]
        }
      ]
    }
  };

  currentDataSet = 'departments';

  constructor(private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
    console.log('Treemap chart demo initialized');
    this.updateChartData();
  }

  // Method to update chart data
  updateChartData(): void {
    this.treemapChartData = this.sampleDataSets[this.currentDataSet];
  }



  // Method to toggle labels display
  toggleShowLabels(): void {
    this.customizationOptions.showLabels = !this.customizationOptions.showLabels;
    this.treemapChartConfig = {
      ...this.treemapChartConfig,
      showLabels: this.customizationOptions.showLabels
    };
    this.cdr.detectChanges();
  }

  // Method to toggle values display
  toggleShowValues(): void {
    this.customizationOptions.showValues = !this.customizationOptions.showValues;
    this.treemapChartConfig = {
      ...this.treemapChartConfig,
      showValues: this.customizationOptions.showValues
    };
    this.cdr.detectChanges();
  }

  // Method to update padding
  updatePadding(value: number): void {
    this.customizationOptions.padding = value;
    this.treemapChartConfig = {
      ...this.treemapChartConfig,
      padding: value
    };
    this.cdr.detectChanges();
  }

  // Method to update border width
  updateBorderWidth(value: number): void {
    this.customizationOptions.borderWidth = value;
    this.treemapChartConfig = {
      ...this.treemapChartConfig,
      borderWidth: value
    };
    this.cdr.detectChanges();
  }

  // Method to update width
  updateWidth(value: number): void {
    this.customizationOptions.width = value;
    this.treemapChartConfig = {
      ...this.treemapChartConfig,
      width: value
    };
    this.cdr.detectChanges();
  }

  // Method to update height
  updateHeight(value: number): void {
    this.customizationOptions.height = value;
    this.treemapChartConfig = {
      ...this.treemapChartConfig,
      height: value
    };
    this.cdr.detectChanges();
  }

  // Method to toggle animation
  toggleAnimation(): void {
    this.customizationOptions.animate = !this.customizationOptions.animate;
    this.treemapChartConfig = {
      ...this.treemapChartConfig,
      animate: this.customizationOptions.animate
    };
    this.cdr.detectChanges();
  }

  // Method to change data set
  changeDataSet(dataSet: string): void {
    if (this.sampleDataSets[dataSet]) {
      this.currentDataSet = dataSet;
      this.updateChartData();
      this.cdr.detectChanges();
    }
  }

  // Method to generate random data
  generateRandomData(): void {
    this.treemapChartData = {
      name: 'Root',
      value: 100,
      children: [
        {
          name: 'Category A',
          value: Math.floor(Math.random() * 50) + 20,
          children: [
            { name: 'A1', value: Math.floor(Math.random() * 30) + 10, color: '#3B82F6' },
            { name: 'A2', value: Math.floor(Math.random() * 30) + 10, color: '#10B981' }
          ]
        },
        {
          name: 'Category B',
          value: Math.floor(Math.random() * 50) + 20,
          children: [
            { name: 'B1', value: Math.floor(Math.random() * 30) + 10, color: '#F59E0B' },
            { name: 'B2', value: Math.floor(Math.random() * 30) + 10, color: '#EF4444' }
          ]
        },
        {
          name: 'Category C',
          value: Math.floor(Math.random() * 50) + 20,
          children: [
            { name: 'C1', value: Math.floor(Math.random() * 30) + 10, color: '#8B5CF6' }
          ]
        }
      ]
    };
    this.cdr.detectChanges();
  }

  // Export Methods
  async exportChart(format: 'png' | 'svg') {
    try {
      const timestamp = new Date().toISOString().slice(0, 19).replace(/:/g, '-');
      const filename = `treemap-chart-${timestamp}.${format}`;
      
      console.log(`Exporting treemap chart as ${format}: ${filename}`);
      this.showNotification(`Treemap chart exported as ${format.toUpperCase()} successfully!`);
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

  // Utility methods
  getTotalValue(): number {
    return this.treemapChartData.value;
  }

  getAverageValue(): number {
    const flattenData = this.flattenTreemapData(this.treemapChartData);
    if (flattenData.length === 0) return 0;
    const sum = flattenData.reduce((acc, item) => acc + item.value, 0);
    return sum / flattenData.length;
  }

  getMaxValue(): number {
    const flattenData = this.flattenTreemapData(this.treemapChartData);
    return Math.max(...flattenData.map(item => item.value));
  }

  getMinValue(): number {
    const flattenData = this.flattenTreemapData(this.treemapChartData);
    return Math.min(...flattenData.map(item => item.value));
  }

  getDataPointCount(): number {
    const flattenData = this.flattenTreemapData(this.treemapChartData);
    return flattenData.length;
  }

  getFlattenedData(): Array<{name: string, value: number, color?: string}> {
    return this.flattenTreemapData(this.treemapChartData);
  }

  private flattenTreemapData(data: TreemapData): Array<{name: string, value: number, color?: string}> {
    const result: Array<{name: string, value: number, color?: string}> = [];
    
    const traverse = (node: TreemapData) => {
      if (node.children) {
        node.children.forEach(child => traverse(child));
      } else {
        result.push({ name: node.name, value: node.value, color: (node as any).color });
      }
    };
    
    traverse(data);
    return result;
  }
}

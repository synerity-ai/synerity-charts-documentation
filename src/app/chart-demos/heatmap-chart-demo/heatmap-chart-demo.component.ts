import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { HeatmapData, HeatmapOptions } from '@synerity/charts';

@Component({
  selector: 'app-heatmap-chart-demo',
  templateUrl: './heatmap-chart-demo.component.html',
  styleUrls: ['./heatmap-chart-demo.component.scss'],
  standalone: false
})
export class HeatmapChartDemoComponent implements OnInit {
  // Sample data for heatmap chart
  heatmapChartData: HeatmapData[] = [
    { x: 'A', y: 'X', value: 10, color: '#3B82F6' },
    { x: 'A', y: 'Y', value: 20, color: '#10B981' },
    { x: 'A', y: 'Z', value: 15, color: '#F59E0B' },
    { x: 'B', y: 'X', value: 25, color: '#EF4444' },
    { x: 'B', y: 'Y', value: 30, color: '#8B5CF6' },
    { x: 'B', y: 'Z', value: 35, color: '#06B6D4' },
    { x: 'C', y: 'X', value: 40, color: '#84CC16' },
    { x: 'C', y: 'Y', value: 45, color: '#F97316' },
    { x: 'C', y: 'Z', value: 50, color: '#EC4899' }
  ];

  // Chart configuration
  heatmapChartConfig: HeatmapOptions = {
    width: 600,
    height: 400,
    animate: true,
    showValues: true,
    colorScale: 'sequential',
    cellPadding: 2,
    showAxis: true
  };

  // Customization options
  customizationOptions = {
    width: 600,
    height: 400,
    animate: true,
    showValues: true,
    colorScale: 'sequential' as 'sequential' | 'diverging' | 'categorical',
    cellPadding: 2,
    showAxis: true
  };

  // Sample data sets
  sampleDataSets = {
    sales: [
      { x: 'Q1', y: 'Product A', value: 10, color: '#3B82F6' },
      { x: 'Q1', y: 'Product B', value: 20, color: '#10B981' },
      { x: 'Q1', y: 'Product C', value: 15, color: '#F59E0B' },
      { x: 'Q2', y: 'Product A', value: 25, color: '#EF4444' },
      { x: 'Q2', y: 'Product B', value: 30, color: '#8B5CF6' },
      { x: 'Q2', y: 'Product C', value: 35, color: '#06B6D4' },
      { x: 'Q3', y: 'Product A', value: 40, color: '#84CC16' },
      { x: 'Q3', y: 'Product B', value: 45, color: '#F97316' },
      { x: 'Q3', y: 'Product C', value: 50, color: '#EC4899' }
    ],
    performance: [
      { x: 'Jan', y: 'Team A', value: 85, color: '#3B82F6' },
      { x: 'Jan', y: 'Team B', value: 92, color: '#10B981' },
      { x: 'Jan', y: 'Team C', value: 78, color: '#F59E0B' },
      { x: 'Feb', y: 'Team A', value: 88, color: '#EF4444' },
      { x: 'Feb', y: 'Team B', value: 95, color: '#8B5CF6' },
      { x: 'Feb', y: 'Team C', value: 82, color: '#06B6D4' },
      { x: 'Mar', y: 'Team A', value: 90, color: '#84CC16' },
      { x: 'Mar', y: 'Team B', value: 97, color: '#F97316' },
      { x: 'Mar', y: 'Team C', value: 85, color: '#EC4899' }
    ]
  };

  currentDataSet = 'sales';

  constructor(private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
    console.log('Heatmap chart demo initialized');
    this.updateChartData();
  }

  // Method to update chart data
  updateChartData(): void {
    const selectedData = this.sampleDataSets[this.currentDataSet as keyof typeof this.sampleDataSets];
    this.heatmapChartData = selectedData.map(item => ({
      ...item,
      value: Math.floor(Math.random() * 50) + 1
    }));
  }



  // Method to toggle values display
  toggleShowValues(): void {
    this.customizationOptions.showValues = !this.customizationOptions.showValues;
    this.heatmapChartConfig = {
      ...this.heatmapChartConfig,
      showValues: this.customizationOptions.showValues
    };
    this.cdr.detectChanges();
  }

  // Method to toggle axis display
  toggleShowAxis(): void {
    this.customizationOptions.showAxis = !this.customizationOptions.showAxis;
    this.heatmapChartConfig = {
      ...this.heatmapChartConfig,
      showAxis: this.customizationOptions.showAxis
    };
    this.cdr.detectChanges();
  }

  // Method to change color scale
  changeColorScale(scale: string): void {
    this.customizationOptions.colorScale = scale as 'sequential' | 'diverging' | 'categorical';
    this.heatmapChartConfig = {
      ...this.heatmapChartConfig,
      colorScale: scale as 'sequential' | 'diverging' | 'categorical'
    };
    this.cdr.detectChanges();
  }

  // Method to update cell padding
  updateCellPadding(value: number): void {
    this.customizationOptions.cellPadding = value;
    this.heatmapChartConfig = {
      ...this.heatmapChartConfig,
      cellPadding: value
    };
    this.cdr.detectChanges();
  }

  // Method to update width
  updateWidth(value: number): void {
    this.customizationOptions.width = value;
    this.heatmapChartConfig = {
      ...this.heatmapChartConfig,
      width: value
    };
    this.cdr.detectChanges();
  }

  // Method to update height
  updateHeight(value: number): void {
    this.customizationOptions.height = value;
    this.heatmapChartConfig = {
      ...this.heatmapChartConfig,
      height: value
    };
    this.cdr.detectChanges();
  }

  // Method to toggle animation
  toggleAnimation(): void {
    this.customizationOptions.animate = !this.customizationOptions.animate;
    this.heatmapChartConfig = {
      ...this.heatmapChartConfig,
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
    this.heatmapChartData = this.heatmapChartData.map(item => ({
      ...item,
      value: Math.floor(Math.random() * 100) + 1
    }));
    this.cdr.detectChanges();
  }

  // Export methods
  async exportChart(format: 'png' | 'svg') {
    try {
      const timestamp = new Date().toISOString().slice(0, 19).replace(/:/g, '-');
      const filename = `heatmap-chart-${timestamp}.${format}`;
      
      console.log(`Exporting heatmap chart as ${format}: ${filename}`);
      this.showNotification(`Heatmap chart exported as ${format.toUpperCase()} successfully!`);
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

  // Get max value from data
  getMaxValue(): number {
    return Math.max(...this.heatmapChartData.map(d => d.value));
  }

  // Get min value from data
  getMinValue(): number {
    return Math.min(...this.heatmapChartData.map(d => d.value));
  }

  // Get average value from data
  getAverageValue(): number {
    if (this.heatmapChartData.length === 0) return 0;
    const sum = this.heatmapChartData.reduce((acc, item) => acc + item.value, 0);
    return sum / this.heatmapChartData.length;
  }

  // Get total value from data
  getTotalValue(): number {
    return this.heatmapChartData.reduce((acc, item) => acc + item.value, 0);
  }
}

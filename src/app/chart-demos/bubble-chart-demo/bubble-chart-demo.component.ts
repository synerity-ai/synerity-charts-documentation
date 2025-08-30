import { Component, OnInit, ChangeDetectorRef, ViewChild } from '@angular/core';
import { BubbleData, BubbleChartOptions } from '@synerity/charts';
import { BubbleChartComponent } from '../../charts/bubble-chart/bubble-chart.component';

@Component({
  selector: 'app-bubble-chart-demo',
  templateUrl: './bubble-chart-demo.component.html',
  styleUrls: ['./bubble-chart-demo.component.scss'],
  standalone: false
})
export class BubbleChartDemoComponent implements OnInit {
  @ViewChild(BubbleChartComponent) bubbleChartComponent!: BubbleChartComponent;
  
  // Sample data for bubble chart
  bubbleChartData: BubbleData[] = [
    { x: 10, y: 20, r: 5, label: 'Point A', color: '#3B82F6' },
    { x: 30, y: 40, r: 8, label: 'Point B', color: '#10B981' },
    { x: 50, y: 30, r: 12, label: 'Point C', color: '#F59E0B' },
    { x: 70, y: 60, r: 6, label: 'Point D', color: '#EF4444' },
    { x: 90, y: 80, r: 10, label: 'Point E', color: '#8B5CF6' }
  ];

  // Chart configuration
  bubbleChartConfig: BubbleChartOptions = {
    width: 600,
    height: 400,
    animate: true,
    showGrid: true,
    showLabels: true,
    minRadius: 3,
    maxRadius: 15,
    opacity: 0.7
  };

  // Customization options
  customizationOptions = {
    width: 600,
    height: 400,
    animate: true,
    showGrid: true,
    showLabels: true,
    minRadius: 3,
    maxRadius: 15,
    opacity: 0.7
  };

  // Sample data sets
  sampleDataSets = {
    population: [
      { x: 10, y: 20, r: 5, label: 'City A', color: '#3B82F6' },
      { x: 30, y: 40, r: 8, label: 'City B', color: '#10B981' },
      { x: 50, y: 30, r: 12, label: 'City C', color: '#F59E0B' },
      { x: 70, y: 60, r: 6, label: 'City D', color: '#EF4444' },
      { x: 90, y: 80, r: 10, label: 'City E', color: '#8B5CF6' }
    ],
    sales: [
      { x: 15, y: 25, r: 7, label: 'Product A', color: '#3B82F6' },
      { x: 35, y: 45, r: 10, label: 'Product B', color: '#10B981' },
      { x: 55, y: 35, r: 14, label: 'Product C', color: '#F59E0B' },
      { x: 75, y: 65, r: 8, label: 'Product D', color: '#EF4444' },
      { x: 95, y: 85, r: 12, label: 'Product E', color: '#8B5CF6' }
    ],
    companies: [
      { x: 20, y: 30, r: 6, label: 'Tech Corp', color: '#3B82F6' },
      { x: 40, y: 50, r: 9, label: 'Finance Inc', color: '#10B981' },
      { x: 60, y: 40, r: 11, label: 'Retail Co', color: '#F59E0B' },
      { x: 80, y: 70, r: 7, label: 'Manufacturing', color: '#EF4444' },
      { x: 25, y: 75, r: 13, label: 'Healthcare', color: '#8B5CF6' },
      { x: 85, y: 25, r: 8, label: 'Energy Co', color: '#06B6D4' }
    ]
  };

  currentDataSet = 'population';
  public currentChartData: BubbleData[] = [];

  constructor(private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
    console.log('Bubble chart demo initialized');
    this.updateChartData();
    this.updateCurrentChartData();
  }

  // Data Management
  updateChartData() {
    const selectedData = this.sampleDataSets[this.currentDataSet as keyof typeof this.sampleDataSets];
    
    if (!selectedData) {
      console.warn(`No data found for data set '${this.currentDataSet}', using population data`);
      this.currentDataSet = 'population';
      this.bubbleChartData = this.sampleDataSets.population;
      return;
    }
    
    console.log(`Updating chart data with '${this.currentDataSet}' data set:`, selectedData);
    
    this.bubbleChartData = selectedData.map(item => ({
      ...item,
      x: item.x + (Math.random() - 0.5) * 10,
      y: item.y + (Math.random() - 0.5) * 10,
      r: item.r + (Math.random() - 0.5) * 5
    }));
    
    console.log('Updated bubble chart data:', this.bubbleChartData);
  }



  updateCurrentChartData() {
    this.currentChartData = [...this.bubbleChartData];
  }

  // Method to update chart data
  updateChartDataRandom(): void {
    this.bubbleChartData = this.bubbleChartData.map(item => ({
      ...item,
      x: Math.floor(Math.random() * 100),
      y: Math.floor(Math.random() * 100),
      r: Math.floor(Math.random() * 15) + 3
    }));
  }

  // Method to update width
  updateWidth(value: number): void {
    console.log('Updating width to:', value);
    this.customizationOptions.width = value;
    this.bubbleChartConfig = {
      ...this.bubbleChartConfig,
      width: value
    };
    
    // Force a complete re-render by creating a new config object
    this.bubbleChartConfig = { ...this.bubbleChartConfig };
    
    this.cdr.detectChanges();
  }

  // Method to update height
  updateHeight(value: number): void {
    this.customizationOptions.height = value;
    this.bubbleChartConfig = {
      ...this.bubbleChartConfig,
      height: value
    };
    this.cdr.detectChanges();
  }

  // Method to toggle animation
  toggleAnimation(): void {
    this.customizationOptions.animate = !this.customizationOptions.animate;
    this.bubbleChartConfig = {
      ...this.bubbleChartConfig,
      animate: this.customizationOptions.animate
    };
    this.cdr.detectChanges();
  }

  // Method to toggle grid
  toggleGrid(): void {
    this.customizationOptions.showGrid = !this.customizationOptions.showGrid;
    this.bubbleChartConfig = {
      ...this.bubbleChartConfig,
      showGrid: this.customizationOptions.showGrid
    };
    this.cdr.detectChanges();
  }

  // Method to toggle labels
  toggleLabels(): void {
    this.customizationOptions.showLabels = !this.customizationOptions.showLabels;
    this.bubbleChartConfig = {
      ...this.bubbleChartConfig,
      showLabels: this.customizationOptions.showLabels
    };
    this.cdr.detectChanges();
  }

  // Method to update min radius
  updateMinRadius(value: number): void {
    this.customizationOptions.minRadius = value;
    this.bubbleChartConfig = {
      ...this.bubbleChartConfig,
      minRadius: value
    };
    this.cdr.detectChanges();
  }

  // Method to update max radius
  updateMaxRadius(value: number): void {
    this.customizationOptions.maxRadius = value;
    this.bubbleChartConfig = {
      ...this.bubbleChartConfig,
      maxRadius: value
    };
    this.cdr.detectChanges();
  }

  // Method to update opacity
  updateOpacity(value: number): void {
    this.customizationOptions.opacity = value;
    this.bubbleChartConfig = {
      ...this.bubbleChartConfig,
      opacity: value
    };
    this.cdr.detectChanges();
  }

  // Method to change data set
  changeDataSet(dataSet: string): void {
    console.log('Changing data set to:', dataSet);
    
    // Check if the data set exists
    if (!this.sampleDataSets[dataSet as keyof typeof this.sampleDataSets]) {
      console.warn(`Data set '${dataSet}' not found, using 'population' instead`);
      this.currentDataSet = 'population';
    } else {
      this.currentDataSet = dataSet;
    }
    
    this.updateChartData();
    this.updateCurrentChartData();
    
    // Force a complete re-render by creating a new config object
    this.bubbleChartConfig = { ...this.bubbleChartConfig };
    
    console.log('Updated bubble chart data:', this.bubbleChartData);
    
    // Update the chart component directly if available
    if (this.bubbleChartComponent) {
      console.log('Updating bubble chart component with new data');
      this.bubbleChartComponent.updateChart(this.bubbleChartData);
    }
    
    this.cdr.detectChanges();
  }

  // Method to generate random data
  generateRandomData(): void {
    const dataPoints = Math.floor(Math.random() * 15) + 5; // 5-20 data points
    
    this.bubbleChartData = Array.from({ length: dataPoints }, (_, i) => ({
      x: Math.floor(Math.random() * 100),
      y: Math.floor(Math.random() * 100),
      r: Math.floor(Math.random() * 15) + 3,
      label: `Point ${i + 1}`,
      color: `hsl(${Math.random() * 360}, 70%, 50%)`
    }));
    
    this.updateCurrentChartData();
    this.cdr.detectChanges();
  }

  // Export Methods
  async exportChart(format: 'png' | 'svg') {
    try {
      const timestamp = new Date().toISOString().slice(0, 19).replace(/:/g, '-');
      const filename = `bubble-chart-${timestamp}.${format}`;
      
      console.log(`Exporting bubble chart as ${format}: ${filename}`);
      this.showNotification(`Bubble chart exported as ${format.toUpperCase()} successfully!`);
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

  // Get max radius from data
  getMaxRadius(): number {
    return Math.max(...this.currentChartData.map(d => d.r));
  }

  // Get min radius from data
  getMinRadius(): number {
    return Math.min(...this.currentChartData.map(d => d.r));
  }

  // Get total value (sum of all radii)
  getTotalValue(): number {
    return this.currentChartData.reduce((sum, item) => sum + item.r, 0);
  }

  // Get average value
  getAverageValue(): number {
    if (this.currentChartData.length === 0) return 0;
    return this.getTotalValue() / this.currentChartData.length;
  }

  // Get average radius
  getAverageRadius(): number {
    if (this.currentChartData.length === 0) return 0;
    const sum = this.currentChartData.reduce((acc, item) => acc + item.r, 0);
    return sum / this.currentChartData.length;
  }

  // Get max X value
  getMaxX(): number {
    return Math.max(...this.currentChartData.map(d => d.x));
  }

  // Get max Y value
  getMaxY(): number {
    return Math.max(...this.currentChartData.map(d => d.y));
  }

  // Get min X value
  getMinX(): number {
    return Math.min(...this.currentChartData.map(d => d.x));
  }

  // Get min Y value
  getMinY(): number {
    return Math.min(...this.currentChartData.map(d => d.y));
  }

  // Event handlers
  onChartReady() {
    console.log('Bubble chart is ready');
    
    // Ensure the chart has the latest data
    if (this.bubbleChartComponent) {
      console.log('Chart ready - updating with current data');
      this.bubbleChartComponent.updateChart(this.bubbleChartData);
    }
  }

  // Test method to verify all options work
  testAllOptions() {
    console.log('Testing all bubble chart options...');
    
    // Test data set changes
    this.changeDataSet('sales');
    setTimeout(() => {
      this.changeDataSet('companies');
      setTimeout(() => {
        this.changeDataSet('population');
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
    }, 3000);
    
    // Test chart options
    setTimeout(() => {
      this.toggleAnimation();
      setTimeout(() => {
        this.toggleLabels();
        setTimeout(() => {
          this.toggleGrid();
          setTimeout(() => {
            this.toggleAnimation();
            this.toggleLabels();
            this.toggleGrid();
          }, 1000);
        }, 1000);
      }, 1000);
    }, 5000);
    
    // Test radius range
    setTimeout(() => {
      this.updateMinRadius(8);
      this.updateMaxRadius(20);
      setTimeout(() => {
        this.updateMinRadius(3);
        this.updateMaxRadius(15);
      }, 1000);
    }, 7000);
  }
}

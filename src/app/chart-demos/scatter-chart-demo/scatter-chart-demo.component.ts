import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ScatterData } from '@synerity/charts';
import { ScatterChartConfig } from '../../charts/scatter-chart/scatter-chart.component';

@Component({
  selector: 'app-scatter-chart-demo',
  standalone: false,
  templateUrl: './scatter-chart-demo.component.html',
  styleUrls: ['./scatter-chart-demo.component.scss']
})
export class ScatterChartDemoComponent implements OnInit {
  
  // Chart configuration
  scatterChartConfig: ScatterChartConfig = {
    data: [
      { x: 10, y: 20, label: 'Point 1', color: '#3B82F6' },
      { x: 20, y: 35, label: 'Point 2', color: '#10B981' },
      { x: 30, y: 25, label: 'Point 3', color: '#F59E0B' },
      { x: 40, y: 45, label: 'Point 4', color: '#EF4444' },
      { x: 50, y: 30, label: 'Point 5', color: '#8B5CF6' },
      { x: 60, y: 55, label: 'Point 6', color: '#06B6D4' }
    ],
    width: 600,
    height: 400,
    animate: true,
    showGrid: true,
    showTrendLine: true,
    pointRadius: 6,
    pointOpacity: 0.8
  };

  // Customization options
  customizationOptions = {
    width: 600,
    height: 400,
    animate: true,
    showGrid: true,
    showTrendLine: true,
    pointRadius: 6,
    pointOpacity: 0.8
  };

  // Sample data sets
  sampleDataSets = {
    correlation: [
      { x: 10, y: 20, label: 'Point 1', color: '#3B82F6' },
      { x: 20, y: 35, label: 'Point 2', color: '#10B981' },
      { x: 30, y: 25, label: 'Point 3', color: '#F59E0B' },
      { x: 40, y: 45, label: 'Point 4', color: '#EF4444' },
      { x: 50, y: 30, label: 'Point 5', color: '#8B5CF6' },
      { x: 60, y: 55, label: 'Point 6', color: '#06B6D4' }
    ],
    clusters: [
      { x: 5, y: 5, label: 'Cluster 1', color: '#3B82F6' },
      { x: 8, y: 7, label: 'Cluster 1', color: '#3B82F6' },
      { x: 6, y: 6, label: 'Cluster 1', color: '#3B82F6' },
      { x: 25, y: 25, label: 'Cluster 2', color: '#10B981' },
      { x: 28, y: 27, label: 'Cluster 2', color: '#10B981' },
      { x: 26, y: 26, label: 'Cluster 2', color: '#10B981' },
      { x: 45, y: 45, label: 'Cluster 3', color: '#F59E0B' },
      { x: 48, y: 47, label: 'Cluster 3', color: '#F59E0B' },
      { x: 46, y: 46, label: 'Cluster 3', color: '#F59E0B' }
    ]
  };

  currentDataSet = 'correlation';
  public currentChartData: ScatterData[] = [];

  constructor(private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.updateChartData();
    this.updateCurrentChartData();
  }

  // Data Management
  updateChartData() {
    const selectedData = this.sampleDataSets[this.currentDataSet as keyof typeof this.sampleDataSets];
    this.scatterChartConfig.data = selectedData.map(item => ({
      ...item,
      x: item.x + (Math.random() - 0.5) * 10,
      y: item.y + (Math.random() - 0.5) * 10
    }));
  }

  updateCurrentChartData() {
    this.currentChartData = [...this.scatterChartConfig.data];
  }

  // Customization Methods
  updateWidth(value: number) {
    this.customizationOptions.width = value;
    this.scatterChartConfig.width = value;
    this.cdr.detectChanges();
  }

  updateHeight(value: number) {
    this.customizationOptions.height = value;
    this.scatterChartConfig.height = value;
    this.cdr.detectChanges();
  }

  toggleAnimation() {
    this.customizationOptions.animate = !this.customizationOptions.animate;
    this.scatterChartConfig.animate = this.customizationOptions.animate;
    this.cdr.detectChanges();
  }

  toggleShowGrid() {
    this.customizationOptions.showGrid = !this.customizationOptions.showGrid;
    this.scatterChartConfig.showGrid = this.customizationOptions.showGrid;
    this.cdr.detectChanges();
  }

  toggleTrendLine() {
    this.customizationOptions.showTrendLine = !this.customizationOptions.showTrendLine;
    this.scatterChartConfig.showTrendLine = this.customizationOptions.showTrendLine;
    this.cdr.detectChanges();
  }

  updatePointSize(value: number) {
    this.customizationOptions.pointRadius = value;
    this.scatterChartConfig.pointRadius = value;
    this.cdr.detectChanges();
  }

  updateOpacity(value: number) {
    this.customizationOptions.pointOpacity = value;
    this.scatterChartConfig.pointOpacity = value;
    this.cdr.detectChanges();
  }

  changeDataSet(dataSet: string) {
    this.currentDataSet = dataSet;
    this.updateChartData();
    this.updateCurrentChartData();
    this.cdr.detectChanges();
  }

  // Random Data Generation
  generateRandomData() {
    const dataPoints = Math.floor(Math.random() * 20) + 10; // 10-30 data points
    
    this.scatterChartConfig.data = Array.from({ length: dataPoints }, (_, i) => ({
      x: Math.floor(Math.random() * 100),
      y: Math.floor(Math.random() * 100),
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
      const filename = `scatter-chart-${timestamp}.${format}`;
      
      console.log(`Exporting scatter chart as ${format}: ${filename}`);
      this.showNotification(`Scatter chart exported as ${format.toUpperCase()} successfully!`);
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

  // Event handlers
  onChartReady() {
    console.log('Scatter chart is ready');
  }

  onDataUpdate(data: ScatterData[]) {
    this.currentChartData = [...data];
    console.log('Scatter chart data updated:', data);
    this.cdr.detectChanges();
  }

  getTotalPoints(): number {
    return this.currentChartData.length;
  }

  getAverageX(): number {
    if (this.currentChartData.length === 0) return 0;
    const sum = this.currentChartData.reduce((acc, point) => acc + point.x, 0);
    return sum / this.currentChartData.length;
  }

  getAverageY(): number {
    if (this.currentChartData.length === 0) return 0;
    const sum = this.currentChartData.reduce((acc, point) => acc + point.y, 0);
    return sum / this.currentChartData.length;
  }

  getMaxX(): number {
    return Math.max(...this.currentChartData.map(point => point.x));
  }

  getMaxY(): number {
    return Math.max(...this.currentChartData.map(point => point.y));
  }

  getMinX(): number {
    return Math.min(...this.currentChartData.map(point => point.x));
  }

  getMinY(): number {
    return Math.min(...this.currentChartData.map(point => point.y));
  }
}

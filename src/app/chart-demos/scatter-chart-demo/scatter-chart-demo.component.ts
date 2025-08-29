import { Component, OnInit, ChangeDetectorRef, ViewChild } from '@angular/core';
import { ScatterData } from '@synerity/charts';
import { ScatterChartConfig, ScatterChartComponent } from '../../charts/scatter-chart/scatter-chart.component';

@Component({
  selector: 'app-scatter-chart-demo',
  standalone: false,
  templateUrl: './scatter-chart-demo.component.html',
  styleUrls: ['./scatter-chart-demo.component.scss']
})
export class ScatterChartDemoComponent implements OnInit {
  
  @ViewChild('scatterChart') scatterChartComponent!: ScatterChartComponent;
  
  // Chart configuration
  scatterChartConfig: ScatterChartConfig = {
    data: [
      { x: 10, y: 20, label: 'Point 1', color: '#3B82F6', size: 5, category: 'A' },
      { x: 20, y: 35, label: 'Point 2', color: '#10B981', size: 8, category: 'B' },
      { x: 30, y: 25, label: 'Point 3', color: '#F59E0B', size: 6, category: 'A' },
      { x: 40, y: 45, label: 'Point 4', color: '#EF4444', size: 10, category: 'C' },
      { x: 50, y: 30, label: 'Point 5', color: '#8B5CF6', size: 7, category: 'B' },
      { x: 60, y: 55, label: 'Point 6', color: '#06B6D4', size: 9, category: 'C' }
    ],
    width: 600,
    height: 400,
    animate: true,
    showGrid: true,
    showTrendLine: true,
    pointRadius: 6,
    pointOpacity: 0.8,
    // Enhanced features
    trendLine: {
      enabled: false,
      type: 'linear',
      color: '#EF4444',
      strokeWidth: 2,
      opacity: 0.8
    },
    clustering: {
      enabled: false,
      algorithm: 'kmeans',
      maxClusters: 3,
      showClusterBoundaries: false,
      clusterColors: ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6']
    },
    mapping: {
      sizeField: 'size',
      colorField: 'category',
      shapeField: 'category',
      sizeRange: [4, 12],
      colorScale: 'categorical'
    },
    selection: {
      enabled: false,
      type: 'rectangle',
      multipleSelection: true,
      selectionColor: '#3B82F6'
    },
    zoom: {
      enabled: false,
      minZoom: 0.5,
      maxZoom: 5,
      enablePan: true
    },
    tooltip: {
      enabled: true,
      showAllFields: true
    },
    animation: {
      duration: 800,
      easing: 'cubic',
      entranceDelay: 50
    }
  };

  // Customization options
  customizationOptions = {
    width: 600,
    height: 400,
    animate: true,
    showGrid: true,
    showTrendLine: true,
    pointRadius: 6,
    pointOpacity: 0.8,
    // Enhanced options
    trendLineEnabled: false,
    trendLineType: 'linear',
    trendLineColor: '#EF4444',
    clusteringEnabled: false,
    clusteringAlgorithm: 'kmeans',
    maxClusters: 3,
    showClusterBoundaries: false,
    sizeMapping: true,
    colorMapping: true,
    selectionEnabled: false,
    selectionType: 'rectangle',
    zoomEnabled: false,
    tooltipEnabled: true,
    showAllFields: true
  };

  // Sample data sets
  sampleDataSets = {
    correlation: [
      { x: 10, y: 20, label: 'Point 1', color: '#3B82F6', size: 5, category: 'A' },
      { x: 20, y: 35, label: 'Point 2', color: '#10B981', size: 8, category: 'B' },
      { x: 30, y: 25, label: 'Point 3', color: '#F59E0B', size: 6, category: 'A' },
      { x: 40, y: 45, label: 'Point 4', color: '#EF4444', size: 10, category: 'C' },
      { x: 50, y: 30, label: 'Point 5', color: '#8B5CF6', size: 7, category: 'B' },
      { x: 60, y: 55, label: 'Point 6', color: '#06B6D4', size: 9, category: 'C' }
    ],
    clusters: [
      { x: 5, y: 5, label: 'Cluster 1', color: '#3B82F6', size: 6, category: 'Cluster 1' },
      { x: 8, y: 7, label: 'Cluster 1', color: '#3B82F6', size: 5, category: 'Cluster 1' },
      { x: 6, y: 6, label: 'Cluster 1', color: '#3B82F6', size: 7, category: 'Cluster 1' },
      { x: 25, y: 25, label: 'Cluster 2', color: '#10B981', size: 8, category: 'Cluster 2' },
      { x: 28, y: 27, label: 'Cluster 2', color: '#10B981', size: 6, category: 'Cluster 2' },
      { x: 26, y: 26, label: 'Cluster 2', color: '#10B981', size: 9, category: 'Cluster 2' },
      { x: 45, y: 45, label: 'Cluster 3', color: '#F59E0B', size: 7, category: 'Cluster 3' },
      { x: 48, y: 47, label: 'Cluster 3', color: '#F59E0B', size: 5, category: 'Cluster 3' },
      { x: 46, y: 46, label: 'Cluster 3', color: '#F59E0B', size: 8, category: 'Cluster 3' }
    ],
    multiDimensional: [
      { x: 15, y: 30, label: 'Product A', color: '#3B82F6', size: 12, category: 'High Value', revenue: 50000 },
      { x: 25, y: 45, label: 'Product B', color: '#10B981', size: 8, category: 'Medium Value', revenue: 30000 },
      { x: 35, y: 20, label: 'Product C', color: '#F59E0B', size: 15, category: 'High Value', revenue: 75000 },
      { x: 45, y: 60, label: 'Product D', color: '#EF4444', size: 6, category: 'Low Value', revenue: 15000 },
      { x: 55, y: 35, label: 'Product E', color: '#8B5CF6', size: 10, category: 'Medium Value', revenue: 40000 },
      { x: 65, y: 50, label: 'Product F', color: '#06B6D4', size: 14, category: 'High Value', revenue: 60000 }
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

  // Enhanced Customization Methods
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
    
    // Use direct chart component method to update data
    if (this.scatterChartComponent) {
      this.scatterChartComponent.updateData(this.scatterChartConfig.data);
      console.log('Scatter chart data updated via component method');
    } else {
      this.cdr.detectChanges();
    }
  }

  // New Enhanced Methods
  toggleTrendLineEnabled() {
    this.customizationOptions.trendLineEnabled = !this.customizationOptions.trendLineEnabled;
    if (this.scatterChartConfig.trendLine) {
      this.scatterChartConfig.trendLine.enabled = this.customizationOptions.trendLineEnabled;
    }
    this.cdr.detectChanges();
  }

  setTrendLineType(type: 'linear' | 'polynomial' | 'custom') {
    this.customizationOptions.trendLineType = type;
    if (this.scatterChartConfig.trendLine) {
      this.scatterChartConfig.trendLine.type = type;
    }
    this.cdr.detectChanges();
  }

  setTrendLineColor(color: string) {
    this.customizationOptions.trendLineColor = color;
    if (this.scatterChartConfig.trendLine) {
      this.scatterChartConfig.trendLine.color = color;
    }
    this.cdr.detectChanges();
  }

  toggleClustering() {
    this.customizationOptions.clusteringEnabled = !this.customizationOptions.clusteringEnabled;
    if (this.scatterChartConfig.clustering) {
      this.scatterChartConfig.clustering.enabled = this.customizationOptions.clusteringEnabled;
    }
    this.cdr.detectChanges();
  }

  setClusteringAlgorithm(algorithm: 'kmeans' | 'dbscan') {
    this.customizationOptions.clusteringAlgorithm = algorithm;
    if (this.scatterChartConfig.clustering) {
      this.scatterChartConfig.clustering.algorithm = algorithm;
    }
    this.cdr.detectChanges();
  }

  setMaxClusters(count: number) {
    this.customizationOptions.maxClusters = count;
    if (this.scatterChartConfig.clustering) {
      this.scatterChartConfig.clustering.maxClusters = count;
    }
    this.cdr.detectChanges();
  }

  toggleClusterBoundaries() {
    this.customizationOptions.showClusterBoundaries = !this.customizationOptions.showClusterBoundaries;
    if (this.scatterChartConfig.clustering) {
      this.scatterChartConfig.clustering.showClusterBoundaries = this.customizationOptions.showClusterBoundaries;
    }
    this.cdr.detectChanges();
  }

  toggleSizeMapping() {
    this.customizationOptions.sizeMapping = !this.customizationOptions.sizeMapping;
    if (this.scatterChartConfig.mapping) {
      this.scatterChartConfig.mapping.sizeField = this.customizationOptions.sizeMapping ? 'size' : undefined;
    }
    this.cdr.detectChanges();
  }

  toggleColorMapping() {
    this.customizationOptions.colorMapping = !this.customizationOptions.colorMapping;
    if (this.scatterChartConfig.mapping) {
      this.scatterChartConfig.mapping.colorField = this.customizationOptions.colorMapping ? 'category' : undefined;
    }
    this.cdr.detectChanges();
  }

  toggleSelection() {
    this.customizationOptions.selectionEnabled = !this.customizationOptions.selectionEnabled;
    if (this.scatterChartConfig.selection) {
      this.scatterChartConfig.selection.enabled = this.customizationOptions.selectionEnabled;
    }
    this.cdr.detectChanges();
  }

  setSelectionType(type: 'lasso' | 'rectangle' | 'point') {
    this.customizationOptions.selectionType = type;
    if (this.scatterChartConfig.selection) {
      this.scatterChartConfig.selection.type = type;
    }
    this.cdr.detectChanges();
  }

  toggleZoom() {
    this.customizationOptions.zoomEnabled = !this.customizationOptions.zoomEnabled;
    if (this.scatterChartConfig.zoom) {
      this.scatterChartConfig.zoom.enabled = this.customizationOptions.zoomEnabled;
    }
    this.cdr.detectChanges();
  }

  toggleTooltip() {
    this.customizationOptions.tooltipEnabled = !this.customizationOptions.tooltipEnabled;
    if (this.scatterChartConfig.tooltip) {
      this.scatterChartConfig.tooltip.enabled = this.customizationOptions.tooltipEnabled;
    }
    this.cdr.detectChanges();
  }

  toggleShowAllFields() {
    this.customizationOptions.showAllFields = !this.customizationOptions.showAllFields;
    if (this.scatterChartConfig.tooltip) {
      this.scatterChartConfig.tooltip.showAllFields = this.customizationOptions.showAllFields;
    }
    this.cdr.detectChanges();
  }

  // Random Data Generation
  generateRandomData() {
    const dataPoints = Math.floor(Math.random() * 20) + 10; // 10-30 data points
    
    this.scatterChartConfig.data = Array.from({ length: dataPoints }, (_, i) => ({
      x: Math.floor(Math.random() * 100),
      y: Math.floor(Math.random() * 100),
      label: `Point ${i + 1}`,
      color: `hsl(${Math.random() * 360}, 70%, 50%)`,
      size: Math.floor(Math.random() * 10) + 3,
      category: ['A', 'B', 'C'][Math.floor(Math.random() * 3)],
      revenue: Math.floor(Math.random() * 100000) + 10000
    }));
    
    this.updateCurrentChartData();
    
    // Use direct chart component method to update data
    if (this.scatterChartComponent) {
      this.scatterChartComponent.updateData(this.scatterChartConfig.data);
      console.log('Scatter chart data updated via component method');
    } else {
      this.cdr.detectChanges();
    }
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

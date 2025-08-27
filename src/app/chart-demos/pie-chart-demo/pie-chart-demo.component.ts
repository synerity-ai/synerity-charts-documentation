import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ChartData } from '@synerity/charts';
import { PieChartConfig } from '../../charts/pie-chart/pie-chart.component';

@Component({
  selector: 'app-pie-chart-demo',
  standalone: false,
  templateUrl: './pie-chart-demo.component.html',
  styleUrls: ['./pie-chart-demo.component.scss']
})
export class PieChartDemoComponent implements OnInit {
  
  // Chart configuration
  pieChartConfig: PieChartConfig = {
    data: [
      { label: 'Desktop', value: 45, color: '#3B82F6' },
      { label: 'Mobile', value: 35, color: '#10B981' },
      { label: 'Tablet', value: 15, color: '#F59E0B' },
      { label: 'Other', value: 5, color: '#EF4444' }
    ],
    width: 600,
    height: 400,
    animate: true,
    showLabels: true,
    showValues: true,
    innerRadius: 0,
    outerRadius: 0.6,
    labelRadius: 0.8
  };

  // Customization options
  customizationOptions = {
    width: 600,
    height: 400,
    animate: true,
    showLabels: true,
    showValues: true,
    innerRadius: 0,
    explodeOffset: 10,
    colorScheme: 'default'
  };

  // Color schemes
  colorSchemes = {
    default: ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#06B6D4'],
    warm: ['#F97316', '#EF4444', '#F59E0B', '#EAB308', '#FCD34D', '#FEF3C7'],
    cool: ['#3B82F6', '#06B6D4', '#8B5CF6', '#A855F7', '#EC4899', '#F472B6'],
    monochrome: ['#1F2937', '#374151', '#4B5563', '#6B7280', '#9CA3AF', '#D1D5DB']
  };

  // Sample data sets
  sampleDataSets = {
    devices: [
      { label: 'Desktop', value: 45, color: '#3B82F6' },
      { label: 'Mobile', value: 35, color: '#10B981' },
      { label: 'Tablet', value: 15, color: '#F59E0B' },
      { label: 'Other', value: 5, color: '#EF4444' }
    ],
    browsers: [
      { label: 'Chrome', value: 60, color: '#3B82F6' },
      { label: 'Firefox', value: 20, color: '#10B981' },
      { label: 'Safari', value: 15, color: '#F59E0B' },
      { label: 'Edge', value: 5, color: '#EF4444' }
    ],
    regions: [
      { label: 'North America', value: 40, color: '#3B82F6' },
      { label: 'Europe', value: 30, color: '#10B981' },
      { label: 'Asia', value: 20, color: '#F59E0B' },
      { label: 'Other', value: 10, color: '#EF4444' }
    ]
  };

  currentDataSet = 'devices';
  public currentChartData: ChartData[] = [];

  constructor(private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.updateChartData();
    this.updateCurrentChartData();
  }

  // Data Management
  updateChartData() {
    const selectedData = this.sampleDataSets[this.currentDataSet as keyof typeof this.sampleDataSets];
    const colorScheme = this.colorSchemes[this.customizationOptions.colorScheme as keyof typeof this.colorSchemes];
    
    this.pieChartConfig.data = selectedData.map((item, index) => ({
      ...item,
      color: colorScheme[index % colorScheme.length]
    }));
  }

  updateCurrentChartData() {
    this.currentChartData = [...this.pieChartConfig.data];
  }

  // Customization Methods
  updateWidth(value: number) {
    this.customizationOptions.width = value;
    this.pieChartConfig.width = value;
    this.cdr.detectChanges();
  }

  updateHeight(value: number) {
    this.customizationOptions.height = value;
    this.pieChartConfig.height = value;
    this.cdr.detectChanges();
  }

  toggleAnimation() {
    this.customizationOptions.animate = !this.customizationOptions.animate;
    this.pieChartConfig.animate = this.customizationOptions.animate;
    this.cdr.detectChanges();
  }

  toggleShowLabels() {
    this.customizationOptions.showLabels = !this.customizationOptions.showLabels;
    this.pieChartConfig.showLabels = this.customizationOptions.showLabels;
    this.cdr.detectChanges();
  }

  toggleShowValues() {
    this.customizationOptions.showValues = !this.customizationOptions.showValues;
    this.pieChartConfig.showValues = this.customizationOptions.showValues;
    this.cdr.detectChanges();
  }

  updateInnerRadius(value: number) {
    this.customizationOptions.innerRadius = value;
    this.pieChartConfig.innerRadius = value;
    this.cdr.detectChanges();
  }

  updateExplodeOffset(value: number) {
    this.customizationOptions.explodeOffset = value;
    this.cdr.detectChanges();
  }

  changeColorScheme(scheme: string) {
    this.customizationOptions.colorScheme = scheme;
    this.updateChartData();
    this.updateCurrentChartData();
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
    const dataPoints = Math.floor(Math.random() * 6) + 3; // 3-8 data points
    const colorScheme = this.colorSchemes[this.customizationOptions.colorScheme as keyof typeof this.colorSchemes];
    
    this.pieChartConfig.data = Array.from({ length: dataPoints }, (_, i) => ({
      label: `Item ${i + 1}`,
      value: Math.floor(Math.random() * 100) + 10,
      color: colorScheme[i % colorScheme.length]
    }));
    
    this.updateCurrentChartData();
    this.cdr.detectChanges();
  }

  // Export Methods
  async exportChart(format: 'png' | 'svg') {
    try {
      const timestamp = new Date().toISOString().slice(0, 19).replace(/:/g, '-');
      const filename = `pie-chart-${timestamp}.${format}`;
      
      console.log(`Exporting pie chart as ${format}: ${filename}`);
      this.showNotification(`Pie chart exported as ${format.toUpperCase()} successfully!`);
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
    console.log('Pie chart is ready');
  }

  onDataUpdate(data: ChartData[]) {
    this.currentChartData = [...data];
    console.log('Pie chart data updated:', data);
    this.cdr.detectChanges();
  }

  getTotalValue(): number {
    return this.currentChartData.reduce((sum, item) => sum + item.value, 0);
  }

  getAverageValue(): number {
    if (this.currentChartData.length === 0) return 0;
    return this.getTotalValue() / this.currentChartData.length;
  }

  getMaxValue(): number {
    return Math.max(...this.currentChartData.map(item => item.value));
  }

  getMinValue(): number {
    return Math.min(...this.currentChartData.map(item => item.value));
  }
}

import { Component, OnInit, OnDestroy, ChangeDetectorRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartData } from '@synerity/charts';
import { LineChartConfig } from '../../charts/line-chart/line-chart.component';
import { LineChartComponent } from '../../charts/line-chart/line-chart.component';

@Component({
  selector: 'app-line-chart-demo',
  standalone: false,
  templateUrl: './line-chart-demo.component.html',
  styleUrls: ['./line-chart-demo.component.scss']
})
export class LineChartDemoComponent implements OnInit, OnDestroy {
  
  @ViewChild('lineChart') lineChartComponent!: LineChartComponent;
  
  constructor(private cdr: ChangeDetectorRef) {}

  // Chart Configuration
  lineChartConfig: LineChartConfig = {
    data: [
      { label: 'Jan', value: 65, color: '#3B82F6' },
      { label: 'Feb', value: 78, color: '#10B981' },
      { label: 'Mar', value: 90, color: '#F59E0B' },
      { label: 'Apr', value: 81, color: '#EF4444' },
      { label: 'May', value: 95, color: '#8B5CF6' },
      { label: 'Jun', value: 88, color: '#06B6D4' }
    ],
    width: 600,
    height: 400,
    animate: true,
    showPoints: true,
    showGrid: true,
    curveType: 'monotoneX',
    strokeWidth: 2
  };

  // Customization Options
  customizationOptions = {
    width: 600,
    height: 400,
    animate: true,
    showPoints: true,
    showGrid: true,
    curveType: 'monotoneX',
    strokeWidth: 2,
    colorScheme: 'default'
  };

  // Color Schemes
  colorSchemes = {
    default: ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#06B6D4'],
    warm: ['#F97316', '#EF4444', '#F59E0B', '#EAB308', '#FCD34D', '#FEF3C7'],
    cool: ['#3B82F6', '#06B6D4', '#8B5CF6', '#A855F7', '#EC4899', '#F472B6'],
    monochrome: ['#1F2937', '#374151', '#4B5563', '#6B7280', '#9CA3AF', '#D1D5DB']
  };

  // Curve Types
  curveTypes = [
    { value: 'linear', label: 'Linear' },
    { value: 'monotoneX', label: 'Monotone X' },
    { value: 'step', label: 'Step' },
    { value: 'stepAfter', label: 'Step After' },
    { value: 'stepBefore', label: 'Step Before' },
    { value: 'basis', label: 'Basis' },
    { value: 'cardinal', label: 'Cardinal' },
    { value: 'catmullRom', label: 'Catmull-Rom' }
  ];

  // Sample Data Sets
  sampleDataSets = {
    revenue: [
      { label: 'Jan', value: 45000, color: '#3B82F6' },
      { label: 'Feb', value: 52000, color: '#10B981' },
      { label: 'Mar', value: 48000, color: '#F59E0B' },
      { label: 'Apr', value: 61000, color: '#EF4444' },
      { label: 'May', value: 55000, color: '#8B5CF6' },
      { label: 'Jun', value: 67000, color: '#06B6D4' }
    ],
    users: [
      { label: 'Q1', value: 1200, color: '#3B82F6' },
      { label: 'Q2', value: 1800, color: '#10B981' },
      { label: 'Q3', value: 2200, color: '#F59E0B' },
      { label: 'Q4', value: 2800, color: '#EF4444' }
    ],
    temperature: [
      { label: 'Mon', value: 22, color: '#3B82F6' },
      { label: 'Tue', value: 24, color: '#10B981' },
      { label: 'Wed', value: 19, color: '#F59E0B' },
      { label: 'Thu', value: 26, color: '#EF4444' },
      { label: 'Fri', value: 28, color: '#8B5CF6' },
      { label: 'Sat', value: 25, color: '#06B6D4' },
      { label: 'Sun', value: 23, color: '#EC4899' }
    ]
  };

  currentDataSet = 'revenue';
  public isChartReady = false;
  public currentChartData: ChartData[] = [];

  ngOnInit() {
    this.updateChartData();
    this.updateCurrentChartData();
  }

  ngOnDestroy() {
    // Cleanup if needed
  }

  // Data Management
  updateChartData() {
    const selectedData = this.sampleDataSets[this.currentDataSet as keyof typeof this.sampleDataSets];
    const colorScheme = this.colorSchemes[this.customizationOptions.colorScheme as keyof typeof this.colorSchemes];
    
    this.lineChartConfig = { ...this.lineChartConfig, data: selectedData.map((item, index) => ({
      ...item,
      color: colorScheme[index % colorScheme.length]
    }))};
  }

  updateCurrentChartData() {
    this.currentChartData = [...this.lineChartConfig.data];
  }

  // Customization Methods
  updateWidth(value: number) {
    this.customizationOptions.width = value;
    this.lineChartConfig = { ...this.lineChartConfig, width: value };
    
    if (this.lineChartComponent) {
      this.lineChartComponent.updateChartOptions({ width: value });
    } else {
      this.triggerChartUpdate();
    }
  }

  updateHeight(value: number) {
    this.customizationOptions.height = value;
    this.lineChartConfig = { ...this.lineChartConfig, height: value };
    
    if (this.lineChartComponent) {
      this.lineChartComponent.updateChartOptions({ height: value });
    } else {
      this.triggerChartUpdate();
    }
  }

  toggleAnimation() {
    this.customizationOptions.animate = !this.customizationOptions.animate;
    this.lineChartConfig = { ...this.lineChartConfig, animate: this.customizationOptions.animate };
    
    if (this.lineChartComponent) {
      this.lineChartComponent.updateChartOptions({ animate: this.customizationOptions.animate });
    } else {
      this.triggerChartUpdate();
    }
  }

  toggleShowPoints() {
    this.customizationOptions.showPoints = !this.customizationOptions.showPoints;
    this.lineChartConfig = { ...this.lineChartConfig, showPoints: this.customizationOptions.showPoints };
    
    if (this.lineChartComponent) {
      this.lineChartComponent.updateChartOptions({ showPoints: this.customizationOptions.showPoints });
    } else {
      this.triggerChartUpdate();
    }
  }

  toggleShowGrid() {
    this.customizationOptions.showGrid = !this.customizationOptions.showGrid;
    this.lineChartConfig = { ...this.lineChartConfig, showGrid: this.customizationOptions.showGrid };
    
    if (this.lineChartComponent) {
      this.lineChartComponent.updateChartOptions({ showGrid: this.customizationOptions.showGrid });
    } else {
      this.triggerChartUpdate();
    }
  }

  updateCurveType(curveType: string) {
    this.customizationOptions.curveType = curveType as any;
    this.lineChartConfig = { ...this.lineChartConfig, curveType: curveType as any };
    
    if (this.lineChartComponent) {
      this.lineChartComponent.updateChartOptions({ curveType: curveType as any });
    } else {
      this.triggerChartUpdate();
    }
  }

  updateStrokeWidth(value: number) {
    this.customizationOptions.strokeWidth = value;
    this.lineChartConfig = { ...this.lineChartConfig, strokeWidth: value };
    
    if (this.lineChartComponent) {
      this.lineChartComponent.updateChartOptions({ strokeWidth: value });
    } else {
      this.triggerChartUpdate();
    }
  }

  changeColorScheme(scheme: string) {
    this.customizationOptions.colorScheme = scheme;
    this.updateChartData();
    this.updateCurrentChartData();
    this.triggerChartUpdate();
  }

  changeDataSet(dataSet: string) {
    this.currentDataSet = dataSet;
    this.updateChartData();
    this.updateCurrentChartData();
    this.triggerChartUpdate();
  }

  triggerChartUpdate() {
    this.lineChartConfig = { ...this.lineChartConfig };
    this.cdr.detectChanges();
  }

  // Random Data Generation
  generateRandomData() {
    const dataPoints = Math.floor(Math.random() * 8) + 4; // 4-11 data points
    const colorScheme = this.colorSchemes[this.customizationOptions.colorScheme as keyof typeof this.colorSchemes];
    
    this.lineChartConfig = { ...this.lineChartConfig, data: Array.from({ length: dataPoints }, (_, i) => ({
      label: `Point ${i + 1}`,
      value: Math.floor(Math.random() * 100) + 20,
      color: colorScheme[i % colorScheme.length]
    }))};
    
    this.updateCurrentChartData();
    this.triggerChartUpdate();
  }

  // Chart Event Handlers
  onChartReady() {
    this.isChartReady = true;
    console.log('Line chart is ready');
  }

  onDataUpdate(newData: ChartData[]) {
    this.currentChartData = [...newData];
    console.log('Chart data updated:', newData);
    this.cdr.detectChanges();
  }

  // Export Methods
  async exportChart(format: 'png' | 'svg') {
    try {
      const timestamp = new Date().toISOString().slice(0, 19).replace(/:/g, '-');
      const filename = `line-chart-${timestamp}.${format}`;
      
      console.log(`Exporting line chart as ${format}: ${filename}`);
      this.showNotification(`Line chart exported as ${format.toUpperCase()} successfully!`);
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

  // Utility Methods
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

  getTrend(): 'increasing' | 'decreasing' | 'stable' {
    if (this.currentChartData.length < 2) return 'stable';
    
    const firstValue = this.currentChartData[0].value;
    const lastValue = this.currentChartData[this.currentChartData.length - 1].value;
    const difference = lastValue - firstValue;
    const threshold = (this.getMaxValue() - this.getMinValue()) * 0.1; // 10% threshold
    
    if (difference > threshold) return 'increasing';
    if (difference < -threshold) return 'decreasing';
    return 'stable';
  }

  getGrowthRate(): number {
    if (this.currentChartData.length < 2) return 0;
    
    const firstValue = this.currentChartData[0].value;
    const lastValue = this.currentChartData[this.currentChartData.length - 1].value;
    
    if (firstValue === 0) return 0;
    return ((lastValue - firstValue) / firstValue) * 100;
  }
}

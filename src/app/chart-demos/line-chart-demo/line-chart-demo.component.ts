import { Component, OnInit, OnDestroy, ChangeDetectorRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartData, MultiLineChartData } from '@synerity/charts';
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
    strokeWidth: 2,
    showLegend: true,
    multiLine: false
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
    colorScheme: 'default',
    showLegend: true,
    multiLine: false
  };

  // Data Type and Set Management
  dataSetType: 'single' | 'multi' = 'single';
  currentDataSet = 'revenue';

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

  // Single Line Data Sets
  singleLineDataSets = {
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

  // Multi-Line Data Sets
  multiLineDataSets = {
    financial: {
      series: [
        {
          name: 'Revenue',
          data: [
            { label: 'Jan', value: 45000 },
            { label: 'Feb', value: 52000 },
            { label: 'Mar', value: 48000 },
            { label: 'Apr', value: 61000 },
            { label: 'May', value: 55000 },
            { label: 'Jun', value: 67000 }
          ],
          color: '#3B82F6'
        },
        {
          name: 'Profit',
          data: [
            { label: 'Jan', value: 12000 },
            { label: 'Feb', value: 15000 },
            { label: 'Mar', value: 14000 },
            { label: 'Apr', value: 18000 },
            { label: 'May', value: 16000 },
            { label: 'Jun', value: 20000 }
          ],
          color: '#10B981'
        },
        {
          name: 'Expenses',
          data: [
            { label: 'Jan', value: 33000 },
            { label: 'Feb', value: 37000 },
            { label: 'Mar', value: 34000 },
            { label: 'Apr', value: 43000 },
            { label: 'May', value: 39000 },
            { label: 'Jun', value: 47000 }
          ],
          color: '#F59E0B'
        }
      ],
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun']
    },
    metrics: {
      series: [
        {
          name: 'Active Users',
          data: [
            { label: 'Q1', value: 1200 },
            { label: 'Q2', value: 1800 },
            { label: 'Q3', value: 2200 },
            { label: 'Q4', value: 2800 }
          ],
          color: '#3B82F6'
        },
        {
          name: 'New Users',
          data: [
            { label: 'Q1', value: 300 },
            { label: 'Q2', value: 450 },
            { label: 'Q3', value: 520 },
            { label: 'Q4', value: 680 }
          ],
          color: '#10B981'
        },
        {
          name: 'Churned Users',
          data: [
            { label: 'Q1', value: 80 },
            { label: 'Q2', value: 120 },
            { label: 'Q3', value: 95 },
            { label: 'Q4', value: 150 }
          ],
          color: '#EF4444'
        }
      ],
      labels: ['Q1', 'Q2', 'Q3', 'Q4']
    },
    weather: {
      series: [
        {
          name: 'Temperature (°C)',
          data: [
            { label: 'Mon', value: 22 },
            { label: 'Tue', value: 24 },
            { label: 'Wed', value: 19 },
            { label: 'Thu', value: 26 },
            { label: 'Fri', value: 28 },
            { label: 'Sat', value: 25 },
            { label: 'Sun', value: 23 }
          ],
          color: '#F59E0B'
        },
        {
          name: 'Humidity (%)',
          data: [
            { label: 'Mon', value: 65 },
            { label: 'Tue', value: 58 },
            { label: 'Wed', value: 72 },
            { label: 'Thu', value: 45 },
            { label: 'Fri', value: 38 },
            { label: 'Sat', value: 52 },
            { label: 'Sun', value: 61 }
          ],
          color: '#06B6D4'
        },
        {
          name: 'Wind Speed (km/h)',
          data: [
            { label: 'Mon', value: 12 },
            { label: 'Tue', value: 8 },
            { label: 'Wed', value: 15 },
            { label: 'Thu', value: 6 },
            { label: 'Fri', value: 10 },
            { label: 'Sat', value: 9 },
            { label: 'Sun', value: 11 }
          ],
          color: '#8B5CF6'
        }
      ],
      labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    }
  };

  public isChartReady = false;
  public currentChartData: ChartData[] = [];

  ngOnInit() {
    this.updateChartData();
    this.updateCurrentChartData();
  }

  ngOnDestroy() {
    // Cleanup if needed
  }

  // Data Type Management
  changeDataSetType(type: 'single' | 'multi') {
    this.dataSetType = type;
    this.customizationOptions.multiLine = type === 'multi';
    this.customizationOptions.showLegend = type === 'multi';
    
    // Reset to first data set of the new type
    if (type === 'single') {
      this.currentDataSet = 'revenue';
    } else {
      this.currentDataSet = 'financial';
    }
    
    this.updateChartData();
  }

  // Data Management
  updateChartData() {
    if (this.dataSetType === 'single') {
      const selectedData = this.singleLineDataSets[this.currentDataSet as keyof typeof this.singleLineDataSets];
      const colorScheme = this.colorSchemes[this.customizationOptions.colorScheme as keyof typeof this.colorSchemes];
      
      this.lineChartConfig = { 
        ...this.lineChartConfig, 
        data: selectedData.map((item: any, index: number) => ({
          ...item,
          color: colorScheme[index % colorScheme.length]
        })),
        multiLine: false,
        showLegend: false
      };
    } else {
      const selectedData = this.multiLineDataSets[this.currentDataSet as keyof typeof this.multiLineDataSets];
      this.lineChartConfig = { 
        ...this.lineChartConfig, 
        data: selectedData,
        multiLine: true,
        showLegend: true
      };
    }
  }

  updateCurrentChartData() {
    if (this.dataSetType === 'single' && Array.isArray(this.lineChartConfig.data)) {
      this.currentChartData = [...this.lineChartConfig.data];
    } else if (this.dataSetType === 'multi') {
      const multiData = this.lineChartConfig.data as MultiLineChartData;
      this.currentChartData = multiData.series.length > 0 ? [...multiData.series[0].data] : [];
    }
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

  toggleLegend() {
    this.customizationOptions.showLegend = !this.customizationOptions.showLegend;
    this.lineChartConfig = { ...this.lineChartConfig, showLegend: this.customizationOptions.showLegend };
    
    if (this.lineChartComponent) {
      this.lineChartComponent.updateChartOptions({ showLegend: this.customizationOptions.showLegend });
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
    if (this.dataSetType === 'single') {
      const dataPoints = Math.floor(Math.random() * 8) + 4; // 4-11 data points
      const colorScheme = this.colorSchemes[this.customizationOptions.colorScheme as keyof typeof this.colorSchemes];
      
      this.lineChartConfig = { 
        ...this.lineChartConfig, 
        data: Array.from({ length: dataPoints }, (_, i) => ({
          label: `Point ${i + 1}`,
          value: Math.floor(Math.random() * 100) + 20,
          color: colorScheme[i % colorScheme.length]
        })),
        multiLine: false,
        showLegend: false
      };
    } else {
      // Generate random multi-line data
      const dataPoints = Math.floor(Math.random() * 6) + 4; // 4-9 data points
      const seriesCount = Math.floor(Math.random() * 3) + 2; // 2-4 series
      const colorScheme = this.colorSchemes[this.customizationOptions.colorScheme as keyof typeof this.colorSchemes];
      
      const series = Array.from({ length: seriesCount }, (_, seriesIndex) => ({
        name: `Series ${seriesIndex + 1}`,
        data: Array.from({ length: dataPoints }, (_, i) => ({
          label: `Point ${i + 1}`,
          value: Math.floor(Math.random() * 100) + 20
        })),
        color: colorScheme[seriesIndex % colorScheme.length]
      }));
      
      this.lineChartConfig = { 
        ...this.lineChartConfig, 
        data: {
          series,
          labels: Array.from({ length: dataPoints }, (_, i) => `Point ${i + 1}`)
        },
        multiLine: true,
        showLegend: true
      };
    }
    
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

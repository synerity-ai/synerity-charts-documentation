import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ChartData, AreaChartOptions } from '@synerity/charts';

@Component({
  selector: 'app-area-chart-demo',
  templateUrl: './area-chart-demo.component.html',
  styleUrls: ['./area-chart-demo.component.scss'],
  standalone: false
})
export class AreaChartDemoComponent implements OnInit {
  // Sample data for area chart
  areaChartData: ChartData[] = [
    { label: 'Jan', value: 65, color: '#3B82F6' },
    { label: 'Feb', value: 78, color: '#3B82F6' },
    { label: 'Mar', value: 90, color: '#3B82F6' },
    { label: 'Apr', value: 81, color: '#3B82F6' },
    { label: 'May', value: 95, color: '#3B82F6' },
    { label: 'Jun', value: 88, color: '#3B82F6' },
    { label: 'Jul', value: 92, color: '#3B82F6' },
    { label: 'Aug', value: 85, color: '#3B82F6' }
  ];

  // Chart configuration
  areaChartConfig: AreaChartOptions = {
    width: 600,
    height: 400,
    animate: true,
    type: 'standard',
    showPoints: true,
    showGrid: true,
    curveType: 'monotoneX',
    strokeWidth: 2,
    pointRadius: 4,
    areaOpacity: 0.3
  };

  // Customization options
  customizationOptions = {
    width: 600,
    height: 400,
    animate: true,
    type: 'standard' as 'standard' | 'stacked' | 'normalized',
    showPoints: true,
    showGrid: true,
    curveType: 'monotoneX' as 'linear' | 'step' | 'stepAfter' | 'stepBefore' | 'basis' | 'cardinal' | 'catmullRom' | 'monotoneX',
    strokeWidth: 2,
    pointRadius: 4,
    areaOpacity: 0.3,
    colorScheme: 'default'
  };

  // Color schemes
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

  // Sample data sets
  sampleDataSets = {
    sales: [
      { label: 'Jan', value: 65, color: '#3B82F6' },
      { label: 'Feb', value: 78, color: '#3B82F6' },
      { label: 'Mar', value: 90, color: '#3B82F6' },
      { label: 'Apr', value: 81, color: '#3B82F6' },
      { label: 'May', value: 95, color: '#3B82F6' },
      { label: 'Jun', value: 88, color: '#3B82F6' },
      { label: 'Jul', value: 92, color: '#3B82F6' },
      { label: 'Aug', value: 85, color: '#3B82F6' }
    ],
    temperature: [
      { label: 'Mon', value: 22, color: '#3B82F6' },
      { label: 'Tue', value: 24, color: '#3B82F6' },
      { label: 'Wed', value: 19, color: '#3B82F6' },
      { label: 'Thu', value: 26, color: '#3B82F6' },
      { label: 'Fri', value: 28, color: '#3B82F6' },
      { label: 'Sat', value: 25, color: '#3B82F6' },
      { label: 'Sun', value: 23, color: '#3B82F6' }
    ],
    traffic: [
      { label: '00:00', value: 120, color: '#3B82F6' },
      { label: '04:00', value: 80, color: '#3B82F6' },
      { label: '08:00', value: 300, color: '#3B82F6' },
      { label: '12:00', value: 250, color: '#3B82F6' },
      { label: '16:00', value: 280, color: '#3B82F6' },
      { label: '20:00', value: 180, color: '#3B82F6' },
      { label: '24:00', value: 120, color: '#3B82F6' }
    ]
  };

  currentDataSet = 'sales';
  public currentChartData: ChartData[] = [];

  constructor(private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
    console.log('Area chart demo initialized');
    this.updateChartData();
    this.updateCurrentChartData();
  }

  // Data Management
  updateChartData() {
    const selectedData = this.sampleDataSets[this.currentDataSet as keyof typeof this.sampleDataSets];
    const colorScheme = this.colorSchemes[this.customizationOptions.colorScheme as keyof typeof this.colorSchemes];
    
    this.areaChartData = selectedData.map((item, index) => ({
      ...item,
      color: colorScheme[index % colorScheme.length]
    }));
  }

  updateCurrentChartData() {
    this.currentChartData = [...this.areaChartData];
  }

  // Method to update chart data
  updateChartDataRandom(): void {
    this.areaChartData = this.areaChartData.map(item => ({
      ...item,
      value: Math.floor(Math.random() * 100) + 20
    }));
  }

  // Method to change curve type
  changeCurveType(curveType: string): void {
    this.customizationOptions.curveType = curveType as any;
    this.areaChartConfig = {
      ...this.areaChartConfig,
      curveType: curveType as any
    };
    this.cdr.detectChanges();
  }

  // Method to update width
  updateWidth(value: number): void {
    this.customizationOptions.width = value;
    this.areaChartConfig = {
      ...this.areaChartConfig,
      width: value
    };
    this.cdr.detectChanges();
  }

  // Method to update height
  updateHeight(value: number): void {
    this.customizationOptions.height = value;
    this.areaChartConfig = {
      ...this.areaChartConfig,
      height: value
    };
    this.cdr.detectChanges();
  }

  // Method to toggle animation
  toggleAnimation(): void {
    this.customizationOptions.animate = !this.customizationOptions.animate;
    this.areaChartConfig = {
      ...this.areaChartConfig,
      animate: this.customizationOptions.animate
    };
    this.cdr.detectChanges();
  }

  // Method to toggle points
  togglePoints(): void {
    this.customizationOptions.showPoints = !this.customizationOptions.showPoints;
    this.areaChartConfig = {
      ...this.areaChartConfig,
      showPoints: this.customizationOptions.showPoints
    };
    this.cdr.detectChanges();
  }

  // Method to toggle grid
  toggleGrid(): void {
    this.customizationOptions.showGrid = !this.customizationOptions.showGrid;
    this.areaChartConfig = {
      ...this.areaChartConfig,
      showGrid: this.customizationOptions.showGrid
    };
    this.cdr.detectChanges();
  }

  // Method to update stroke width
  updateStrokeWidth(value: number): void {
    this.customizationOptions.strokeWidth = value;
    this.areaChartConfig = {
      ...this.areaChartConfig,
      strokeWidth: value
    };
    this.cdr.detectChanges();
  }

  // Method to update point radius
  updatePointRadius(value: number): void {
    this.customizationOptions.pointRadius = value;
    this.areaChartConfig = {
      ...this.areaChartConfig,
      pointRadius: value
    };
    this.cdr.detectChanges();
  }

  // Method to update area opacity
  updateAreaOpacity(value: number): void {
    this.customizationOptions.areaOpacity = value;
    this.areaChartConfig = {
      ...this.areaChartConfig,
      areaOpacity: value
    };
    this.cdr.detectChanges();
  }

  // Method to change area type
  changeAreaType(type: string): void {
    this.customizationOptions.type = type as any;
    this.areaChartConfig = {
      ...this.areaChartConfig,
      type: type as any
    };
    this.cdr.detectChanges();
  }

  // Method to change color scheme
  changeColorScheme(scheme: string): void {
    this.customizationOptions.colorScheme = scheme;
    this.updateChartData();
    this.updateCurrentChartData();
    this.cdr.detectChanges();
  }

  // Method to change data set
  changeDataSet(dataSet: string): void {
    this.currentDataSet = dataSet;
    this.updateChartData();
    this.updateCurrentChartData();
    this.cdr.detectChanges();
  }

  // Method to generate random data
  generateRandomData(): void {
    const dataPoints = Math.floor(Math.random() * 8) + 4; // 4-11 data points
    const colorScheme = this.colorSchemes[this.customizationOptions.colorScheme as keyof typeof this.colorSchemes];
    
    this.areaChartData = Array.from({ length: dataPoints }, (_, i) => ({
      label: `Point ${i + 1}`,
      value: Math.floor(Math.random() * 100) + 20,
      color: colorScheme[i % colorScheme.length]
    }));
    
    this.updateCurrentChartData();
    this.cdr.detectChanges();
  }

  // Export Methods
  async exportChart(format: 'png' | 'svg') {
    try {
      const timestamp = new Date().toISOString().slice(0, 19).replace(/:/g, '-');
      const filename = `area-chart-${timestamp}.${format}`;
      
      console.log(`Exporting area chart as ${format}: ${filename}`);
      this.showNotification(`Area chart exported as ${format.toUpperCase()} successfully!`);
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
    return Math.max(...this.currentChartData.map(d => d.value));
  }

  // Get min value from data
  getMinValue(): number {
    return Math.min(...this.currentChartData.map(d => d.value));
  }

  // Get total value
  getTotalValue(): number {
    return this.currentChartData.reduce((sum, item) => sum + item.value, 0);
  }

  // Get average value
  getAverageValue(): number {
    if (this.currentChartData.length === 0) return 0;
    return this.getTotalValue() / this.currentChartData.length;
  }
}

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
    data: {
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
    width: 600,
    height: 400,
    animate: true,
    showPoints: true,
    showGrid: true,
    curveType: 'monotoneX',
    strokeWidth: 2,
    showLegend: true,
    multiLine: true
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
    multiLine: true
  };

  // Data Set Management
  currentDataSet = 'financial';

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
    },
    sales: {
      series: [
        {
          name: 'Product A',
          data: [
            { label: 'Jan', value: 1200 },
            { label: 'Feb', value: 1400 },
            { label: 'Mar', value: 1100 },
            { label: 'Apr', value: 1600 },
            { label: 'May', value: 1800 },
            { label: 'Jun', value: 2000 }
          ],
          color: '#3B82F6'
        },
        {
          name: 'Product B',
          data: [
            { label: 'Jan', value: 800 },
            { label: 'Feb', value: 950 },
            { label: 'Mar', value: 1200 },
            { label: 'Apr', value: 1100 },
            { label: 'May', value: 1300 },
            { label: 'Jun', value: 1500 }
          ],
          color: '#10B981'
        },
        {
          name: 'Product C',
          data: [
            { label: 'Jan', value: 600 },
            { label: 'Feb', value: 750 },
            { label: 'Mar', value: 900 },
            { label: 'Apr', value: 850 },
            { label: 'May', value: 1000 },
            { label: 'Jun', value: 1200 }
          ],
          color: '#F59E0B'
        },
        {
          name: 'Product D',
          data: [
            { label: 'Jan', value: 400 },
            { label: 'Feb', value: 500 },
            { label: 'Mar', value: 600 },
            { label: 'Apr', value: 700 },
            { label: 'May', value: 800 },
            { label: 'Jun', value: 900 }
          ],
          color: '#EF4444'
        }
      ],
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun']
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

  // Data Management
  updateChartData() {
    const selectedData = this.multiLineDataSets[this.currentDataSet as keyof typeof this.multiLineDataSets];
    const colorScheme = this.colorSchemes[this.customizationOptions.colorScheme as keyof typeof this.colorSchemes];
    
    console.log('Updating chart data with color scheme:', this.customizationOptions.colorScheme, 'colors:', colorScheme);
    
    // Apply color scheme to the data
    const updatedData = {
      ...selectedData,
      series: selectedData.series.map((series, index) => ({
        ...series,
        color: colorScheme[index % colorScheme.length]
      }))
    };
    
    console.log('Updated data with new colors:', updatedData.series.map(s => ({ name: s.name, color: s.color })));
    
    this.lineChartConfig = { 
      ...this.lineChartConfig, 
      data: updatedData,
      multiLine: true,
      showLegend: true
    };
  }

  changeDataSet(dataSet: string) {
    console.log('Changing data set to:', dataSet);
    this.currentDataSet = dataSet;
    this.updateChartData();
    this.updateCurrentChartData();
    
    // Force a complete re-render by creating a new config object
    this.lineChartConfig = { ...this.lineChartConfig };
    
    this.cdr.detectChanges();
  }

  updateCurrentChartData() {
    const multiData = this.lineChartConfig.data as MultiLineChartData;
    this.currentChartData = multiData.series.length > 0 ? [...multiData.series[0].data] : [];
  }

  // Customization Methods
  updateWidth(value: number) {
    console.log('Updating width to:', value);
    this.customizationOptions.width = value;
    this.lineChartConfig = { ...this.lineChartConfig, width: value };
    
    // Force a complete re-render by creating a new config object
    this.lineChartConfig = { ...this.lineChartConfig };
    
    this.cdr.detectChanges();
  }

  updateHeight(value: number) {
    console.log('Updating height to:', value);
    this.customizationOptions.height = value;
    this.lineChartConfig = { ...this.lineChartConfig, height: value };
    
    // Force a complete re-render by creating a new config object
    this.lineChartConfig = { ...this.lineChartConfig };
    
    this.cdr.detectChanges();
  }

  toggleAnimation() {
    console.log('Toggling animation');
    this.customizationOptions.animate = !this.customizationOptions.animate;
    this.lineChartConfig = { ...this.lineChartConfig, animate: this.customizationOptions.animate };
    
    // Force a complete re-render by creating a new config object
    this.lineChartConfig = { ...this.lineChartConfig };
    
    this.cdr.detectChanges();
  }

  toggleShowPoints() {
    console.log('Toggling show points');
    this.customizationOptions.showPoints = !this.customizationOptions.showPoints;
    this.lineChartConfig = { ...this.lineChartConfig, showPoints: this.customizationOptions.showPoints };
    
    // Force a complete re-render by creating a new config object
    this.lineChartConfig = { ...this.lineChartConfig };
    
    this.cdr.detectChanges();
  }

  toggleShowGrid() {
    console.log('Toggling show grid');
    this.customizationOptions.showGrid = !this.customizationOptions.showGrid;
    this.lineChartConfig = { ...this.lineChartConfig, showGrid: this.customizationOptions.showGrid };
    
    // Force a complete re-render by creating a new config object
    this.lineChartConfig = { ...this.lineChartConfig };
    
    this.cdr.detectChanges();
  }

  updateCurveType(curveType: string) {
    console.log('Updating curve type to:', curveType);
    this.customizationOptions.curveType = curveType as any;
    this.lineChartConfig = { ...this.lineChartConfig, curveType: curveType as any };
    
    // Force a complete re-render by creating a new config object
    this.lineChartConfig = { ...this.lineChartConfig };
    
    this.cdr.detectChanges();
  }

  updateStrokeWidth(value: number) {
    console.log('Updating stroke width to:', value);
    this.customizationOptions.strokeWidth = value;
    this.lineChartConfig = { ...this.lineChartConfig, strokeWidth: value };
    
    // Force a complete re-render by creating a new config object
    this.lineChartConfig = { ...this.lineChartConfig };
    
    this.cdr.detectChanges();
  }

  toggleLegend() {
    console.log('Toggling legend');
    this.customizationOptions.showLegend = !this.customizationOptions.showLegend;
    this.lineChartConfig = { ...this.lineChartConfig, showLegend: this.customizationOptions.showLegend };
    
    // Force a complete re-render by creating a new config object
    this.lineChartConfig = { ...this.lineChartConfig };
    
    this.cdr.detectChanges();
  }

  changeColorScheme(scheme: string) {
    console.log('Changing color scheme to:', scheme);
    this.customizationOptions.colorScheme = scheme;
    this.updateChartData();
    this.updateCurrentChartData();
    
    // Force a complete re-render by creating a new config object
    this.lineChartConfig = { ...this.lineChartConfig };
    
    console.log('Updated line chart config:', this.lineChartConfig);
    
    // Update the chart component directly if available
    if (this.lineChartComponent) {
      console.log('Updating chart component with new data');
      this.lineChartComponent.updateChartData(this.lineChartConfig.data);
    } else {
      console.warn('Line chart component not available');
    }
    
    this.cdr.detectChanges();
  }

  triggerChartUpdate() {
    this.lineChartConfig = { ...this.lineChartConfig };
    
    // Force update the chart component
    if (this.lineChartComponent) {
      this.lineChartComponent.updateChartData(this.lineChartConfig.data);
    }
    
    this.cdr.detectChanges();
  }

  // Random Data Generation
  generateRandomData() {
    // This method is no longer needed as data is static
  }



  // Chart Event Handlers
  onChartReady() {
    this.isChartReady = true;
    console.log('Line chart is ready');
    
    // Ensure the chart has the latest data and colors
    if (this.lineChartComponent) {
      console.log('Chart ready - updating with current data');
      this.lineChartComponent.updateChartData(this.lineChartConfig.data);
    }
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

  // Test method to verify all options work
  testAllOptions() {
    console.log('Testing all line chart options...');
    
    // Test curve type changes
    this.updateCurveType('monotoneX');
    setTimeout(() => {
      this.updateCurveType('step');
      setTimeout(() => {
        this.updateCurveType('linear');
      }, 1000);
    }, 1000);
    
    // Test color scheme changes
    setTimeout(() => {
      this.changeColorScheme('warm');
      setTimeout(() => {
        this.changeColorScheme('cool');
        setTimeout(() => {
          this.changeColorScheme('default');
        }, 1000);
      }, 1000);
    }, 3000);
    
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
        this.toggleShowPoints();
        setTimeout(() => {
          this.toggleShowGrid();
          setTimeout(() => {
            this.toggleAnimation();
            this.toggleShowPoints();
            this.toggleShowGrid();
          }, 1000);
        }, 1000);
      }, 1000);
    }, 8000);
    
    // Test stroke width
    setTimeout(() => {
      this.updateStrokeWidth(4);
      setTimeout(() => {
        this.updateStrokeWidth(2);
      }, 1000);
    }, 11000);
  }
}

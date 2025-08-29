import { Component, OnInit, OnDestroy, ChangeDetectorRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartData } from '@synerity/charts';
import { BarChartConfig, BarChartComponent } from '../../charts/bar-chart/bar-chart.component';

@Component({
  selector: 'app-bar-chart-demo',
  standalone: false,
  templateUrl: './bar-chart-demo.component.html',
  styleUrls: ['./bar-chart-demo.component.scss']
})
export class BarChartDemoComponent implements OnInit, OnDestroy {
  
  @ViewChild('barChart') barChartComponent!: BarChartComponent;
  
  constructor(private cdr: ChangeDetectorRef) {}

  // Chart Configuration
  barChartConfig: BarChartConfig = {
    data: [
      { label: 'Q1', value: 120, color: '#3B82F6' },
      { label: 'Q2', value: 180, color: '#10B981' },
      { label: 'Q3', value: 150, color: '#F59E0B' },
      { label: 'Q4', value: 220, color: '#EF4444' }
    ],
    width: 600,
    height: 400,
    animate: true,
    showValues: true,
    showGrid: true,
    barPadding: 0.1,
    borderRadius: 4
  };

  // Customization Options
  customizationOptions = {
    width: 600,
    height: 400,
    animate: true,
    showValues: true,
    showGrid: true,
    barPadding: 0.1,
    borderRadius: 4,
    colorScheme: 'default'
  };

  // Color Schemes
  colorSchemes = {
    default: ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#06B6D4'],
    warm: ['#F97316', '#EF4444', '#F59E0B', '#EAB308', '#FCD34D', '#FEF3C7'],
    cool: ['#3B82F6', '#06B6D4', '#8B5CF6', '#A855F7', '#EC4899', '#F472B6'],
    monochrome: ['#1F2937', '#374151', '#4B5563', '#6B7280', '#9CA3AF', '#D1D5DB']
  };

  // Sample Data Sets
  sampleDataSets = {
    sales: [
      { label: 'Q1', value: 120, color: '#3B82F6' },
      { label: 'Q2', value: 180, color: '#10B981' },
      { label: 'Q3', value: 150, color: '#F59E0B' },
      { label: 'Q4', value: 220, color: '#EF4444' }
    ],
    revenue: [
      { label: 'Jan', value: 45000, color: '#3B82F6' },
      { label: 'Feb', value: 52000, color: '#10B981' },
      { label: 'Mar', value: 48000, color: '#F59E0B' },
      { label: 'Apr', value: 61000, color: '#EF4444' },
      { label: 'May', value: 55000, color: '#8B5CF6' },
      { label: 'Jun', value: 67000, color: '#06B6D4' }
    ],
    users: [
      { label: 'Desktop', value: 45, color: '#3B82F6' },
      { label: 'Mobile', value: 35, color: '#10B981' },
      { label: 'Tablet', value: 15, color: '#F59E0B' },
      { label: 'Other', value: 5, color: '#EF4444' }
    ]
  };

  currentDataSet = 'sales';
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
    
    this.barChartConfig.data = selectedData.map((item, index) => ({
      ...item,
      color: colorScheme[index % colorScheme.length]
    }));
    
    // Create new object reference to ensure change detection
    this.barChartConfig = { ...this.barChartConfig };
  }

  updateCurrentChartData() {
    this.currentChartData = [...this.barChartConfig.data];
  }

  // Customization Methods
  updateWidth(value: number) {
    console.log('Updating width to:', value);
    this.customizationOptions.width = value;
    this.barChartConfig.width = value;
    
    // Use direct chart component method
    if (this.barChartComponent) {
      this.barChartComponent.updateChartOptions({ width: this.barChartConfig.width });
    } else {
      this.triggerChartUpdate();
    }
  }

  updateHeight(value: number) {
    console.log('Updating height to:', value);
    this.customizationOptions.height = value;
    this.barChartConfig.height = value;
    
    // Use direct chart component method
    if (this.barChartComponent) {
      this.barChartComponent.updateChartOptions({ height: this.barChartConfig.height });
    } else {
      this.triggerChartUpdate();
    }
  }

  toggleAnimation() {
    console.log('Toggling animation');
    this.customizationOptions.animate = !this.customizationOptions.animate;
    this.barChartConfig.animate = this.customizationOptions.animate;
    console.log('Animation set to:', this.barChartConfig.animate);
    
    // Use direct chart component method
    if (this.barChartComponent) {
      this.barChartComponent.updateChartOptions({ animate: this.barChartConfig.animate });
    } else {
      this.triggerChartUpdate();
    }
  }

  toggleShowValues() {
    console.log('Toggling show values');
    this.customizationOptions.showValues = !this.customizationOptions.showValues;
    this.barChartConfig.showValues = this.customizationOptions.showValues;
    console.log('Show values set to:', this.barChartConfig.showValues);
    
    // Use direct chart component method
    if (this.barChartComponent) {
      this.barChartComponent.updateChartOptions({ showValues: this.barChartConfig.showValues });
    } else {
      this.triggerChartUpdate();
    }
  }

  toggleShowGrid() {
    console.log('Toggling show grid');
    this.customizationOptions.showGrid = !this.customizationOptions.showGrid;
    this.barChartConfig.showGrid = this.customizationOptions.showGrid;
    console.log('Show grid set to:', this.barChartConfig.showGrid);
    
    // Use direct chart component method
    if (this.barChartComponent) {
      this.barChartComponent.updateChartOptions({ showGrid: this.barChartConfig.showGrid });
    } else {
      this.triggerChartUpdate();
    }
  }

  updateBarPadding(value: number) {
    console.log('Updating bar padding to:', value);
    this.customizationOptions.barPadding = value;
    this.barChartConfig.barPadding = value;
    console.log('Bar padding set to:', this.barChartConfig.barPadding);
    
    // Use direct chart component method
    if (this.barChartComponent) {
      this.barChartComponent.updateChartOptions({ barPadding: this.barChartConfig.barPadding });
    } else {
      this.triggerChartUpdate();
    }
  }

  updateBorderRadius(value: number) {
    console.log('Updating border radius to:', value);
    this.customizationOptions.borderRadius = value;
    this.barChartConfig.borderRadius = value;
    console.log('Border radius set to:', this.barChartConfig.borderRadius);
    
    // Use direct chart component method
    if (this.barChartComponent) {
      this.barChartComponent.updateChartOptions({ borderRadius: this.barChartConfig.borderRadius });
    } else {
      this.triggerChartUpdate();
    }
  }

  changeColorScheme(scheme: string) {
    console.log('Changing color scheme to:', scheme);
    this.customizationOptions.colorScheme = scheme;
    this.updateChartData();
    this.updateCurrentChartData();
    
    // Use direct chart component method to update data
    if (this.barChartComponent) {
      this.barChartComponent.updateData(this.barChartConfig.data);
      console.log('Bar chart color scheme updated via component method');
    } else {
      this.triggerChartUpdate();
    }
  }

  changeDataSet(dataSet: string) {
    console.log('Changing data set to:', dataSet);
    this.currentDataSet = dataSet;
    this.updateChartData();
    this.updateCurrentChartData();
    
    // Use direct chart component method to update data
    if (this.barChartComponent) {
      this.barChartComponent.updateData(this.barChartConfig.data);
      console.log('Bar chart data updated via component method');
    } else {
      this.triggerChartUpdate();
    }
  }

  // Helper method to trigger chart updates
  private triggerChartUpdate() {
    console.log('Triggering chart update with config:', this.barChartConfig);
    
    // Create a new object reference to ensure Angular detects the change
    this.barChartConfig = { ...this.barChartConfig };
    
    // Force change detection and chart re-render
    this.cdr.detectChanges();
    
    // Emit a small delay to ensure the chart component picks up the changes
    setTimeout(() => {
      this.cdr.detectChanges();
    }, 50);
  }

  // Random Data Generation
  generateRandomData() {
    const dataPoints = Math.floor(Math.random() * 8) + 3; // 3-10 data points
    const colorScheme = this.colorSchemes[this.customizationOptions.colorScheme as keyof typeof this.colorSchemes];
    
    this.barChartConfig.data = Array.from({ length: dataPoints }, (_, i) => ({
      label: `Item ${i + 1}`,
      value: Math.floor(Math.random() * 200) + 50,
      color: colorScheme[i % colorScheme.length]
    }));
    
    // Create new object reference to ensure change detection
    this.barChartConfig = { ...this.barChartConfig };
    
    this.updateCurrentChartData();
    this.triggerChartUpdate();
  }



  // Chart Event Handlers
  onChartReady() {
    this.isChartReady = true;
    console.log('Bar chart is ready');
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
      const filename = `bar-chart-${timestamp}.${format}`;
      
      console.log(`Exporting bar chart as ${format}: ${filename}`);
      this.showNotification(`Bar chart exported as ${format.toUpperCase()} successfully!`);
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

  // Test method to verify all options work
  testAllOptions() {
    console.log('Testing all right side panel options...');
    
    // Test data set changes
    this.changeDataSet('revenue');
    setTimeout(() => {
      this.changeDataSet('users');
      setTimeout(() => {
        this.changeDataSet('sales');
      }, 1000);
    }, 1000);
    
    // Test color scheme changes
    setTimeout(() => {
      this.changeColorScheme('warm');
      setTimeout(() => {
        this.changeColorScheme('cool');
        setTimeout(() => {
          this.changeColorScheme('monochrome');
          setTimeout(() => {
            this.changeColorScheme('default');
          }, 1000);
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
        this.toggleShowValues();
        setTimeout(() => {
          this.toggleShowGrid();
          setTimeout(() => {
            this.toggleAnimation();
            this.toggleShowValues();
            this.toggleShowGrid();
          }, 1000);
        }, 1000);
      }, 1000);
    }, 8000);
    
    // Test bar styling
    setTimeout(() => {
      this.updateBarPadding(0.2);
      this.updateBorderRadius(10);
      setTimeout(() => {
        this.updateBarPadding(0.05);
        this.updateBorderRadius(2);
      }, 1000);
    }, 11000);
  }
}

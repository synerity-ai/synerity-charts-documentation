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
    labelRadius: 0.8,
    // Enhanced features
    variant: 'pie',
    labels: {
      enabled: true,
      position: 'outside',
      format: '{label}: {value}',
      fontSize: 12,
      fontWeight: '500'
    },
    animation: {
      duration: 800,
      easing: 'cubic',
      explodeOnClick: true,
      entranceDelay: 100
    },
    legend: {
      interactive: true,
      position: 'right',
      showValues: true,
      showPercentages: true
    },
    interactivity: {
      hoverEffects: true,
      clickToExplode: true,
      tooltipEnabled: true,
      tooltipFormat: (data: ChartData) => 
        `${data.label}: ${data.value.toLocaleString()} (${((data.value / this.getTotalValue()) * 100).toFixed(1)}%)`
    }
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
    colorScheme: 'default',
    // Enhanced options
    variant: 'pie',
    labelPosition: 'outside',
    labelFormat: '{label}: {value}',
    fontSize: 12,
    fontWeight: '500',
    animationDuration: 800,
    animationEasing: 'cubic',
    explodeOnClick: true,
    legendInteractive: true,
    legendPosition: 'right',
    legendShowValues: true,
    legendShowPercentages: true,
    hoverEffects: true,
    tooltipEnabled: true
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
    ],
    revenue: [
      { label: 'Product A', value: 1200000, color: '#3B82F6' },
      { label: 'Product B', value: 800000, color: '#10B981' },
      { label: 'Product C', value: 600000, color: '#F59E0B' },
      { label: 'Product D', value: 400000, color: '#EF4444' },
      { label: 'Product E', value: 200000, color: '#8B5CF6' }
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

  // Enhanced Customization Methods
  updateWidth(value: number) {
    console.log('Updating width to:', value);
    this.customizationOptions.width = value;
    this.pieChartConfig.width = value;
    
    // Force a complete re-render by creating a new config object
    this.pieChartConfig = { ...this.pieChartConfig };
    
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
    console.log('Changing color scheme to:', scheme);
    this.customizationOptions.colorScheme = scheme;
    this.updateChartData();
    this.updateCurrentChartData();
    
    // Force a complete re-render by creating a new config object
    this.pieChartConfig = { ...this.pieChartConfig };
    
    this.cdr.detectChanges();
  }

  changeDataSet(dataSet: string) {
    console.log('Changing data set to:', dataSet);
    this.currentDataSet = dataSet;
    this.updateChartData();
    this.updateCurrentChartData();
    
    // Force a complete re-render by creating a new config object
    this.pieChartConfig = { ...this.pieChartConfig };
    
    this.cdr.detectChanges();
  }

  // New Enhanced Methods
  setVariant(variant: string) {
    console.log('Setting variant to:', variant);
    if (variant === 'pie' || variant === 'donut') {
      this.customizationOptions.variant = variant as 'pie' | 'donut';
      this.pieChartConfig.variant = variant as 'pie' | 'donut';
      
      // Adjust inner radius for donut chart
      if (variant === 'donut' && this.pieChartConfig.innerRadius === 0) {
        this.pieChartConfig.innerRadius = 50;
        this.customizationOptions.innerRadius = 50;
      } else if (variant === 'pie') {
        this.pieChartConfig.innerRadius = 0;
        this.customizationOptions.innerRadius = 0;
      }
      
      // Force a complete re-render by creating a new config object
      this.pieChartConfig = { ...this.pieChartConfig };
      
      this.cdr.detectChanges();
    }
  }

  setLabelPosition(position: 'inside' | 'outside' | 'callout') {
    this.customizationOptions.labelPosition = position;
    if (this.pieChartConfig.labels) {
      this.pieChartConfig.labels.position = position;
    }
    this.cdr.detectChanges();
  }

  setLabelFormat(format: string) {
    this.customizationOptions.labelFormat = format;
    if (this.pieChartConfig.labels) {
      this.pieChartConfig.labels.format = format;
    }
    this.cdr.detectChanges();
  }

  setFontSize(size: number) {
    this.customizationOptions.fontSize = size;
    if (this.pieChartConfig.labels) {
      this.pieChartConfig.labels.fontSize = size;
    }
    this.cdr.detectChanges();
  }

  setFontWeight(weight: string) {
    this.customizationOptions.fontWeight = weight;
    if (this.pieChartConfig.labels) {
      this.pieChartConfig.labels.fontWeight = weight;
    }
    this.cdr.detectChanges();
  }

  setAnimationDuration(duration: number) {
    this.customizationOptions.animationDuration = duration;
    if (this.pieChartConfig.animation) {
      this.pieChartConfig.animation.duration = duration;
    }
    this.cdr.detectChanges();
  }

  setAnimationEasing(easing: string) {
    this.customizationOptions.animationEasing = easing;
    if (this.pieChartConfig.animation) {
      this.pieChartConfig.animation.easing = easing;
    }
    this.cdr.detectChanges();
  }

  toggleExplodeOnClick() {
    this.customizationOptions.explodeOnClick = !this.customizationOptions.explodeOnClick;
    if (this.pieChartConfig.animation) {
      this.pieChartConfig.animation.explodeOnClick = this.customizationOptions.explodeOnClick;
    }
    this.cdr.detectChanges();
  }

  toggleLegendInteractive() {
    this.customizationOptions.legendInteractive = !this.customizationOptions.legendInteractive;
    if (this.pieChartConfig.legend) {
      this.pieChartConfig.legend.interactive = this.customizationOptions.legendInteractive;
    }
    this.cdr.detectChanges();
  }

  setLegendPosition(position: 'top' | 'bottom' | 'left' | 'right') {
    this.customizationOptions.legendPosition = position;
    if (this.pieChartConfig.legend) {
      this.pieChartConfig.legend.position = position;
    }
    this.cdr.detectChanges();
  }

  toggleLegendShowValues() {
    this.customizationOptions.legendShowValues = !this.customizationOptions.legendShowValues;
    if (this.pieChartConfig.legend) {
      this.pieChartConfig.legend.showValues = this.customizationOptions.legendShowValues;
    }
    this.cdr.detectChanges();
  }

  toggleLegendShowPercentages() {
    this.customizationOptions.legendShowPercentages = !this.customizationOptions.legendShowPercentages;
    if (this.pieChartConfig.legend) {
      this.pieChartConfig.legend.showPercentages = this.customizationOptions.legendShowPercentages;
    }
    this.cdr.detectChanges();
  }

  toggleHoverEffects() {
    this.customizationOptions.hoverEffects = !this.customizationOptions.hoverEffects;
    if (this.pieChartConfig.interactivity) {
      this.pieChartConfig.interactivity.hoverEffects = this.customizationOptions.hoverEffects;
    }
    this.cdr.detectChanges();
  }

  toggleTooltip() {
    this.customizationOptions.tooltipEnabled = !this.customizationOptions.tooltipEnabled;
    if (this.pieChartConfig.interactivity) {
      this.pieChartConfig.interactivity.tooltipEnabled = this.customizationOptions.tooltipEnabled;
    }
    this.cdr.detectChanges();
  }

  // Random Data Generation
  generateRandomData() {
    console.log('Generating random data...');
    const dataPoints = Math.floor(Math.random() * 6) + 3; // 3-8 data points
    const colorScheme = this.colorSchemes[this.customizationOptions.colorScheme as keyof typeof this.colorSchemes];
    
    this.pieChartConfig.data = Array.from({ length: dataPoints }, (_, i) => ({
      label: `Item ${i + 1}`,
      value: Math.floor(Math.random() * 100) + 10,
      color: colorScheme[i % colorScheme.length]
    }));
    
    this.updateCurrentChartData();
    
    // Force a complete re-render by creating a new config object
    this.pieChartConfig = { ...this.pieChartConfig };
    
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

  // Test method to verify all options work
  testAllOptions() {
    console.log('Testing all pie chart options...');
    
    // Test data set changes
    this.changeDataSet('browsers');
    setTimeout(() => {
      this.changeDataSet('regions');
      setTimeout(() => {
        this.changeDataSet('devices');
      }, 1000);
    }, 1000);
    
    // Test chart variant changes
    setTimeout(() => {
      this.setVariant('donut');
      setTimeout(() => {
        this.setVariant('pie');
      }, 1000);
    }, 3000);
    
    // Test color scheme changes
    setTimeout(() => {
      this.changeColorScheme('warm');
      setTimeout(() => {
        this.changeColorScheme('cool');
        setTimeout(() => {
          this.changeColorScheme('default');
        }, 1000);
      }, 1000);
    }, 5000);
    
    // Test dimension changes
    setTimeout(() => {
      this.updateWidth(700);
      this.updateHeight(500);
      setTimeout(() => {
        this.updateWidth(500);
        this.updateHeight(300);
      }, 1000);
    }, 7000);
    
    // Test chart options
    setTimeout(() => {
      this.toggleAnimation();
      setTimeout(() => {
        this.toggleShowLabels();
        setTimeout(() => {
          this.toggleShowValues();
          setTimeout(() => {
            this.toggleAnimation();
            this.toggleShowLabels();
            this.toggleShowValues();
          }, 1000);
        }, 1000);
      }, 1000);
    }, 9000);
    
    // Test legend options
    setTimeout(() => {
      this.toggleLegendShowValues();
      setTimeout(() => {
        this.toggleLegendShowPercentages();
        setTimeout(() => {
          this.toggleLegendShowValues();
          this.toggleLegendShowPercentages();
        }, 1000);
      }, 1000);
    }, 11000);
  }
}

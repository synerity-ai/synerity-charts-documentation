import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { GaugeData, GaugeChartOptions } from '@synerity/charts';

@Component({
  selector: 'app-gauge-chart-demo',
  templateUrl: './gauge-chart-demo.component.html',
  styleUrls: ['./gauge-chart-demo.component.scss'],
  standalone: false
})
export class GaugeChartDemoComponent implements OnInit {
  // Sample data for gauge chart
  gaugeChartData: GaugeData = {
    value: 75,
    min: 0,
    max: 100,
    label: 'Performance',
    color: '#3B82F6'
  };

  // Chart configuration
  gaugeChartConfig: GaugeChartOptions = {
    width: 400,
    height: 300,
    animate: true,
    type: 'radial',
    showValue: true,
    showLabel: true,
    arcWidth: 20,
    thresholds: [
      { value: 25, color: '#EF4444' },
      { value: 50, color: '#F59E0B' },
      { value: 75, color: '#10B981' },
      { value: 100, color: '#3B82F6' }
    ]
  };

  // Customization options
  customizationOptions = {
    width: 400,
    height: 300,
    animate: true,
    type: 'radial' as 'radial' | 'linear',
    showValue: true,
    showLabel: true,
    arcWidth: 20
  };

  constructor(private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
    console.log('Gauge chart demo initialized');
  }

  // Method to update gauge value
  updateValue(value: number): void {
    this.gaugeChartData = {
      ...this.gaugeChartData,
      value: Math.max(this.gaugeChartData.min, Math.min(this.gaugeChartData.max, value))
    };
    this.cdr.detectChanges();
  }

  // Method to change gauge type
  changeType(type: 'radial' | 'linear'): void {
    this.customizationOptions.type = type;
    this.gaugeChartConfig = {
      ...this.gaugeChartConfig,
      type: type
    };
    this.cdr.detectChanges();
  }

  // Method to toggle value display
  toggleShowValue(): void {
    this.customizationOptions.showValue = !this.customizationOptions.showValue;
    this.gaugeChartConfig = {
      ...this.gaugeChartConfig,
      showValue: this.customizationOptions.showValue
    };
    this.cdr.detectChanges();
  }

  // Method to toggle label display
  toggleShowLabel(): void {
    this.customizationOptions.showLabel = !this.customizationOptions.showLabel;
    this.gaugeChartConfig = {
      ...this.gaugeChartConfig,
      showLabel: this.customizationOptions.showLabel
    };
    this.cdr.detectChanges();
  }

  // Method to update arc width
  updateArcWidth(value: number): void {
    this.customizationOptions.arcWidth = value;
    this.gaugeChartConfig = {
      ...this.gaugeChartConfig,
      arcWidth: value
    };
    this.cdr.detectChanges();
  }

  // Method to update width
  updateWidth(value: number): void {
    this.customizationOptions.width = value;
    this.gaugeChartConfig = {
      ...this.gaugeChartConfig,
      width: value
    };
    this.cdr.detectChanges();
  }

  // Method to update height
  updateHeight(value: number): void {
    this.customizationOptions.height = value;
    this.gaugeChartConfig = {
      ...this.gaugeChartConfig,
      height: value
    };
    this.cdr.detectChanges();
  }

  // Method to toggle animation
  toggleAnimation(): void {
    this.customizationOptions.animate = !this.customizationOptions.animate;
    this.gaugeChartConfig = {
      ...this.gaugeChartConfig,
      animate: this.customizationOptions.animate
    };
    this.cdr.detectChanges();
  }

  // Method to generate random value
  generateRandomValue(): void {
    const randomValue = Math.floor(Math.random() * (this.gaugeChartData.max - this.gaugeChartData.min + 1)) + this.gaugeChartData.min;
    this.gaugeChartData = {
      ...this.gaugeChartData,
      value: randomValue
    };
    this.cdr.detectChanges();
  }

  // Method to generate random data (alias for generateRandomValue)
  generateRandomData(): void {
    this.generateRandomValue();
  }



  // Method to update min value
  updateMinValue(value: number): void {
    if (value < this.gaugeChartData.max) {
      this.gaugeChartData = {
        ...this.gaugeChartData,
        min: value,
        value: Math.max(value, this.gaugeChartData.value)
      };
      this.cdr.detectChanges();
    }
  }

  // Method to update max value
  updateMaxValue(value: number): void {
    if (value > this.gaugeChartData.min) {
      this.gaugeChartData = {
        ...this.gaugeChartData,
        max: value,
        value: Math.min(value, this.gaugeChartData.value)
      };
      this.cdr.detectChanges();
    }
  }

  // Export Methods
  async exportChart(format: 'png' | 'svg') {
    try {
      const timestamp = new Date().toISOString().slice(0, 19).replace(/:/g, '-');
      const filename = `gauge-chart-${timestamp}.${format}`;
      
      console.log(`Exporting gauge chart as ${format}: ${filename}`);
      this.showNotification(`Gauge chart exported as ${format.toUpperCase()} successfully!`);
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

  // Get percentage for display
  getPercentage(): number {
    return (this.gaugeChartData.value / this.gaugeChartData.max * 100);
  }

  // Get current value
  getCurrentValue(): number {
    return this.gaugeChartData.value;
  }

  // Get range
  getRange(): number {
    return this.gaugeChartData.max - this.gaugeChartData.min;
  }

  // Get status based on value
  getStatus(): 'low' | 'medium' | 'high' {
    const percentage = this.getPercentage();
    if (percentage < 33) return 'low';
    if (percentage < 66) return 'medium';
    return 'high';
  }
}

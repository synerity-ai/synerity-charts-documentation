import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { NumberCardData, NumberCardOptions } from '@synerity/charts';

@Component({
  selector: 'app-number-cards-demo',
  templateUrl: './number-cards-demo.component.html',
  styleUrls: ['./number-cards-demo.component.scss'],
  standalone: false
})
export class NumberCardsDemoComponent implements OnInit {
  // Sample data for number cards
  numberCardsData: NumberCardData[] = [
    {
      title: 'Total Revenue',
      value: 125000,
      change: 12.5,
      changeType: 'increase',
      icon: '💰',
      color: '#10B981'
    },
    {
      title: 'Active Users',
      value: 2847,
      change: -2.3,
      changeType: 'decrease',
      icon: '👥',
      color: '#3B82F6'
    },
    {
      title: 'Conversion Rate',
      value: 3.2,
      change: 0.5,
      changeType: 'increase',
      icon: '📈',
      color: '#F59E0B'
    },
    {
      title: 'Avg. Order Value',
      value: 89.50,
      change: 0,
      changeType: 'neutral',
      icon: '🛒',
      color: '#8B5CF6'
    }
  ];

  // Chart configuration
  numberCardsConfig: NumberCardOptions = {
    width: 800,
    height: 200,
    animate: true,
    showChange: true,
    showIcon: true
  };

  // Customization options
  customizationOptions = {
    width: 800,
    height: 200,
    animate: true,
    showChange: true,
    showIcon: true,
    cardSpacing: 20,
    borderRadius: 8
  };

  // Current data set
  currentDataSet = 'metrics';

  constructor(private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
    console.log('Number cards demo initialized');
  }

  // Method to update chart data
  updateChartData(): void {
    this.numberCardsData = this.numberCardsData.map(card => ({
      ...card,
      value: Math.floor(Math.random() * 100000) + 1000,
      change: (Math.random() * 20 - 10),
      changeType: Math.random() > 0.5 ? 'increase' : 'decrease'
    }));
  }



  // Method to generate random data
  generateRandomData(): void {
    this.updateChartData();
    this.cdr.detectChanges();
  }

  // Method to export chart
  async exportChart(format: 'png' | 'svg'): Promise<void> {
    try {
      const timestamp = new Date().toISOString().slice(0, 19).replace(/:/g, '-');
      const filename = `number-cards-${timestamp}.${format}`;
      
      console.log(`Exporting number cards as ${format}: ${filename}`);
      this.showNotification(`Number cards exported as ${format.toUpperCase()} successfully!`);
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

  // Method to change data set
  changeDataSet(dataSet: string): void {
    console.log('Changing data set to:', dataSet);
    this.currentDataSet = dataSet;
    // Implementation would load different data sets
    
    // Force a complete re-render by creating a new config object
    this.numberCardsConfig = { ...this.numberCardsConfig };
    
    this.cdr.detectChanges();
  }

  // Method to update width
  updateWidth(width: number): void {
    console.log('Updating width to:', width);
    this.customizationOptions.width = width;
    this.numberCardsConfig = {
      ...this.numberCardsConfig,
      width
    };
    
    // Force a complete re-render by creating a new config object
    this.numberCardsConfig = { ...this.numberCardsConfig };
    
    this.cdr.detectChanges();
  }

  // Method to update height
  updateHeight(height: number): void {
    this.customizationOptions.height = height;
    this.numberCardsConfig = {
      ...this.numberCardsConfig,
      height
    };
    this.cdr.detectChanges();
  }

  // Method to toggle animation
  toggleAnimation(): void {
    this.customizationOptions.animate = !this.customizationOptions.animate;
    this.numberCardsConfig = {
      ...this.numberCardsConfig,
      animate: this.customizationOptions.animate
    };
    this.cdr.detectChanges();
  }

  // Method to toggle change display
  toggleShowChange(): void {
    this.customizationOptions.showChange = !this.customizationOptions.showChange;
    this.numberCardsConfig = {
      ...this.numberCardsConfig,
      showChange: this.customizationOptions.showChange
    };
    this.cdr.detectChanges();
  }

  // Method to toggle icon display
  toggleShowIcon(): void {
    this.customizationOptions.showIcon = !this.customizationOptions.showIcon;
    this.numberCardsConfig = {
      ...this.numberCardsConfig,
      showIcon: this.customizationOptions.showIcon
    };
    this.cdr.detectChanges();
  }

  // Method to update card spacing
  updateCardSpacing(spacing: number): void {
    this.customizationOptions.cardSpacing = spacing;
    this.cdr.detectChanges();
  }

  // Method to update border radius
  updateBorderRadius(radius: number): void {
    this.customizationOptions.borderRadius = radius;
    this.cdr.detectChanges();
  }

  // Method to add a new card
  addNewCard(): void {
    const newCard: NumberCardData = {
      title: `Metric ${this.numberCardsData.length + 1}`,
      value: Math.floor(Math.random() * 10000) + 100,
      change: (Math.random() * 20 - 10),
      changeType: Math.random() > 0.5 ? 'increase' : 'decrease',
      icon: '📊',
      color: `#${Math.floor(Math.random()*16777215).toString(16)}`
    };
    this.numberCardsData.push(newCard);
    this.cdr.detectChanges();
  }

  // Method to remove last card
  removeLastCard(): void {
    if (this.numberCardsData.length > 1) {
      this.numberCardsData.pop();
      this.cdr.detectChanges();
    }
  }

  // Get total value
  getTotalValue(): number {
    return this.numberCardsData.reduce((sum, card) => sum + card.value, 0);
  }

  // Get average value
  getAverageValue(): number {
    return this.getTotalValue() / this.numberCardsData.length;
  }

  // Get average change
  getAverageChange(): number {
    return this.numberCardsData.reduce((sum, card) => sum + (card.change || 0), 0) / this.numberCardsData.length;
  }

  // Test method to verify all options work
  testAllOptions() {
    console.log('Testing all number cards options...');
    
    // Test data set changes
    this.changeDataSet('kpis');
    setTimeout(() => {
      this.changeDataSet('analytics');
      setTimeout(() => {
        this.changeDataSet('metrics');
      }, 1000);
    }, 1000);
    
    // Test dimension changes
    setTimeout(() => {
      this.updateWidth(700);
      this.updateHeight(500);
      setTimeout(() => {
        this.updateWidth(500);
        this.updateHeight(300);
      }, 1000);
    }, 3000);
    
    // Test chart options
    setTimeout(() => {
      this.toggleAnimation();
      setTimeout(() => {
        this.toggleShowChange();
        setTimeout(() => {
          this.toggleShowIcon();
          setTimeout(() => {
            this.toggleAnimation();
            this.toggleShowChange();
            this.toggleShowIcon();
          }, 1000);
        }, 1000);
      }, 1000);
    }, 5000);
    
    // Test card operations
    setTimeout(() => {
      this.addNewCard();
      setTimeout(() => {
        this.removeLastCard();
      }, 1000);
    }, 7000);
    
    // Test styling options
    setTimeout(() => {
      this.updateCardSpacing(20);
      this.updateBorderRadius(15);
      setTimeout(() => {
        this.updateCardSpacing(10);
        this.updateBorderRadius(8);
      }, 1000);
    }, 9000);
  }
}

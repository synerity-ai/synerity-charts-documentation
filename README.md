# @synerity/charts - Documentation & Demo Application

A modern, enterprise-level Angular application showcasing the @synerity/charts library with interactive demos, comprehensive documentation, and real-time chart customization. Features 11 chart types with beautiful animations and export functionality.

## 🚀 Live Demo

Visit the live documentation at: [https://synerity-ai.github.io/synerity-charts-documentation](https://synerity-ai.github.io/synerity-charts-documentation)

## 📊 Chart Types

### Interactive Demos
- **Bar Charts** - Interactive bar charts with animations and data visualization
- **Line Charts** - Time series charts with trend analysis and growth rate calculations
- **Pie Charts** - Proportional data visualization with labels and values
- **Area Charts** - Filled area charts with stacked and normalized options
- **Bubble Charts** - Multi-dimensional data visualization with size/color coding
- **Gauge Charts** - Radial and linear gauges with threshold-based coloring
- **Heatmap Charts** - Color-coded matrices with multiple color scales
- **Treemap Charts** - Hierarchical data visualization with nested rectangles
- **Number Cards** - Key metrics display with change indicators
- **Sankey Diagrams** - Flow visualization between nodes
- **Scatter Plots** - Correlation analysis with trend lines and point clustering

### Features
- **Real-time Customization** - Live chart updates with interactive controls
- **Export Functionality** - PNG, SVG, PDF, CSV, and JSON export options
- **Responsive Design** - Mobile-first responsive design
- **Enterprise UI** - Professional design with Tailwind CSS
- **Performance Optimized** - Efficient rendering and memory management

## 🛠️ Technology Stack

- **Frontend Framework**: Angular 19
- **Styling**: Tailwind CSS 3.x
- **Charts Library**: [@synerity/charts](https://github.com/synerity-ai/charts)
- **Build Tool**: Angular CLI
- **Package Manager**: npm
- **TypeScript**: 5.7.x

## 📦 Installation

### Prerequisites
- Node.js 18+ 
- npm 9+
- Angular CLI 19+

### Setup Instructions

1. **Clone the repository**
   ```bash
   git clone https://github.com/synerity-ai/synerity-charts-documentation.git
   cd synerity-charts-documentation
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   ```

4. **Open your browser**
   Navigate to `http://localhost:4200`

## 🏗️ Project Structure

```
synerity-charts-documentation/
├── src/
│   ├── app/
│   │   ├── charts/                    # Chart components
│   │   │   ├── bar-chart/            # Bar chart component
│   │   │   ├── line-chart/           # Line chart component
│   │   │   ├── pie-chart/            # Pie chart component
│   │   │   └── charts.module.ts      # Charts module
│   │   ├── chart-demos/              # Demo components
│   │   │   ├── bar-chart-demo/       # Bar chart demo
│   │   │   ├── line-chart-demo/      # Line chart demo
│   │   │   └── chart-demos.module.ts # Demo module
│   │   ├── sidebar/                  # Navigation sidebar
│   │   ├── app.component.ts          # Root component
│   │   └── app.config.ts
│   ├── styles.scss                   # Global styles with Tailwind
│   └── main.ts
├── tailwind.config.js               # Tailwind configuration
├── package.json
└── README.md
```

## 🎨 Design System

### Color Palette
The application uses a carefully crafted color palette inspired by Tailwind CSS:

- **Primary Colors**: Blue shades for main actions and branding
- **Secondary Colors**: Green shades for success states and positive metrics
- **Accent Colors**: Yellow/Amber shades for warnings and highlights
- **Neutral Colors**: Gray shades for text, borders, and backgrounds

### Typography
- **Font Family**: Inter (Google Fonts)
- **Font Weights**: 300, 400, 500, 600, 700
- **Responsive**: Scales appropriately across device sizes

## 📊 Chart Components

### Bar Chart Demo
**Features**:
- Interactive bar visualization with real-time data updates
- Statistical analysis (total, average, max, min)
- Data table with percentages
- Export functionality
- Tabbed interface with Demo, Documentation, and How To Use sections

**Customization Options**:
- Chart dimensions (width/height)
- Animation toggle
- Show/hide values and grid
- Bar padding and border radius
- Real-time data generation

### Line Chart Demo
**Features**:
- Time series visualization with trend analysis
- Growth rate calculation
- Interactive data points
- Smooth curve interpolation
- Change tracking between data points

### Pie Chart Demo
**Features**:
- Proportional data visualization
- Interactive slices with labels
- Value display and percentages
- Color customization
- Export capabilities

## 🔧 Configuration

### Tailwind CSS Configuration
The application uses a custom Tailwind configuration with:

- **Custom Colors**: Primary, secondary, accent, and neutral color palettes
- **Custom Spacing**: Extended spacing scale for better layout control
- **Custom Shadows**: Soft and medium shadow variants
- **Custom Border Radius**: Extended border radius options
- **Custom Font Family**: Inter font integration

### Chart Configuration
Each chart component accepts a configuration object that allows customization of:

- **Dimensions**: Width and height
- **Data**: Chart data with labels, values, and colors
- **Animation**: Enable/disable animations
- **Display Options**: Grid, values, points, etc.
- **Styling**: Colors, padding, border radius, etc.

## 📱 Responsive Design

The application is built with a mobile-first approach:

- **Breakpoints**: 
  - Mobile: < 640px
  - Tablet: 640px - 768px
  - Desktop: > 768px
- **Grid System**: Responsive grid layouts that adapt to screen size
- **Typography**: Responsive font sizes and spacing
- **Charts**: Responsive chart containers with proper scaling

## 🧪 Testing

### Unit Testing
```bash
npm test
```

### Component Testing
Each chart component includes:
- Input property testing
- Output event testing
- Lifecycle method testing
- Error handling testing

### E2E Testing
```bash
npm run e2e
```

## 🚀 Deployment

### Build for Production
```bash
npm run build
```

### Build Analysis
```bash
npm run build -- --stats-json
npm run analyze
```

### GitHub Pages Deployment
This documentation is automatically deployed to GitHub Pages when changes are pushed to the main branch.

## 📈 Performance

### Optimization Features
- **Lazy Loading**: Chart components load on demand
- **Memory Management**: Proper chart destruction and cleanup
- **Efficient Rendering**: Optimized D3.js chart rendering
- **Bundle Optimization**: Tree shaking and code splitting

### Performance Metrics
- **First Contentful Paint**: < 1.5s
- **Largest Contentful Paint**: < 2.5s
- **Cumulative Layout Shift**: < 0.1
- **First Input Delay**: < 100ms

## 🔒 Security

### Security Features
- **Content Security Policy**: Strict CSP headers
- **XSS Protection**: Angular's built-in XSS protection
- **Input Validation**: TypeScript type checking
- **Sanitization**: Angular's DOM sanitization

## 🌐 Browser Support

- **Chrome**: 90+
- **Firefox**: 88+
- **Safari**: 14+
- **Edge**: 90+

## 🤝 Contributing

### Development Workflow
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests
5. Submit a pull request

### Code Standards
- **TypeScript**: Strict mode enabled
- **ESLint**: Code linting and formatting
- **Prettier**: Code formatting
- **Angular Style Guide**: Follow Angular best practices

## 📚 Related Repositories

- **[@synerity/charts](https://github.com/synerity-ai/charts)** - The core chart library
- **[synerity-charts-documentation](https://github.com/synerity-ai/synerity-charts-documentation)** - This documentation site

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

### Documentation
- [Angular Documentation](https://angular.io/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [@synerity/charts Documentation](https://github.com/synerity-ai/charts)

### Issues
For bugs and feature requests, please use the GitHub issue tracker.

### Community
Join our community discussions and get help from other developers.

---

**Built with ❤️ using Angular and Tailwind CSS**

*This is the official documentation and demo application for the @synerity/charts library.*

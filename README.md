# Travel Route Planner

A React-based web application for planning and visualizing travel routes between different destinations. Built with TypeScript, Vite, and modern web technologies.

## 🚀 Features

- **Interactive Route Planning**: Create and visualize travel routes between airports, hotels, and places
- **Multiple Node Types**: Support for airports, countries, hotels, places, and custom nodes
- **Real-time Search**: Search functionality for finding destinations and routes
- **Graph Visualization**: Visual representation of travel connections and routes
- **Responsive Design**: Modern UI that works on desktop and mobile devices
- **TypeScript**: Full type safety and better development experience

## 🛠️ Tech Stack

- **Frontend**: React 18 + TypeScript
- **Build Tool**: Vite
- **Styling**: CSS3 with modern design principles
- **State Management**: React Hooks
- **Graph Management**: Custom graph implementation
- **Package Manager**: npm/yarn

## 📦 Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd travel-route
   ```

2. **Install dependencies**

   ```bash
   npm install
   # or
   yarn install
   ```

3. **Start the development server**

   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173` to view the application

## 🏗️ Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── button/         # Button components
│   ├── controlPanel/   # Main control interface
│   ├── nodes/          # Different node type components
│   ├── searchSection/  # Search functionality
│   └── sidebar/        # Application sidebar
├── classes/            # Core business logic classes
├── hooks/              # Custom React hooks
├── services/           # API and utility services
├── types/              # TypeScript type definitions
└── constants/          # Application constants
```

## 🎯 Usage

### Basic Route Planning

1. Use the search bar to find destinations
2. Select the type of node (airport, hotel, place, etc.)
3. Add nodes to your route
4. View the visual representation of your travel plan

### Node Types

- **Airport**: Major transportation hubs
- **Country**: Geographic regions
- **Hotel**: Accommodation options
- **Place**: Points of interest
- **Custom**: User-defined destinations

## 🚀 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run type-check` - Run TypeScript type checking

## 🔧 Development

### Prerequisites

- Node.js 16+
- npm or yarn

### Code Style

- ESLint configuration for code quality
- TypeScript strict mode enabled
- Consistent component structure

## 📝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🤝 Support

If you have any questions or need help, please open an issue on GitHub or contact the development team.

---

**Happy Travel Planning! ✈️🌍**

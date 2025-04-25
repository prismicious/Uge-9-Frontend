# 🍷 Wine Showcase Application

A modern web application for browsing and exploring various types of wines from around the world.

![Wine App Screenshot](https://via.placeholder.com/900x450?text=Wine+App+Screenshot)

## 📋 Overview

Wine Showcase is a React application that fetches and displays wine data from the SampleAPIs collection. Users can browse wines by category, search using different criteria, and view detailed information about each wine.

## ✨ Features

- **Browse by Wine Type**: Filter wines by Red, White, Rosé, Sparkling, Dessert, or Port
- **Advanced Search**: Filter wines by title, winery, location, or type
- **Dynamic Wine Cards**: Beautiful cards displaying wine information with images
- **Responsive Design**: Optimized for all device sizes from mobile to desktop
- **Toggle Views**: Switch between viewing specific wine types or all wines at once
- **Real-time Filtering**: Instantly see results as you type in search criteria

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

1. Clone the repository
   ```bash
   git clone https://github.com/yourusername/wine-showcase.git
   cd wine-showcase
   ```

2. Install dependencies
   ```bash
   npm install
   # or
   yarn install
   ```

3. Start the development server
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. Open your browser and navigate to `http://localhost:5173`

## 🛠️ Technologies Used

- **React 19**: Modern UI library for building interactive components
- **TypeScript**: Type safety and improved developer experience
- **Vite**: Next-generation frontend tooling for fast development
- **CSS3**: Custom styling with responsive design principles
- **SampleAPIs**: External API for wine data (https://sampleapis.com/wines)

## 🧩 Project Structure

```
wine-showcase/
├── src/
│   ├── components/        # UI components
│   │   ├── DisplayWine.tsx   # Main wine display component
│   │   ├── WineCard.tsx      # Individual wine card component
│   │   └── ...
│   ├── hooks/             # Custom React hooks
│   │   ├── useFetch.ts       # Data fetching hook
│   │   └── useWineData.ts    # Wine data management hook
│   ├── types/             # TypeScript type definitions
│   │   ├── Wine.ts           # Wine interface
│   │   └── enums.ts          # Wine types and endpoints
│   ├── App.tsx            # Main application component
│   └── main.tsx           # Application entry point
└── public/                # Static assets
```

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👏 Acknowledgments

- Data provided by [SampleAPIs](https://sampleapis.com)
- Icons from [Font Awesome](https://fontawesome.com)
- Fonts from [Google Fonts](https://fonts.google.com)

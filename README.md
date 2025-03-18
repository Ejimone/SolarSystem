# Solar System Explorer

A comprehensive educational web application designed to help children learn about our solar system through interactive visualizations, fun facts, and engaging quizzes.

![Solar System Explorer](./generated-icon.png)

## 🚀 Project Overview

Solar System Explorer is an interactive web application that makes learning about space and our solar system fun and engaging for children. The application features:

- 3D visualization of the solar system
- Detailed information about each planet
- Interactive quizzes to test space knowledge
- Fun facts about space and celestial objects
- Mobile-responsive design for learning on any device

## 🌍 Features

### 1. Interactive 3D Solar System

The centerpiece of the application is an interactive 3D visualization of our solar system, allowing users to:

- View the solar system with realistic planet models
- Select planets to learn more about them
- Observe the relative sizes and positions of planets

### 2. Planet Information Pages

Dedicated pages for each planet with:

- Key planetary statistics
- High-quality images
- Interesting facts and descriptions
- Comparison with other celestial bodies

### 3. Quiz Section

A fun educational quiz system that:

- Tests knowledge about the solar system
- Provides immediate feedback
- Covers various difficulty levels
- Makes learning enjoyable

### 4. Fun Facts Section

A collection of interesting space facts that:

- Spark curiosity about astronomy
- Present information in child-friendly language
- Cover fascinating aspects of our universe

### 5. Explore More Section

Additional resources for continued learning about space:

- Links to NASA resources
- Suggested reading materials
- Related topics for further exploration

## 🔧 Technology Stack

### Frontend

- **React**: Core frontend library
- **Three.js**: 3D rendering of the solar system
- **TailwindCSS**: Styling and responsive design
- **shadcn/ui**: UI component library based on Radix UI
- **Wouter**: Lightweight client-side routing
- **React Query**: Data fetching and state management

### Backend

- **Express.js**: Backend server framework
- **Drizzle ORM**: Database management
- **Neon Database**: PostgreSQL serverless database
- **TypeScript**: Type-safe development

## 📁 Project Structure

```
├── client/                   # Frontend React application
│   ├── src/
│   │   ├── components/       # UI components
│   │   │   ├── layout/       # Layout components (Header, Footer)
│   │   │   ├── three/        # 3D components (Planet, SolarSystem)
│   │   │   └── ui/           # UI components from shadcn/ui
│   │   ├── contexts/         # React contexts (SolarSystemContext)
│   │   ├── hooks/            # Custom React hooks
│   │   ├── lib/              # Utility functions and configurations
│   │   ├── pages/            # Main page components
│   │   ├── styles/           # Custom CSS styles
│   │   ├── App.tsx           # Main App component
│   │   └── main.tsx         # Entry point for the React app
├── server/                   # Backend Express server
│   ├── index.ts              # Server entry point
│   ├── routes.ts             # API route definitions
│   ├── storage.ts            # Database connectivity
│   └── vite.ts              # Server development configuration
├── shared/                   # Shared code between client and server
│   └── schema.ts             # Database schema definitions
└── various config files      # Configuration files for the project
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or newer)
- npm or yarn package manager

### Installation

1. Clone the repository:

```
git clone https://github.com/your-username/solar-system-explorer.git
cd solar-system-explorer
```

2. Install dependencies:

```
npm install
```

3. Setup environment variables (create a `.env` file in the project root):

```
DATABASE_URL="postgresql://neondb_owner:npg_yQbO07FcAkVj@ep-dry-bird-a5lpa799-pooler.us-east-2.aws.neon.tech/neondb?sslmode=require"
SESSION_SECRET="npg_yQbO07FcAkVj"
```

4. Push the database schema:

```
npm run db:push
```

5. Start the development server:

```
npm run dev
```

The application will be available at `http://localhost:3000`

### Building for Production

1. Build the application:

```
npm run build
```

2. Start the production server:

```
npm start
```

## 📱 Responsive Design

The application is designed to work seamlessly across:

- Desktop computers
- Tablets
- Mobile phones

This ensures students can access educational content from any device.

## 🧠 Learning Outcomes

Students using Solar System Explorer will:

1. Learn about the planets in our solar system
2. Understand the relative sizes and positions of planets
3. Memorize key facts about each celestial body
4. Develop an interest in astronomy and space science
5. Test their knowledge through interactive quizzes

## 🛠️ Future Enhancements

Planned features for future versions:

- User accounts to track quiz progress
- Additional celestial objects (moons, asteroids, comets)
- Space mission timelines and information
- Augmented reality features for mobile devices
- Printable worksheets and activities

## 📚 Educational Standards

This application aligns with elementary and middle school science curriculum standards including:

- Understanding of Earth's place in the solar system
- Properties of planets and other celestial objects
- Basic astronomical concepts
- Scientific inquiry and discovery

## 👥 Contributors

- Evidence Ejimone - Lead Developer and Product Enginner
- Nithin R Bharadwaj - Senior Enginner and AI expert

## 📄 License

This project is licensed under the MIT License

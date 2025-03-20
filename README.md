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
- User accounts to track progress and achievements
- Information about additional celestial objects like moons, asteroids, and comets
- Space mission timelines and detailed mission information
- Printable worksheets and educational activities
- Augmented reality features for mobile devices

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
- Tracks quiz progress for registered users
- Awards badges for achievements

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

### 6. User Accounts & Progress Tracking

User account system that allows students to:

- Create personal profiles
- Track quiz scores and progress
- Earn badges and achievements
- Save favorite content for later
- Compare scores with friends

### 7. Additional Celestial Objects

Expanded information about other objects in our solar system:

- Moon information for each planet
- Detailed asteroid and comet data
- Dwarf planets and their characteristics
- Planetary rings and their composition

### 8. Space Mission Explorer

Interactive timeline and information about space missions:

- Historical missions from the early space age
- Current active missions
- Planned future missions
- Mission objectives and discoveries
- Interactive mission timeline

### 9. Educational Worksheets & Activities

Downloadable educational materials:

- Printable worksheets for different age groups
- Hands-on space-related activities
- Lesson plans for educators
- Coloring pages and creative projects

### 10. Augmented Reality Features

Mobile AR experiences to enhance learning:

- View planets in your own space through AR
- Explore celestial objects in 3D
- Interactive AR solar system model
- Educational AR space mission experiences

## 🔧 Technology Stack

### Frontend

- **React**: Core frontend library
- **Three.js**: 3D rendering of the solar system
- **TailwindCSS**: Styling and responsive design
- **shadcn/ui**: UI component library based on Radix UI
- **Wouter**: Lightweight client-side routing
- **React Query**: Data fetching and state management
- **AR.js/WebXR**: Augmented reality capabilities

### Backend

- **Express.js**: Backend server framework
- **Drizzle ORM**: Database management
- **Neon Database**: PostgreSQL serverless database
- **TypeScript**: Type-safe development
- **JWT**: Authentication for user accounts

## 📁 Project Structure

```
├── client/                   # Frontend React application
│   ├── src/
│   │   ├── components/       # UI components
│   │   │   ├── layout/       # Layout components (Header, Footer)
│   │   │   ├── three/        # 3D components (Planet, SolarSystem)
│   │   │   ├── ar/           # Augmented reality components
│   │   │   └── ui/           # UI components from shadcn/ui
│   │   ├── contexts/         # React contexts (SolarSystemContext, AuthContext)
│   │   ├── hooks/            # Custom React hooks
│   │   ├── lib/              # Utility functions and configurations
│   │   ├── pages/            # Main page components
│   │   │   ├── auth/         # Authentication pages
│   │   │   ├── celestial/    # Celestial object pages
│   │   │   ├── missions/     # Space mission pages
│   │   │   ├── worksheets/   # Educational worksheet pages
│   │   │   └── profile/      # User profile pages
│   │   ├── styles/           # Custom CSS styles
│   │   ├── App.tsx           # Main App component
│   │   └── main.tsx          # Entry point for the React app
├── server/                   # Backend Express server
│   ├── index.ts              # Server entry point
│   ├── routes.ts             # API route definitions
│   ├── storage.ts            # Database connectivity
│   └── vite.ts               # Server development configuration
├── shared/                   # Shared code between client and server
│   └── schema.ts             # Database schema definitions
├── public/                   # Public assets
│   ├── worksheets/           # PDF worksheets
│   ├── images/               # Image assets
│   │   ├── badges/           # Achievement badge images
│   │   └── worksheets/       # Worksheet thumbnails
│   └── ar-models/            # 3D models for AR features
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

## 🔍 New Features Added

### Latest Space Missions

The application now includes information about recent space missions:

1. **Artemis Program** - NASA's mission to return humans to the Moon by 2025
2. **James Webb Space Telescope** - The largest optical telescope in space, providing unprecedented views of distant galaxies and exoplanets

To see these new missions:

1. Start the application using the instructions below
2. Navigate to the "Space Missions" section from the main navigation
3. You should see the Artemis Program and James Webb Space Telescope listed among the missions
4. Click on any mission to view detailed information

## 🚨 Troubleshooting

If you don't see the new missions after starting the application:

1. Make sure you've restarted the server completely after pulling the changes
2. Clear your browser cache or try in a private/incognito window
3. Check the server console for any error messages
4. Ensure all database migrations have been applied (if applicable)

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
6. Track their learning progress over time
7. Discover the history of space exploration
8. Explore beyond planets to other celestial objects

## 🛠️ Implemented Enhancements

The following features have been added to the original application:

### User Accounts to Track Quiz Progress

- User registration and login system
- Personal profiles with achievements
- Quiz progress tracking across sessions
- Badges for completing challenges
- Performance statistics and improvement tracking

### Additional Celestial Objects

- Detailed moon information for each planet
- Asteroid and comet database
- Interactive object viewing
- Information about object composition and discovery

### Space Mission Timelines and Information

- Historical space mission database
- Interactive mission timeline
- Mission details including objectives and discoveries
- Filtering by agency, status, and target body

### Augmented Reality Features for Mobile Devices

- View planets in AR using mobile camera
- Interact with 3D models of celestial objects
- Observe scale relationships in your own space
- Educational AR experiences

### Printable Worksheets and Activities

- Age-appropriate educational worksheets
- Hands-on activities for different learning styles
- Downloadable PDF resources
- Supplementary materials for educators

## 👥 Contributors

- Evidence Ejimone - Lead Developer and Product Enginner
- Nithin R Bharadwaj - Senior Enginner and AI expert
- Mozamel Adam Ateem - Assistent Enginner and UI/UX designer

## Changes to be made

introduction
related work - literature survey
exixting work
proposed work
objective
methdology
result and discussion
conslusion and future work
reference(new papers(IEEE, scopus), new papers)
report

## 📄 License

This project is licensed under the MIT License
Title- 3D visualisation of solar system
abstrsct

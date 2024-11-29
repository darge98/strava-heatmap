# Strava Heatmap 🗺️

Strava Heatmap is a **mobile-first** web application built with **Angular** that leverages the **Strava API** to generate heatmaps of your workouts. It allows you to authenticate with Strava, view a list of your recent activities, and dive deeper into the details of each activity through a personalized heatmap of your workout route.

### 🌐 **Demo**
[Try the application here!](https://darge98.github.io/strava-heatmap/)

---

## 🚀 **Main Features**

1. **Strava Authentication**:
   - Securely log in using the Strava OAuth protocol.
2. **Recent Activities List**:
   - View all your recorded activities on Strava.
3. **Detailed Heatmap for Each Activity**:
   - Explore the details of each activity with an interactive map that shows the density of your route.
4. **Mobile-First Design**:
   - Optimized for mobile devices for a seamless experience.
5. **Modern Technologies**:
   - Uses **Nebular UI** for a sleek interface and **Leaflet** for interactive maps.

---


## 🛠️ **Technologies Used**

- **Angular 18**
- **Nebular UI**: A modern CSS framework for responsive and attractive user interfaces.
- **Leaflet + Leaflet.heat**: For interactive maps and heatmap visualizations.
- **Strava API**: For accessing and managing workout data.
- **TypeScript**: Ensures type-safety in the application.

---

## 📦 **Installation and Usage**

1. Clone the repository:
   ```bash
   git clone https://github.com/darge98/strava-heatmap.git
   ```
2. Navigate to the project directory:
   ```bash
   cd strava-heatmap
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Configure your Strava API credentials:
   - Register an app on Strava Developers.
   - Obtain the Client ID and Client Secret.
   - Edit the environment.ts file with the following values:
   ```ts
   clientId: 'xxxxx',
   clientSecret: 'xxxxx',
   redirectUri: 'http://localhost:4200/auth-callback'
   ```
5. Start the application in development mode:
   ```bash
   ng serve
   ```
6. Open your browser and navigate to http://localhost:4200.

---

## 📖 **Project Structure**
```
src/
├── app/
│   ├── guards/            # Angular guards
│   ├── pages/             # Main pages (login, dashboard, activity details)
│   ├── pipes/             # Angular pipes
│   ├── services/          # Services for interacting with Strava
└── environments/          # Environment configuration (dev/prod)
```

# ChemMastery - Chemistry Equation Balancer & Practice Tool

A premium, interactive web application for balancing chemical equations and practicing stoichiometry. Built with React, Vite, and Tailwind CSS.

## Features

- **Equation Balancer**: Instant step-by-step balancing of chemical equations.
- **Practice Mode**: Gamified practice problems with increasing difficulty.
- **Badge System**: Earn rewards for streaks and mastery.
- **Premium Design**: Modern, glassmorphic UI with smooth animations.
- **Mobile Ready**: Built with Capacitor for easy porting to Android and iOS.

## Prerequisites

You need **Node.js** installed on your system to run this project.
Download it from [nodejs.org](https://nodejs.org/).

## Getting Started

1.  **Install Dependencies**
    Open your terminal in this directory and run:
    ```bash
    npm install
    ```

2.  **Run Development Server**
    Start the local server to view the app:
    ```bash
    npm run dev
    ```
    Open the URL shown in the terminal (usually `http://localhost:5173`) in your browser.

## Mobile Development (Android/iOS)

This project is set up with **Capacitor**.

1.  **Initialize Capacitor** (if not already done)
    ```bash
    npx cap init
    ```

2.  **Add Platforms**
    ```bash
    npm install @capacitor/android @capacitor/ios
    npx cap add android
    npx cap add ios
    ```

3.  **Build the Web App**
    ```bash
    npm run build
    ```

4.  **Sync with Native Projects**
    ```bash
    npx cap sync
    ```

5.  **Open in Android Studio / Xcode**
    ```bash
    npx cap open android
    # or
    npx cap open ios
    ```

## Technologies Used

- **React**: UI Library
- **Vite**: Build Tool
- **Tailwind CSS**: Styling
- **Framer Motion**: Animations
- **Capacitor**: Mobile Runtime
- **Lucide React**: Icons

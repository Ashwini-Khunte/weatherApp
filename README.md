# Weather App

A modern weather application built with **Next.js** and **React**, featuring real-time weather data, 5-day and hourly forecasts, and a responsive, stylish UI powered by Tailwind CSS.

## Features

- **Current Weather:** Get up-to-date weather information for any city or your current location.
- **5-Day Forecast:** View daily weather trends for the next five days.
- **Hourly Forecast:** See detailed hourly weather predictions.
- **Geolocation Support:** Fetch weather for your current location with one click.
- **Search:** Find weather by city name.
- **Live Clock:** Displays the current time and date.
- **Responsive Design:** Works seamlessly on desktop and mobile devices.
- **User Notifications:** Friendly toast notifications for errors and status updates.

## Getting Started

### Prerequisites

- Node.js (v18 or newer recommended)
- npm, yarn, pnpm, or bun

### Installation

1. **Clone the repository:**
   ```bash
   git clone <your-repo-url>
   cd weather-app
   ```

2. **Install dependencies:**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   # or
   bun install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   # or
   bun dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Environment Variables

This app uses the [OpenWeatherMap API](https://openweathermap.org/api). The API key is currently hardcoded in the code. For production, you should move it to an environment variable:

1. Create a `.env.local` file in the root directory.
2. Add your API key:
   ```
   NEXT_PUBLIC_OPENWEATHER_API_KEY=your_api_key_here
   ```
3. Update API calls in the code to use this variable.

## Project Structure

- `src/app/` – Main app entry, layout, and global styles
- `src/components/` – UI components (Navbar, CityAndTime, ForeCast, Clock)
- `public/` – Static assets (e.g., logo)
- `package.json` – Project dependencies and scripts

## Dependencies

- [Next.js](https://nextjs.org/)
- [React](https://react.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Axios](https://axios-http.com/)
- [React Toastify](https://fkhadra.github.io/react-toastify/)
- [React Icons](https://react-icons.github.io/react-icons/)

## Scripts

- `dev` – Start the development server
- `build` – Build for production
- `start` – Start the production server
- `lint` – Run ESLint

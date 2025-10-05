# 📍 RN Weather App

A **React Native** app that provides **current weather** and a **7-day forecast** based on the user’s **current location** or **searched city**. Built using **OpenWeather** and **WeatherAPI** with support for **dark mode**, **favorites**, and **offline caching**.

---

## ✨ Features

- 📍 **Geolocation Support** ✅

  - Requests location permission on app launch
  - Automatically fetches current weather for user’s location

- 🌦️ **Current Weather** ✅

  - Displays temperature, condition, and city name
  - Uses weather icons for visual representation

- 📅 **7-Day Forecast** ✅

  - Shows min/max temperature and weather condition for the next 7 days
  - Scrollable horizontal list

- 🔎 **Search by City** ✅

  - Search any city and view its weather + forecast

- 💾 **Favorites** ✅

  - Save favorite cities for quick access (stored via AsyncStorage)
  - User can delete unwanted favorites.

- 🌓 **Dark Mode** ✅

  - Automatically adapts to system theme or manual toggle

- 🔁 **Offline Support** ✅

  - Caches last fetched weather data for offline viewing

- 🎬 **Animations (Pending, To-Do)** ❌
  - Add weather-based transitions, smooth screen fade-ins, and dynamic icon animations.

---

> ⚠️ Make sure you’ve completed the [React Native Environment Setup](https://reactnative.dev/docs/environment-setup) before proceeding.

---

## 🚀 Getting Started

### 1. Clone the repository

```sh
git clone https://github.com/AwaisAliKolachi/rn-weather-app.git
cd rn-weather-app
```

### 2. Install dependencies

```sh
# Using npm
npm install

# OR using Yarn
yarn
```

### 3. Install CocoaPods (iOS only)

```sh
npx pod-install
```

This command runs `pod install` under the `ios` directory for you.

---

## ⚙️ API Configuration

This project uses both OpenWeather and WeatherAPI for fetching data.
| Service | Base URL |
| ----------------------- | ------------------------------------------------------------------------------------ |
| 🌤️ **OpenWeather API** | [https://api.openweathermap.org/data/2.5/](https://api.openweathermap.org/data/2.5/) |
| ☁️ **WeatherAPI** | [https://api.weatherapi.com/v1/](https://api.weatherapi.com/v1/) |

Environment values are defined in the project: (I have left the API KEYS in .env for **Testing Purposes**, If you wish you can sign up for your own keys.)

```sh
ENV = default
OPEN_WEATHER_API_URL = https://api.openweathermap.org/data/2.5/
OPEN_WEATHER_API_KEY = xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
WEATHER_API_URL = https://api.weatherapi.com/v1/
WEATHER_API_KEY = xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

---

## 📱 Running the App

With everything installed, you can now run the app.

### Start Metro bundler (in one terminal)

```sh
npm start
# OR
yarn start
```

### Run Android (in a second terminal)

```sh
npm run android
# OR
yarn android
```

### Run iOS (in a second terminal)

```sh
npm run ios
# OR
yarn ios
```

> 💡 You can also run the app directly via **Android Studio** or **Xcode**.

---

🧰 Tech Stack

- ⚛️ React Native CLI
- 🌐 OpenWeather API
- 🌦️ WeatherAPI
- 🧭 React Navigation
- 💾 AsyncStorage
- 🎨 Custom Theme with Dark Mode
- ⚙️ TypeScript Support

---

## ✨ License

MIT © [Awais Ali Kolachi](https://github.com/AwaisAliKolachi)

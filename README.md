# 📱 Habit Tracker App

Track your daily habits, build consistency, and achieve your goals — one day at a time.

![expo-publish](https://img.shields.io/badge/Live%20App%20Expo-blue?style=for-the-badge)

## 🔗 Live Demo

📲 Open the app on your phone using [Expo Go](https://expo.dev/go):

👉 **[https://expo.dev/@csiddhardha/frontend](https://expo.dev/@csiddhardha/frontend)**  
(Scan the QR code on that page using Expo Go)

---

## 🧠 Features

- ✅ Sign up / Login with secure token storage
- 📆 Create habits with title, description, and daily frequency
- 🔁 Track completion for each habit daily
- 🔥 View habit streaks and completion count
- 📊 Intuitive dashboard with real-time stats
- 🌙 Dark-mode-friendly design (optional future)

---

## 🛠 Tech Stack

### Frontend
- **React Native** (with [Expo](https://expo.dev/))
- **Tailwind CSS** via `nativewind`
- **Lucide-react-native** (icons)
- **Expo Router** for navigation
- **SecureStore** for token storage

### Backend (Optional for Fullstack)
- Node.js + Express
- MongoDB (Mongoose)
- JWT Authentication
- REST API

---

## 📸 Screenshots

| Home | Habits List | Add Habit |
|------|-------------|-----------|
| ![Home](https://via.placeholder.com/200x400?text=Welcome+Page) | ![List](https://via.placeholder.com/200x400?text=Habits+List) | ![Create](https://via.placeholder.com/200x400?text=Create+Habit) |

---

## 🚀 Getting Started Locally

### Prerequisites

- Node.js & npm
- Expo CLI (`npm install -g expo-cli`)
- Android/iOS device or emulator

### Run Frontend

```bash
git clone https://github.com/yourusername/habit-tracker.git
cd habit-tracker/frontend
npm install
npx expo start

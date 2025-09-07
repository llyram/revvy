# Revvy - Motorcycle Group Ride Tracker

Revvy is a mobile application designed specifically for motorcyclists to plan, coordinate, and track group rides. Think of it as Strava, but tailored for motorcycle enthusiasts.

## Features

- **Ride Planning**
  - Create rides with start/end points
  - Add waypoints and rest stops
  - Share ride details with other users

- **Real-time Tracking**
  - Live location tracking of all riders
  - Map visualization of the group
  - Route history and statistics

- **Group Communication**
  - Built-in intercom system
  - Support for internet/Bluetooth/WiFi communication
  - Voice chat during rides

## Technology Stack

- React Native / Expo SDK 53
- React Navigation for routing
- Expo Location for GPS tracking
- React Native Maps for map visualization
- WebRTC for voice communication
- Expo Task Manager for background tasks

## Prerequisites

- Node.js 18 or higher
- Expo CLI
- iOS/Android device or emulator
- Expo Go app (for development)

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/llyram/revvy.git
   cd revvy
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```

4. Open the app:
   - Scan the QR code with Expo Go (Android)
   - Use the Camera app to scan the QR code (iOS)
   - Press 'i' for iOS simulator
   - Press 'a' for Android emulator

## Project Structure

```
revvy/
├── src/
│   ├── components/    # Reusable UI components
│   ├── screens/       # Screen components
│   └── services/      # Business logic and API services
├── assets/           # Images, fonts, and other static files
└── App.js           # Application entry point
```

## Development Status

Currently in active development. Core features being implemented:
- Location tracking
- Group ride creation
- Real-time communication

## Contributing

We welcome contributions! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Contact

Project maintained by [llyram](https://github.com/llyram)

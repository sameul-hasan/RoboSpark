# RoboSpark 2025: Official Event Portal

Igniting Innovation Through Robotics & Technology

[![License](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Build Status](https://img.shields.io/badge/Build-Passing-brightgreen.svg)](https://github.com/sameul-hasan/RoboSpark/actions)
[![Project Version](https://img.shields.io/badge/Version-1.0.0-informational)](https://github.com/sameul-hasan/RoboSpark)

---

## 💡 Introduction

RoboSpark 2025 is the official registration and information portal for the premier inter-university robotics and technology competition, hosted by the DIU Robotics Club. This React application serves as the single source of truth for potential participants, detailing event schedules, competition formats, prize pools, and providing a seamless registration experience.

This project is a celebration of engineering excellence, creativity, and innovation, designed to handle high traffic loads in the lead-up to the grand event on December 7, 2025.

### Project Vision

To provide a highly accessible, responsive, and visually engaging digital hub that maximizes participant engagement and streamlines administrative processes for the RoboSpark 2025 event.

---

## 🛠️ Tech Stack

The RoboSpark portal is built using modern web development standards, ensuring high performance, component reusability, and scalability.

| Technology | Description |
| :--- | :--- |
| **Frontend Framework** | React (Functional Components, Hooks) |
| **Styling** | CSS Modules / Styled Components (or Tailwind CSS/Bootstrap depending on specific implementation) |
| **State Management** | React Context API or Redux (for complex registration flow) |
| **Development Language**| JavaScript (ES6+) |
| **Package Manager** | npm / Yarn |

---

##  prerequisiteS

Before you begin, ensure you have the following software installed on your system:

*   **Node.js:** Version 14 or higher (LTS recommended).
*   **npm:** Node Package Manager (comes bundled with Node.js).
*   **Git:** For cloning the repository.

```bash
# Check Node.js version
node -v

# Check npm version
npm -v
```

---

## 🚀 Getting Started

Follow these steps to set up the RoboSpark 2025 React application locally for development and testing.

### 1. Repository Cloning

Clone the official GitHub repository using the command line:

```bash
git clone https://github.com/sameul-hasan/RoboSpark.git
cd RoboSpark
```

### 2. Dependency Installation

Install the necessary Node packages defined in `package.json`. You can use either `npm` or `yarn`.

**Using npm:**
```bash
npm install
```

**Using Yarn:**
```bash
yarn install
```

### 3. Environment Variables

This application may rely on environment variables for API endpoints, registration form keys, and countdown date settings. Create a `.env` file in the root directory:

```bash
touch .env
```

Populate the file with necessary variables (examples provided below):

```dotenv
# .env example
REACT_APP_EVENT_DATE="December 7, 2025 08:15:00 GMT+0600"
REACT_APP_API_BASE_URL="https://api.robospark2025.com/v1"
# ... other variables for third-party services (e.g., payment gateways, form submission)
```

### 4. Running the Application

Once dependencies are installed, start the development server.

```bash
# Start the application in development mode
npm start
```

The application will typically open automatically in your default browser at `http://localhost:3000`. Hot reloading is enabled, meaning changes made to the source code will instantly update the page.

### 5. Production Build

To prepare the application for production deployment, generate an optimized static build:

```bash
npm run build
```

This command creates a `build` folder containing all compiled and optimized static assets, ready to be served by any static hosting service (e.g., Netlify, Vercel, Nginx).

---

## ✨ Key Features

The RoboSpark 2025 portal provides comprehensive functionalities tailored for event management and participant interaction.

### 1. Dynamic Countdown Timer
A highly accurate, real-time countdown clock displaying the remaining time (days, hours, minutes, seconds) until the official event start on December 7, 2025.

### 2. Detailed Competition Showcase
Dedicated, responsive sections for all five featured challenges, including:
*   **Challenge Details:** Description, rules overview.
*   **Financials:** Clear display of maximum participants, total prize pool, and registration fee for each event.
*   **Direct Registration Links:** Seamless navigation to the specific competition registration form.

### 3. Integrated Registration System
A streamlined process allowing teams to register directly through the application for challenges like **Drone Race**, **Robo Soccer**, and **Techathon**.

### 4. Event Information Hub
Comprehensive display of logistical details:
*   **Venue Information:** Exact address and map link for Daffodil Smart City.
*   **Organizers & Sponsors:** Official recognition of supporting entities (DIU SWE Department, DIU Robotics Club, IntraSpark).
*   **Participant Benefits:** Highlighting perks such as official T-shirts, certificates, and food/refreshments.

### 5. Responsive Design
The entire application is designed to be fully responsive, ensuring an optimal viewing and registration experience across desktop, tablet, and mobile devices.

---

## 📅 Event Overview

The application features the full schedule and detailed listings of all challenges for RoboSpark 2025.

### Featured Challenges

A brief summary of the core competitions:

| Challenge | Focus | Prize Pool (BDT) | Max Teams | Registration Fee (BDT) |
| :--- | :--- | :--- | :--- | :--- |
| **🚁 Drone Race** | Autonomous drone navigation and aerial track maneuvering. | 45,000 | 40 | 2,000 |
| **⚽ Robo Soccer** | Autonomous robotic machines competing in soccer challenges. | 30,000 | 35 | 1,500 |
| **🤖 Line Following** | High-speed precision racing on a defined track. | 30,000 | 50 | 1,500 |
| **💻 Techathon** | 36-hour hackathon focused on AI and software innovation. | 50,000 | 60 | 2,000 |
| **✨ Cosmo Cleanse** | Robotics competition focused on clearing simulated environmental debris. | 35,000 | 30 | 1,500 |

***Total Prize Pool: 190,000+ BDT***

### Official Program Schedule

The application displays the finalized timeline for the grand event (All times are in Bangladesh Standard Time, GMT +6):

| Sl. | Purpose | Time |
| :--- | :--- | :--- |
| 1 | Arrival of All Participants | 8:15 AM |
| 2 | Opening Ceremony | 8:30 AM – 9:00 AM |
| 3 | Breakfast Distribution | 9:00 AM – 9:30 AM |
| 4 | Line Following Robot Competition | 9:30 AM – 1:30 PM |
| 5 | Robo Soccer | 10:00 AM – 1:30 PM |
| 6 | Techathon | 10:00 AM – 3:00 PM |
| 7 | Drone Race | 10:00 AM – 3:00 PM |
| 8 | Cosmo Cleanse | 9:00 AM – 3:30 PM |
| 9 | Lunch Break | 1:30 PM – 2:15 PM |
| 10 | Closing Ceremony | 4:00 PM – 5:00 PM |

---

## 🤝 Contributing

We welcome contributions from the community to improve the RoboSpark 2025 portal. Whether it's fixing bugs, improving documentation, or adding new features, your help is appreciated.

Please follow these guidelines for contributing:

### 1. Fork the Repository

First, fork the [RoboSpark repository](https://github.com/sameul-hasan/RoboSpark) to your own GitHub account.

### 2. Create a Feature Branch

Always create a new branch for your changes. Use a descriptive name (e.g., `feature/add-contact-form` or `fix/schedule-bug`).

```bash
# Create and switch to a new branch
git checkout -b feature/your-awesome-feature
```

### 3. Commit Your Changes

Ensure your code adheres to the project's coding standards. Commit changes with clear, descriptive messages:

```bash
git commit -m "feat: implemented dynamic countdown component"
```

### 4. Push and Submit PR

Push your branch to your forked repository and then open a Pull Request (PR) against the `main` branch of the original repository.

We will review your PR promptly and merge it upon approval.

### Code Style

This project generally follows standard ESLint/Prettier configurations for React projects. Ensure your code is well-formatted before submitting a PR.

---

## 💖 Acknowledgments & Organizers

RoboSpark 2025 is organized and supported by leading technological institutions:

*   **Lead Organizers:** DIU Robotics Club
*   **Academic Support:** Department of Software Engineering (SWE), Daffodil International University
*   **Infrastructure Partner:** DIU Robotics Lab
*   **Event Partner:** IntraSpark 2025

**Original Development:**

This application was developed by `bornosoftnr.com` and managed by the team including Sameul Hasan and Nayeem.

GitHub Repository: [sameul-hasan/RoboSpark](https://github.com/sameul-hasan/RoboSpark)

---

## 📝 License

This project is licensed under the MIT License. You are free to use, modify, and distribute the code, provided the original copyright and permission notice is included.

See the [LICENSE](LICENSE) file for full details.

```text
© 2025 IntraSpark. All rights reserved. | DIU Robotics Club
```
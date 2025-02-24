# Resume Creator

A web application developed with Angular and Express.js that enables users to create and manage their own resumes.

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Configuration](#configuration)
  - [Running the Application](#running-the-application)
- [Folder Structure](#folder-structure)
- [Contributing](#contributing)
- [License](#license)

## Features

- User-friendly interface for creating and editing resumes
- Data storage using JSON files for simplicity
- Modular design with separate client and server components

## Technologies Used

- [Angular](https://angular.io/) for the front-end
- [Express.js](https://expressjs.com/) for the back-end
- [Node.js](https://nodejs.org/) as the runtime environment
- [CSS](https://developer.mozilla.org/en-US/docs/Web/CSS) and [SCSS](https://sass-lang.com/) for styling

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) installed on your machine
- [Angular CLI](https://angular.io/cli) installed globally
- [Git](https://git-scm.com/) for version control

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/eccsm/resume_cms.git
   cd resume_cms
   ```

2. **Install server dependencies:**
   ```bash
   cd resume-server
   npm install
   ```

3. **Install client dependencies:**
   ```bash
   cd ../resume-client
   npm install
   ```

### Configuration

1. **Server Configuration:**
   - Navigate to the `resume-server` directory.
   - Create a `.env` file to define environment variables as needed.

2. **Client Configuration:**
   - Navigate to the `resume-client` directory.
   - Update any necessary environment settings or API endpoints in the Angular environment files.

### Running the Application

1. **Start the server:**
   - In the `resume-server` directory, run:
     ```bash
     npm start
     ```
   - The server will start on the port specified in your configuration (default is `http://localhost:3000/`).

2. **Start the client:**
   - In the `resume-client` directory, run:
     ```bash
     ng serve
     ```
   - The Angular application will start on `http://localhost:4200/` by default.

## Folder Structure

```
resume_cms/
├── resume-client/
│   ├── src/
│   │   ├── app/
│   │   ├── assets/
│   │   └── environments/
│   ├── angular.json
│   ├── package.json
│   └── README.md
└── resume-server/
    ├── routes/
    ├── models/
    ├── controllers/
    ├── app.js
    ├── package.json
    └── README.md
```

- `resume-client/`: Contains the Angular front-end application.
  - `src/`: Source code for the Angular app.
  - `angular.json`: Angular CLI configuration file.
  - `package.json`: Lists client-side dependencies and scripts.
- `resume-server/`: Contains the Express.js back-end application.
  - `routes/`: Defines API routes.
  - `models/`: Data models for handling resume data.
  - `controllers/`: Business logic for handling requests.
  - `app.js`: Entry point for the server application.
  - `package.json`: Lists server-side dependencies and scripts.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any enhancements, bug fixes, or suggestions.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.


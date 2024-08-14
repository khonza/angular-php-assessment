# Angular CRUD Project with PHP API

This project is a CRUD (Create, Read, Update, Delete) application built with Angular for the frontend and PHP for the backend API. It connects to a MySQL database to perform CRUD operations.

## Prerequisites

Before getting started, ensure you have the following installed:

- **Node.js** and **npm** (Node Package Manager)
- **WAMP Server** (or any other PHP server like XAMPP or MAMP)
- **MySQL** (comes with WAMP Server)
- **Git** (optional, for cloning the repository)

## Setup Instructions

### 1. Install Angular 17 Locally

1. **Install Node.js and npm**:
   - Download and install Node.js from the [official website](https://nodejs.org/). This will include npm.

2. **Install Angular CLI**:
   - Open your terminal or command prompt and run the following command to install Angular CLI globally:
     ```bash
     npm install -g @angular/cli
     ```

3. **Clone the Repository**:
   - Clone the project repository from GitHub:
     ```bash
     git clone https://github.com/khonza/untitled
     ```

4. **Navigate to the Project Directory**:
   - Change to the project directory:
     ```bash
     cd untitled
     ```

5. **Install Project Dependencies**:
   - Run the following command to install the required Node.js packages:
     ```bash
     npm install
     ```

### 2. Install and Configure WAMP Server

1. **Download and Install WAMP Server**:
   - Download WAMP Server from the [official website](https://www.wampserver.com/en/).
   - Follow the installation instructions and start WAMP Server.

2. **Configure PHP API**:
   - Locate the `htdocs` directory within the WAMP installation directory (usually `C:\wamp\www`).
   - Copy the `employeeApi` folder (containing your PHP scripts) into the `htdocs` directory:
     ```plaintext
     C:\wamp\www\employeeApi
     ```

3. **Import the SQL Database**:
   - Open phpMyAdmin by navigating to `http://localhost/phpmyadmin` in your web browser.
   - Create a new database (e.g., `employee_data`).
   - Import the provided SQL file into the newly created database:
     - Select the database you created.
     - Go to the "Import" tab.
     - Choose the SQL file (`employee_data.sql`) and click "Go".

### 3. Configure Angular Project

1. **Update API Base URL**:
   - Open the Angular project in your preferred code editor (e.g., VSCode).
   - Update the API base URL in your Angular service files to match the PHP API endpoint. For example, in `src/app/services/api.service.ts`, change:
     ```typescript
     private apiUrl = 'http://localhost/api'; // Adjust according to your API path
     ```

### 4. Serve the Angular Project

1. **Run the Angular Application**:
   - In your terminal or command prompt, ensure you are in the Angular project directory.
   - Run the following command to start the Angular development server:
     ```bash
     ng serve --open
     ```
   - This will start the Angular development server and open the application in your default web browser.

2. **Access the Application**:
   - The Angular application should be accessible at `http://localhost:4200` by default.
   - Should you experience Cross-Origin Resource Sharing errors running the angular application, kindly navigate to `CORS browser` and click one of the files to launch CORS browser. The two files added should be applicable for 32 and 64bit window operating systems

## Troubleshooting

- **If you encounter issues with the API**:
  - Make sure WAMP Server is running and the `api` folder is correctly placed in the `htdocs` directory.
  - Check the PHP error log for any server-side errors. You can find the PHP error log in the WAMP Server tray icon menu under "PHP" -> "PHP Error Log".

- **If Angular cannot connect to the API**:
  - Ensure that the API URL is correctly configured in your Angular service.
  - Check that the API endpoint is accessible by visiting it directly in your browser (e.g., `http://localhost/employeeApi`).


## Contact

For any questions or issues, please contact Kholekile Somagaca at kholekile.s@gmail.com


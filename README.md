# Task Management Application

This is a simple task management application that allows users to view, allocate, update tasks, as well as search and sort tasks based on various criteria.

## Features

1. **View Tasks**  
   Users can view tasks allocated to them.

2. **Allocate Tasks**  
   Users can allocate tasks to themselves or others.

3. **Update Task**  
   Admins can update task details, such as task name, description, allocation, and validity.

4. **Update Task Status**  
   Users can update the status of their tasks to track progress.

5. **Search Functionality**  
   Users can search for specific tasks or projects using keywords such as task name, manager, or status.

6. **Sort Functionality**  
   Tasks and projects can be sorted based on various criteria such as status, name, due date, or creation date.

7. **Progress Visualization**  
   Tasks and projects are displayed with a visual indicator of progress using color coding:
   - **Green**: Progress below 40%.
   - **Orange**: Progress between 40% and 70%.
   - **Red**: Progress above 70%.

8. **Edit Projects**  
   Admins can edit project details, including project name, manager, progress, and deadlines, using an intuitive modal interface.

9. **Delete Projects**  
   Admins can delete projects that are no longer needed.

10. **Responsive Filters**  
    Real-time filtering of tasks and projects based on search inputs and sort options.


## Getting Started

### Prerequisites

- Node.js installed on your machine
- MongoDB database running locally or remotely (with connection details available)

### Installation

1. Clone this repository to your local machine:

    ```bash
    git clone https://github.com/LeilAlch/Versa.git
    ```

2. Navigate to the project directory:

    ```bash
    cd Versa
    ```

3. Install dependencies:

    ```bash
    npm install
    ```

### Configuration

1. Set up your MongoDB database and obtain the connection URI.

2. Create a `.env` file in the root directory of the project.

3. Add the MongoDB connection URI to the `.env` file:

    ```
    MONGODB_URI=<your_mongodb_connection_uri>
    ```

### Usage

1. Start the server:

    ```bash
    npm start
    ```

2. The server should start running at `http://localhost:8086`.

3. Open your web browser and navigate to `http://localhost:3000` to access the application.

### Logging Out

To log out of the application, simply click on the "Logout" button, and you will be redirected to the login page.

## Technologies Used

- Node.js
- Express.js
- MongoDB
- React
- Axios
- CSS Modules


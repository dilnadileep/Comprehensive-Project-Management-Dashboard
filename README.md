
---

# Comprehensive Project Management Dashboard

### **Overview**

This Angular-based **Project Management Dashboard** is designed to manage projects, tasks, team members, and track progress with data visualization. It incorporates core Angular concepts such as routing, services, reactive forms, and state management, along with tools like D3.js for visualization and JSON Server for fake API simulation.

---

### **1. Project Structure**

The project follows a modular structure, with different features organized into core, features, and shared directories:

- **Core**: Contains services, guards, interceptors, and models used globally across the app.
  - Services: Authentication, Task, Project, and Team services.
  - Guards: AuthGuard for route protection.
  - Interceptors: API interceptors for appending base URLs to requests.
  - Models: Interfaces for defining data structures (e.g., `Project`, `Task`, `TeamMember`).

- **Features**: Separate modules for the major sections of the application, including login, dashboard, projects, tasks, and team members.
  - **Login Module**: Handles user authentication and login state.
  - **Dashboard Module**: Displays project and task data with a data visualization component.
  - **Projects Module**: Handles the creation and management of projects.
  - **Tasks Module**: Manages tasks, including adding, editing, and deleting tasks, as well as filtering and sorting.
  - **Team Members Module**: Allows assigning team members to tasks and projects.

- **Shared**: Contains reusable components, directives, and pipes.
  - Reusable components: Modal for adding and editing projects/tasks.
  - Directives: Custom directives (e.g., for form validation).
  - Pipes: Custom pipes (e.g., `ProjectNamePipe` and `TeamMemberNamePipe`).

---

### **2. Key Features**

#### **a. Login Page**
- **Objective**: Secure login functionality to ensure only authenticated users can access the dashboard.
- **Implementation**: 
  - **Reactive Forms** with validation for username and password.
  - **AuthService** for validating credentials and managing login state.
  - **AuthGuard** for protecting routes and ensuring access is restricted to logged-in users.

#### **b. Dashboard Page**
- **Objective**: A central hub that displays project and task data with interactive features.
- **Implementation**:
  - **Child Routes** for navigating between sections: Projects, Tasks, and Team Members.
  - **D3.js Visualization**: A bar chart to display the number of tasks completed per project.
  - **Task Completion Visualization**: Dynamically binds data to show task progress.

#### **c. Add Project**
- **Objective**: Provide functionality to create new projects and display them in a list.
- **Implementation**:
  - **Modal Component**: Reusable modal for adding and editing projects.
  - **Reactive Form**: Fields include project name, description, and deadline.
  - **ProjectService**: Handles the creation and storage of project data.
  - **Project Table**: Displays added projects with options to view or edit.

#### **d. Task List**
- **Objective**: Manage tasks, filter and sort them, and associate them with projects and team members.
- **Implementation**:
  - **Task Table**: Displays tasks with columns for task name, assigned team member, status, and deadline.
  - **Task Filtering**: Filters tasks by status (Pending, Completed) using a dropdown.
  - **Sorting**: Allows sorting tasks by deadline.
  - **Task Service**: Handles CRUD operations for tasks.

#### **e. Edit and Delete Tasks**
- **Objective**: Allow editing and deletion of tasks, with confirmation dialogs for deletion.
- **Implementation**:
  - **Modal**: Used for editing task details.
  - **Delete Confirmation**: Custom confirmation dialog for deleting tasks.

#### **f. Team Members Section**
- **Objective**: Manage team members, and assign them to projects and tasks.
- **Implementation**:
  - **Team Members Table**: Lists team members with their roles.
  - **Dropdowns**: Allows assigning team members to projects and tasks.
  - **Team Member Service**: Manages team member data and assignments.

#### **g. Data Visualization**
- **Objective**: Visualize data on task completion per project.
- **Implementation**:
  - **D3.js Bar Chart**: Displays the number of tasks completed in each project.
  - **Dynamic Data Binding**: Binds task data to the chart in real time.

#### **h. Routing and Guards**
- **Objective**: Handle navigation and secure routes.
- **Implementation**:
  - **Lazy Loading**: Modules are lazily loaded to improve performance.
  - **AuthGuard**: Protects routes and ensures only logged-in users can access them.

#### **i. JSON Server**
- **Objective**: Simulate backend APIs for project, task, and team data.
- **Implementation**:
  - **JSON Server**: Acts as a fake API to fetch, update, and delete project, task, and team data.
  - **API Interceptors**: Automatically append base URL to all API requests for consistency.
  - **HTTP Methods**: Use `GET`, `POST`, `PUT`, `DELETE` methods in services to interact with the JSON server.

---

### **3. Technologies Used**

- **Angular**: The core framework for building the application.
  - **Reactive Forms** for user input validation.
  - **Services** for managing data and business logic.
  - **Routing** for navigation between pages.
  - **Observables** for handling asynchronous data.

- **D3.js**: Used to generate dynamic bar charts for data visualization, displaying task completion per project.

- **JSON Server**: A fake REST API to simulate backend data storage and retrieval for tasks, projects, and team members.

- **SCSS**: Used for styling to ensure the dashboard has a clean, professional, and responsive design.

---

### **4. Folder Structure**

```
src/
│
├── app/
│   ├── core/                  # Core services, models, guards
│   ├── features/              # Feature modules: login, dashboard, projects, tasks, team members
│   ├── shared/                # Shared components, pipes, directives
│   └── app.module.ts          # Main Angular module
│
├── assets/
│   └── images/                # Image assets for icons and graphics
│
├── environments/
│   └── environment.ts         # Configuration for development environment
│
└── styles/
    └── styles.scss            # Global styles
```

---

### **5. Running the Project**

#### **1. Install Dependencies**
```bash
npm install
```

#### **2. Run JSON Server**
In a separate terminal window, run the JSON server to simulate the backend:
```bash
npm run server
```

#### **3. Run the Angular App**
Start the Angular application:
```bash
ng serve
```

You can now access the project at `http://localhost:4200`.

---

### **6. Final Notes**

- **Interfaces**: TypeScript interfaces are used to define strict typing for data models (e.g., `Project`, `Task`, `TeamMember`).
- **Documentation**: Proper comments and code documentation have been added for readability.
- **Responsive Design**: The application is designed to be responsive and mobile-friendly.

---

If you have any further questions or need clarification on any part of the project, feel free to reach out!

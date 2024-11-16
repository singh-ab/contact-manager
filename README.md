# Contact Manager

This project is a Contact Manager application built with React, Firebase, and Material UI. It is a CRUD app that allows users to manage their contacts by adding, editing, and deleting contact information.

## Features

- User Authentication (Login and Signup)
- Add New Contacts
- Edit Existing Contacts
- Delete Contacts
- Search Contacts
- Pagination and Sorting

## Technologies Used

- React
- Firebase Firestore
- Firebase Authentication
- Material UI
- Ant Design

## Getting Started

### Prerequisites

- Node.js and npm installed on your machine
- Firebase project set up with Firestore and Authentication enabled

### Installation

1. Clone the repository:
    ```sh
    git clone https://github.com/your-username/contact-manager.git
    cd contact-manager
    ```

2. Install dependencies:
    ```sh
    npm install
    ```

3. Set up Firebase configuration:
    - Create a `firebase.js` file in the `src/config` directory.
    - Add your Firebase configuration details to this file.

4. Start the development server:
    ```sh
    npm start
    ```

## Project Structure

```
src/
│
├── components/
│   ├── auth.js
│   └── Signout.js
│
├── pages/
│   ├── Login.js
│   ├── CreateContact.js
│   ├── ContactDetail.js
│   └── ContactsList.js
│
├── config/
│   └── firebase.js
│
├── App.js
├── index.js
└── ...
```
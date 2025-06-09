# chat_viewer

This project is a React application that reads and displays chat messages from exported Google Chat history. It renders different group chats using components for messages and chat information.

## Project Structure

- **src/**: Contains the main application code.
  - **components/**: Contains React components for displaying chat messages and chat information.
    - **Message/**: Component for a single chat message.
    - **Messages/**: Component for a list of chat messages.
    - **Chat/**: Component for displaying chat information and messages.
  - **types/**: Contains TypeScript interfaces for defining the structure of messages, group info, and chats.
  - **services/**: Contains functions for loading chat data from JSON files.
  - **App.tsx**: Main component that sets up the application structure.
  - **index.tsx**: Entry point of the React application.

- **server/**: Contains the server-side code for serving chat data.
  - **src/**: Contains server application code.
    - **routes/**: Defines API endpoints for fetching chat data.
    - **services/**: Contains functions for reading chat data from the file system.
    - **index.ts**: Entry point for the server application.
  - **tsconfig.json**: TypeScript configuration for the server.

- **package.json**: Configuration file for npm, listing dependencies and scripts.
- **tsconfig.json**: TypeScript configuration for the root directory.
- **README.md**: Documentation for the project.
# Project: Event Management SPA - Maikol

## Description

This is a SPA (Single Page Application) made with HTML, CSS and JavaScript.  
It is a simple system to manage events. There are two types of users:  
**Admin** and **Visitor**.

The app uses `json-server` to save data like a real database.

---

## Project Structure

📁 src/
├── controllers/ # Logic for login, register, dashboard, etc.
├── views/ # HTML created with JavaScript (strings)
├── services/ # API and URLs
├── router.js # Router for the SPA
├── main.js # Main file
📁 css/
├── admin.css # Styles for admin
├── visitor.css # Styles for visitor
├── style.css # Main CSS that imports the others
db.json # The database (for json-server)
index.html # The main page


---

## Features

### 🔐 Login
- Users can register and login.
- The session is saved with `localStorage`.

### 👥 User Roles
- **Admin (rolId: 1)**: can create, edit and delete events.
- **Visitor (rolId: 2)**: can see events and register if there are seats.

### 📅 Events
- Admin creates events (name, description, date, place, capacity).
- Visitors can see and register for events.
- Visitors cannot register two times for the same event.
- If no seats are available, the system shows a message.

### 🔁 SPA Navigation
- The page does not reload when you move between views.
- It uses JavaScript and `history.pushState()`.

---

## Routes

| Route       | View      | Access     |
|-------------|-----------|------------|
| `/`         | Login     | Public     |
| `/login`    | Login     | Public     |
| `/register` | Register  | Public     |
| `/dashboard`| Dashboard | Private (depends on user role) |

---

## Views by Role

### 👨‍💼 Admin (rolId: 1)
- Can see all events
- Can create, edit and delete events
- Each event shows available seats

### 👤 Visitor (rolId: 2)
- Can see events
- Can register for events
- Can see their registered events

---

## Database (db.json)

```json
{
  "users": [],
  "events": [],
  "registrations": []
}
users: list of users (name, email, password, rolId)

events: events created by admin

registrations: list of visitors registered to events

Installation
Clone the project:


git clone https://github.com/THEMAIK17/MAIK-PROJECT17.git
Install json-server:


npm install -g json-server
Start the server:

json-server --watch db.json --port 3000
Open the index.html file in your browser.
# EventFlow – Event Management and Reporting System

A full-stack web application for managing campus/club events with role-based access, event registration, and automated email notifications.

**Features:**
- 🔐 User authentication (Admin & Participant roles)
- 📅 Event creation, filtering, and search with debounce
- 👥 Event registration and participant management
- 📧 Automated email notifications (welcome, registration confirmation, event reminders)
- 🎨 Modern glassmorphic UI with particle animations
- 📱 Responsive design
- 🖨️ Printable participant lists and event reports

---

## Tech Stack

### Backend
- **Framework:** Express.js
- **Database:** MongoDB + Mongoose
- **Authentication:** JWT (stored in HTTP-only cookies)
- **Password Hash:** bcrypt
- **Queue System:** BullMQ + ioredis
- **Email:** Nodemailer (Gmail SMTP)
- **CORS:** Configured for localhost:5500

### Frontend
- **HTML/CSS/JavaScript** (vanilla, no build tool)
- **Animations:** Canvas-based particle system
- **API Communication:** Fetch API
- **UI Framework:** Custom CSS with glassmorphic design

---

## Project Structure

```
Event Management and Reporting System/
├── backend/
│   ├── package.json
│   ├── src/
│   │   ├── index.js                 # Server entry point
│   │   ├── app.js                   # Express app setup
│   │   ├── config/
│   │   │   ├── database.js          # MongoDB connection
│   │   │   ├── mail.js              # Nodemailer transporter
│   │   │   └── redis.js             # Redis connection
│   │   ├── controllers/
│   │   │   ├── login.controller.js  # Auth logic
│   │   │   └── event.controller.js  # Event CRUD logic
│   │   ├── middleware/
│   │   │   └── authMiddleware.js    # JWT verification
│   │   ├── models/
│   │   │   ├── user.model.js        # UserRegister schema
│   │   │   └── event.model.js       # Event schema
│   │   ├── routes/
│   │   │   ├── login.route.js       # Auth endpoints
│   │   │   └── event.route.js       # Event endpoints
│   │   ├── services/
│   │   │   └── email.service.js     # Email templates & queuing
│   │   ├── schedular/
│   │   │   └── remainderSchedular.js # Event reminder logic
│   │   └── util/
│   │       ├── email.queue.js       # BullMQ queue setup
│   │       ├── email.worker.js      # Queue worker
│   │       └── jwt.js               # JWT sign/verify
│   └── .gitignore
├── frontend/
│   ├── home.html                    # Login/Register page
│   ├── assets/images/               # Static images
│   ├── css/
│   │   ├── home.css
│   │   ├── admin.css
│   │   ├── user.css                 # Includes search styles
│   │   ├── participants.css
│   │   └── download.css
│   ├── js/
│   │   ├── home.js                  # Auth logic
│   │   ├── admin.js                 # Admin dashboard
│   │   ├── user.js                  # Event browsing + debounced search
│   │   ├── participants.js          # Participant list
│   │   └── download.js              # Report download
│   └── pages/
│       ├── admin.html
│       ├── user.html
│       ├── participants.html
│       └── download.html
└── README.md
```

---

## Installation & Setup

### Prerequisites
- Node.js 16+
- MongoDB running
- Redis running on `127.0.0.1:6379`

### Backend Setup

#### 1. Install dependencies
```bash
cd backend
npm install
```

#### 2. Create environment file
Create `.env` at the **repository root** with:

```env
MONGODB_URI=mongodb://localhost:27017/eventflow
SECRETE=your_jwt_secret_key
EMAIL_USER=your_gmail@gmail.com
EMAIL_PASS=your_gmail_app_password
PORT=3000
```

**Notes:**
- `SECRETE` is the JWT signing secret (typo preserved from original code)
- `EMAIL_PASS` is a Gmail App Password (not your account password)
- Redis must be running locally on port 6379

#### 3. Start the backend
```bash
npm run dev     # With auto-reload (nodemon)
# OR
npm start       # Standard start
```

Server runs on `http://localhost:3000`

---

### Frontend Setup

The frontend is a static site served from the `frontend/` folder.

#### Option 1: VS Code Live Server
1. Install the "Live Server" extension in VS Code
2. Right-click `frontend/home.html` → "Open with Live Server"
3. Opens at `http://localhost:5500` (default)

#### Option 2: Python HTTP Server
```bash
cd frontend
python -m http.server 5500
```

#### Option 3: Node http-server
```bash
npm install --global http-server
cd frontend
http-server -p 5500
```

---

## API Reference

**Base URL:** `http://localhost:3000`

### Authentication Endpoints

| Method | Endpoint | Protected | Description |
|--------|----------|-----------|-------------|
| POST | `/api/auth/register` | ❌ | Register new user |
| POST | `/api/auth/login` | ❌ | Login user |
| POST | `/api/auth/logout` | ✅ | Logout (clears token) |

**Register/Login Body:**
```json
{
  "registerRole": "admin|participant",
  "firstName": "John",
  "lastName": "Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

---

### Event Endpoints

| Method | Endpoint | Protected | Description |
|--------|----------|-----------|-------------|
| POST | `/api/events/create` | ✅ | Create event (admin) |
| DELETE | `/api/events/delete` | ✅ | Delete event |
| GET | `/api/events/fetch` | ✅ | Get user's events |
| POST | `/api/events/menu` | ❌ | List events with filters |
| GET | `/api/events/menu/details` | ❌ | Get event stats (count/clubs/venues) |
| POST | `/api/events/search` | ❌ | Search event name suggestions |
| POST | `/api/events/register` | ✅ | Register for event |

**Create Event Body:**
```json
{
  "eventName": "Code Mania",
  "clubName": "Tech Club",
  "startDate": "2026-03-01T10:00:00Z",
  "endDate": "2026-03-01T14:00:00Z",
  "coordinator": [
    { "name": "Alice", "contactNumber": "9876543210" }
  ],
  "venue": "Auditorium"
}
```

**Event Menu Filter Body:**
```json
{
  "club": "All Clubs",
  "venue": "All Venues",
  "search": "code",
  "sort": "Newest-first",
  "pageNo": 1,
  "limit": 6
}
```

**Event Search (Suggestions):**
```json
{
  "search": "code"
}
```

---

## Database Models

### UserRegister
```javascript
{
  registerRole: String,        // "admin" or "participant"
  firstName: String,           // Unique
  lastName: String,
  email: String,               // Unique
  password: String             // Bcrypt hashed
}
```

### Event
```javascript
{
  eventName: String,
  clubName: String,
  startDate: Date,
  endDate: Date,               // Must be >= startDate
  coordinator: [{
    name: String,
    contactNumber: String
  }],
  adminUser: String,           // firstName of creator
  venue: String,
  participants: [{
    name: String,
    email: String,
    payment: String            // "unpaid" / "paid"
  }]
}
```

---

## Features in Detail

### 1. User Authentication
- Register with role selection (admin/participant)
- Login with email and password
- JWT stored in HTTP-only cookies
- Token expires after 24 hours

### 2. Event Management
- **Admin:** Create, view, and delete events
- **Participant:** Browse, search, filter, and register for events
- Pagination with "Previous" and "Next" buttons
- Real-time event statistics (count, clubs, venues)

### 3. Search with Debounce
- Debounced search input (300ms delay)
- Dropdown suggestions below the search field

### 4. Email Notifications
- **Registration Email:** Sent when user signs up
- **Event Registration Email:** Sent when user registers for an event
- **Reminder Email:** Hourly job checks for events starting within 24 hours

### 5. Queue & Background Jobs
- BullMQ manages `email-queue` and `remainder` queues
- Workers process jobs asynchronously
---

## Known Issue & Notes


### Other Notes
- Frontend role selection is UI-only; backend doesn't enforce role-specific routes
- Participant lists and reports use browser `window.print()`, not PDF generation
- CORS is restricted to `http://localhost:5500`
- All API URLs in frontend are hardcoded to `http://localhost:3000`

---

## Running the Full Stack

### Terminal 1: MongoDB
```bash
mongod  # or your MongoDB service
```

### Terminal 2: Redis
```bash
redis-server
```

### Terminal 3: Backend
```bash
cd backend
npm run dev
```

### Terminal 4: Frontend
VS Code Live Server or:
```bash
cd frontend
python -m http.server 5500
```

Then open: `http://localhost:5500`

---

## File Verification Checklist

- ✅ `backend/package.json` – scripts, dependencies correct
- ✅ `backend/src/index.js` – loads .env, starts server, imports workers
- ✅ `backend/src/app.js` – Express setup, CORS configured
- ✅ `backend/src/config/{database,mail,redis}.js` – connections configured
- ✅ `backend/src/models/{user,event}.model.js` – schemas with validation
- ✅ `backend/src/middleware/authMiddleware.js` – JWT verification
- ✅ `backend/src/controllers/login.controller.js` – register/login/logout
- ✅ `backend/src/controllers/event.controller.js` – CRUD operations
- ✅ `backend/src/services/email.service.js` – email templates
- ✅ `backend/src/util/{email.queue,email.worker,jwt}.js` – queue & auth
- ✅ `backend/src/schedular/remainderSchedular.js` – event reminder logic
- ✅ `frontend/home.html` – auth entry point
- ✅ `frontend/pages/user.html` – event browsing with debounced search
- ✅ `frontend/pages/admin.html` – admin dashboard
- ✅ `frontend/pages/participants.html` – participant list
- ✅ `frontend/pages/download.html` – event report
- ✅ `frontend/css/user.css` – includes search input + dropdown styles
- ✅ `frontend/js/user.js` – search debounce (300ms), event filters

---

## Troubleshooting

### Frontend won't connect to backend
- Ensure backend runs on port 3000
- Check CORS origin is set to `http://localhost:5500`
- Verify credentials: `include` in fetch options

### Emails not sending
- Check Gmail app password in `.env` (use 16-char app password, not account password)
- Enable "Less secure app access" if using regular Gmail password
- Verify Redis and BullMQ workers are running

### Search suggestions not showing
- Check `#result` element in browser DevTools
- Verify debounce delay (300ms) in `frontend/js/user.js`
- Open Network tab to confirm `/api/events/search` request is sent

### Events not displaying
- Check MongoDB connection: `MONGODB_URI` in `.env`
- Verify `GET /api/events/menu/details` returns club/venue data
- Check browser console for fetch errors

---

## License

ISC – See repository for details.

---

## Author

**Prashanth Sakapuram**  
GitHub: [Prashanth-DevO/Event-Management-and-Reporting-System](https://github.com/Prashanth-DevO/Event-Management-and-Reporting-System)

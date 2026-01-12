# Calendar Co-pilot

AI-powered availability scheduling system for online tutors.

## 🎯 Project Overview

This application helps online tutors set up their calendar availability using natural language. Instead of manually selecting time slots, tutors can simply describe their availability (e.g., "I am available between noon and 4pm on weekends, after 7pm on Monday"), and the AI will parse this into a structured calendar.

## ✨ Features

- **Natural Language Input**: Describe availability in plain English
- **AI-Powered Parsing**: Uses Perplexity AI to convert text to structured time slots
- **Visual Calendar Preview**: See generated availability in a weekly grid
- **Persistent Storage**: Save calendars to localStorage (or MongoDB with backend)
- **Clean, Responsive UI**: Built with React and Tailwind CSS

## 🛠️ Tech Stack

- **Frontend**: React + Vite + Tailwind CSS
- **AI**: Perplexity AI (sonar model)
- **Database**: MongoDB (with localStorage fallback)
- **Backend** (optional): Express.js + Mongoose

## 📁 Project Structure

```
src/
├── components/
│   ├── ui/                    # Reusable UI components
│   │   ├── Alert.jsx         
│   │   ├── Button.jsx        
│   │   ├── Card.jsx          
│   │   └── index.js          
│   ├── Header.jsx            # App header
│   ├── AvailabilityForm.jsx  # Input form
│   ├── CalendarPreview.jsx   # Calendar display
│   ├── SavedCalendars.jsx    # Saved calendars list
│   └── index.js              
├── hooks/
│   └── useCalendar.js        # Calendar state management
├── services/
│   ├── api.js                # Perplexity AI integration
│   └── storage.js            # Data persistence
├── App.jsx                   # Main component
├── App.css
├── index.css
└── main.jsx
server/
└── index.js                  # Optional Express backend
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

### Optional: MongoDB Backend

To use MongoDB instead of localStorage:

```bash
# Install backend dependencies
npm install express mongoose cors

# Start the backend server
node server/index.js

# Create .env file with:
VITE_API_URL=http://localhost:3001/api
```

## 📖 How It Works

1. **User Input**: Tutor enters availability description in natural language
2. **AI Processing**: Perplexity AI parses the description into structured time slots
3. **Preview**: Generated calendar is displayed for review
4. **Confirmation**: User confirms and saves the calendar
5. **Storage**: Calendar is saved to localStorage (or MongoDB)

## 🧪 Example Input

```
"I am available between noon and 4pm on weekends, 
after 7pm to midnight on Monday and Wednesday, 
and after 9pm otherwise"
```

## ⚠️ Limitations

1. **AI Interpretation**: May occasionally misinterpret ambiguous phrases
2. **Time Zones**: Currently assumes local timezone
3. **30-minute Intervals**: Fixed to 30-minute slots
4. **No Recurring Exceptions**: Doesn't handle "except holidays" etc.
5. **Browser Storage**: Without backend, data is per-device

## 🔮 Areas for Improvement

1. Add time zone support
2. Implement real-time calendar editing
3. Add calendar export (iCal, Google Calendar)
4. Support recurring exceptions and date ranges
5. Add collaborative scheduling features
6. Implement authentication for tutors
7. Add email/SMS notifications for bookings

## 📝 Assignment Requirements Met

- ✅ NoSQL database (MongoDB)
- ✅ API integration (Perplexity AI)
- ✅ AI/NLP for natural language processing
- ✅ Web development (React + Tailwind)
- ✅ Prompt engineering for AI parsing
- ✅ Database design (tutor profiles)
- ✅ Interface design (clean, usable UI)

## 🔑 API Keys (Development)

- **Perplexity AI**: Configured in `src/services/api.js`
- **MongoDB**: Configured in `server/index.js`

---

Built for the Calendar Co-pilot assignment • AI-Powered Scheduling

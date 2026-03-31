# ✉️ Email Assistant (AI-Powered Gmail Reply Generator)
🎥 Demo Video

Check out how the Email Assistant works in real-time:

👉 Watch here: [Add your YouTube link here]

(Example: https://www.youtube.com/watch?v=your_video_id
)
## 🚀 Overview

Email Assistant is a full-stack AI-powered application that helps users generate smart email replies directly inside Gmail using a Chrome Extension.

It uses **Spring Boot (backend)** + **React (frontend)** + **Chrome Extension**, integrated with **Gemini API** for generating intelligent responses.

---

## 🔥 Features

* ✉️ Generate AI-powered email replies instantly
* ⚡ Works directly inside Gmail (Chrome Extension)
* 🎯 Supports multiple tones (professional, casual, etc.)
* 🔄 Real-time API integration
* 💡 Clean and simple UI

---

## 🏗️ Tech Stack

### Backend

* Java
* Spring Boot
* WebClient (for API calls)

### Frontend

* React.js
* Vite

### Extension

* Chrome Extension (Manifest v3)
* Content Scripts

### AI

* Gemini API

---

## 📂 Project Structure

```
EmailAssistantSpringBoot/
│
├── backend/              # Spring Boot backend
├── frontend/             # React frontend
├── emailextension/       # Chrome extension
└── README.md
```

---

## ⚙️ Setup Instructions

### 1️⃣ Clone the repository

```
git clone https://github.com/YOUR_USERNAME/EmailAssistantSpringBoot.git
cd EmailAssistantSpringBoot
```

---

### 2️⃣ Backend Setup (Spring Boot)

```
cd backend/email-writer-sb/email-writer-sb
```

Set environment variables:

```
GEMINI_URL=your_api_url
GEMINI_KEY=your_api_key
```

Run the application:

```
./mvnw spring-boot:run
```

---

### 3️⃣ Frontend Setup (React)

```
cd frontend/email-writer-react
npm install
npm run dev
```

---

### 4️⃣ Chrome Extension Setup

1. Open Chrome → go to `chrome://extensions/`
2. Enable **Developer Mode**
3. Click **Load unpacked**
4. Select `emailextension` folder

---

## 🧠 How It Works

1. User opens Gmail
2. Chrome Extension injects UI
3. User clicks "Generate Reply"
4. Request is sent to Spring Boot backend
5. Backend calls Gemini API
6. AI-generated reply is returned and displayed

---

## 🔐 Security

* API keys are stored using environment variables
* No sensitive data is exposed in the repository

---

## 📸 Screenshots

*(Add screenshots here for better impact)*

---

## 🎯 Future Improvements

* Multi-language support
* Tone customization UI
* Email summarization
* Deployment (cloud hosting)

---

## 🙌 Author

Ajay M

---

## ⭐ If you like this project

Give it a star ⭐ on GitHub!

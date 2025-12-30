# 📚 StudyBuddy AI

StudyBuddy AI is a focused learning assistant built for students who feel overwhelmed by the sheer amount of information available online.  
Instead of flooding users with everything, StudyBuddy AI delivers **only the content the learner actually wants**, tailored by topic, difficulty, and learning preference.

This project was built as a hackathon submission for **HackXios**.

---

## 🚀 Problem Statement

Students today don’t struggle due to lack of resources — they struggle due to **information overload**.

- Google searches return hundreds of links.
- Video playlists are long and unfocused.
- AI tools require well-crafted prompts, which most students don’t know how to write.

As a result, students waste time deciding *what* to study instead of actually studying.

---

## 💡 Solution

StudyBuddy AI simplifies learning by:
- Asking for **only the topic name**
- Letting users choose **difficulty level**
- Allowing users to select **content preferences**
- Generating **clean, structured, and relevant study material**

No distractions. No unnecessary content. Just focused learning.

---

## ✨ Key Features

### 🧠 Smart Content Generation
- Topic-based input (no long prompts required)
- Difficulty selection:
  - Beginner
  - Intermediate
  - Advanced
- Content preferences:
  - Summary
  - Explanation
  - Questions & Answers
  - Examples
  - Step-by-step approach  
  *(At least one preference required)*

### 📄 Clean & Structured Output
- AI response is generated in **structured JSON**
- Only selected content types are shown
- No conversational noise or filler text

### 🎮 Game Mode (In Progress)
- Displays available learning games
- Represents future scope for interactive learning
- Games are currently not functional (prototype stage)

---

## 🛠️ Tech Stack

### Frontend
- HTML  
- CSS  
- JavaScript  
- Bootstrap  

### Backend
- Node.js  
- Express.js  

### Templating
- EJS (Embedded JavaScript Templates)

### AI Integration
- Gemini API (Gemini 2.5 Flash model)

---

## ⚙️ How It Works

1. User enters a **topic/subject name**
2. User selects **difficulty level**
3. User selects preferred **content types**
4. Backend dynamically constructs a **well-structured prompt**
5. Prompt is sent to the Gemini API
6. AI returns a **JSON-formatted response**
7. Frontend renders only the requested content

---

## 📌 Why StudyBuddy AI is Different

- ❌ Google: Too many links, no prioritization  
- ❌ Generic AI chat: Requires prompt engineering skills  
- ✅ StudyBuddy AI:  
  - Handles prompt engineering internally  
  - Delivers only what the user selects  
  - Keeps learning focused and efficient  

---

## 👥 Team

This project was developed by a **duo team** as part of the HackXios hackathon.

---

## 🚧 Project Status

- Core study mode: ✅ Working
- Game mode: ⚠️ Under development
- Future improvements:
  - Functional learning games
  - User accounts
  - Progress tracking
  - More customization options

---

## 📽️ Demo

A full video demo is available on YouTube (submitted for hackathon judging).

---

## 📜 License

This project is currently shared for learning and hackathon purposes.  
License can be added later if required.

---

## 🙌 Acknowledgements

- HackXios Hackathon
- Google Gemini API

---

**Study smarter. Not harder.**  
StudyBuddy AI helps you focus on what truly matters.

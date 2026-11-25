# 🎤 AI Mock Interview Practice

> **PRACTICE ANYWHERE, LEARN ANYTIME AND FACE ANY INTERVIEW WITH STRONG CONFIDENCE**

An **offline-first** web application where students practice mock interviews for competitive exams
(UPSC, APPSC, RBI, SSB, SSC CGL, SI, Constable, DSC and more) in a **game-like** way — Easy → Medium → Hard —
and earn certificates. No paid cloud AI. Works without internet.

*(తెలుగు: ఇది ఇంటర్నెట్ లేకుండా కూడా పని చేసే Mock Interview ప్రాక్టీస్ యాప్. పూర్తి ప్లాన్ కోసం `docs/PLAN_TELUGU.md` చదవండి.)*

---

## ✨ Features

**Everyone:** Home · About · FAQs · Testimonials/Feedback · Contact · Login · Registration · 🟢 Online / 🟠 Offline indicator

**🎓 Student**
- Profile with photo, phone, email; subscribe to interview categories
- Game-style levels per category: 🟢 Easy → 🟡 Medium → 🔴 Hard (next level unlocks after passing)
- 🏆 Certificate (PDF) after completing each level, XP, streaks, badges
- Interview types: 🤖 AI Interview Bot · 🎙️ Voice Assistant · 💬 Chat Assistant · 📹 Peer-to-peer Video Call (friend to friend)
- Multiplayer module: video mock interview + games (chess, puzzles, quizzes) added by admin
- Detailed report: score, pace, filler words, missed points, "say it better"

**🛠️ Admin**
- Dashboard & stats · Manage users, categories, questions (add / import)
- Add games (chess, puzzles, quizzes) per category · FAQs · Testimonials approval · Contact messages

---

## 🧱 Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React + Vite, React Router, Axios, PWA (service worker), IndexedDB |
| Backend | Python, FastAPI, SQLAlchemy |
| Database | SQLite (local, offline) |
| AI service | Offline rule-based question engine + deterministic scoring (60% content / 40% delivery); optional Vosk/sherpa-onnx speech-to-text |
| Video call | WebRTC (peer-to-peer) + FastAPI WebSocket signaling |
| Images | Cloudinary (online, optional) with local-folder fallback (offline) |
| Auth | JWT, roles: `student`, `admin` |

Architecture:
```
React PWA (Vite)  ⇄  REST /api/v1 + WebSocket  ⇄  FastAPI  ⇄  SQLite
      │                                              │
 IndexedDB (offline queue → /sync/push)       AI engine (questions, scoring, certificates)
      └──────── WebRTC video (peer-to-peer) ────────┘
```

---

## 📁 Folder Structure

```
mock-interview/
├─ README.md · CONTRIBUTING.md · THIRD_PARTY.md · .gitignore
├─ docs/        PLAN_TELUGU.md · GITHUB_GUIDE_TELUGU.md · API_CONTRACT.md · DATABASE.md
├─ prompts/     one AI-assistant prompt per team member
├─ frontend/    React + Vite app
├─ backend/     FastAPI app  (app/ai = AI service)
└─ scripts/     helper scripts
```

----

## 🚀 Getting Started

**Prerequisites:** Git, Python 3.11+, Node.js (LTS), VS Code.

```bash
git clone https://github.com/<username>/mock-interview.git
cd mock-interview
```

### Backend
```bash
cd backend
python -m venv .venv
.venv\Scripts\activate            # Windows  |  Mac/Linux: source .venv/bin/activate
pip install -r requirements.txt
copy .env.example .env            # Mac/Linux: cp .env.example .env
uvicorn app.main:app --reload
```
API docs: http://localhost:8000/docs · Health: http://localhost:8000/api/v1/health

### Frontend
```bash
cd frontend
npm install
copy .env.example .env            # Mac/Linux: cp .env.example .env
npm run dev
```
App: http://localhost:5173

### Offline demo in class
Run the backend on one laptop connected to the class Wi-Fi/hotspot (no internet needed), start the frontend with
`npm run dev -- --host`, and open `http://<laptop-ip>:5173` on other devices. Peer-to-peer video works on the same network.

---

## 🔀 Team Workflow (summary)

1. `git checkout main && git pull origin main`
2. `git checkout -b feature/<name>-<task>`
3. Code → `git add .` → `git commit -m "feat: ..."` → `git push -u origin feature/<name>-<task>`
4. Open Pull Request → teammate reviews → merge
5. Never push to `main`, never commit `.env` / `.db` / AI models

Full beginner guide (Telugu): [`docs/GITHUB_GUIDE_TELUGU.md`](docs/GITHUB_GUIDE_TELUGU.md) · Rules: [`CONTRIBUTING.md`](CONTRIBUTING.md)

---

## 🗓️ Roadmap (6 weeks)

| Week | Goal |
|---|---|
| 1 | Setup, GitHub, skeleton, auth foundation |
| 2 | Auth + categories + profile + question bank |
| 3 | Chat interview v1 + public pages + content APIs |
| 4 | Levels, certificates, admin modules |
| 5 | Voice, multiplayer video, games, PWA offline |
| 6 | Testing, polish, release v1.0, demo video |

---

## 🔒 Privacy & Offline Principles
- No paid cloud AI; scoring is deterministic and explainable (weights documented in `docs/scoring.md`)
- All data stays in local SQLite; Cloudinary is optional and only used when online
- "Delete my data" option planned for settings

## 📚 Docs
- [Full plan (Telugu)](docs/PLAN_TELUGU.md) · [GitHub guide (Telugu)](docs/GITHUB_GUIDE_TELUGU.md)
- [API Contract](docs/API_CONTRACT.md) · [Database](docs/DATABASE.md) · [Prompts](prompts/README.md)

## 📄 License
MIT (confirm with your institution). See `THIRD_PARTY.md` for third-party licenses.

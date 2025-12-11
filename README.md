pratidwandhi-sih2025/
├─ README.md
├─ mobile-app/
├─ web-platform/
├─ backend-api/
├─ ml-models/
├─ blockchain/
├─ docs/
│  ├─ architecture-diagrams/
│  ├─ api-specs.md
│  └─ sih-presentation-notes.md
└─ LICENSE

=============================================================================

# 🏅 Pratidwandhi – AI-Powered Sports Talent Platform (SIH 2025)

AI-powered mobile and web platform to **democratize sports talent assessment** for every athlete in India — from metros to remote villages.  
**Problem Statement: SIH25073 – "AI-Powered Mobile Platform for Democratizing Sports Talent Assessment"**

---

## 🌍 Overview of the App

Pratidwandhi is an **end-to-end sports talent ecosystem** with two core surfaces:

- 📱 **Mobile App (Athletes)** – Athletes record standardized test videos, get AI-based scoring, and submit verified results from anywhere, even in low-network areas.

- 💻 **Web Platform (Officials & Stakeholders)** – Sports Authority of India (SAI) evaluators, mentors, incubators, and suppliers get dashboards to review performances, manage talent pipelines, and create opportunities.

**Platform Objectives:**
- On-device AI/ML for video analysis, verification, and cheat detection
- Secure backend to transmit data to SAI servers
- Dashboards for officials to view and evaluate verified data
- Low-cost, scalable solution for mass participation
- Improved efficiency and transparency in talent discovery
- True democratization of sports assessment for remote regions

---

## ✨ Features & Technology Used

### 🔑 Core Functional Features

**🎥 On-Device Video Assessment**
- Handles **8+ exercises** using YOLOv8 pose-based models (COCO-trained)
- Handles **2+ exercises** using classic computer vision object tracking
- Handles **3+ exercises** using GPS tracking modules (speed, distance, agility)

**🛡️ Cheat Detection & Integrity**
- Anti-cheat module for each test and achievement
- Cross-checks motion patterns, timing, and environment to detect manipulation

**🧠 AI Guidance & Sports Career Support**
- LLM (Gemini-based) sports guidance: suggests suitable sports based on test outcomes
- Recommends training direction and basic diet suggestions

**🚨 In-built SOS Module**
- Active in all exercises and training modules
- Detects collapse or abnormal inactivity and raises an alarm for safety

**🌐 Low Network & Offline Capabilities**
- Designed to function in low-bandwidth conditions
- Offline video analysis where possible, deferred syncing when network returns

**🌎 Multilingual Experience**
- Available in **5+ languages** so athletes and local coaches can use it comfortably

**🧑‍🤝‍🧑 Engagement & Community**
- Dedicated SAIAIP portal for key services
- Community page + notifications for news and updates
- Dynamic, real-time leaderboard and gamified experience
- Tips & Tricks section curated from field experts

---

### 🧩 Architecture & Tech Stack

#### 📱 Mobile App (Athletes)

**Purpose:** Used by athletes to perform tests, record videos, get feedback, and submit verified attempts.

**Tech Stack:**
- React Native / Flutter for cross-platform UI
- Local storage for offline queue of attempts
- Integration with on-device ML (TFLite / ONNX)
- MediaPipe for pose detection
- Camera capture with video preprocessing

**Key Responsibilities:**
- Capture videos for standardized test batteries
- Run local pose/exercise detection where feasible
- Show real-time hints (form, completion, repetition counts)
- Handle SOS alerts during intense drills
- Sync results to backend in low-data-friendly format
- Multilingual UI and voice guidance (5+ languages)
- Offline mode with deferred upload queue

**Features Table:**
| Feature | Status |
|---------|--------|
| ML Model (Main) | ✓ |
| ML Model (Additional) | ✓ |
| Gamified User-Interface | ✓ |
| Offline Video Analysis | ✓ |
| Transmit to SAI server | ✓ |
| Low Bandwidth Operations | ✓ |
| Multilingual | ✓ |
| Cheat Detection | ✓ |
| AI-Integration | ✓ |

---

#### 💻 Web Platform (SAI, Mentors, Incubators, Suppliers, Athletes)

**Purpose:** Central control room for all stakeholders.

**Tech Stack:**
- React / Next.js for front-end
- Tailwind CSS for styling
- Framer Motion for animations
- Role-based dashboard architecture
- Real-time data visualization

**Key Responsibilities:**
- **SAI Evaluators:** Verify and shortlist talent from submitted videos
- **Mentors:** Connect with athletes, share personalized training plans
- **Incubators & Suppliers:** Offer gear, funding, and support opportunities
- **Athletes:** Web access to performance history and leaderboard standings
- View and filter performances by region, age, sport, and metrics
- Handle queued manual reviews (flagged by cheat detection)
- Real-time notifications and community engagement
- Performance analytics and trend visualization

**Role-Based Features:**
| Feature | Mobile App | Web Platform |
|---------|:----------:|:------------:|
| ML Model (Main) | ✓ | N/A |
| ML Model (Additional) | ✓ | ✓ |
| Gamified User-Interface | ✓ | ✓ |
| Offline Video Analysis | ✓ | N/A |
| Transmit to SAI server | ✓ | ✓ |
| Low Bandwidth Operations | ✓ | ✓ |
| Multilingual | ✓ | ✓ |
| Cheat Detection | ✓ | N/A |
| AI-Integration | ✓ | ✓ |

---

#### 🖥️ Backend Architecture

**Purpose:** Glue between mobile, web, ML services, and SAI infrastructure.

**Tech Stack:**
- Django or Node.js for REST/GraphQL APIs
- PostgreSQL / MongoDB for structured and unstructured data
- Redis for caching and real-time updates
- JWT for secure authentication
- Message queues (Celery/RabbitMQ) for async processing

**Key Responsibilities:**
- Secure transmission of athlete data to SAI servers
- User roles (Athlete, SAI Official, Mentor, Incubator, Supplier) and authentication
- API endpoints for:
  - Uploading test results and video references
  - Fetching dashboards and analytics
  - Creating and managing opportunities
  - Community engagement and notifications
- Integration with ML services for scoring and cheat detection
- Logging, auditing, and performance tracking
- SAIAIP portal backend services
- Real-time leaderboard computation
- Data compression for low-network transmission

**API Endpoints (Examples):**



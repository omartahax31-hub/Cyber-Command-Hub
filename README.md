# 🛡️ Cyber-Command-Hub

### Strategic Cyber Operations Platform (SCOC)

[![Python](https://img.shields.io/badge/Python-3.10%2B-blue.svg)](https://python.org)
[![Flask](https://img.shields.io/badge/Flask-2.3.3-green.svg)](https://flask.palletsprojects.com)
[![Socket.IO](https://img.shields.io/badge/Socket.IO-4.5.4-orange.svg)](https://socket.io)
[![License](https://img.shields.io/badge/License-MIT-red.svg)](LICENSE)
[![Groq](https://img.shields.io/badge/Groq-API-purple.svg)](https://groq.com)

---

## 📖 Project Overview

**Cyber-Command-Hub** is a professional, real-time **Security Operations Center (SOC)** platform designed for cybersecurity professionals, penetration testers, and system administrators. It combines live system monitoring, threat detection, AI-powered assistance, and real-time alerting into a single, modern interface with a **Cyberpunk aesthetic**.

The platform simulates a real-world SOC environment, providing:

- Live hardware metrics (CPU, RAM, Disk)
- Network traffic visualization
- Real-time security alerts (Critical/High/Medium/Low)
- WebSocket-based live updates
- AI-powered terminal assistant (Groq LLM integration)
- Fully modular and extensible architecture

> ⚠️ **Status:** Active Development – The platform is functional and ready for testing, with continuous improvements being made.

---

## ✨ Key Features

### 🔍 Real-Time Monitoring
- Live **CPU, RAM, and Disk** usage graphs
- **Network traffic** monitoring (In/Out Mbps, Packets/sec)
- **Host status** tracking (Online/Offline)
- Dynamic **resource usage charts** (30-second rolling window)

### 🚨 Advanced Alerting System
- Severity-based alerts: **Critical**, **High**, **Medium**, **Low**
- Visual **pulse animations** for critical threats
- **Real-time alert feed** with timestamps
- Automatic alert aggregation and display

### 🤖 AI-Powered Terminal
- **Natural language commands** (e.g., "analyze", "block 192.168.1.1")
- Integration with **Groq API** (Llama 3.3–70B Versatile)
- **Fallback simulation mode** when API is unavailable
- Built-in **help system** and quick commands

### 📊 Interactive Visualizations
- **Live traffic chart** (Incoming/Outgoing Mbps)
- **Threat timeline scatter plot**
- **Resource usage comparison** (CPU vs RAM)
- **30-second history** with smooth animations

### 🌐 WebSocket Architecture
- Real-time **bi-directional communication**
- No polling – **event-driven updates**
- Automatic **reconnection** handling
- Efficient **server-sent metrics**

### 🧩 Modular Backend
- Flask **Blueprints** for clean routing
- Service layer separation (`metrics`, `groq`, `websocket`)
- Easy integration with **real system data** (psutil, syslog, iptables)
- **REST API endpoints** for external tools

---

## 📁 Project Structure
Cyber-Command-Hub/
│
├── app.py # Application entry point
├── config.py # Configuration (API keys, secrets)
├── requirements.txt # Python dependencies
│
├── routes/ # Flask Blueprints
│ ├── init.py
│ ├── main_routes.py # Main page routes
│ └── api_routes.py # REST API endpoints
│
├── services/ # Business logic layer
│ ├── init.py
│ ├── metrics_service.py # System metrics & alerts
│ ├── groq_service.py # Groq AI integration
│ └── websocket_service.py # Socket.IO setup
│
├── static/ # Frontend assets
│ ├── css/
│ │ └── style.css # Cyberpunk custom styles
│ └── js/
│ └── dashboard.js # Real-time dashboard logic
│
├── templates/ # Jinja2 HTML templates
│ ├── base.html # Base template with layout
│ └── index.html # Main dashboard page
│
└── README.md # This file

text

---

## 🚀 How to Run

### Prerequisites

- **Python 3.10** or higher
- **Git** (optional, for cloning)
- **Modern web browser** (Chrome, Firefox, Edge)

### Installation Steps

#### 1️⃣ Clone the Repository

```bash
git clone https://github.com/yourusername/Cyber-Command-Hub.git
cd Cyber-Command-Hub
2️⃣ Create Virtual Environment
Windows (CMD/PowerShell):

bash
python -m venv venv
venv\Scripts\activate
Linux/macOS:

bash
python3 -m venv venv
source venv/bin/activate
3️⃣ Install Dependencies
bash
pip install -r requirements.txt
4️⃣ Configure Groq API Key (Optional)
Edit config.py and add your Groq API key:

python
GROQ_API_KEY = "gsk_your_real_key_here"
💡 Without a valid API key, the platform runs in Simulation Mode (predefined responses).

5️⃣ Run the Application
bash
python app.py
6️⃣ Access the Dashboard
Open your browser and navigate to:

text
http://localhost:5000
🎮 Using the Platform
Dashboard Widgets
System Health – Real-time CPU, RAM, Disk usage

Network – Live bandwidth and packet rates

Hosts – Online/offline device count

Threat Status – Alert counters by severity

AI Terminal Commands
Command	Description
help	Show available commands
status	Display system status
analyze	Run AI-powered threat analysis
block <IP>	Simulate IP blocking
monitor	Show monitoring commands
clear	Clear terminal output
Any question	Natural language AI assistance
Examples:

bash
$ analyze my network for suspicious activity
$ how to detect a port scan?
$ block 192.168.1.100
$ what is the best way to secure SSH?
🧠 AI Integration Details
The platform integrates with Groq's LPU API for ultra-fast AI responses:

Default Model: llama-3.3-70b-versatile

Fallback Model: Simulation mode (no API key required)

Response Time: < 1 second (real API) or instant (simulation)

Context Window: 8192 tokens

📌 Note: The older llama3-70b-8192 model has been deprecated by Groq. We now use llama-3.3-70b-versatile or llama-3.1-8b-instant for better performance.

🔧 Development Status
✅ Implemented
Full-stack Flask application with WebSockets

Live metrics and alerting system

AI terminal with Groq integration

Professional Cyberpunk UI

Responsive dashboard with charts

Modular architecture ready for expansion

🚧 In Progress / Planned
User authentication & role-based access control (RBAC)

Persistent database (PostgreSQL) for event storage

Real agent integration (syslog, auditd, iptables)

Automated report generation (PDF/CSV)

Docker containerization

Multi-user support with sessions

Advanced correlation engine for threat detection

🛠️ Contributing
This is an active development project. Contributions are welcome!

Fork the repository

Create your feature branch (git checkout -b feature/AmazingFeature)

Commit your changes (git commit -m 'Add some AmazingFeature')

Push to the branch (git push origin feature/AmazingFeature)

Open a Pull Request

📝 License
Distributed under the MIT License. See LICENSE file for more information.

📧 Contact
Project Lead: [Your Name]
GitHub: [Your GitHub Profile]
Project Link: https://github.com/yourusername/Cyber-Command-Hub

🙏 Acknowledgments
Groq for ultra-fast LPU API

Flask for backend framework

Socket.IO for real-time communication

Tailwind CSS for styling

Chart.js for visualizations

🎯 Ready for the next phase!
The platform is fully operational and awaiting your commands for:

AI Terminal backend integration enhancements

Real cybersecurity command execution

Advanced threat detection algorithms

System hardening recommendations

Awaiting your orders, Commander. 🛡️

text

---

## 🧠 التحليل والاقتراحات لتحسين ربط الـ AI Terminal مع الـ Backend

### التحليل الحالي:

✅ **الوضع الحالي يعمل بشكل جيد:**
- الـ Frontend (dashboard.js) يرسل POST request إلى `/api/groq`
- الـ Backend (api_routes.py) يستقبل الطلب ويرسله إلى `groq_service.py`
- `groq_service.py` يتعامل مع Groq API ويعيد الرد

### 🔧 اقتراحات التحسين:

#### 1️⃣ **إضافة أوامر سيبرانية حقيقية (تنفيذية)**

في `services/groq_service.py`، أضف هذه الدالة:

```python
import subprocess
import shlex

def execute_cyber_command(command: str) -> str:
    """تنفيذ أوامر سيبرانية حقيقية (محصورة بأوامر آمنة)"""
    
    # قائمة الأوامر المسموحة
    allowed_commands = {
        "netstat": ["netstat", "-an"],
        "ps": ["ps", "aux"],
        "who": ["who"],
        "uptime": ["uptime"],
        "df": ["df", "-h"],
        "free": ["free", "-h"]
    }
    
    cmd_key = command.lower().split()[0] if command.split() else ""
    
    if cmd_key in allowed_commands:
        try:
            result = subprocess.run(
                allowed_commands[cmd_key], 
                capture_output=True, 
                text=True, 
                timeout=5
            )
            return f"```\n{result.stdout}\n```" if result.stdout else "No output"
        except Exception as e:
            return f"Error executing command: {str(e)}"
    
    return f"Command '{cmd_key}' not allowed for security reasons."
2️⃣ إضافة واجهة WebSocket للـ Terminal
في services/websocket_service.py:

python
@socketio.on('terminal_command')
def handle_terminal_command(data):
    command = data.get('command', '')
    response = execute_cyber_command(command)  # أو call Groq
    socketio.emit('terminal_response', {'response': response, 'command': command})
3️⃣ تحسين الـ Frontend لاستقبال الأوامر التنفيذية
في dashboard.js، أضف:

javascript
socket.on('terminal_response', (data) => {
    appendTerminal(`\n[EXEC] ${data.command}\n${data.response}`, false);
});

# Cyber-Command-Hub

## because watching metrics in a boring white dashboard is a crime.

You know the drill. You SSH into a box, run `htop`, stare at `tcpdump`, juggle three terminals, and still feel blind.

We built this to fix that.

**Cyber-Command-Hub** is a real-time, browser-native SOC cockpit. No bloated enterprise UI. No waiting ten seconds for a graph to load. Just live system metrics, network traffic, security alerts, and an AI terminal that actually listens – all wrapped in a dark cyberpunk shell that feels like home.

> This is the dashboard we wanted when hunting anomalies at 2AM.

---

## What's inside.

- **Live hardware telemetry** – CPU, RAM, Disk. Updates every 2 seconds via WebSocket. No page refresh nonsense.
- **Network vision** – In/out Mbps, packets per second. See the noise before it hits you.
- **Alert engine** – Critical, High, Medium, Low. Color‑coded, time‑stamped, and impossible to ignore. Critical alerts *pulse*.
- **AI Terminal** – Talk to it like a human. Ask for analysis, block an IP, or just say "help". Powered by Groq (Llama 3.3‑70B) – fast, actually useful, and falls back cleanly when offline.
- **Real‑time charts** – Traffic timeline, threat scatter plot, resource comparison. Because numbers alone lie.
- **Modular as hell** – Flask backend, service separation, ready to plug in real agents (syslog, auditd, iptables).

---

## Fire it up.

```bash
git clone https://github.com/YOUR_USERNAME/Cyber-Command-Hub.git
cd Cyber-Command-Hub
python -m venv venv
source venv/bin/activate          # or venv\Scripts\activate on Windows
pip install -r requirements.txt
python app.py
```

Open `http://localhost:5000` – you're in.

Optional: drop your Groq API key into `config.py` to unlock the real AI brain. Without it, the terminal still works in simulation mode (smart enough to fake it).

---

## This is alive.

We're actively hacking on it. Next targets:  
- user auth because not everyone should touch the kill switch  
- real log ingestion (syslog, auditd, the good stuff)  
- automated reports because copy‑pasting is for rookies  

**Pull requests, weird ideas, and angry security takes are welcome.**

---

**Now go watch your network breathe.** 🛡️

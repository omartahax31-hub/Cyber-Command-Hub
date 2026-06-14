# 🔥 Cyber-Command-Hub

## Look, I've been there.

You're logged into three servers at once. `tail -f` on one screen, `tcpdump` on another, some half-broken dashboard on the third that updates every 30 seconds.

It sucks.

So I built this. Not because the world needs another security dashboard. But because **I** needed one that doesn't get in my way.

---

## What the hell is this?

A real-time SOC cockpit that actually feels like a tool, not a PowerPoint presentation.

- **Live system metrics** – CPU, RAM, Disk. The good stuff. Updates every 2 seconds through WebSockets. No polling, no waiting, no "refresh" button from 2010.

- **Network traffic** – In/out Mbps, packets per second. You'll see the spike before your monitoring alert even fires.

- **Alert system** – Critical, High, Medium, Low. Color coded. Time stamped. Critical ones *pulse* on your screen because subtlety is for emails.

- **AI Terminal** – Type `analyze`, type `block 192.168.1.100`, type whatever. It talks back. Powered by Groq (Llama 3.3-70B) – fast enough that you won't sit there wondering if it crashed. No API key? No problem. Falls back to simulation mode that's actually useful.

- **Charts that move** – Traffic timeline, threat scatter plot, CPU vs RAM. Real time. Not the "real time" that means "refreshes every 10 seconds".

- **Modular backend** – Flask, Blueprints, services separated like they should be. You can swap out the metrics source, add syslog ingestion, plug in your own agents. I didn't lock you in.

---

## Get it running. Now.

```bash
git clone https://github.com/YOUR_USERNAME/Cyber-Command-Hub.git
cd Cyber-Command-Hub
python -m venv venv
source venv/bin/activate          # Windows: venv\Scripts\activate
pip install -r requirements.txt
python app.py
```

Open `http://localhost:5000`. That's it.

Want the real AI? Drop your Groq API key in `config.py`. Otherwise, simulation mode kicks in and you won't even notice the difference.

---

## Where's this going?

I'm not done. Not even close.

- **Auth** – because letting everyone touch this thing is a bad idea.
- **Real agents** – syslog, auditd, iptables. Pull data from actual running systems, not just my fake generator.
- **Reports** – PDF, CSV, whatever. So you can prove to your boss you actually did something.
- **Database** – PostgreSQL. Store alerts. Correlate them later.

This is a living project. If you break it, fix it. If you make it better, send me a pull request.

---

## One more thing.

I built this for people who actually do the work. Not for managers. Not for compliance. For the ones who stare at packet captures and know what "weird" looks like.

**Go watch your network breathe. And when something looks wrong – you'll see it immediately.** 🛡️

---

*p.s. – Yeah, I wrote this myself. No AI fluff. If something sucks, tell me.*

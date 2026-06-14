// SCOC - Strategic Cyber Operations Center
// React component with real-time WebSocket simulation + ECharts + Floating AI Terminal

const { useState, useEffect, useRef } = React;

// ========== WebSocket Simulator (جاهز للربط الحقيقي) ==========
class MockWebSocket {
    constructor(url) {
        this.url = url;
        this.listeners = {};
        setTimeout(() => this.triggerOpen(), 50);
        this.startEmitting();
    }
    onopen = null;
    onmessage = null;
    onerror = null;
    onclose = null;
    
    triggerOpen() {
        if (this.onopen) this.onopen();
        this.emit('open');
    }
    emit(event, data) {
        if (this.onmessage && event === 'message') this.onmessage({ data: JSON.stringify(data) });
        if (this.listeners[event]) this.listeners[event].forEach(fn => fn(data));
    }
    addEventListener(event, fn) {
        if (!this.listeners[event]) this.listeners[event] = [];
        this.listeners[event].push(fn);
    }
    startEmitting() {
        setInterval(() => {
            const metrics = {
                cpu: Math.floor(20 + Math.random() * 60),
                ram: Math.floor(30 + Math.random() * 55),
                disk: Math.floor(40 + Math.random() * 45),
                bandwidthIn: Math.floor(50 + Math.random() * 450),
                bandwidthOut: Math.floor(30 + Math.random() * 300),
                packets: Math.floor(200 + Math.random() * 800),
                onlineHosts: 120 + Math.floor(Math.random() * 30),
                offlineHosts: 4 + Math.floor(Math.random() * 8),
                criticalAlerts: Math.floor(Math.random() * 3),
                highAlerts: Math.floor(Math.random() * 7),
                mediumAlerts: Math.floor(Math.random() * 12),
                lowAlerts: Math.floor(Math.random() * 20)
            };
            const eventTypes = ['Login Failure', 'Port Scan', 'Malicious DNS', 'Suspicious Process', 'Firewall Drop', 'Brute Force'];
            const newAlert = {
                id: Date.now(),
                timestamp: new Date().toISOString(),
                severity: ['critical','high','medium','low'][Math.floor(Math.random()*4)],
                message: `${eventTypes[Math.floor(Math.random()*eventTypes.length)]} from 10.0.${Math.floor(Math.random()*255)}.${Math.floor(Math.random()*255)}`
            };
            this.emit('message', { type: 'metrics', data: metrics });
            if (Math.random() < 0.4) this.emit('message', { type: 'alert', data: newAlert });
        }, 1800);
    }
}

// استخدام WebSocket حقيقي لوضع URL موجود، أو المحاكاة
const createWebSocket = () => {
    if (window.location.hostname === 'localhost' || true) {
        return new MockWebSocket('ws://mock');
    }
    return new WebSocket('ws://localhost:8000/ws');
};

// ========== الرسم البياني ECharts ==========
const LiveChart = ({ title, optionCreator, refreshKey }) => {
    const chartRef = useRef(null);
    const instance = useRef(null);
    useEffect(() => {
        if (chartRef.current) {
            instance.current = echarts.init(chartRef.current);
            instance.current.setOption(optionCreator({}));
        }
        return () => instance.current?.dispose();
    }, []);
    useEffect(() => {
        if (instance.current) {
            instance.current.setOption(optionCreator({}), { notMerge: false });
        }
    }, [refreshKey]);
    return React.createElement('div', { ref: chartRef, className: 'w-full h-64 bg-[#0D1117] rounded-xl border border-[#1F2937] p-2' });
};

// ========== المكون الرئيسي ==========
const App = () => {
    const [metrics, setMetrics] = useState({
        cpu: 42, ram: 55, disk: 68, bandwidthIn: 234, bandwidthOut: 178, packets: 512,
        onlineHosts: 142, offlineHosts: 6, criticalAlerts: 2, highAlerts: 5, mediumAlerts: 9, lowAlerts: 14
    });
    const [alerts, setAlerts] = useState([]);
    const [trafficHistory, setTrafficHistory] = useState({ in: [], out: [] });
    const [threatTimeline, setThreatTimeline] = useState([]);
    const [resourceHistory, setResourceHistory] = useState({ cpu: [], ram: [], net: [] });
    const [terminalOpen, setTerminalOpen] = useState(true);
    const [terminalInput, setTerminalInput] = useState('');
    const [terminalOutput, setTerminalOutput] = useState(['SCOC Terminal v1.0 ready. Type "help" for commands.']);
    const [lastUpdate, setLastUpdate] = useState(Date.now());

    // WebSocket effect
    useEffect(() => {
        const ws = createWebSocket();
        ws.onmessage = (event) => {
            const { type, data } = JSON.parse(event.data);
            if (type === 'metrics') {
                setMetrics(prev => ({ ...prev, ...data }));
                // تحديث التواريخ للرسوم البيانية
                setTrafficHistory(prev => ({
                    in: [...prev.in.slice(-30), data.bandwidthIn],
                    out: [...prev.out.slice(-30), data.bandwidthOut]
                }));
                setResourceHistory(prev => ({
                    cpu: [...prev.cpu.slice(-30), data.cpu],
                    ram: [...prev.ram.slice(-30), data.ram],
                    net: [...prev.net.slice(-30), (data.bandwidthIn + data.bandwidthOut)/2]
                }));
                setLastUpdate(Date.now());
            }
            if (type === 'alert') {
                const newAlert = { ...data, timestamp: new Date().toLocaleTimeString('ar-EG') };
                setAlerts(prev => [newAlert, ...prev].slice(0, 50));
                setThreatTimeline(prev => [{ time: newAlert.timestamp, severity: newAlert.severity, msg: newAlert.message }, ...prev].slice(0, 40));
                // وميض حرج
                if (data.severity === 'critical') {
                    const el = document.getElementById('criticalGlow');
                    if (el) el.classList.add('critical-pulse');
                    setTimeout(() => el?.classList.remove('critical-pulse'), 800);
                }
            }
        };
        return () => ws.close?.();
    }, []);

    const totalAlerts = metrics.criticalAlerts + metrics.highAlerts + metrics.mediumAlerts + metrics.lowAlerts;
    
    // أوامر Terminal (محاكاة AI عبر Groq)
    const handleTerminalCommand = async (cmd) => {
        const userMsg = `> ${cmd}`;
        setTerminalOutput(prev => [...prev, userMsg]);
        let response = '';
        if (cmd === 'help') response = 'Available: status, block <IP>, analyze, clear, traffic, alerts';
        else if (cmd === 'status') response = `System: CPU ${metrics.cpu}% | RAM ${metrics.ram}% | Critical Alerts: ${metrics.criticalAlerts}`;
        else if (cmd.startsWith('block')) response = `[模拟] Blocked ${cmd.split(' ')[1]} via iptables -A INPUT -s ${cmd.split(' ')[1]} -j DROP`;
        else if (cmd === 'analyze') response = `Threat analysis: High probability of scanning activity. Recommend isolating 10.0.12.4`;
        else if (cmd === 'traffic') response = `In: ${metrics.bandwidthIn} Mbps | Out: ${metrics.bandwidthOut} Mbps | PPS: ${metrics.packets}`;
        else if (cmd === 'alerts') response = `Last alert: ${alerts[0]?.message || 'None'}`;
        else response = `Command not recognized. Try "help".`;
        setTerminalOutput(prev => [...prev, `[AI] ${response}`]);
        setTerminalInput('');
    };

    // تكوينات الرسوم البيانية
    const trafficOpt = (data) => ({
        tooltip: { trigger: 'axis' }, legend: { textStyle: { color: '#94A3B8' } }, grid: { containLabel: true },
        xAxis: { type: 'category', data: Array.from({length: trafficHistory.in.length}, (_,i)=>i) },
        yAxis: { type: 'value', name: 'Mbps' },
        series: [{ name: 'Incoming', type: 'line', data: trafficHistory.in, smooth: true, lineStyle: { color: '#00E5FF', width: 2 }, areaStyle: { opacity: 0.2 } },
                  { name: 'Outgoing', type: 'line', data: trafficHistory.out, smooth: true, lineStyle: { color: '#FFC107' } }]
    });
    const threatOpt = () => ({ tooltip: {}, xAxis: { type: 'category', data: threatTimeline.map(t=>t.time).reverse() }, yAxis: { type: 'value', name: 'Severity' },
        series: [{ type: 'scatter', data: threatTimeline.map(t=> ({ value: ['critical','high','medium','low'].indexOf(t.severity), name: t.msg })), symbolSize: 12 }] });
    const resourceOpt = () => ({ tooltip: {}, legend: {}, xAxis: { type: 'category', data: resourceHistory.cpu.map((_,i)=>i) }, yAxis: { type: 'value', max: 100 },
        series: [{ name: 'CPU', type: 'line', data: resourceHistory.cpu, color: '#FF1744' }, { name: 'RAM', type: 'line', data: resourceHistory.ram, color: '#00FF88' }] });

    // JSX عبر createElement (لأن Babel سيعالج الملف)
    return React.createElement('div', { className: 'flex flex-col h-full w-full' },
        // شريط علوي
        React.createElement('header', { className: 'bg-[#0D1117] border-b border-[#1F2937] px-6 py-3 flex justify-between items-center' },
            React.createElement('div', { className: 'flex items-center gap-2' },
                React.createElement('i', { className: 'fas fa-shield-haltered text-[#00E5FF] text-2xl glow-text' }),
                React.createElement('span', { className: 'font-bold text-xl tracking-wider' }, 'SCOC ', React.createElement('span', { className: 'text-[#00E5FF]' }, 'Cyber Operations'))),
            React.createElement('div', { className: 'flex gap-4 text-sm' },
                React.createElement('span', { className: 'text-[#00FF88]' }, React.createElement('i', { className: 'fas fa-circle mr-1 text-[10px]' }), ' REAL-TIME ACTIVE'),
                React.createElement('span', { id: 'criticalGlow', className: 'text-[#FF1744] font-mono' }, React.createElement('i', { className: 'fas fa-bell mr-1' }), ` ${metrics.criticalAlerts} CRITICAL`))),
        
        // الشبكة الرئيسية (grid)
        React.createElement('main', { className: 'flex-1 overflow-auto p-5' },
            React.createElement('div', { className: 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-6' },
                // System Health
                React.createElement('div', { className: 'bg-[#0D1117] border border-[#1F2937] rounded-2xl p-4 hover:glow-border transition' },
                    React.createElement('h3', { className: 'text-[#94A3B8] text-sm uppercase mb-2' }, React.createElement('i', { className: 'fas fa-microchip mr-2' }), 'System Health'),
                    React.createElement('div', { className: 'space-y-2' },
                        ['CPU', metrics.cpu, '#FF1744'], ['RAM', metrics.ram, '#00E5FF'], ['Disk', metrics.disk, '#FFC107']
                        .map(([label, val, color]) => React.createElement('div', { key: label }, React.createElement('div', { className: 'flex justify-between text-sm' }, React.createElement('span', null, label), React.createElement('span', null, `${val}%`)),
                            React.createElement('div', { className: 'w-full bg-[#1F2937] rounded-full h-1.5 mt-1' }, React.createElement('div', { style: { width: `${val}%`, backgroundColor: color, height: '6px', borderRadius: '4px' } })))))),
                // Network Monitoring
                React.createElement('div', { className: 'bg-[#0D1117] border border-[#1F2937] rounded-2xl p-4' },
                    React.createElement('h3', { className: 'text-[#94A3B8] text-sm uppercase mb-2' }, React.createElement('i', { className: 'fas fa-network-wired mr-2' }), 'Network'),
                    React.createElement('div', { className: 'text-2xl font-mono font-bold' }, `${metrics.bandwidthIn} / ${metrics.bandwidthOut}`, React.createElement('span', { className: 'text-xs text-[#94A3B8]' }, ' Mbps')),
                    React.createElement('div', { className: 'text-xs mt-1' }, `Packets: ${metrics.packets} pps`)),
                // Hosts
                React.createElement('div', { className: 'bg-[#0D1117] border border-[#1F2937] rounded-2xl p-4' },
                    React.createElement('h3', { className: 'text-[#94A3B8] text-sm uppercase mb-2' }, React.createElement('i', { className: 'fas fa-server mr-2' }), 'Hosts'),
                    React.createElement('div', { className: 'flex justify-between' }, React.createElement('div', null, React.createElement('div', { className: 'text-green-400 text-2xl' }, metrics.onlineHosts), React.createElement('span', { className: 'text-xs' }, 'Online')),
                        React.createElement('div', null, React.createElement('div', { className: 'text-red-400 text-2xl' }, metrics.offlineHosts), React.createElement('span', { className: 'text-xs' }, 'Offline')))),
                // Threat Status
                React.createElement('div', { className: 'bg-[#0D1117] border border-[#1F2937] rounded-2xl p-4' },
                    React.createElement('h3', { className: 'text-[#94A3B8] text-sm uppercase mb-2' }, React.createElement('i', { className: 'fas fa-chart-line mr-2' }), 'Threat Status'),
                    React.createElement('div', { className: 'flex justify-between text-center' }, 
                        [[metrics.criticalAlerts,'#FF1744','CRIT'], [metrics.highAlerts,'#FF6D00','HIGH'], [metrics.mediumAlerts,'#FFC107','MED'], [metrics.lowAlerts,'#00FF88','LOW']].map(([cnt, col, lvl]) => React.createElement('div', { key: lvl }, React.createElement('div', { style: { color: col }, className: 'text-xl font-bold' }, cnt), React.createElement('div', { className: 'text-xs text-[#94A3B8]' }, lvl)))))),
            
            // الرسوم البيانية
            React.createElement('div', { className: 'grid grid-cols-1 lg:grid-cols-2 gap-5 mb-6' },
                React.createElement(LiveChart, { title: 'Live Traffic (Mbps)', optionCreator: trafficOpt, refreshKey: lastUpdate }),
                React.createElement(LiveChart, { title: 'Threat Timeline', optionCreator: threatOpt, refreshKey: threatTimeline.length })),
            React.createElement('div', { className: 'mb-6' },
                React.createElement(LiveChart, { title: 'Resource Usage (CPU / RAM)', optionCreator: resourceOpt, refreshKey: lastUpdate })),
            
            // قائمة التنبيهات الحية
            React.createElement('div', { className: 'bg-[#0D1117] border border-[#1F2937] rounded-2xl p-4' },
                React.createElement('div', { className: 'flex justify-between items-center mb-3' }, React.createElement('h3', { className: 'text-[#00E5FF]' }, React.createElement('i', { className: 'fas fa-bell mr-2' }), 'Real-Time Alerts'), React.createElement('span', { className: 'text-xs bg-[#1F2937] px-2 py-1 rounded-full' }, totalAlerts, ' total')),
                React.createElement('div', { className: 'max-h-64 overflow-y-auto space-y-2' }, alerts.slice(0,12).map(alert => React.createElement('div', { key: alert.id, className: `flex items-center justify-between p-2 border-b border-[#1F2937] text-sm ${alert.severity === 'critical' ? 'bg-red-950/30' : ''}` },
                    React.createElement('span', { className: `w-2 h-2 rounded-full ${alert.severity === 'critical' ? 'bg-[#FF1744]' : alert.severity === 'high' ? 'bg-[#FF6D00]' : alert.severity === 'medium' ? 'bg-[#FFC107]' : 'bg-[#00FF88]'} mr-2` }),
                    React.createElement('span', { className: 'flex-1' }, alert.message),
                    React.createElement('span', { className: 'text-[#94A3B8] text-xs font-mono' }, alert.timestamp))))),
        
        // نافذة Terminal العائمة (Floating AI Terminal)
        terminalOpen && React.createElement('div', { className: 'fixed bottom-5 right-5 w-96 terminal-window z-50 flex flex-col shadow-2xl' },
            React.createElement('div', { className: 'flex justify-between items-center bg-[#00E5FF10] p-3 border-b border-[#1F2937] cursor-pointer', onClick: () => setTerminalOpen(false) },
                React.createElement('span', { className: 'font-mono text-sm' }, React.createElement('i', { className: 'fas fa-terminal mr-2 text-[#00FF88]' }), 'AI TERMINAL · GROQ READY'),
                React.createElement('i', { className: 'fas fa-times text-[#94A3B8] hover:text-white' })),
            React.createElement('div', { className: 'h-64 overflow-y-auto p-3 font-mono text-xs space-y-1 bg-black/40' },
                terminalOutput.map((line, idx) => React.createElement('div', { key: idx, className: line.startsWith('>') ? 'text-[#00E5FF]' : 'text-gray-300' }, line))),
            React.createElement('div', { className: 'flex border-t border-[#1F2937] p-2' },
                React.createElement('span', { className: 'text-[#00FF88] mr-2' }, '$'),
                React.createElement('input', { type: 'text', value: terminalInput, onChange: e => setTerminalInput(e.target.value), onKeyDown: e => e.key === 'Enter' && handleTerminalCommand(terminalInput), className: 'flex-1 bg-transparent outline-none text-sm font-mono', placeholder: 'analyze, block 192.168.1.1, status...', autoFocus: true }))),
        !terminalOpen && React.createElement('button', { onClick: () => setTerminalOpen(true), className: 'fixed bottom-5 right-5 bg-[#00E5FF] text-black rounded-full p-3 shadow-lg hover:scale-105 transition z-50' }, React.createElement('i', { className: 'fas fa-terminal text-xl' })))
    );
};

ReactDOM.createRoot(document.getElementById('root')).render(React.createElement(App));
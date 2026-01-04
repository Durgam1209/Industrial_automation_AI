
import React, { useState, useEffect, useCallback } from 'react';
import Simulation from './components/Simulation';
import Dashboard from './components/Dashboard';
import UserGuide from './components/UserGuide';
import { SimulationMode, MetricData } from './types';

const App: React.FC = () => {
  const [mode, setMode] = useState<SimulationMode>(SimulationMode.SYNTAXER);
  const [metrics, setMetrics] = useState<MetricData[]>([]);
  const [currentLatency, setCurrentLatency] = useState(0);
  const [currentDeviation, setCurrentDeviation] = useState(0);

  const handleMetricsUpdate = useCallback((latency: number, deviation: number) => {
    setCurrentLatency(latency);
    setCurrentDeviation(deviation);
    
    setMetrics(prev => {
      const newData = [
        ...prev,
        {
          time: prev.length,
          latency: latency + (Math.random() - 0.5) * 0.5,
          deviation: deviation,
          efficiency: 100 - (deviation * 50)
        }
      ].slice(-30);
      return newData;
    });
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 selection:bg-orange-500/30">
      {/* Navigation */}
      <nav className="border-b border-slate-800 bg-slate-900/50 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-red-600 rounded-lg shadow-lg shadow-orange-500/20 flex items-center justify-center font-black text-white italic">S</div>
            <div>
              <h1 className="text-lg font-bold tracking-tight">SyntaXer <span className="text-orange-500">Swarm</span></h1>
              <p className="text-[10px] text-slate-500 uppercase font-semibold tracking-widest leading-none">Neuro-Symbolic Architecture</p>
            </div>
          </div>
          <div className="hidden md:flex items-center gap-6 text-sm text-slate-400">
            <span className="text-white font-medium cursor-default">Prototype</span>
            <span className="hover:text-white cursor-pointer transition-colors">Team syntaXers</span>
          </div>
          <div className="w-8"></div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-6 py-8">
        <header className="mb-12">
          <div className="max-w-2xl">
            <h2 className="text-4xl font-extrabold mb-4 leading-tight">
              Autonomous Material Handling via <span className="bg-gradient-to-r from-orange-400 to-rose-400 bg-clip-text text-transparent">Differentiable Robot Stacks</span>
            </h2>
            <p className="text-slate-400 text-lg">
              Resolving stochastic pathing conflicts in real-time through end-to-end differentiable control layers and Non-Linear Opinion Dynamics.
            </p>
          </div>
        </header>

        {/* Prototype Interface */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          
          <div className="lg:col-span-2 space-y-8">
            {/* Control Panel */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                <div>
                  <h3 className="font-bold text-lg mb-1">Simulation Workspace</h3>
                  <p className="text-sm text-slate-500">Compare standard heuristics with our Neuro-Symbolic stack.</p>
                </div>
                <div className="flex p-1 bg-slate-950 rounded-xl border border-slate-800">
                  {Object.values(SimulationMode).map(m => (
                    <button
                      key={m}
                      onClick={() => {
                        setMode(m);
                        setMetrics([]);
                      }}
                      className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                        mode === m 
                          ? 'bg-orange-600 text-white shadow-lg shadow-orange-500/20' 
                          : 'text-slate-500 hover:text-slate-300'
                      }`}
                    >
                      {m}
                    </button>
                  ))}
                </div>
              </div>

              <Simulation mode={mode} onMetricsUpdate={handleMetricsUpdate} />
              
              <div className="mt-8">
                <Dashboard 
                  data={metrics} 
                  currentLatency={currentLatency} 
                  currentDeviation={currentDeviation} 
                />
              </div>
            </div>

            {/* Industrial Pain Points section */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
               {[
                 { title: "Kinematic Rigidity", icon: "fa-lock", desc: "Traditional A*/DWA fail in narrow 1.2m factory apertures." },
                 { title: "Edge Latency", icon: "fa-bolt", desc: "Cloud offloading incurs >100ms jitter, causing dangerous halts." },
                 { title: "Swarm Livelocks", icon: "fa-users-slash", desc: "Heuristic-based competitive deadlocks in aisles." }
               ].map((item, idx) => (
                 <div key={idx} className="bg-slate-900/50 p-4 rounded-xl border border-slate-800/50 hover:border-slate-700 transition-colors">
                   <div className="text-orange-500 mb-2 text-lg"><i className={`fas ${item.icon}`}></i></div>
                   <h4 className="font-bold text-sm mb-1">{item.title}</h4>
                   <p className="text-xs text-slate-500 leading-relaxed">{item.desc}</p>
                 </div>
               ))}
            </div>
          </div>

          <aside className="space-y-8">
            <UserGuide />
            
            <div className="bg-gradient-to-br from-slate-900 to-slate-800 p-6 rounded-2xl border border-slate-700">
              <h3 className="font-bold text-lg mb-4">Technical Stack</h3>
              <ul className="space-y-4">
                <li className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded bg-slate-950 flex items-center justify-center text-orange-500">
                    <i className="fas fa-network-wired text-xs"></i>
                  </div>
                  <div>
                    <div className="text-xs font-bold">ROS 2 Humble</div>
                    <div className="text-[10px] text-slate-500">Robotics Middleware</div>
                  </div>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded bg-slate-950 flex items-center justify-center text-blue-500">
                    <i className="fas fa-brain text-xs"></i>
                  </div>
                  <div>
                    <div className="text-xs font-bold">PyTorch & TensorRT</div>
                    <div className="text-[10px] text-slate-500">Inference Engine & DRL</div>
                  </div>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded bg-slate-950 flex items-center justify-center text-emerald-500">
                    <i className="fas fa-microchip text-xs"></i>
                  </div>
                  <div>
                    <div className="text-xs font-bold">NVIDIA Jetson Orin</div>
                    <div className="text-[10px] text-slate-500">Onboard Edge Compute</div>
                  </div>
                </li>
              </ul>
              <div className="mt-6 pt-6 border-t border-slate-700/50">
                 <div className="text-[10px] text-slate-500 mb-2 font-semibold uppercase tracking-widest">Team Reference</div>
                 <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-slate-700 flex items-center justify-center text-[8px] font-bold border border-slate-600">DM</div>
                    <div className="w-6 h-6 rounded-full bg-slate-700 flex items-center justify-center text-[8px] font-bold border border-slate-600">PD</div>
                    <span className="text-xs font-medium text-slate-400 ml-1">NIT Trichy</span>
                 </div>
              </div>
            </div>
          </aside>
        </div>

        {/* Scalability Footer section */}
        <section className="bg-orange-600/10 border border-orange-500/20 p-8 rounded-3xl text-center">
          <h3 className="text-2xl font-bold mb-2">Industrial Impact & Scalability</h3>
          <p className="text-slate-400 max-w-xl mx-auto text-sm mb-6">
            "We are not just building a robot; we are building a scalable Intelligence Layer for Industrial 4.0."
          </p>
          <div className="flex flex-wrap justify-center gap-12">
            <div className="flex flex-col items-center">
              <span className="text-3xl font-bold text-white">500kg</span>
              <span className="text-[10px] text-slate-500 uppercase tracking-widest">Max Payload Scale</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-3xl font-bold text-white">&lt; 5ms</span>
              <span className="text-[10px] text-slate-500 uppercase tracking-widest">Inference Speed</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-3xl font-bold text-white">100%</span>
              <span className="text-[10px] text-slate-500 uppercase tracking-widest">Onboard Logic</span>
            </div>
          </div>
        </section>
      </main>

      <footer className="mt-20 py-12 border-t border-slate-800 bg-slate-950/50">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
          <div className="text-sm text-slate-500">
            © 2026 Pragyan | Team syntaXers | Industrial Automation Prototype
          </div>
          <div className="flex gap-4">
             <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-white transition-colors">
               <i className="fab fa-github text-lg"></i>
             </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;

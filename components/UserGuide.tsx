
import React from 'react';

const UserGuide: React.FC = () => {
  return (
    <div className="bg-slate-800/80 rounded-2xl border border-slate-700 p-6 shadow-2xl backdrop-blur-sm">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-orange-600 rounded-lg flex items-center justify-center text-white shadow-lg shadow-orange-500/20">
          <i className="fas fa-map-signs"></i>
        </div>
        <div>
          <h3 className="font-bold text-lg">Interactive Guide</h3>
          <p className="text-slate-400 text-sm">How to explore the prototype</p>
        </div>
      </div>

      <div className="space-y-6">
        <div className="relative pl-8">
          <div className="absolute left-0 top-0 w-6 h-6 bg-slate-700 rounded-full flex items-center justify-center text-[10px] font-bold text-orange-400 border border-slate-600">1</div>
          <h4 className="text-sm font-bold text-slate-200 mb-1">Observe the Conflict</h4>
          <p className="text-xs text-slate-400 leading-relaxed">
            Standard robots (Heuristic) use static rules. In narrow factory aisles, they often reach a "Livelock"—a state where neither robot can pass, halting production.
          </p>
        </div>

        <div className="relative pl-8">
          <div className="absolute left-0 top-0 w-6 h-6 bg-slate-700 rounded-full flex items-center justify-center text-[10px] font-bold text-orange-400 border border-slate-600">2</div>
          <h4 className="text-sm font-bold text-slate-200 mb-1">Switch to SyntaXer</h4>
          <p className="text-xs text-slate-400 leading-relaxed">
            Toggle to <strong>Neuro-Symbolic mode</strong>. Watch how robots use <span className="text-orange-400">NOD Yielding</span> to communicate intent and dynamically shift their path to allow passage.
          </p>
        </div>

        <div className="relative pl-8">
          <div className="absolute left-0 top-0 w-6 h-6 bg-slate-700 rounded-full flex items-center justify-center text-[10px] font-bold text-orange-400 border border-slate-600">3</div>
          <h4 className="text-sm font-bold text-slate-200 mb-1">Analyze Metrics</h4>
          <p className="text-xs text-slate-400 leading-relaxed">
            Check the dashboard. Our architecture maintains <span className="text-blue-400">sub-5ms latency</span> while reducing path deviation compared to traditional cloud-offloaded stacks.
          </p>
        </div>

        <div className="mt-4 p-4 bg-orange-500/10 border border-orange-500/20 rounded-xl">
          <div className="flex items-start gap-3">
            <i className="fas fa-bullseye text-orange-500 mt-1"></i>
            <div>
              <p className="text-[11px] font-bold text-orange-200 uppercase tracking-wider">Our Achievement</p>
              <p className="text-xs text-slate-300 mt-1 italic">
                Replacing rigid heuristics with differentiable control layers to create a truly "self-solving" industrial swarm.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserGuide;

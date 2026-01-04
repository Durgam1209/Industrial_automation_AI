
import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { MetricData } from '../types';

interface DashboardProps {
  data: MetricData[];
  currentLatency: number;
  currentDeviation: number;
}

const Dashboard: React.FC<DashboardProps> = ({ data, currentLatency, currentDeviation }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {/* Stat Card 1 */}
      <div className="bg-slate-800/50 p-4 rounded-xl border border-slate-700">
        <div className="text-slate-400 text-xs font-semibold uppercase tracking-wider mb-1">Inference Latency</div>
        <div className="flex items-baseline gap-2">
          <span className="text-2xl font-bold text-orange-500">{currentLatency.toFixed(2)}</span>
          <span className="text-xs text-slate-500">ms</span>
        </div>
        <div className="mt-2 text-[10px] text-slate-500">Threshold: &lt; 5ms required</div>
      </div>

      {/* Stat Card 2 */}
      <div className="bg-slate-800/50 p-4 rounded-xl border border-slate-700">
        <div className="text-slate-400 text-xs font-semibold uppercase tracking-wider mb-1">Path Deviation</div>
        <div className="flex items-baseline gap-2">
          <span className="text-2xl font-bold text-blue-400">{currentDeviation.toFixed(2)}</span>
          <span className="text-xs text-slate-500">m</span>
        </div>
        <div className="mt-2 text-[10px] text-slate-500">Avg. Standard Nav2: 0.84m</div>
      </div>

      {/* Chart 1 */}
      <div className="lg:col-span-2 row-span-2 bg-slate-800/50 p-4 rounded-xl border border-slate-700 min-h-[200px]">
        <div className="text-slate-400 text-xs font-semibold uppercase tracking-wider mb-4">Real-time Performance Benchmarking</div>
        <div className="h-40">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data}>
              <defs>
                <linearGradient id="colorLatency" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#f97316" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#f97316" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
              <XAxis dataKey="time" hide />
              <YAxis domain={[0, 50]} hide />
              <Tooltip 
                contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '8px', fontSize: '10px' }}
                itemStyle={{ color: '#f8fafc' }}
              />
              <Area 
                type="monotone" 
                dataKey="latency" 
                stroke="#f97316" 
                fillOpacity={1} 
                fill="url(#colorLatency)" 
                strokeWidth={2}
                isAnimationActive={false}
              />
              <Area 
                type="monotone" 
                dataKey="efficiency" 
                stroke="#3b82f6" 
                fillOpacity={0.1} 
                strokeWidth={2}
                isAnimationActive={false}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Stat Card 3 */}
      <div className="bg-slate-800/50 p-4 rounded-xl border border-slate-700">
        <div className="text-slate-400 text-xs font-semibold uppercase tracking-wider mb-1">Compute Precision</div>
        <div className="text-2xl font-bold text-emerald-400">FP16</div>
        <div className="mt-2 text-[10px] text-slate-500">Optimized via TensorRT</div>
      </div>

      {/* Stat Card 4 */}
      <div className="bg-slate-800/50 p-4 rounded-xl border border-slate-700">
        <div className="text-slate-400 text-xs font-semibold uppercase tracking-wider mb-1">Swarm Consensus</div>
        <div className="text-2xl font-bold text-violet-400">NOD-Enabled</div>
        <div className="mt-2 text-[10px] text-slate-500">Implicit Yield Arbitration</div>
      </div>
    </div>
  );
};

export default Dashboard;

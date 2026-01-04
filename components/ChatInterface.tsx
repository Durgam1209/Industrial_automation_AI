
import React, { useState } from 'react';
import { getArchitectureExplanation } from '../services/geminiService';

const ChatInterface: React.FC = () => {
  const [prompt, setPrompt] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);

  const handleAsk = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim()) return;

    setLoading(true);
    try {
      const text = await getArchitectureExplanation(prompt);
      setResponse(text || 'No explanation found.');
    } catch (err) {
      setResponse('Failed to fetch explanation. Please ensure your API key is configured correctly.');
    } finally {
      setLoading(false);
    }
  };

  const suggestions = [
    "NOD",
    "PPO Control",
    "Deadlock Resolving",
    "Sim-to-Real"
  ];

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl flex flex-col gap-4">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 bg-orange-600 rounded flex items-center justify-center text-white text-xs">
          <i className="fas fa-robot"></i>
        </div>
        <div>
          <h3 className="font-bold text-sm">Logic Explorer</h3>
          <p className="text-slate-500 text-[10px] uppercase tracking-wider font-semibold">AI Assistant</p>
        </div>
      </div>

      <div className="flex flex-wrap gap-1.5">
        {suggestions.map(s => (
          <button
            key={s}
            onClick={() => setPrompt(s)}
            className="text-[9px] px-2 py-0.5 bg-slate-800 hover:bg-slate-700 rounded-md text-slate-400 transition-colors border border-slate-700/50"
          >
            {s}
          </button>
        ))}
      </div>

      <form onSubmit={handleAsk} className="relative">
        <input
          type="text"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Ask technical details..."
          className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-orange-500 transition-all placeholder:text-slate-600"
        />
        <button
          type="submit"
          disabled={loading}
          className="absolute right-1.5 top-1.5 h-5 w-5 bg-orange-600 hover:bg-orange-500 disabled:bg-slate-800 rounded flex items-center justify-center transition-colors"
        >
          {loading ? <i className="fas fa-circle-notch fa-spin text-[8px]"></i> : <i className="fas fa-chevron-right text-[8px]"></i>}
        </button>
      </form>

      {response && (
        <div className="bg-slate-950 p-3 rounded-xl text-[11px] leading-relaxed text-slate-400 border border-slate-800/50 max-h-48 overflow-y-auto custom-scrollbar">
          <div className="font-bold text-orange-400 mb-1 flex items-center gap-1.5">
            <i className="fas fa-microchip text-[10px]"></i> KNOWLEDGE BASE:
          </div>
          {response}
        </div>
      )}
    </div>
  );
};

export default ChatInterface;

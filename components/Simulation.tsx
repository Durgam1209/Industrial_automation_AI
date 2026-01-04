
import React, { useEffect, useRef, useState, useCallback } from 'react';
import { RobotState, SimulationMode } from '../types';

interface SimulationProps {
  mode: SimulationMode;
  onMetricsUpdate: (latency: number, deviation: number) => void;
}

const Simulation: React.FC<SimulationProps> = ({ mode, onMetricsUpdate }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [robots, setRobots] = useState<RobotState[]>([
    { id: 1, x: 50, y: 100, targetX: 550, targetY: 100, color: '#ef4444', isStuck: false, isYielding: false },
    { id: 2, x: 550, y: 100, targetX: 50, targetY: 100, color: '#3b82f6', isStuck: false, isYielding: false },
  ]);

  // Fix: Added initial value null to useRef to resolve "Expected 1 arguments, but got 0" TypeScript error
  const frameId = useRef<number | null>(null);

  const resetSim = useCallback(() => {
     setRobots([
      { id: 1, x: 50, y: 100, targetX: 550, targetY: 100, color: '#ef4444', isStuck: false, isYielding: false },
      { id: 2, x: 550, y: 100, targetX: 50, targetY: 100, color: '#3b82f6', isStuck: false, isYielding: false },
    ]);
  }, []);

  useEffect(() => {
    resetSim();
  }, [mode, resetSim]);

  const update = useCallback(() => {
    setRobots(prev => {
      const next = prev.map(robot => {
        const dx = robot.targetX - robot.x;
        const dist = Math.abs(dx);
        
        if (dist < 5) return { ...robot, x: robot.targetX };

        // Interaction Logic
        const other = prev.find(r => r.id !== robot.id)!;
        const gap = Math.abs(robot.x - other.x);
        
        let speed = 2;
        let isStuck = false;
        let isYielding = false;

        if (mode === SimulationMode.HEURISTIC) {
          // Heuristic fails: simply stop or oscillate when too close
          if (gap < 40) {
            speed = 0;
            isStuck = true;
          }
        } else {
          // Neuro-Symbolic / NOD Logic:
          // Infer intent and "Yield" vertically to allow passing
          if (gap < 100) {
            isYielding = true;
            // Robot 1 goes up, Robot 2 goes down
            const targetYOffset = robot.id === 1 ? 70 : 130;
            const dy = targetYOffset - robot.y;
            robot.y += dy * 0.1;
            speed = 1.5; // Continue moving forward while yielding
          } else {
            // Return to path
            const dy = 100 - robot.y;
            robot.y += dy * 0.1;
          }
        }

        const moveDir = dx > 0 ? 1 : -1;
        return { 
          ...robot, 
          x: robot.x + (speed * moveDir), 
          isStuck,
          isYielding
        };
      });

      // Update external metrics
      const currentLatency = mode === SimulationMode.SYNTAXER ? 3.2 : 45.8;
      const currentDeviation = next.reduce((acc, r) => acc + Math.abs(100 - r.y), 0) / next.length;
      onMetricsUpdate(currentLatency, currentDeviation);

      return next;
    });

    frameId.current = requestAnimationFrame(update);
  }, [mode, onMetricsUpdate]);

  useEffect(() => {
    frameId.current = requestAnimationFrame(update);
    return () => {
      // Fix: Check if frameId.current exists before canceling animation
      if (frameId.current !== null) {
        cancelAnimationFrame(frameId.current);
      }
    };
  }, [update]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw "Narrow Aisle"
    ctx.strokeStyle = '#334155';
    ctx.setLineDash([5, 5]);
    ctx.beginPath();
    ctx.moveTo(0, 60);
    ctx.lineTo(600, 60);
    ctx.moveTo(0, 140);
    ctx.lineTo(600, 140);
    ctx.stroke();
    ctx.setLineDash([]);

    // Draw Robots
    robots.forEach(robot => {
      // Glow effect
      ctx.shadowBlur = 15;
      ctx.shadowColor = robot.color;
      
      // Robot Body
      ctx.fillStyle = robot.isStuck ? '#64748b' : robot.color;
      ctx.beginPath();
      ctx.arc(robot.x, robot.y, 15, 0, Math.PI * 2);
      ctx.fill();

      // Status Indicator
      if (robot.isStuck) {
        ctx.fillStyle = '#ef4444';
        ctx.font = 'bold 10px Inter';
        ctx.fillText('LIVELOCK!', robot.x - 25, robot.y - 25);
      }
      if (robot.isYielding) {
        ctx.fillStyle = '#10b981';
        ctx.font = 'bold 10px Inter';
        ctx.fillText('NOD YIELDING', robot.x - 30, robot.y - 25);
      }

      ctx.shadowBlur = 0;
    });

  }, [robots]);

  return (
    <div className="relative w-full h-64 bg-slate-900/50 rounded-xl overflow-hidden border border-slate-700 flex items-center justify-center">
      <div className="absolute top-4 left-4 text-xs font-mono uppercase tracking-widest text-slate-400">
        Simulation Environment: Factory Aisle v2.1
      </div>
      <canvas 
        ref={canvasRef} 
        width={600} 
        height={200} 
        className="max-w-full h-auto"
      />
      <div className="absolute bottom-4 right-4 flex gap-2">
        <button 
          onClick={resetSim}
          className="px-3 py-1 text-xs bg-slate-800 hover:bg-slate-700 rounded text-slate-300 transition-colors"
        >
          <i className="fas fa-redo-alt mr-1"></i> Reset
        </button>
      </div>
    </div>
  );
};

export default Simulation;
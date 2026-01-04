
export interface RobotState {
  id: number;
  x: number;
  y: number;
  targetX: number;
  targetY: number;
  color: string;
  isStuck: boolean;
  isYielding: boolean;
}

export enum SimulationMode {
  HEURISTIC = 'Heuristic (Standard Nav2)',
  SYNTAXER = 'Neuro-Symbolic (SyntaXer)'
}

export interface MetricData {
  time: number;
  latency: number;
  deviation: number;
  efficiency: number;
}

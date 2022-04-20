export type BarItem = {
  d: string;
  notes: string[];
};

export type ScoreProps = {
  staves: BarItem[][];
  clef?: string;
  timeSignature?: string | null;
  width?: number;
  height?: number;
};

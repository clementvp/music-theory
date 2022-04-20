export type KeyboardProps = {
  highlighted?: string[];
  sharpNotation?: boolean;
  octave?: number;
  rootPitch?: number;
  onKeyClick?: (note: string) => void;
};

export type OctaviedKeyboard = {
  root: string;
  note: string;
  alias: string | null;
  aliasRoot: string | null;
  class: string;
  isWhite: boolean;
  sharpAlteration: string | null;
  rootSharpAlteration: string | null;
  flatAlteration: string | null;
  rootFlatAlteration: string | null;
}[];

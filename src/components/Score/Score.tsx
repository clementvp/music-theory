import { useEffect, useRef } from 'react';
import VexFlow, { Accidental } from 'vexflow';
import { normalizeNote } from '../../services/NormalizeNote';
import { ScoreProps } from './ScoreTypes';

const VF = VexFlow.Flow;
const { Formatter, Renderer, Stave, StaveNote } = VF;

const Score = ({
  staves,
  clef = 'treble',
  timeSignature,
  width = 500,
  height = 150,
}: ScoreProps) => {
  const container = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<VexFlow.Renderer>();

  useEffect(() => {
    if (rendererRef.current == null) {
      rendererRef.current = new Renderer(
        container.current,
        Renderer.Backends.SVG,
      );
    }

    const renderer = rendererRef.current;
    renderer.resize(width, height);
    const context = renderer.getContext();
    const staveWidth = (width - 1) / staves.length;

    let currX = 0;
    staves.forEach((scoreStave, index) => {
      const stave = new Stave(currX, 0, staveWidth);
      if (index === 0) {
        clef && stave.addClef(clef);
        timeSignature && stave.addTimeSignature(timeSignature);
      }
      currX += stave.getWidth();
      stave.setContext(context).draw();

      const processedNotes = scoreStave.map(({ d, notes }) => {
        const normalizedNotes = notes.map((note) => {
          return normalizeNote(note);
        });

        const keys = normalizedNotes.map((item) => {
          return `${item.root}/${item.octave}`;
        });

        const staveNote = new StaveNote({ duration: d, keys: keys });

        normalizedNotes.forEach((item, index) => {
          if (item.alteration) {
            staveNote.addModifier(new Accidental(item.alteration), index);
          }
        });

        return staveNote;
      });

      Formatter.FormatAndDraw(context, stave, processedNotes, {
        auto_beam: true,
      });
    });
  }, [clef, height, staves, timeSignature, width]);

  return <div ref={container} />;
};

export default Score;

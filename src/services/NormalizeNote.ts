const findOctave = (index: number, array: string[]) => {
  let octave = null;
  for (let i = index; i < array.length; i++) {
    if (octave) {
      octave = `${octave}${array[i]}`;
    } else {
      octave = `${array[i]}`;
    }
  }
  return octave;
};

export const normalizeNote = (note: string) => {
  const splited = note.split('');
  const root = splited[0];
  let alteration = null;
  let octave;
  if (isNaN(parseInt(splited[1]))) {
    alteration = splited[1] ? splited[1] : null;
    if (isNaN(parseInt(splited[2]))) {
      alteration = splited[2] ? `${alteration}${splited[2]}` : null;
      octave = findOctave(3, splited);
    } else {
      octave = findOctave(2, splited);
    }
  } else {
    octave = findOctave(1, splited);
  }

  return { root, alteration, octave };
};

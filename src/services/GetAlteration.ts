import keys from '../components/Keyboard/Keys';
const getAlteration = (
  sharpNotation: boolean,
  note: string,
  octave?: number | null,
) => {
  const find = keys.find((key) => {
    return key.note === note || key.alias === note;
  });

  let result;
  if (find) {
    if (sharpNotation && !find.isWhite) {
      result = find.alias;
    } else {
      result = find.note;
    }
  }

  if (octave && find) {
    result = `${result}${octave}`;
  }

  return result;
};

export default getAlteration;

import { normalizeNote } from "./NormalizeNote";
import keys from "../components/Keyboard/Keys";

const findNoteBemol = (note: string) => {
  return keys.find((element) => {
    return element.alias === note;
  });
};

const findNoteSharp = (note: string) => {
  return keys.find((element) => {
    return element.note === note;
  });
};

const concatRootAlteration = (root: string, alteration: string) => {
  return `${root}${alteration}`;
};

const passBemolToSharp = (note: string) => {
  const find = findNoteBemol(note);
  if (find) {
    return find.note;
  } else {
    return note;
  }
};

const passSharpToBemol = (note: string) => {
  const find = findNoteSharp(note);
  if (find) {
    if (find.alias) {
      return find.alias;
    } else {
      return find.note;
    }
  } else {
    return note;
  }
};

const getInverseAlteration = (note: string, sharpNotation: boolean) => {
  const { root, alteration, octave } = normalizeNote(note);
  if (alteration) {
    const concatenedNote = concatRootAlteration(root, alteration);
    if (sharpNotation) {
      const inversed = passBemolToSharp(concatenedNote);
      if (octave) {
        return `${inversed}${octave}`;
      } else {
        return inversed;
      }
    } else {
      const inversed = passSharpToBemol(concatenedNote);
      if (octave) {
        return `${inversed}${octave}`;
      } else {
        return inversed;
      }
    }
  } else {
    return note;
  }
};

export default getInverseAlteration;

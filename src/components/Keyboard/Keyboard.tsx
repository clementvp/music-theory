import keyboardStyle from './Keyboard.module.css';
import { KeyboardProps, OctaviedKeyboard } from './KeyboardTypes';
import keys from './Keys';

const Keyboard = ({
  highlighted = [''],
  sharpNotation = true,
  octave = 1,
  rootPitch = 3,
  onKeyClick = () => {},
}: KeyboardProps) => {
  const buildKeyboard = () => {
    let mappedKeys = [...keys];
    let octaviedKeyboard: OctaviedKeyboard = [];

    for (let i = 1; i < octave + 1; i++) {
      for (let j = 0; j < mappedKeys.length; j++) {
        octaviedKeyboard.push({
          ...mappedKeys[j],
          root: mappedKeys[j].note,
          note: `${mappedKeys[j].note}${rootPitch + i - 1}`,
          aliasRoot: mappedKeys[j].alias ? mappedKeys[j].alias : null,
          alias: mappedKeys[j].alias
            ? `${mappedKeys[j].alias}${rootPitch + i - 1}`
            : null,
          rootFlatAlteration: mappedKeys[j].flatAlteration
            ? mappedKeys[j].flatAlteration
            : null,
          flatAlteration: mappedKeys[j].flatAlteration
            ? `${mappedKeys[j].flatAlteration}${rootPitch + i - 1}`
            : null,
          sharpAlteration: mappedKeys[j].sharpAlteration
            ? `${mappedKeys[j].sharpAlteration}${rootPitch + i - 1}`
            : null,
          rootSharpAlteration: mappedKeys[j].sharpAlteration
            ? mappedKeys[j].sharpAlteration
            : null,
        });
      }
    }

    if (highlighted.length !== 0) {
      for (let i = 0; i < highlighted.length; i++) {
        let found = octaviedKeyboard.filter(
          (element) =>
            element.note === highlighted[i] ||
            element.alias === highlighted[i] ||
            element.root === highlighted[i] ||
            element.aliasRoot === highlighted[i] ||
            element.flatAlteration === highlighted[i] ||
            element.rootFlatAlteration === highlighted[i] ||
            element.sharpAlteration === highlighted[i] ||
            element.rootSharpAlteration === highlighted[i],
        );
        found.forEach((found) => {
          const index = octaviedKeyboard.indexOf(found);
          octaviedKeyboard[index] = {
            ...octaviedKeyboard[index],
            class: `${octaviedKeyboard[index].class} ${keyboardStyle.highlighted}`,
          };
        });
      }
    }

    if (sharpNotation) {
      return octaviedKeyboard.map((element, index) => (
        <li
          className={element.class}
          key={index}
          onClick={() => {
            handleKeyClick(element.note, element.alias, element.isWhite);
          }}
        >
          {element.note}
        </li>
      ));
    } else {
      return octaviedKeyboard.map((element, index) => (
        <li
          className={element.class}
          key={index}
          onClick={() => {
            handleKeyClick(element.note, element.alias, element.isWhite);
          }}
        >
          {element.alias && !element.isWhite ? element.alias : element.note}
        </li>
      ));
    }
  };

  const handleKeyClick = (
    note: string,
    alias: string | null,
    isWhite: boolean,
  ) => {
    if (sharpNotation) {
      onKeyClick(note);
    } else {
      onKeyClick(alias && !isWhite ? alias : note);
    }
  };

  return <ul id={keyboardStyle['keyboard']}>{buildKeyboard()}</ul>;
};
export default Keyboard;

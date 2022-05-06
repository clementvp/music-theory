import { Row, Col } from "antd";
import { useEffect, useState } from "react";
import AlterationSwitcher from "../../components/AlterationSwitcher/AlterationSwitcher";
import Keyboard from "../../components/Keyboard/Keyboard";
import ScaleSelector from "../../components/ScaleSelector/ScaleSelector";
import getInverseAlteration from "../../services/GetInverseAlteration";
import processNotes from "../../services/ProcessNotes";
import { getScaleInfo } from "../../services/ScalesService";
import style from "./ScalesVisualizer.module.css";

const ScalesVisualizer = () => {
  const [keyboardNote, setKeyboardNote] = useState("C3");
  const [sharpNotation, setSharpNotation] = useState(true);
  const [selectedScale, setSelectedScale] = useState("major");
  const [highlitedNotes, setHighlitedNotes] = useState([""]);

  const handleSharpNotationChange = (value: boolean) => {
    setSharpNotation(value);
    const noteAlterego = getInverseAlteration(keyboardNote, value);
    setKeyboardNote(noteAlterego);
  };

  const handleKeyClick = (note: string) => {
    setKeyboardNote(note);
  };

  const handleScaleSelectorChange = (scale: string) => {
    setSelectedScale(scale);
  };

  useEffect(() => {
    const scaleInfos = getScaleInfo(`${keyboardNote} ${selectedScale}`);
    const processedNotes = processNotes(scaleInfos.notes);
    console.log(processedNotes);

    setHighlitedNotes(processedNotes);
  }, [keyboardNote, selectedScale, sharpNotation]);

  return (
    <>
      <h1>Scales visualizer</h1>
      <Row>
        <Col span={12}>
          <Row>
            <Col span={12}>
              <div className={style.keyboardPromptContainer}>
                <Keyboard
                  highlighted={[keyboardNote]}
                  sharpNotation={sharpNotation}
                  onKeyClick={handleKeyClick}
                ></Keyboard>
              </div>
              <div>
                <span>Selected root note: {keyboardNote}</span>
              </div>
            </Col>
            <Col span={12}>
              <div>
                <div>
                  <span>Alteration:</span>
                </div>
                <AlterationSwitcher
                  onNotationChange={handleSharpNotationChange}
                  sharpNotation
                ></AlterationSwitcher>
              </div>
              <div>
                <div className={style.scaleSelectorContainer}>
                  <span>Scale:</span>
                </div>
                <div>
                  <ScaleSelector
                    onSelectScale={handleScaleSelectorChange}
                  ></ScaleSelector>
                </div>
              </div>
            </Col>
          </Row>
        </Col>
        <Col span={12}>
          <div className={style.keyboardVisualiserContainer}>
            <Keyboard
              highlighted={highlitedNotes}
              octave={2}
              sharpNotation={sharpNotation}
            ></Keyboard>
          </div>
        </Col>
      </Row>
    </>
  );
};

export default ScalesVisualizer;

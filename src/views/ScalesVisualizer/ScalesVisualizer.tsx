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
    setHighlitedNotes(processedNotes);
  }, [keyboardNote, selectedScale, sharpNotation]);

  return (
    <>
      <Row>
        <Col xl={24}>
          <h1>Scale Visualizer</h1>
        </Col>
      </Row>
      <Row>
        <Col xl={6} xs={24}>
          <div
            style={{ width: "245px", marginLeft: "auto", marginRight: "auto" }}
          >
            <Keyboard
              onKeyClick={handleKeyClick}
              highlighted={[keyboardNote]}
              sharpNotation={sharpNotation}
            ></Keyboard>
          </div>
        </Col>
        <Col xl={6} xs={24}>
          <div style={{ marginTop: "13px" }}>
            <h4>Notation:</h4>
            <AlterationSwitcher
              onNotationChange={handleSharpNotationChange}
            ></AlterationSwitcher>
          </div>
          <div style={{ marginTop: "13px" }}>
            <h4>Scale:</h4>
            <ScaleSelector
              onSelectScale={handleScaleSelectorChange}
            ></ScaleSelector>
          </div>
        </Col>
        <Col xl={12} xs={0}>
          <div
            style={{ width: "490px", marginLeft: "auto", marginRight: "auto" }}
          >
            <Keyboard
              octave={2}
              sharpNotation={sharpNotation}
              highlighted={highlitedNotes}
            ></Keyboard>
          </div>
        </Col>
      </Row>
      <Row style={{ marginTop: "13px" }}>
        <Col xl={6} xs={24}>
          <h4>Selected Root: {keyboardNote}</h4>
        </Col>
        <Col xl={6} xs={24}></Col>
        <Col xl={12} xs={24}>
          <h4>Selected Scale: {`${keyboardNote} ${selectedScale}`}</h4>
        </Col>
      </Row>
    </>
  );
};

export default ScalesVisualizer;

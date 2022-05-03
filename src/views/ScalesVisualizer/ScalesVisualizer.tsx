import { Row, Col } from "antd";
import { useState } from "react";
import AlterationSwitcher from "../../components/AlterationSwitcher/AlterationSwitcher";
import Keyboard from "../../components/Keyboard/Keyboard";
import ScaleSelector from "../../components/ScaleSelector/ScaleSelector";
import getInverseAlteration from "../../services/GetInverseAlteration";

const ScalesVisualizer = () => {
  const [keyboardNote, setKeyboardNote] = useState("C3");

  const [sharpNotation, setSharpNotation] = useState(true);

  const handleSharpNotationChange = (value: boolean) => {
    setSharpNotation(value);
    const noteAlterego = getInverseAlteration(keyboardNote, value);
    setKeyboardNote(noteAlterego);
  };

  const handleKeyClick = (note: string) => {
    setKeyboardNote(note);
  };

  return (
    <>
      <h1>Scales visualizer</h1>
      <Row>
        <Col span={12}>
          <Row>
            <Col span={12}>
              <div style={{ height: "100%" }}>
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
                <div>
                  <span>Scale:</span>
                </div>
                <ScaleSelector></ScaleSelector>
              </div>
            </Col>
          </Row>
        </Col>
        <Col span={12}>Plop</Col>
      </Row>
    </>
  );
};

export default ScalesVisualizer;

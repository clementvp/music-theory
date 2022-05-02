import { Row, Col } from "antd";
import { useEffect, useState } from "react";
import AlterationSwitcher from "../../components/AlterationSwitcher/AlterationSwitcher";
import Keyboard from "../../components/Keyboard/Keyboard";
import ScaleSelector from "../../components/ScaleSelector/ScaleSelector";
const ScalesVisualizer = () => {
  const [selectedRootNote, setSelectedRootNote] = useState("C3");
  const [sharpNotation, setSharpNotation] = useState(true);

  const handleClickLeftKeyboard = (key: string) => {
    setSelectedRootNote(key);
  };

  const handleSharpNotationChange = (value: boolean) => {
    setSharpNotation(value);
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
                  sharpNotation={sharpNotation}
                  onKeyClick={handleClickLeftKeyboard}
                  highlighted={[selectedRootNote]}
                ></Keyboard>
              </div>
              <div>
                <span>Selected root note: {selectedRootNote}</span>
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

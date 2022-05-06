import { useEffect, useState } from "react";
import { Select } from "antd";
import { getAllScales } from "../../services/ScalesService";
import style from "./ScaleSelector.module.css";

const { Option } = Select;

type ScaleSelectorProps = {
  onSelectScale?: (scale: string) => void;
};

const ScaleSelector = ({
  onSelectScale = (scale) => {},
}: ScaleSelectorProps) => {
  const [scales, setScales] = useState([{ name: "" }]);

  useEffect(() => {
    const scales = getAllScales();
    setScales(scales);
  }, []);

  const onSelectChange = (value: string) => {
    onSelectScale(value);
  };

  const buildOptionsRender = () => {
    return scales.map((scale) => {
      return (
        <Option key={scale.name} value={scale.name}>
          {scale.name}
        </Option>
      );
    });
  };

  return (
    <Select
      className={style.scaleSelector}
      showSearch
      defaultValue="major"
      placeholder="Select or search a  scale"
      optionFilterProp="children"
      onChange={onSelectChange}
    >
      {buildOptionsRender()}
    </Select>
  );
};

export default ScaleSelector;

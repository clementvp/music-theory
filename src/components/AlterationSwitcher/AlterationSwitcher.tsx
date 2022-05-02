import { Switch } from "antd";

type AlterationSwitcherProps = {
  sharpNotation?: boolean;
  onNotationChange?: (checked: boolean) => void;
};

const AlterationSwitcher = ({
  sharpNotation = true,
  onNotationChange = () => {},
}: AlterationSwitcherProps) => {
  const handleChange = (checked: boolean) => {
    onNotationChange(checked);
  };

  return (
    <Switch
      style={{ background: "#FE938C" }}
      checkedChildren="#"
      unCheckedChildren="b"
      defaultChecked={sharpNotation}
      onChange={handleChange}
    />
  );
};

export default AlterationSwitcher;

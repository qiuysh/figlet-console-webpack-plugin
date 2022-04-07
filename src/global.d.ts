interface OptionsProps {
  font: string;
  color?: string;
  mark: string;
  hideDev: boolean;
}

interface IPluginOptionProps {
  name: string;
  content?: string;
  options: OptionsProps;
}

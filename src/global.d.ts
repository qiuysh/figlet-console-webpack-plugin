interface OptionsProps {
  font: string;
  color: string;
  mark: string;
  prodOnly: boolean;
  markMaxLength: number;
}

interface IPluginOptionProps {
  name: string;
  content?: string;
  options: OptionsProps;
}

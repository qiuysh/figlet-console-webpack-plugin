export interface FigletConsoleOptionsProps {
  font: string;
  color: string;
  mark: string;
  prodOnly: boolean;
  markMaxLength: number;
}

export interface FigletConsoleWebpackPluginProps {
  name: string;
  content?: string;
  options?: FigletConsoleOptionsProps;
}

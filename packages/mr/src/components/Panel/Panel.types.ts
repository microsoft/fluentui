export interface IPanelProps {
  width: number;
  height: number;
  depth?: number;
  layerSeparation?: number;
  alpha?: 0.4 | 0.6 | 0.8 | 1;
  theme?: FluentTheme;
  receiveInput?: boolean;
}

export enum FluentTheme {
  Light,
  Dark
}

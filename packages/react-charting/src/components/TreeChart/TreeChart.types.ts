import { IStyle, ITheme } from '@fluentui/react/lib/Styling';
import { IStyleFunctionOrObject } from '@fluentui/react/lib/Utilities';

export interface ITreeChartDataPoint {
  name: string;
  subname: string;
  fill: string;
  children?: Array<ITreeChartDataPoint>;
}
export interface ITreeProps {
  treeData: ITreeChartDataPoint;
  composition?: number | undefined;
  width: number;
  height: number;
  margin: { left: number; right: number; top: number; bottom: number };
  styles?: IStyleFunctionOrObject<ITreeStyleProps, ITreeStyles>;
  className?: string;
  theme?: ITheme;
}
export interface ITreeState {
  data: ITreeChartDataPoint | null;
}

export interface ITreeDataStructure {
  id: string;
  children: unknown;
  dataName: string;
  subName: string;
  fill: string;
  x: number;
  y: number;
  parentID: number;
}

export interface ITreeStyleProps {
  theme: ITheme;
  className?: string;
}
export interface ITreeStyles {
  link: IStyle;
  rectNode: IStyle;
  rectText: IStyle;
}

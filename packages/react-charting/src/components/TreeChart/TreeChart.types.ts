import { IStyle, ITheme } from '@fluentui/react/lib/Styling';
import { IStyleFunctionOrObject } from '@fluentui/react/lib/Utilities';

export interface ITreeChartDataPoint {
  name: string;
  subname: string;
  metric?: string | undefined;
  fill: string;
  children?: Array<ITreeChartDataPoint>;
}
export interface ITreeProps {
  treeData: ITreeChartDataPoint;
  composition?: number | undefined;
  width?: number;
  height?: number;
  marign?: { left: number; right: number; top: number; bottom: number };
  styles?: IStyleFunctionOrObject<ITreeStyleProps, ITreeStyles>;
  className?: string;
  theme?: ITheme;
}
export interface ITreeState {
  _width: number;
  _height: number;
}

export interface ITreeDataStructure {
  id: number;
  children: unknown;
  dataName: string;
  subName: string;
  metricName?: string | undefined;
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
  rectSubText: IStyle;
  rectmetricText: IStyle;
}

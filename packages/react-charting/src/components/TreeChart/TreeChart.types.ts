import { IStyleFunctionOrObject } from '@fluentui/react/lib/Utilities';
export interface ITreeStyleProps {}

export interface ITreeChartDataPoint {
  name: string;
  subname: string;
  fill: string;
  children?: Array<ITreeChartDataPoint>;
}
export interface ITreeProps {
  treeData: ITreeChartDataPoint;
  composition?: number | undefined;
  styles?: IStyleFunctionOrObject<ITreeStyleProps, ITreeStyles>;
  width: number;
  height: number;
  margin: { left: number; right: number; top: number; bottom: number };
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

export interface ITreeStyles {}

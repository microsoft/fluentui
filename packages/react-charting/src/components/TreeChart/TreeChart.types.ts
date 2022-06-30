import { IStyleFunctionOrObject } from '@fluentui/react/lib/Utilities';
export interface ITreeStyleProps {}

export interface IChartDataPoint {
  name: string;
  subname: string;
  fill: string;
  children?: Array<IChartDataPoint>;
}
export interface ITreeProps {
  treeData: IChartDataPoint;
  composition?: number | undefined;
  styles?: IStyleFunctionOrObject<ITreeStyleProps, ITreeStyles>;
  width: number;
  height: number;
  margin: { left: number; right: number; top: number; bottom: number };
}
export interface ITreeState {
  data: IChartDataPoint | null;
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

export interface ITreeStyleProps {}

export interface IDataStructure {
  name: string;
  subname: string;
  fill: string;
  children?: Array<IDataStructure>;
}
export interface ITreeProps {
  treeData: IDataStructure | null;
  // composition: number;
  // layer: number;
}
export interface ITreeState {
  data: IDataStructure | null;
  // layer: number;
  // composition: number;
}

export interface ITreeDataStructure {
  id: string;
  children: unknown;
  visualID: string;
  dataName: string;
  subName: string;
  fill: string;
  x: number;
  y: number;
  parentID: number;
}

export interface ITreeStyles {}

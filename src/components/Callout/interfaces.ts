export enum DirectionalHint {
  topLeftEdge,
  topCenter,
  topRightEdge,
  topAutoEdge,
  bottomLeftEdge,
  bottomCenter,
  bottomRightEdge,
  bottomAutoEdge,
  leftTopEdge,
  leftCenter,
  leftBottomEdge,
  rightTopEdge,
  rightCenter,
  rightBottomEdge
};

export interface IPositionInfo {
  calloutPosition: any;
  beakPosition: any;
  directionalClassName: string;
}

export interface ILink {
  name: string;
  url: string;
}
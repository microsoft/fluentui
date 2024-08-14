import { IChartDataPoint, IYValueHover } from '../../index';

export interface IPopoverComponentProps {
  clickPosition: { x: number; y: number };
  isPopoverOpen: boolean;
  xCalloutValue?: string;
  legend?: string;
  yCalloutValue?: string;
  YValue?: string | number | Date;
  color: string;
  culture: string;
  isCalloutForStack: boolean;
  customizedCallout?: JSX.Element;
  xAxisCalloutAccessibilityData?: { ariaLabel?: string; data?: string };
  hoverXValue?: string | number;
  YValueHover?: IYValueHover[];
  descriptionMessage?: string;
}

export interface IPopoverComponentStyles {
  calloutContentRoot: string;
  calloutDateTimeContainer: string;
  calloutContentX: string;
  calloutBlockContainer: string;
  calloutBlockContainertoDrawShapefalse: string;
  calloutBlockContainertoDrawShapetrue: string;
  shapeStyles: string;
  calloutlegendText: string;
  calloutContentY: string;
  descriptionMessage: string;
}

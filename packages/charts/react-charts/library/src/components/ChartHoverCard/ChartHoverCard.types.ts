import { YValueHover } from '../CommonComponents/index';

export interface ChartHoverCardProps {
  xCalloutValue?: string;
  legend?: string | number | Date;
  yCalloutValue?: string;
  YValue?: string | number | Date;
  XValue?: string;
  color?: string;
  culture?: string;
  isCalloutForStack?: boolean;
  xAxisCalloutAccessibilityData?: { ariaLabel?: string; data?: string };
  hoverXValue?: string | number;
  YValueHover?: YValueHover[];
  descriptionMessage?: string;
  ratio?: [number, number];
  isCartesian?: boolean;
}

export interface ChartHoverCardStyles {
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
  ratio: string;
  numerator: string;
  denominator: string;
  calloutInfoContainer: string;
}

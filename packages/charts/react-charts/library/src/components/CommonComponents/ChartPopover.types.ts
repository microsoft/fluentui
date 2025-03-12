import { YValueHover } from '../../index';

export interface ChartPopoverProps {
  clickPosition?: { x: number; y: number };
  isPopoverOpen?: boolean;
  xCalloutValue?: string;
  legend?: string | number | Date;
  yCalloutValue?: string;
  YValue?: string | number | Date;
  XValue?: string;
  color?: string;
  culture?: string;
  customizedCallout?: JSX.Element;
  isCalloutForStack?: boolean;
  xAxisCalloutAccessibilityData?: { ariaLabel?: string; data?: string };
  hoverXValue?: string | number;
  YValueHover?: YValueHover[];
  descriptionMessage?: string;
  ratio?: [number, number];
  isCartesian?: boolean;
}

export interface PopoverComponentStyles {
  calloutContainer: string;
}

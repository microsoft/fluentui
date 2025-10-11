import type { JSXElement } from '@fluentui/react-utilities';
import { YValueHover } from '../../index';
import { PositioningShorthand } from '@fluentui/react-positioning';

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
  customCallout?: {
    customizedCallout?: JSXElement;
    customCalloutProps?: ChartPopoverProps;
  };
  isCalloutForStack?: boolean;
  xAxisCalloutAccessibilityData?: { ariaLabel?: string; data?: string };
  hoverXValue?: string | number;
  YValueHover?: YValueHover[];
  descriptionMessage?: string;
  ratio?: [number, number];
  isCartesian?: boolean;
  styles?: Partial<PopoverComponentStyles>;
  positioning?: PositioningShorthand;
}

export interface PopoverComponentStyles {
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
  calloutContainer: string;
}

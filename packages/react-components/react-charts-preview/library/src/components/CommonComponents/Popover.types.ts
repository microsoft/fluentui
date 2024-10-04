import * as React from 'react';
import { IChartDataPoint, IYValueHover } from '../../index';
import { PopoverSurfaceSlots } from '@fluentui/react-popover';

export interface IPopoverComponentProps {
  clickPosition?: { x: number; y: number };
  isPopoverOpen?: boolean;
  xCalloutValue?: string;
  legend?: string | number | Date;
  yCalloutValue?: string;
  YValue?: string | number | Date;
  XValue?: string;
  color?: string;
  culture?: string;
  customProps?: IPopoverComponentProps;
  isCalloutForStack?: boolean;
  customizedCallout?: JSX.Element;
  xAxisCalloutAccessibilityData?: { ariaLabel?: string; data?: string };
  hoverXValue?: string | number;
  YValueHover?: IYValueHover[];
  descriptionMessage?: string;
  ratio?: [number, number];
  isCartesian?: boolean;
}

export interface IPopoverComponentStyles {
  calloutContentRoot: string;
  calloutDateTimeContainer: string;
  calloutContentX: string;
  calloutBlockContainerCartesian: string;
  calloutBlockContainerNonCartesian: string;
  calloutBlockContainertoDrawShapefalse: string;
  calloutBlockContainertoDrawShapetrue: string;
  shapeStyles: string;
  calloutlegendText: string;
  calloutContentYCartesian: string;
  calloutContentYNonCartesian: string;
  descriptionMessage: string;
  ratio: string;
  numerator: string;
  denominator: string;
}

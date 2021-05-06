import { IRenderFunction, IStyleFunctionOrObject } from '@fluentui/react/lib/Utilities';
import {
  IChartProps,
  ILineChartPoints,
  IMargins,
  IBasestate,
  IRefArrayData,
  ICustomizedCalloutData,
} from '../../types/index';
import { IEventAnnotation } from '../../types/IEventAnnotation';
import {
  ICartesianChartProps,
  ICartesianChartStyleProps,
  ICartesianChartStyles,
  IChildProps,
} from '../CommonComponents/index';

export { IChildProps, ILineChartPoints, IMargins, IBasestate, IRefArrayData };
export interface ILineChartProps extends ICartesianChartProps {
  /**
   * Data to render in the chart.
   */
  data: IChartProps;

  /**
   * Call to provide customized styling that will layer on top of the variant rules.
   */
  styles?: IStyleFunctionOrObject<ILineChartStyleProps, ILineChartStyles>;

  /**
   * Show event annotation
   */
  eventAnnotationProps?: IEventsAnnotationProps;

  /**
   * Define a custom callout renderer for a data point
   */
  onRenderCalloutPerDataPoint?: IRenderFunction<ICustomizedCalloutData>;

  /**
   * Define a custom callout renderer for a stack; default is to render per data point
   */
  onRenderCalloutPerStack?: IRenderFunction<ICustomizedCalloutData>;

  /*
   * Color fill bars for the chart,
   */
  colorFillBars?: IColorFillBarsProps[];

  /**
   * if this is set to true, then for each line there will be a unique shape assigned to the point,
   * there are total 8 shapes which are as follow circle, square, triangele, diamond, pyramid,
   *  hexagon, pentagon and octagon, which will get assigned as respectively, if there are more
   * than 8 lines in the line chart then it will again start from cicle to octagon.
   * setting this flag to true will also change the behavior of the points, like for a
   * line, last point shape and first point shape will be visible all the times, and all
   * other points will get enlarge only when hovered over them
   * if set to false default shape will be circle, with the existing behavior
   * @default false
   */
  allowMultipleShapesForPoints?: boolean;
}
export interface IEventsAnnotationProps {
  events: IEventAnnotation[];
  strokeColor: string;
  labelColor: string;
  labelHeight?: number;
  labelWidth?: number;
  mergedLabel: (count: number) => string;
}

export interface ILineChartStyles extends ICartesianChartStyles {}

export interface ILineChartStyleProps extends ICartesianChartStyleProps {}

export interface IColorFillBarsProps {
  legend: string;
  color: string;
  data: IColorFillBarData[];
  applyPattern?: boolean;
  onLegendClick?: (selectedLegend: string | string[] | null) => void | undefined;
}

export interface IColorFillBarData {
  startX: number | Date;
  endX: number | Date;
}

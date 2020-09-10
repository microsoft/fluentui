import { IStyleFunctionOrObject } from 'office-ui-fabric-react/lib/Utilities';
import { IChartProps, ILineChartPoints, IMargins, IBasestate, IRefArrayData } from '../../types/index';
import { IEventAnnotation } from '../../types/IEventAnnotation';
import {
  ICartesianChartProps,
  ICartesianChartStyleProps,
  ICartesianChartStyles,
  IChildProps,
} from '../CommonComponents/index';
import { IStyle } from 'office-ui-fabric-react/lib/Styling';

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

  /*
   * Color fill bars for the chart,
   */
  colorFillBars?: IColorFillBarsProps[];
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

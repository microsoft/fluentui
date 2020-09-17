import { IStyleFunctionOrObject } from 'office-ui-fabric-react/lib/Utilities';
import { IChartProps, ILineChartPoints, IMargins, IBasestate, IRefArrayData } from '../../types/index';
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

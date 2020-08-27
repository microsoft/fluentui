import { IStyleFunctionOrObject } from 'office-ui-fabric-react/lib/Utilities';
import { IChartProps } from '../../types/IDataPoint';
import { IEventAnnotation } from '../../types/IEventAnnotation';
import { ICommonChartStyleProps, ICommonChartStyles, ICommonChartProps } from '../../types/ICommonTypes';

export interface ILineChartProps extends ICommonChartProps {
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

export interface ILineChartStyles extends ICommonChartStyles {}

export interface ILineChartStyleProps extends ICommonChartStyleProps {}

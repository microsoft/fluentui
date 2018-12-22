import { IDetailsListProps } from './DetailsList.types';
import { IStyle, ITheme } from '../../Styling';
import { IStyleFunctionOrObject } from '../../Utilities';

export interface IShimmeredDetailsListProps extends IDetailsListProps {
  /**
   * DetailsList props to pass through.
   */
  detailsListProps?: IDetailsListProps;

  /** Placeholder renderer */
  onRenderCustomPlaceholder?: () => React.ReactNode;

  /** Overridable styles */
  styles?: IStyleFunctionOrObject<IShimmeredDetailsListStyleProps, IShimmeredDetailsListStyles>;

  /** Number of shimmer lines to show */
  shimmerLines?: number;

  /** The theme provided by context */
  theme?: ITheme;
}

export type IShimmeredDetailsListStyleProps = Required<Pick<IShimmeredDetailsListProps, 'theme'>> &
  Pick<IShimmeredDetailsListProps, 'className' | 'enableShimmer'>;

export interface IShimmeredDetailsListStyles {
  root: IStyle;
}

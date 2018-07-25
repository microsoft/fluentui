import { IDetailsListProps } from './DetailsList.types';
import { IStyle, ITheme } from '../../Styling';
import { IStyleFunctionOrObject } from '../../Utilities';

export interface IShimmeredDetailsListProps extends IDetailsListProps {
  /** The theme provided by context */
  theme?: ITheme;

  /** Overridable styles */
  styles?: IStyleFunctionOrObject<IShimmeredDetailsListStyleProps, IShimmeredDetailsListStyles>;

  /** Number of shimmer lines to show */
  shimmerLines?: number;

  /** Placeholder renderer */
  onRenderCustomPlaceholder?: () => React.ReactNode;
}

export type IShimmeredDetailsListStyleProps = Required<Pick<IShimmeredDetailsListProps, 'theme'>> &
  Pick<IShimmeredDetailsListProps, 'className' | 'enableShimmer'>;

export interface IShimmeredDetailsListStyles {
  root: IStyle;
}

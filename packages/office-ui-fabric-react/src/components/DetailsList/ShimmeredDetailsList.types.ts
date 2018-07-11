import { IDetailsListProps } from './DetailsList.types';
import { IStyle, IStyleFunctionOrObject, ITheme } from '../..';

export interface IShimmeredDetailsListProps extends IDetailsListProps {
  theme?: ITheme;
  styles?: IStyleFunctionOrObject<IShimmeredDetailsListStyleProps, IShimmeredDetailsListStyles>;
  shimmerLines?: number;
  onRenderCustomPlaceholder?: () => React.ReactNode;
}

export type IShimmeredDetailsListStyleProps = Required<Pick<IShimmeredDetailsListProps, 'theme'>> &
  Pick<IShimmeredDetailsListProps, 'className'> & {
    enableShimmer?: boolean;
  };

export interface IShimmeredDetailsListStyles {
  root: IStyle;
}

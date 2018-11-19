import { styled } from '../../Utilities';
import { IDetailsColumnProps, IDetailsColumnStyleProps, IDetailsColumnStyles } from './DetailsColumn.types';
import { DetailsColumnBase } from './DetailsColumn.base';
import { getStyles } from './DetailsColumn.styles';

export { IDetailsColumnProps };

export const DetailsColumn = styled<IDetailsColumnProps, IDetailsColumnStyleProps, IDetailsColumnStyles>(
  DetailsColumnBase,
  getStyles,
  undefined,
  { scope: 'DetailsColumn' }
);

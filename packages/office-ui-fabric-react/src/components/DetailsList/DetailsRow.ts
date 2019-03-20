import { styled } from '../../Utilities';
import { IDetailsRowProps, IDetailsRowBaseProps, IDetailsRowStyleProps, IDetailsRowStyles } from './DetailsRow.types';
import { DetailsRowBase } from './DetailsRow.base';
import { getStyles } from './DetailsRow.styles';

export { IDetailsRowProps, IDetailsRowBaseProps };

export const DetailsRow: React.StatelessComponent<IDetailsRowBaseProps> = styled<
  IDetailsRowBaseProps,
  IDetailsRowStyleProps,
  IDetailsRowStyles
>(DetailsRowBase, getStyles, undefined, {
  scope: 'DetailsRow'
});

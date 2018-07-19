import { styled } from '../../Utilities';
import { getStyles } from './DetailsFooter.styles';
import { IDetailsFooterProps, IDetailsFooterStyleProps, IDetailsFooterStyles } from './DetailsFooter.types';
import { DetailsFooterBase } from './DetailsFooter.base';

export { IDetailsFooterProps };

export const DetailsFooter = styled<IDetailsFooterProps, IDetailsFooterStyleProps, IDetailsFooterStyles>(
  DetailsFooterBase,
  getStyles
);

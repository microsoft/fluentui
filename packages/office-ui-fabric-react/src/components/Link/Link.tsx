import { styled } from '../../Utilities';
import { LinkBase } from './Link.base';
import { ILinkProps } from './Link.types';
import { getStyles } from './Link.styles';

export const Link = styled(
  LinkBase,
  getStyles
);
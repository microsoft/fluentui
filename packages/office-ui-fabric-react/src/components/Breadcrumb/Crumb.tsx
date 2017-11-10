import { styled } from '../../Styling';
import { CrumbBase } from './Crumb.base';
import { ICrumbProps } from './Crumb.types';
import { getStyles } from './Crumb.styles';

export const Crumb = styled(
  CrumbBase,
  getStyles
);

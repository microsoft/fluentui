import { styled } from '../../Utilities';
import { IAnnouncedProps, IAnnouncedStyleProps, IAnnouncedStyles } from './Announced.types';
import { AnnouncedBase } from './Announced.base';
import { getStyles } from './Announced.styles';

export const Announced = styled<IAnnouncedProps, IAnnouncedStyleProps, IAnnouncedStyles>(
  AnnouncedBase,
  getStyles,
  undefined
);

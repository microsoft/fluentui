import { styled } from '../../Utilities';
import { IAnnouncedProps, IAnnouncedStyles } from './Announced.types';
import { AnnouncedBase } from './Announced.base';
import { getStyles } from './Announced.styles';

export const Announced = styled<IAnnouncedProps, {}, IAnnouncedStyles>(AnnouncedBase, getStyles, undefined);

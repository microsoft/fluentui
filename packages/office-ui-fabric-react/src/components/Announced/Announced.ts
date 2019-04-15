import { styled } from '../../Utilities';
import { IAnnouncedProps, IAnnouncedStyles } from './Announced.types';
import { AnnouncedBase } from './Announced.base';
import { getStyles } from './Announced.styles';

export const Announced: React.StatelessComponent<IAnnouncedProps> = styled<IAnnouncedProps, {}, IAnnouncedStyles>(AnnouncedBase, getStyles);

import * as React from 'react';
import { styled } from '../../Utilities';
import { AnnouncedBase } from './Announced.base';
import { getStyles } from './Announced.styles';
import type { IAnnouncedProps, IAnnouncedStyles } from './Announced.types';

export const Announced: React.FunctionComponent<IAnnouncedProps> = styled<IAnnouncedProps, {}, IAnnouncedStyles>(
  AnnouncedBase,
  getStyles,
  undefined,
  { scope: 'Announced' },
);

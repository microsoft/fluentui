'use client';

import clsx from 'clsx';
import type { SlotClassNames } from '@fluentui/react-utilities';
import { useButtonStyles } from '../../Button/useButtonStyles.styles';
import type {
  TeachingPopoverCarouselFooterButtonSlots,
  TeachingPopoverCarouselFooterButtonState,
} from './TeachingPopoverCarouselFooterButton.types';
import styles from './TeachingPopoverCarouselFooterButton.module.css';

export const teachingPopoverCarouselFooterButtonClassNames: SlotClassNames<TeachingPopoverCarouselFooterButtonSlots> = {
  root: 'fui-TeachingPopoverCarouselFooterButton',
};

export const useTeachingPopoverCarouselFooterButtonStyles = (
  state: TeachingPopoverCarouselFooterButtonState,
): TeachingPopoverCarouselFooterButtonState => {
  useButtonStyles(state);
  // eslint-disable-next-line react-hooks/immutability
  state.root.className = clsx(teachingPopoverCarouselFooterButtonClassNames.root, styles.root, state.root.className);
  return state;
};

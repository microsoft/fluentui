import type * as React from 'react';
import type { Slot } from '@fluentui/react-utilities';
import type {
  TeachingPopoverFooterProps as TeachingPopoverFooterBaseProps,
  TeachingPopoverFooterState as TeachingPopoverFooterBaseState,
} from '@fluentui/react-headless-components-preview/teaching-popover';
import type { Button } from '../../Button/Button';
import type { PopoverState } from '../../Popover/Popover/Popover.types';

export type TeachingPopoverFooterSlots = {
  root: NonNullable<Slot<'div'>>;
  primary: NonNullable<Slot<typeof Button>>;
  secondary?: Slot<typeof Button>;
};

export type TeachingPopoverFooterProps = TeachingPopoverFooterBaseProps & {
  primary: NonNullable<Slot<typeof Button>>;
  secondary?: Slot<typeof Button>;
};

export type TeachingPopoverFooterState = TeachingPopoverFooterBaseState &
  Pick<PopoverState, 'appearance'> & {
    components: {
      root: 'div';
      primary: typeof Button;
      secondary: typeof Button;
    };
    primary: NonNullable<React.ComponentProps<typeof Button>>;
    secondary?: React.ComponentProps<typeof Button>;
    root: TeachingPopoverFooterBaseState['root'] & {
      'data-appearance'?: PopoverState['appearance'];
      'data-footer-layout': NonNullable<TeachingPopoverFooterBaseState['footerLayout']>;
    };
  };

import type * as React from 'react';

import type { ButtonProps, ButtonState } from '../Button/Button.types';
import type { PopoverAppearance } from '../Popover/Popover.types';

export type { TeachingPopoverCarouselFooterButtonSlots } from '@fluentui/react-headless-components-preview/teaching-popover';

/** The look prop arrives by context, so this subpath has to name its type. */
export type { PopoverAppearance } from '../Popover/Popover.types';

/**
 * Windmod TeachingPopoverCarouselFooterButton props: a windmod Button's, plus the two the carousel
 * adds, both required as the reference declares them. The Button half is spelled over windmod's own
 * Button props rather than re-exported from the reference, whose Button half is the Griffel
 * Button's and carries a different appearance vocabulary; the carousel half is the reference's,
 * unchanged. `navType` in particular has to stay required — an omitted one reaches
 * `selectPageByDirection` and silently pages forward.
 */
export type TeachingPopoverCarouselFooterButtonProps = ButtonProps & {
  /** Which direction this button pages. */
  navType: 'next' | 'prev';
  /** Content shown in place of `children` when the carousel is on this button's trailing step. */
  altText: React.ReactNode;
};

/**
 * Windmod TeachingPopoverCarouselFooterButton state: a Button state — the root is the button
 * hook's, which is what carries the icon and disabled stamps the Button stylesheet selects on —
 * plus the carousel's two fields and the appearance TeachingPopover publishes.
 */
export type TeachingPopoverCarouselFooterButtonState = ButtonState &
  Pick<TeachingPopoverCarouselFooterButtonProps, 'navType' | 'altText'> & {
    popoverAppearance?: PopoverAppearance;
  };

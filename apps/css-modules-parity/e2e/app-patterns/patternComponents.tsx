import * as React from 'react';
import {
  Card,
  DialogSurface,
  MenuItem,
  MenuList,
  MenuPopover,
  PopoverSurface,
  Slider,
  renderCard_unstable,
  renderDialogSurface_unstable,
  renderMenuItem_unstable,
  renderMenuList_unstable,
  renderMenuPopover_unstable,
  renderPopoverSurface_unstable,
  renderSlider_unstable,
  renderTooltip_unstable,
  useCard_unstable,
  useDialogSurfaceContextValues_unstable,
  useDialogSurface_unstable,
  useMenuItem_unstable,
  useMenuListContextValues_unstable,
  useMenuList_unstable,
  useMenuPopover_unstable,
  usePopoverSurface_unstable,
  useSlider_unstable,
  useTooltipStyles_unstable,
  useTooltip_unstable,
} from '@fluentui/react-components';
import { useCustomStyleHook_unstable } from '@fluentui/react-shared-contexts';
import { useCardContextValue } from '../../../../packages/react-components/react-card/library/src/components/Card/useCardContextValue';
// Explicit `.ts` imports bypass the CSS Modules resolution, giving the original Griffel implementations.
import { useCardStyles_unstable as useGriffelCardStyles } from '../../../../packages/react-components/react-card/library/src/components/Card/useCardStyles.styles.ts';
import { useDialogSurfaceStyles_unstable as useGriffelDialogSurfaceStyles } from '../../../../packages/react-components/react-dialog/library/src/components/DialogSurface/useDialogSurfaceStyles.styles.ts';
import { useMenuItemStyles_unstable as useGriffelMenuItemStyles } from '../../../../packages/react-components/react-menu/library/src/components/MenuItem/useMenuItemStyles.styles.ts';
import { useMenuListStyles_unstable as useGriffelMenuListStyles } from '../../../../packages/react-components/react-menu/library/src/components/MenuList/useMenuListStyles.styles.ts';
import { useMenuPopoverStyles_unstable as useGriffelMenuPopoverStyles } from '../../../../packages/react-components/react-menu/library/src/components/MenuPopover/useMenuPopoverStyles.styles.ts';
import { usePopoverSurfaceStyles_unstable as useGriffelPopoverSurfaceStyles } from '../../../../packages/react-components/react-popover/library/src/components/PopoverSurface/usePopoverSurfaceStyles.styles.ts';
import { useSliderStyles_unstable as useGriffelSliderStyles } from '../../../../packages/react-components/react-slider/library/src/components/Slider/useSliderStyles.styles.ts';
import { useTooltipStyles_unstable as useGriffelTooltipStyles } from '../../../../packages/react-components/react-tooltip/library/src/components/Tooltip/useTooltipStyles.styles.ts';
import { griffel } from '../harness';
import type { AnyComponent, Implementation } from '../harness';

type AnyProps = Record<string, unknown>;
type Pair = Record<Implementation, AnyComponent>;

const pair = (css: unknown, griffelComponent: AnyComponent): Pair => ({
  css: css as AnyComponent,
  griffel: griffelComponent,
});

/** Griffel baselines and CSS Modules implementations of components the app pattern specs render outside `core`. */
export const P = {
  Card: pair(Card, griffel('Card', useCard_unstable, useGriffelCardStyles, renderCard_unstable, useCardContextValue)),
  Slider: pair(Slider, griffel('Slider', useSlider_unstable, useGriffelSliderStyles, renderSlider_unstable)),
  MenuItem: pair(
    MenuItem,
    griffel('MenuItem', useMenuItem_unstable, useGriffelMenuItemStyles, renderMenuItem_unstable),
  ),
  MenuList: pair(
    MenuList,
    griffel(
      'MenuList',
      useMenuList_unstable,
      useGriffelMenuListStyles,
      renderMenuList_unstable,
      useMenuListContextValues_unstable,
    ),
  ),
  MenuPopover: pair(
    MenuPopover,
    griffel('MenuPopover', useMenuPopover_unstable, useGriffelMenuPopoverStyles, renderMenuPopover_unstable),
  ),
  PopoverSurface: pair(
    PopoverSurface,
    griffel(
      'PopoverSurface',
      usePopoverSurface_unstable,
      useGriffelPopoverSurfaceStyles,
      renderPopoverSurface_unstable,
    ),
  ),
  DialogSurface: pair(
    DialogSurface,
    griffel(
      'DialogSurface',
      useDialogSurface_unstable,
      useGriffelDialogSurfaceStyles,
      renderDialogSurface_unstable,
      useDialogSurfaceContextValues_unstable,
    ),
  ),
  Tooltip: {} as Pair,
};

/** Renders portaled content into a node inside the parity container. */
export const InContainer = ({
  children,
  className,
}: {
  children: (mountNode: HTMLElement) => React.ReactNode;
  className?: string;
}): React.ReactElement => {
  const [mountNode, setMountNode] = React.useState<HTMLElement | null>(null);
  return (
    <div className={className} ref={setMountNode}>
      {mountNode ? children(mountNode) : null}
    </div>
  );
};

/** Attribute of the trigger element positioned surfaces are placed against (`ComponentSpec.geometry`). */
export const TRIGGER_ATTRIBUTE = 'data-parity-trigger';

/**
 * Tooltip recomposed like in `Overlays.cy.tsx` (no root slot, no `className` prop): the app's class name goes to
 * `content`, which is aliased as `root` while custom style hooks run. It renders visible into `mountNode`, or into a
 * mount node inside the parity container; `triggerClassName` styles its trigger.
 */
function tooltip(useStyles: (state: never) => unknown, name: string): AnyComponent {
  const Inner = (props: AnyProps) => {
    const state = useTooltip_unstable(props as never);
    useStyles(state as never);
    const slots = state as unknown as AnyProps;
    slots.root = state.content;
    useCustomStyleHook_unstable('useTooltipStyles_unstable')(state as never);
    delete slots.root;
    return renderTooltip_unstable(state);
  };
  const Component = React.forwardRef<HTMLElement, AnyProps>(
    ({ className, mountNode, triggerClassName, ...props }, _ref) => {
      const render = (node: unknown) => (
        <Inner
          relationship="description"
          visible
          {...props}
          mountNode={node}
          content={{ children: 'Tooltip content', className }}
        >
          <button className={triggerClassName as string | undefined} {...{ [TRIGGER_ATTRIBUTE]: '' }}>
            Trigger
          </button>
        </Inner>
      );
      return mountNode ? render(mountNode) : <InContainer>{render}</InContainer>;
    },
  );
  Component.displayName = name;
  return Component as unknown as AnyComponent;
}
P.Tooltip = {
  css: tooltip(useTooltipStyles_unstable, 'CssTooltip'),
  griffel: tooltip(useGriffelTooltipStyles, 'GriffelTooltip'),
};

/** Finds the first element matching `selector` inside the variant container. */
export const query =
  (selector: string) =>
  (container: HTMLElement): HTMLElement =>
    container.querySelector<HTMLElement>(selector)!;

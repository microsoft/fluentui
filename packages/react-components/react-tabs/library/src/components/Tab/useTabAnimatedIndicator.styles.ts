'use client';

/*
 * NOTE (Griffel → Tailwind + CSS Modules migration, specials batch S2):
 * this file used to hold BOTH a `makeStyles` factory and the runtime measurement logic that
 * drives the sliding selection indicator. Only the first of those converted — the CSS moved
 * into `./Tab.module.css` (see its header for why it landed in Tab's module rather than a
 * second one) and everything below the import block is the ORIGINAL measurement code,
 * unchanged: the `getBoundingClientRect()` deltas, the `useAnimationFrame` reset, and the
 * inline-style write of `--fui-Tab__indicator--offset` / `--fui-Tab__indicator--scale`.
 *
 * That mechanism — JS measures, JS writes CSS custom properties as an inline `style`, CSS
 * only ever READS them with `var()` — is the archetype the migration explicitly preserves
 * (CONVERSION_GUIDE.md "Known special cases": Slider, ColorPicker sliders, Tab indicator).
 * The two custom-property NAMES are byte-identical to the Griffel original and appear in this
 * package's committed snapshots; nothing here may rename them.
 *
 * Unlike the other converted styles files this one keeps a bare `'use client'` with no
 * suppression: it still calls React hooks (`useState`, `useTabListContext_unstable`,
 * `useAnimationFrame`), so `enforce-use-client` does not flag it.
 */

import * as React from 'react';
import type { TabState, TabValue } from './Tab.types';

import { clsx } from 'clsx';
import { useTabListContext_unstable } from '../TabList/TabListContext';
import type { TabRegisterData } from '../TabList/TabList.types';
import { useAnimationFrame } from '@fluentui/react-utilities';

import styles from './Tab.module.css';

// eslint-disable-next-line @typescript-eslint/naming-convention
const tabIndicatorCssVars_unstable = {
  offsetVar: '--fui-Tab__indicator--offset',
  scaleVar: '--fui-Tab__indicator--scale',
};

/**
 * `data-orientation` is what `.indicator-transform`'s two `@variant` arms read for the
 * `transform` / `transform-origin` pair (DECISIONS.md D15.6 — a genuine fallback: no native
 * selector expresses orientation).
 *
 * `useTabIndicatorStyles_unstable` already stamps it on the same element, but this hook is
 * exported and independently callable, so it stamps its own — the write is idempotent.
 */
type TabAnimatedIndicatorDataAttributes = {
  'data-orientation': 'horizontal' | 'vertical';
};

const calculateTabRect = (element: HTMLElement) => {
  if (element) {
    const parentRect = element.parentElement?.getBoundingClientRect() || { x: 0, y: 0, width: 0, height: 0 };
    const tabRect = element.getBoundingClientRect();

    return {
      x: tabRect.x - parentRect.x,
      y: tabRect.y - parentRect.y,
      width: tabRect.width,
      height: tabRect.height,
    };
  }
  return undefined;
};

const getRegisteredTabRect = (registeredTabs: Record<string, TabRegisterData>, value?: TabValue) => {
  const element = isValueDefined(value) ? registeredTabs[JSON.stringify(value)]?.ref.current : undefined;
  return element ? calculateTabRect(element) : undefined;
};

// eslint-disable-next-line eqeqeq
const isValueDefined = (value: TabValue) => value != null;

/**
 * Adds additional styling to the active tab selection indicator to create a sliding animation.
 */
export const useTabAnimatedIndicatorStyles_unstable = (state: TabState): TabState => {
  const { disabled, selected, vertical } = state;

  const [lastAnimatedFrom, setLastAnimatedFrom] = React.useState<TabValue>();
  const [animationValues, setAnimationValues] = React.useState({ offset: 0, scale: 1 });
  const getRegisteredTabs = useTabListContext_unstable(ctx => ctx.getRegisteredTabs);

  const [requestAnimationFrame] = useAnimationFrame();

  if (selected) {
    const { previousSelectedValue, selectedValue, registeredTabs } = getRegisteredTabs();

    if (isValueDefined(previousSelectedValue) && lastAnimatedFrom !== previousSelectedValue) {
      const previousSelectedTabRect = getRegisteredTabRect(registeredTabs, previousSelectedValue);
      const selectedTabRect = getRegisteredTabRect(registeredTabs, selectedValue);

      if (selectedTabRect && previousSelectedTabRect) {
        const offset = vertical
          ? previousSelectedTabRect.y - selectedTabRect.y
          : previousSelectedTabRect.x - selectedTabRect.x;

        const scale = vertical
          ? previousSelectedTabRect.height / selectedTabRect.height
          : previousSelectedTabRect.width / selectedTabRect.width;

        setAnimationValues({ offset, scale });
        setLastAnimatedFrom(previousSelectedValue);

        // Reset the animation values after the animation is complete
        requestAnimationFrame(() => setAnimationValues({ offset: 0, scale: 1 }));
      }
    }
  } else if (isValueDefined(lastAnimatedFrom)) {
    // need to clear the last animated from so that if this tab is selected again
    // from the same previous tab as last time, that animation still happens.
    setLastAnimatedFrom(undefined);
  }

  // do not apply any animation if the tab is disabled
  if (disabled) {
    return state;
  }

  // the animation should only happen as the selection indicator returns to its
  // original position and not when set at the previous tabs position.
  const animating = animationValues.offset === 0 && animationValues.scale === 1;

  const rootDataAttributes: TabAnimatedIndicatorDataAttributes = {
    'data-orientation': vertical ? 'vertical' : 'horizontal',
  };

  // The Griffel original wrote `mergeClasses(state.root.className, …)` — its own atomics
  // LAST, i.e. after the consumer's className, which mergeClasses does by design. The
  // arguments are flipped here so the consumer's string (already inside
  // `state.root.className` by the time this hook runs) stays last, which is the contract
  // `classname-overrides-win` asserts and the one the `@layer` system implements
  // (DECISIONS.md D2/D9: unlayered consumer CSS beats every `fui.*` layer regardless).
  //
  // Nothing about rendering changes: argument order carries no cascade meaning here — layer
  // order and block position inside Tab.module.css decide every tie — and the leading token
  // stays selector-safe either way, so `classList[0]` is never the group marker (D16.2).
  //
  // The `horizontal` / `vertical` slices this call used to carry are gone: they are
  // `data-orientation` arms nested inside `.indicator-transform` now.
  state = {
    ...state,
    root: {
      ...state.root,
      ...rootDataAttributes,
      className: clsx(
        selected && styles['indicator-transform'],
        selected && animating && styles['indicator-animated'],
        state.root.className,
      ),
    },
  };

  const rootCssVars = {
    [tabIndicatorCssVars_unstable.offsetVar]: `${animationValues.offset}px`,
    [tabIndicatorCssVars_unstable.scaleVar]: `${animationValues.scale}`,
  };

  state.root.style = {
    ...rootCssVars,
    ...state.root.style,
  };

  return state;
};

import * as React from 'react';
import { ArrowReplyFilled, ArrowReplyRegular, bundleIcon } from '@fluentui/react-icons';
import type { FluentIcon } from '@fluentui/react-icons';
import { bundleIcon as headlessBundleIcon } from '@fluentui/react-icons/headless';
import {
  ArrowReplyFilled as HeadlessArrowReplyFilled,
  ArrowReplyRegular as HeadlessArrowReplyRegular,
} from '@fluentui/react-icons/headless/svg/arrow-reply';
// The headless icons' stylesheet, imported by the app as their docs describe (unlayered). Fluent stylesheets that
// import it put it in `@layer fluent`.
import '@fluentui/react-icons/headless/styles.css';
import { coreComponents } from '../components/core';
import { describeParity } from '../harness';
import type { AppPattern, ComponentSpec } from '../harness';
import { partSpecs } from './appPatternParts';
import { patternMatrix } from './matrix';
import type { PatternFactory } from './matrix';
import { useIconOverrideStyles } from './useIconOverrideStyles.styles';

/** `flipInRtl` icons, so the RTL axis also compares the flip. */
const icons: Record<string, FluentIcon> = {
  bundleIcon: bundleIcon(ArrowReplyFilled, ArrowReplyRegular),
  'headless bundleIcon': headlessBundleIcon(HeadlessArrowReplyFilled, HeadlessArrowReplyRegular),
};

type IconStyle = keyof ReturnType<typeof useIconOverrideStyles>;
const iconStyles: Record<string, IconStyle | undefined> = {
  'no app styles': undefined,
  'filled on hover': 'filledOnHover',
  'regular on hover': 'regularOnHover',
  'always filled': 'alwaysFilled',
  'rotated flipInRtl icon': 'rotated',
};

const withIcon =
  (Icon: FluentIcon, style: IconStyle | undefined): PatternFactory =>
  () => ({
    useAppPattern: function useIconPattern(): AppPattern {
      const classes = useIconOverrideStyles();
      return { className: style && classes[style], props: { icon: <Icon /> } };
    },
  });

const iconSlots = ['fui-Icon-filled', 'fui-Icon-regular'];
const components: Record<string, ComponentSpec> = {
  Button: { ...coreComponents.Button, sampledSlots: [...coreComponents.Button.sampledSlots, ...iconSlots] },
  MenuItem: { ...partSpecs.MenuItem, sampledSlots: [...partSpecs.MenuItem.sampledSlots, ...iconSlots] },
};

/**
 * Bundled Filled/Regular icons in Button and MenuItem (reduced from apps swapping icons on hover and rotating
 * directional icons). Component rules swap the variants with `.fui-Icon-filled`/`.fui-Icon-regular` descendant
 * selectors; app rules do the same, and must keep beating the icons' own hidden and RTL flip rules.
 */
describeParity(
  'app pattern: bundled and headless icons',
  patternMatrix(
    components,
    Object.fromEntries(
      Object.entries(icons).flatMap(([iconName, Icon]) =>
        Object.entries(iconStyles).map(([styleName, style]) => [`${iconName}, ${styleName}`, withIcon(Icon, style)]),
      ),
    ),
  ),
  { scenarios: ['app pattern'] },
);

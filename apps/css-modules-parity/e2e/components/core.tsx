import * as React from 'react';
import {
  Avatar,
  Badge,
  Button,
  Checkbox,
  Input,
  Link,
  Radio,
  Select,
  Switch,
  Textarea,
  ToggleButton,
  renderAvatar_unstable,
  renderBadge_unstable,
  renderButton_unstable,
  renderCheckbox_unstable,
  renderInput_unstable,
  renderLink_unstable,
  renderRadio_unstable,
  renderSelect_unstable,
  renderSwitch_unstable,
  renderTextarea_unstable,
  renderToggleButton_unstable,
  useAvatar_unstable,
  useBadge_unstable,
  useButton_unstable,
  useCheckbox_unstable,
  useInput_unstable,
  useLink_unstable,
  useRadio_unstable,
  useSelect_unstable,
  useSwitch_unstable,
  useTextarea_unstable,
  useToggleButton_unstable,
} from '@fluentui/react-components';
// Explicit `.ts` imports bypass the CSS Modules resolution, giving the original Griffel implementations.
import { useAvatarStyles_unstable as useGriffelAvatarStyles } from '../../../../packages/react-components/react-avatar/library/src/components/Avatar/useAvatarStyles.styles.ts';
import { useBadgeStyles_unstable as useGriffelBadgeStyles } from '../../../../packages/react-components/react-badge/library/src/components/Badge/useBadgeStyles.styles.ts';
import { useButtonStyles_unstable as useGriffelButtonStyles } from '../../../../packages/react-components/react-button/library/src/components/Button/useButtonStyles.styles.ts';
import { useToggleButtonStyles_unstable as useGriffelToggleButtonStyles } from '../../../../packages/react-components/react-button/library/src/components/ToggleButton/useToggleButtonStyles.styles.ts';
import { useCheckboxStyles_unstable as useGriffelCheckboxStyles } from '../../../../packages/react-components/react-checkbox/library/src/components/Checkbox/useCheckboxStyles.styles.ts';
import { useInputStyles_unstable as useGriffelInputStyles } from '../../../../packages/react-components/react-input/library/src/components/Input/useInputStyles.styles.ts';
import { useLinkStyles_unstable as useGriffelLinkStyles } from '../../../../packages/react-components/react-link/library/src/components/Link/useLinkStyles.styles.ts';
import { useRadioStyles_unstable as useGriffelRadioStyles } from '../../../../packages/react-components/react-radio/library/src/components/Radio/useRadioStyles.styles.ts';
import { useSelectStyles_unstable as useGriffelSelectStyles } from '../../../../packages/react-components/react-select/library/src/components/Select/useSelectStyles.styles.ts';
import { useSwitchStyles_unstable as useGriffelSwitchStyles } from '../../../../packages/react-components/react-switch/library/src/components/Switch/useSwitchStyles.styles.ts';
import { useTextareaStyles_unstable as useGriffelTextareaStyles } from '../../../../packages/react-components/react-textarea/library/src/components/Textarea/useTextareaStyles.styles.ts';
import { griffel, icon } from '../harness';
import type { AnyComponent, ComponentSpec } from '../harness';

/** Core components, shared by `Core.cy.tsx` and the app-level scenario specs. */
export const coreComponents: Record<string, ComponentSpec> = {
  Button: {
    css: Button as AnyComponent,
    griffel: griffel('Button', useButton_unstable, useGriffelButtonStyles, renderButton_unstable),
    slot: 'icon',
    sampledSlots: ['fui-Button__icon'],
    interactive: true,
    props: { icon, children: 'Action' },
    variants: [
      { appearance: 'secondary' },
      { appearance: 'primary' },
      { appearance: 'outline' },
      { appearance: 'subtle' },
      { appearance: 'transparent' },
      { appearance: 'primary', disabled: true },
    ],
  },
  ToggleButton: {
    css: ToggleButton as AnyComponent,
    griffel: griffel(
      'ToggleButton',
      useToggleButton_unstable,
      useGriffelToggleButtonStyles,
      renderToggleButton_unstable,
    ),
    slot: 'icon',
    sampledSlots: ['fui-ToggleButton__icon'],
    interactive: true,
    props: { icon, children: 'Toggle' },
    variants: [
      { appearance: 'secondary', checked: true },
      { appearance: 'primary', checked: true },
      { appearance: 'subtle', checked: true },
    ],
  },
  Link: {
    css: Link as AnyComponent,
    griffel: griffel('Link', useLink_unstable, useGriffelLinkStyles, renderLink_unstable),
    sampledSlots: [],
    interactive: true,
    props: { href: '#parity', children: 'Link' },
    variants: [{}, { appearance: 'subtle' }, { inline: true }, { disabled: true }],
  },
  Checkbox: {
    css: Checkbox as AnyComponent,
    griffel: griffel('Checkbox', useCheckbox_unstable, useGriffelCheckboxStyles, renderCheckbox_unstable),
    slot: 'indicator',
    sampledSlots: ['fui-Checkbox__indicator'],
    interactive: true,
    props: {},
    variants: [
      {},
      { checked: true },
      { checked: 'mixed' },
      { shape: 'circular', checked: true },
      { size: 'large' },
      { checked: true, disabled: true },
    ],
  },
  Switch: {
    css: Switch as AnyComponent,
    griffel: griffel('Switch', useSwitch_unstable, useGriffelSwitchStyles, renderSwitch_unstable),
    slot: 'indicator',
    sampledSlots: ['fui-Switch__indicator'],
    interactive: true,
    props: {},
    variants: [{}, { checked: true }, { checked: true, disabled: true }],
  },
  Radio: {
    css: Radio as AnyComponent,
    griffel: griffel('Radio', useRadio_unstable, useGriffelRadioStyles, renderRadio_unstable),
    slot: 'indicator',
    sampledSlots: ['fui-Radio__indicator'],
    interactive: true,
    props: {},
    variants: [{}, { checked: true }, { disabled: true }],
  },
  Input: {
    css: Input as AnyComponent,
    griffel: griffel('Input', useInput_unstable, useGriffelInputStyles, renderInput_unstable),
    slot: 'input',
    sampledSlots: ['fui-Input__input'],
    interactive: true,
    props: { placeholder: 'Type here' },
    variants: [
      { appearance: 'outline' },
      { appearance: 'underline' },
      { appearance: 'filled-darker' },
      { size: 'small' },
      { disabled: true },
    ],
  },
  Textarea: {
    css: Textarea as AnyComponent,
    griffel: griffel('Textarea', useTextarea_unstable, useGriffelTextareaStyles, renderTextarea_unstable),
    slot: 'textarea',
    sampledSlots: ['fui-Textarea__textarea'],
    interactive: true,
    props: { placeholder: 'Type here' },
    variants: [{ appearance: 'outline' }, { appearance: 'filled-darker' }, { disabled: true }],
  },
  Select: {
    css: Select as AnyComponent,
    griffel: griffel('Select', useSelect_unstable, useGriffelSelectStyles, renderSelect_unstable),
    slot: 'select',
    sampledSlots: ['fui-Select__select', 'fui-Select__icon'],
    interactive: true,
    props: { children: <option>Option</option> },
    variants: [{ appearance: 'outline' }, { appearance: 'underline' }, { disabled: true }],
  },
  Badge: {
    css: Badge as AnyComponent,
    griffel: griffel('Badge', useBadge_unstable, useGriffelBadgeStyles, renderBadge_unstable),
    slot: 'icon',
    sampledSlots: ['fui-Badge__icon'],
    interactive: false,
    props: { icon, children: '5' },
    variants: [
      { appearance: 'filled' },
      { appearance: 'tint', color: 'danger' },
      { appearance: 'outline', color: 'informative' },
      { appearance: 'ghost', color: 'success' },
    ],
  },
  Avatar: {
    css: Avatar as AnyComponent,
    griffel: griffel('Avatar', useAvatar_unstable, useGriffelAvatarStyles, renderAvatar_unstable),
    slot: 'initials',
    sampledSlots: ['fui-Avatar__initials'],
    interactive: false,
    props: { name: 'Ada Lovelace' },
    variants: [{}, { color: 'colorful' }, { shape: 'square' }, { active: 'active' }],
  },
};

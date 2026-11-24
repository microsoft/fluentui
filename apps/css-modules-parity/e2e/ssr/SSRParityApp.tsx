import * as React from 'react';
import { clsx } from 'clsx';
import {
  Avatar,
  Badge,
  Button,
  Checkbox,
  FluentProvider,
  Input,
  Link,
  Switch,
  mergeClasses,
  renderAvatar_unstable,
  renderBadge_unstable,
  renderButton_unstable,
  renderCheckbox_unstable,
  renderInput_unstable,
  renderLink_unstable,
  renderSwitch_unstable,
  useAvatar_unstable,
  useBadge_unstable,
  useButton_unstable,
  useCheckbox_unstable,
  useInput_unstable,
  useLink_unstable,
  useSwitch_unstable,
  webLightTheme,
} from '@fluentui/react-components';
import type { FluentProviderCustomStyleHooks } from '@fluentui/react-components';
import type { JSXElement } from '@fluentui/react-utilities';
// Explicit `.ts` imports bypass the CSS Modules resolution, giving the original Griffel implementations.
import { useAvatarStyles_unstable as useGriffelAvatarStyles } from '../../../../packages/react-components/react-avatar/library/src/components/Avatar/useAvatarStyles.styles.ts';
import { useBadgeStyles_unstable as useGriffelBadgeStyles } from '../../../../packages/react-components/react-badge/library/src/components/Badge/useBadgeStyles.styles.ts';
import { useButtonStyles_unstable as useGriffelButtonStyles } from '../../../../packages/react-components/react-button/library/src/components/Button/useButtonStyles.styles.ts';
import { useCheckboxStyles_unstable as useGriffelCheckboxStyles } from '../../../../packages/react-components/react-checkbox/library/src/components/Checkbox/useCheckboxStyles.styles.ts';
import { useInputStyles_unstable as useGriffelInputStyles } from '../../../../packages/react-components/react-input/library/src/components/Input/useInputStyles.styles.ts';
import { useLinkStyles_unstable as useGriffelLinkStyles } from '../../../../packages/react-components/react-link/library/src/components/Link/useLinkStyles.styles.ts';
import { useSwitchStyles_unstable as useGriffelSwitchStyles } from '../../../../packages/react-components/react-switch/library/src/components/Switch/useSwitchStyles.styles.ts';
import { griffel } from '../compose';
import type { AnyComponent, AnyProps } from '../compose';
import { useParityAppStyles } from '../useParityAppStyles.styles';

export const ssrScenarios = [
  'no app styles',
  'base-only makeStyles override',
  'layout makeStyles override',
  'custom style hook',
] as const;
export type SSRScenario = (typeof ssrScenarios)[number];

type SSRComponent = {
  css: AnyComponent;
  griffel: AnyComponent;
  props: AnyProps;
  variants: AnyProps[];
  sampledSlots: string[];
};

export const ssrComponents: Record<string, SSRComponent> = {
  Button: {
    css: Button as AnyComponent,
    griffel: griffel('Button', useButton_unstable, useGriffelButtonStyles, renderButton_unstable),
    props: { icon: <span aria-hidden="true">+</span>, children: 'Action' },
    variants: [{ appearance: 'secondary' }, { appearance: 'primary' }, { appearance: 'subtle', disabled: true }],
    sampledSlots: ['fui-Button__icon'],
  },
  Checkbox: {
    css: Checkbox as AnyComponent,
    griffel: griffel('Checkbox', useCheckbox_unstable, useGriffelCheckboxStyles, renderCheckbox_unstable),
    props: { label: 'Check' },
    variants: [{}, { checked: true }],
    sampledSlots: ['fui-Checkbox__indicator'],
  },
  Input: {
    css: Input as AnyComponent,
    griffel: griffel('Input', useInput_unstable, useGriffelInputStyles, renderInput_unstable),
    props: { placeholder: 'Type here' },
    variants: [{ appearance: 'outline' }, { appearance: 'underline' }],
    sampledSlots: ['fui-Input__input'],
  },
  Link: {
    css: Link as AnyComponent,
    griffel: griffel('Link', useLink_unstable, useGriffelLinkStyles, renderLink_unstable),
    props: { href: '#parity', children: 'Link' },
    variants: [{}, { appearance: 'subtle' }],
    sampledSlots: [],
  },
  Switch: {
    css: Switch as AnyComponent,
    griffel: griffel('Switch', useSwitch_unstable, useGriffelSwitchStyles, renderSwitch_unstable),
    props: {},
    variants: [{}, { checked: true }],
    sampledSlots: ['fui-Switch__indicator'],
  },
  Badge: {
    css: Badge as AnyComponent,
    griffel: griffel('Badge', useBadge_unstable, useGriffelBadgeStyles, renderBadge_unstable),
    props: { children: '5' },
    variants: [{ appearance: 'filled' }, { appearance: 'tint', color: 'danger' }],
    sampledSlots: [],
  },
  Avatar: {
    css: Avatar as AnyComponent,
    griffel: griffel('Avatar', useAvatar_unstable, useGriffelAvatarStyles, renderAvatar_unstable),
    props: { name: 'Ada Lovelace' },
    variants: [{}, { color: 'colorful' }],
    sampledSlots: ['fui-Avatar__initials'],
  },
};

export const ssrContainerId = (implementation: 'griffel' | 'css', name: string, index: number): string =>
  `${implementation}-${name}-${index}`;

/**
 * Renders every SSR component, both implementations, with the same app styles: on the server (in a worker) and again
 * when hydrating. Plain app CSS isn't part of it, as server rendering only collects Griffel styles.
 */
export const SSRParityApp = ({
  scenario,
  onHydrated,
}: {
  scenario: SSRScenario;
  onHydrated?: () => void;
}): JSXElement => {
  const classes = useParityAppStyles();
  React.useEffect(() => onHydrated?.(), [onHydrated]);

  const customStyleHooks: FluentProviderCustomStyleHooks =
    scenario === 'custom style hook'
      ? Object.fromEntries(
          Object.keys(ssrComponents).map(name => [
            `use${name}Styles_unstable`,
            (state: unknown) => {
              const root = (state as { root: { className?: string } }).root;
              root.className = mergeClasses(root.className, classes.hook);
            },
          ]),
        )
      : {};
  const className = clsx(
    scenario === 'base-only makeStyles override' && classes.base,
    scenario === 'layout makeStyles override' && classes.layout,
  );

  return (
    <FluentProvider theme={webLightTheme} customStyleHooks_unstable={customStyleHooks}>
      {Object.entries(ssrComponents).map(([name, component]) =>
        component.variants.map((variant, index) =>
          (['griffel', 'css'] as const).map(implementation => {
            const Component = component[implementation];
            const id = ssrContainerId(implementation, name, index);
            return (
              <div key={id} data-testid={id}>
                <Component {...component.props} {...variant} className={className || undefined} />
              </div>
            );
          }),
        ),
      )}
    </FluentProvider>
  );
};

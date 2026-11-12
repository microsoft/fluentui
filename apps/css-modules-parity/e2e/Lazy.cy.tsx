import * as React from 'react';
// Griffel baselines from source files, not package entry points: those would register the CSS Modules stylesheets
// eagerly.
import { useButton_unstable } from '../../../packages/react-components/react-button/library/src/components/Button/useButton.ts';
import { renderButton_unstable } from '../../../packages/react-components/react-button/library/src/components/Button/renderButton.tsx';
import { useButtonStyles_unstable as useGriffelButtonStyles } from '../../../packages/react-components/react-button/library/src/components/Button/useButtonStyles.styles.ts';
import { useCheckbox_unstable } from '../../../packages/react-components/react-checkbox/library/src/components/Checkbox/useCheckbox.tsx';
import { renderCheckbox_unstable } from '../../../packages/react-components/react-checkbox/library/src/components/Checkbox/renderCheckbox.tsx';
import { useCheckboxStyles_unstable as useGriffelCheckboxStyles } from '../../../packages/react-components/react-checkbox/library/src/components/Checkbox/useCheckboxStyles.styles.ts';
import { useInput_unstable } from '../../../packages/react-components/react-input/library/src/components/Input/useInput.ts';
import { renderInput_unstable } from '../../../packages/react-components/react-input/library/src/components/Input/renderInput.tsx';
import { useInputStyles_unstable as useGriffelInputStyles } from '../../../packages/react-components/react-input/library/src/components/Input/useInputStyles.styles.ts';
import { useLink_unstable } from '../../../packages/react-components/react-link/library/src/components/Link/useLink.ts';
import { renderLink_unstable } from '../../../packages/react-components/react-link/library/src/components/Link/renderLink.tsx';
import { useLinkStyles_unstable as useGriffelLinkStyles } from '../../../packages/react-components/react-link/library/src/components/Link/useLinkStyles.styles.ts';
import { useSwitch_unstable } from '../../../packages/react-components/react-switch/library/src/components/Switch/useSwitch.tsx';
import { renderSwitch_unstable } from '../../../packages/react-components/react-switch/library/src/components/Switch/renderSwitch.tsx';
import { useSwitchStyles_unstable as useGriffelSwitchStyles } from '../../../packages/react-components/react-switch/library/src/components/Switch/useSwitchStyles.styles.ts';
import { defaultScenarios, describeParity, griffel, icon } from './harness';
import type { AnyComponent, Scenario } from './harness';

type LazyModule = { css: AnyComponent };
type Registration = { name: string; registeredStylesheets: number; appStylesInserted: boolean };

const CSS_MODULES_REGISTRY_KEY = Symbol.for('@fluentui/css-modules-registry');
const registeredStylesheets = () =>
  (globalThis as { [CSS_MODULES_REGISTRY_KEY]?: { stylesheets: unknown[] } })[CSS_MODULES_REGISTRY_KEY]?.stylesheets
    .length ?? 0;

/**
 * Stylesheets registered by each lazily loaded chunk, and whether app Griffel styles were in the page when it loaded
 * (document stylesheets: run this spec without `FUI_PARITY_SHADOW_DOM`).
 */
const registrations: Registration[] = [];

/**
 * A CSS Modules component from a chunk loaded on first render, after the app has inserted its Griffel styles, so its
 * rules are registered and inserted after the app's rules. The Griffel baseline renders eagerly: Griffel's own result
 * depends on insertion order (a lazily rendered Griffel component's rules come after the app's), so the expected
 * result is the eager one.
 */
function lazyComponent(name: string, load: () => Promise<LazyModule>): AnyComponent {
  return React.lazy(() => {
    const before = registeredStylesheets();
    return load().then(module => {
      registrations.push({
        name,
        registeredStylesheets: registeredStylesheets() - before,
        appStylesInserted: document.querySelector('style[data-make-styles-bucket]') !== null,
      });
      return { default: module.css };
    });
  }) as unknown as AnyComponent;
}

// The first test of every component loads its chunk: start with the app overrides most sensitive to ordering.
const lazyScenarios: Scenario[] = [
  'stateful makeStyles override',
  ...defaultScenarios.filter(scenario => scenario !== 'stateful makeStyles override'),
];

describeParity(
  'lazily loaded components',
  {
    Button: {
      css: lazyComponent('Button', () => import('./lazy/LazyButton')),
      griffel: griffel('Button', useButton_unstable, useGriffelButtonStyles, renderButton_unstable),
      slot: 'icon',
      sampledSlots: ['fui-Button__icon'],
      interactive: true,
      props: { icon, children: 'Action' },
      variants: [{ appearance: 'secondary' }, { appearance: 'primary' }, { appearance: 'subtle' }],
      waitFor: '.fui-Button',
    },
    Checkbox: {
      css: lazyComponent('Checkbox', () => import('./lazy/LazyCheckbox')),
      griffel: griffel('Checkbox', useCheckbox_unstable, useGriffelCheckboxStyles, renderCheckbox_unstable),
      slot: 'indicator',
      sampledSlots: ['fui-Checkbox__indicator'],
      interactive: true,
      props: {},
      variants: [{}, { checked: true }],
      waitFor: '.fui-Checkbox',
    },
    Input: {
      css: lazyComponent('Input', () => import('./lazy/LazyInput')),
      griffel: griffel('Input', useInput_unstable, useGriffelInputStyles, renderInput_unstable),
      slot: 'input',
      sampledSlots: ['fui-Input__input'],
      interactive: true,
      props: { placeholder: 'Type here' },
      variants: [{ appearance: 'outline' }, { appearance: 'underline' }],
      waitFor: '.fui-Input',
    },
    Link: {
      css: lazyComponent('Link', () => import('./lazy/LazyLink')),
      griffel: griffel('Link', useLink_unstable, useGriffelLinkStyles, renderLink_unstable),
      sampledSlots: [],
      interactive: true,
      props: { href: '#parity', children: 'Link' },
      variants: [{}, { appearance: 'subtle' }],
      waitFor: '.fui-Link',
    },
    Switch: {
      css: lazyComponent('Switch', () => import('./lazy/LazySwitch')),
      griffel: griffel('Switch', useSwitch_unstable, useGriffelSwitchStyles, renderSwitch_unstable),
      slot: 'indicator',
      sampledSlots: ['fui-Switch__indicator'],
      interactive: true,
      props: {},
      variants: [{}, { checked: true }],
      waitFor: '.fui-Switch',
    },
  },
  { scenarios: lazyScenarios },
);

describe('CSS Modules parity: lazy loading', () => {
  it('registered every component stylesheet after app Griffel styles were inserted', () => {
    const griffelBuckets = Cypress.env('griffelBuckets') === true && Cypress.env('extraction') !== true;
    cy.then(() => {
      expect(registrations.map(registration => registration.name)).to.have.members([
        'Button',
        'Checkbox',
        'Input',
        'Link',
        'Switch',
      ]);
      for (const registration of registrations) {
        expect(registration.appStylesInserted, `${registration.name}: app styles inserted before loading`).to.equal(
          true,
        );
        if (griffelBuckets) {
          expect(
            registration.registeredStylesheets,
            `${registration.name}: stylesheets registered on load`,
          ).to.be.above(0);
        }
      }
    });
  });
});

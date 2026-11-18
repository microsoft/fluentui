import * as React from 'react';
import { coreComponents } from '../components/core';
import { defaultRoot, describeParity, icon } from '../harness';
import type { AppPattern, ComponentSpec } from '../harness';
import { patternMatrix, tolerate, withClass } from './matrix';
import type { PatternFactory } from './matrix';
import { P } from './patternComponents';
import { useComponentVariableStyles, useInheritedVariableStyles } from './useComponentVariableStyles.styles';

const ANCESTOR_CLASS_NAME = 'parity-variable-ancestor';

const components: Record<string, ComponentSpec> = {
  Slider: {
    ...P.Slider,
    slot: 'thumb',
    sampledSlots: ['fui-Slider__rail', 'fui-Slider__thumb'],
    interactive: true,
    props: { defaultValue: 40 },
    variants: [{}, { size: 'small' }, { vertical: true }, { disabled: true }],
  },
  Checkbox: coreComponents.Checkbox,
  Button: {
    ...coreComponents.Button,
    variants: [
      { appearance: 'secondary' },
      { size: 'small' },
      { size: 'large', iconPosition: 'after' },
      { appearance: 'primary', disabled: true },
    ],
  },
  Card: {
    ...P.Card,
    sampledSlots: [],
    interactive: false,
    props: { children: <div>Card</div> },
    variants: [{ appearance: 'outline' }, { size: 'small' }, { size: 'large', orientation: 'horizontal' }],
  },
};

type VariableClass = keyof ReturnType<typeof useComponentVariableStyles>;

/** A `className` setting component variables, for one component only. */
const only = (componentName: string, key: VariableClass): PatternFactory => {
  const pattern = withClass(useComponentVariableStyles, key);
  return (name, spec) => (name === componentName ? pattern(name, spec) : undefined);
};

/** Button's icon slot declares its spacing variable itself, so the app sets it through the slot's `className`. */
const buttonIconSlot: PatternFactory = name =>
  name === 'Button'
    ? {
        useAppPattern: function useIconSlotVariable(): AppPattern {
          return { props: { icon: { children: icon, className: useComponentVariableStyles().buttonIconSpacing } } };
        },
      }
    : undefined;

/** Variables set on an app element around the component, inherited where the component declares none. */
const inherited: PatternFactory = name => ({
  useAppPattern: function useInheritedVariables(): AppPattern {
    const classes = useInheritedVariableStyles();
    const className = classes[name as keyof typeof classes];
    return { wrap: element => <div className={`${ANCESTOR_CLASS_NAME} ${className}`}>{element}</div> };
  },
  findRoot: container => defaultRoot(container.querySelector<HTMLElement>(`.${ANCESTOR_CLASS_NAME}`)!),
});

/**
 * App variables against component state rules redefining them. Every component variable here exists in both the
 * Griffel styles and the `.module.css`.
 */
describeParity(
  'app pattern: component CSS variables',
  patternMatrix(components, {
    'Slider colors': only('Slider', 'sliderColors'),
    'Slider colors in every state': only('Slider', 'sliderEveryState'),
    // The app's `:hover` thumb color now also applies pressed: Griffel's component `:active` rule won by bucket, the
    // CSS Modules `.enabled:active` rule has the app rule's specificity in an earlier stylesheet.
    'Slider hover thumb color': tolerate(only('Slider', 'sliderHover'), {
      'fui-Slider__thumb background-color': ['--colorPaletteBlueBorderActive'],
    }),
    'Slider sizes': only('Slider', 'sliderSizes'),
    'Checkbox indicator colors': only('Checkbox', 'checkboxColors'),
    'Checkbox indicator colors in every state': only('Checkbox', 'checkboxEveryState'),
    'Button icon spacing on the icon slot': buttonIconSlot,
    'Button icon spacing through the slot class': only('Button', 'buttonIconSpacingDescendant'),
    'Card border radius': only('Card', 'cardBorderRadius'),
    'Card size': only('Card', 'cardSize'),
    'inherited from an ancestor': inherited,
  }),
  { scenarios: ['app pattern'] },
);

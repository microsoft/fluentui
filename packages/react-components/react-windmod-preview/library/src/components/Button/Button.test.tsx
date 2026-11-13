import * as React from 'react';
import { render } from '@testing-library/react';

import { classOccurrences } from '../../testing/classOccurrences';
import { isConformant } from '../../testing/isConformant';
import { stampsOf } from '../../testing/stampsOf';
import { Button } from './Button';
import type { ButtonAppearance, ButtonShape, ButtonSize, ButtonState } from './Button.types';
import { buttonClassNames, useButtonStyles } from './useButtonStyles';

import styles from './Button.module.css';

// Frozen-state guard — see testing/freezeState.ts.
jest.mock('@fluentui/react-headless-components-preview/button', () => {
  const actual = jest.requireActual('@fluentui/react-headless-components-preview/button');
  const { deepFreezeState } = require('../../testing/freezeState');

  return {
    ...actual,
    useButton: (...args: Parameters<typeof actual.useButton>) => deepFreezeState(actual.useButton(...args)),
  };
});

const appearances: ButtonAppearance[] = ['secondary', 'primary', 'outline', 'subtle', 'transparent'];
const shapes: ButtonShape[] = ['rounded', 'circular', 'square'];
const sizes: ButtonSize[] = ['small', 'medium', 'large'];

const Glyph = (): React.ReactElement => <i data-testid="glyph" />;

describe('Button', () => {
  isConformant({
    Component: Button,
    displayName: 'Button',
  });

  it('stamps its marker pair, slash-free class first', () => {
    const { getByTestId } = render(<Button data-testid="root">Send</Button>);

    const root = getByTestId('root');

    expect(root).toHaveClass('fui-button');
    expect(root).toHaveClass('group/fui-button');
    expect(root.classList[0]).toBe('fui-button');
    expect(buttonClassNames.root).toBe('fui-button group/fui-button');
  });

  it('carries the root module class exactly once', () => {
    const { getByTestId } = render(<Button data-testid="root">Send</Button>);

    expect(classOccurrences(getByTestId('root'), styles.root)).toBe(1);
  });

  it('keeps a consumer className on the root exactly once', () => {
    const { getByTestId } = render(
      <Button data-testid="root" className="consumer">
        Send
      </Button>,
    );

    const root = getByTestId('root');

    expect(root).toHaveClass('consumer');
    expect(classOccurrences(root, 'consumer')).toBe(1);
    expect(classOccurrences(root, styles.root)).toBe(1);
  });

  it('resolves the base look when no look prop is given', () => {
    const { getByTestId } = render(<Button data-testid="root">Send</Button>);

    const root = getByTestId('root');

    expect(root.getAttribute('data-appearance')).toBe('secondary');
    expect(root.getAttribute('data-size')).toBe('medium');
    expect(root).toHaveClass(styles.secondary);
    expect(root).toHaveClass(styles.rounded);
  });

  it.each(appearances)('stamps data-appearance and the appearance class for %s', appearance => {
    const { getByTestId } = render(
      <Button data-testid="root" appearance={appearance}>
        Send
      </Button>,
    );

    const root = getByTestId('root');

    expect(root.getAttribute('data-appearance')).toBe(appearance);
    expect(root).toHaveClass(styles[appearance]);
  });

  it.each(shapes)('carries the shape class for %s', shape => {
    const { getByTestId } = render(
      <Button data-testid="root" shape={shape}>
        Send
      </Button>,
    );

    expect(getByTestId('root')).toHaveClass(styles[shape]);
  });

  it.each(sizes)('stamps data-size for %s', size => {
    const { getByTestId } = render(
      <Button data-testid="root" size={size}>
        Send
      </Button>,
    );

    expect(getByTestId('root').getAttribute('data-size')).toBe(size);
  });

  it('stamps data-empty only when the root has no children', () => {
    const { getByTestId: getEmpty } = render(<Button data-testid="root" icon={<Glyph />} />);
    const { getByTestId: getLabelled } = render(<Button data-testid="labelled">Send</Button>);

    expect(getEmpty('root').getAttribute('data-empty')).toBe('true');
    expect(getLabelled('labelled').hasAttribute('data-empty')).toBe(false);
  });

  it('leaves the headless stamps to the headless hook, exactly once each', () => {
    const { getByTestId } = render(
      <Button data-testid="root" disabled icon={<Glyph />} iconPosition="after">
        Send
      </Button>,
    );

    const root = getByTestId('root');

    expect(root.getAttribute('data-disabled')).toBe('');
    expect(root.getAttribute('data-icon-position')).toBe('after');
    expect(root.getAttributeNames().filter(name => name === 'data-disabled')).toHaveLength(1);
    expect(root.getAttributeNames().filter(name => name === 'data-icon-position')).toHaveLength(1);
  });

  it('decorates the icon slot', () => {
    const { getByTestId } = render(
      <Button data-testid="root" icon={<Glyph />}>
        Send
      </Button>,
    );

    const icon = getByTestId('root').querySelector<HTMLElement>('span');

    expect(icon).not.toBeNull();
    expect(icon).toHaveClass(styles.icon);
    expect(classOccurrences(icon!, styles.icon)).toBe(1);
  });

  it('does not mutate the state it is given', () => {
    const state = {
      appearance: 'primary',
      components: { root: 'button', icon: 'span' },
      icon: { className: 'consumer-icon' },
      root: { as: 'button', children: 'Send', className: 'consumer' },
      shape: 'circular',
      size: 'large',
    } as unknown as ButtonState;

    const styled = useButtonStyles(state);

    expect(styled).not.toBe(state);
    expect(state.root.className).toBe('consumer');
    expect(state.root).not.toHaveProperty('data-appearance');
    expect(state.icon!.className).toBe('consumer-icon');
    expect(styled.root.className).toContain('consumer');
    expect(styled.root.className).toContain(buttonClassNames.root);
    expect(stampsOf(styled.root)['data-appearance']).toBe('primary');
    expect(stampsOf(styled.root)['data-size']).toBe('large');
    expect(styled.root.className).toContain(styles.circular);
    expect(styled.icon!.className).toContain('consumer-icon');
    expect(classOccurrences(styled.icon!.className!, styles.icon)).toBe(1);
  });

  it('renders no icon slot when the consumer supplies none', () => {
    const state = {
      appearance: 'secondary',
      components: { root: 'button', icon: 'span' },
      root: { as: 'button', children: 'Send' },
      shape: 'rounded',
      size: 'medium',
    } as unknown as ButtonState;

    expect(useButtonStyles(state).icon).toBeUndefined();
  });

  // Griffel gates the icon spacing on `!!state.root.children`
  // (react-button/src/components/Button/useButtonStyles.styles.ts:601). `data-empty` is the
  // windmod mirror of that one expression, so the two must agree case for case — including the
  // falsy-but-rendered values (`0`, `''`) that Badge deliberately counts instead.
  it('stamps data-empty on exactly the children Griffel treats as absent', () => {
    const { getByTestId } = render(
      <>
        <Button data-testid="text">Label</Button>
        <Button data-testid="zero">{0}</Button>
        <Button data-testid="emptyString">{''}</Button>
        <Button data-testid="none" />
        <Button data-testid="null">{null}</Button>
        <Button data-testid="false">{false}</Button>
        <Button data-testid="emptyArray">{[]}</Button>
      </>,
    );

    expect(getByTestId('text').hasAttribute('data-empty')).toBe(false);
    expect(getByTestId('zero').hasAttribute('data-empty')).toBe(true);
    expect(getByTestId('emptyString').hasAttribute('data-empty')).toBe(true);
    expect(getByTestId('none').hasAttribute('data-empty')).toBe(true);
    expect(getByTestId('null').hasAttribute('data-empty')).toBe(true);
    expect(getByTestId('false').hasAttribute('data-empty')).toBe(true);
    // An empty array is truthy, so Griffel keeps the spacing here — a child-counting predicate
    // would not.
    expect(getByTestId('emptyArray').hasAttribute('data-empty')).toBe(false);
  });

  // The falsy children never reach the DOM: `iconOnly` is
  // `Boolean(iconShorthand?.children && !props.children)` (useButton.ts:48) and renderButton
  // emits `{!iconOnly && state.root.children}`, so dropping the gap is what keeps the icon
  // centred rather than what strands it.
  it('renders no text for a falsy child beside an icon, so the dropped gap is correct', () => {
    const { getByTestId } = render(
      <>
        <Button data-testid="zero" icon={<Glyph />}>
          {0}
        </Button>
        <Button data-testid="emptyString" icon={<Glyph />}>
          {''}
        </Button>
        <Button data-testid="text" icon={<Glyph />}>
          Label
        </Button>
      </>,
    );

    expect(getByTestId('zero').textContent).toBe('');
    expect(getByTestId('zero').getAttribute('data-icon-only')).toBe('');
    expect(getByTestId('emptyString').textContent).toBe('');
    expect(getByTestId('emptyString').getAttribute('data-icon-only')).toBe('');

    expect(getByTestId('text').textContent).toBe('Label');
    expect(getByTestId('text').hasAttribute('data-icon-only')).toBe(false);
  });
});

import * as React from 'react';
import { fireEvent, render } from '@testing-library/react';

import { classOccurrences } from '../../testing/classOccurrences';
import { isConformant } from '../../testing/isConformant';
import { ColorPicker } from '../ColorPicker/ColorPicker';
import colorSliderStyles from '../ColorSlider/ColorSlider.module.css';
import { AlphaSlider } from './AlphaSlider';
import type { AlphaSliderState } from './AlphaSlider.types';
import { alphaSliderClassNames, useAlphaSliderStyles } from './useAlphaSliderStyles';

import styles from './AlphaSlider.module.css';

// Frozen-state guard — see testing/freezeState.ts.
jest.mock('@fluentui/react-headless-components-preview/color-picker', () => {
  const actual = jest.requireActual('@fluentui/react-headless-components-preview/color-picker');
  const { deepFreezeState } = require('../../testing/freezeState');

  return {
    ...actual,
    useAlphaSlider: (...args: Parameters<typeof actual.useAlphaSlider>) =>
      deepFreezeState(actual.useAlphaSlider(...args)),
  };
});

const teal = { a: 0.5, h: 180, s: 0.5, v: 0.6 };

const slotsOf = (root: HTMLElement) => {
  const [input, rail, thumb] = Array.from(root.children) as HTMLElement[];

  return { input: input as HTMLInputElement, rail, root, thumb };
};

const renderAlphaSlider = (props: React.ComponentProps<typeof AlphaSlider> = {}) => {
  const { container } = render(<AlphaSlider {...props} />);

  return slotsOf(container.firstElementChild as HTMLElement);
};

describe('AlphaSlider', () => {
  isConformant({
    Component: AlphaSlider,
    displayName: 'AlphaSlider',
    primarySlot: 'input',
  });

  it('stamps both marker pairs on the root, its own first', () => {
    const { root } = renderAlphaSlider();

    expect(root).toHaveClass('fui-alpha-slider');
    expect(root).toHaveClass('group/fui-alpha-slider');
    expect(root).toHaveClass('fui-color-slider');
    expect(root).toHaveClass('group/fui-color-slider');
    expect(root.classList[0]).toBe('fui-alpha-slider');
    expect(alphaSliderClassNames.root).toBe('fui-alpha-slider group/fui-alpha-slider');
  });

  it('layers its own rail and thumb classes over the composed ColorSlider ones', () => {
    const { rail, root, thumb } = renderAlphaSlider();

    expect(styles.rail).toBe(colorSliderStyles.rail);
    expect(classOccurrences(rail, styles.rail)).toBe(2);
    expect(classOccurrences(thumb, styles.thumb)).toBe(2);
    expect(classOccurrences(root, colorSliderStyles.root)).toBe(1);
  });

  it('inherits the composed input class and peer marker untouched', () => {
    const { input } = renderAlphaSlider();

    expect(input).toHaveClass(colorSliderStyles.input);
    expect(input.classList[0]).toBe(colorSliderStyles.input);
    expect(input.type).toBe('range');

    // Exactly one peer name: a second one would let a consumer's peer-* variant match a slot
    // that never carries the state the name implies — see peerMarker.
    expect(Array.from(input.classList).filter(name => name.startsWith('peer/'))).toEqual(['peer/fui-color-slider']);
  });

  it('stamps data-shape on the root through the composed styles hook', () => {
    expect(renderAlphaSlider().root.getAttribute('data-shape')).toBe('rounded');

    (['rounded', 'square'] as const).forEach(shape => {
      expect(renderAlphaSlider({ shape }).root.getAttribute('data-shape')).toBe(shape);
    });
  });

  it('takes the shape from an enclosing ColorPicker, its own prop winning', () => {
    const inherited = render(
      <ColorPicker shape="square">
        <AlphaSlider />
      </ColorPicker>,
    );
    const overridden = render(
      <ColorPicker shape="square">
        <AlphaSlider shape="rounded" />
      </ColorPicker>,
    );

    const rootOf = (result: ReturnType<typeof render>) =>
      (result.container.firstElementChild as HTMLElement).firstElementChild as HTMLElement;

    expect(rootOf(inherited).getAttribute('data-shape')).toBe('square');
    expect(rootOf(overridden).getAttribute('data-shape')).toBe('rounded');
  });

  it('leaves the headless stamps alone', () => {
    const { root } = renderAlphaSlider();

    expect(root.getAttribute('data-orientation')).toBe('horizontal');
    // AlphaSlider has no `channel`, so the headless stamp is structurally always absent.
    expect(root.hasAttribute('data-channel')).toBe(false);
    expect(root.hasAttribute('data-transparency')).toBe(false);

    expect(renderAlphaSlider({ vertical: true }).root.getAttribute('data-orientation')).toBe('vertical');
    expect(renderAlphaSlider({ transparency: true }).root.getAttribute('data-transparency')).toBe('');
    expect(renderAlphaSlider({ transparency: false }).root.hasAttribute('data-transparency')).toBe(false);
  });

  it('leaves the root inline custom properties exactly as the headless hook wrote them', () => {
    const { root } = renderAlphaSlider({ color: teal, style: { marginTop: 3 } });
    const style = root.getAttribute('style')!;

    expect(root.style.getPropertyValue('--fui-AlphaSlider--progress')).toBe('50%');
    expect(root.style.getPropertyValue('--fui-AlphaSlider--direction')).not.toBe('');
    expect(root.style.getPropertyValue('--fui-AlphaSlider__thumb--color')).not.toBe('');
    expect(root.style.getPropertyValue('--fui-AlphaSlider__rail--color')).not.toBe('');
    expect(root.style.marginTop).toBe('3px');
    expect(style.indexOf('--fui-AlphaSlider--direction')).toBeLessThan(style.indexOf('margin-top'));
  });

  it('reports an alpha change from the input', () => {
    const onChange = jest.fn();
    const { input } = renderAlphaSlider({ color: teal, onChange });

    fireEvent.change(input, { target: { value: '80' } });

    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange.mock.calls[0][1].color).toEqual(expect.objectContaining({ a: 0.8 }));
  });

  it('keeps a consumer className on every slot exactly once', () => {
    const { input, rail, root, thumb } = renderAlphaSlider({
      className: 'consumer',
      input: { className: 'i' },
      rail: { className: 'r' },
      thumb: { className: 't' },
    });

    expect(classOccurrences(root, 'consumer')).toBe(1);
    expect(classOccurrences(rail, 'r')).toBe(1);
    expect(classOccurrences(thumb, 't')).toBe(1);
    expect(classOccurrences(input, 'i')).toBe(1);
  });

  it('lands native props on the primary slot', () => {
    const ref = React.createRef<HTMLInputElement>();
    const { input, root } = renderAlphaSlider({
      'aria-label': 'alpha',
      'data-testid': 'probe',
      id: 'field',
      ref,
    } as React.ComponentProps<typeof AlphaSlider>);

    expect(input.id).toBe('field');
    expect(input.getAttribute('data-testid')).toBe('probe');
    expect(input.getAttribute('aria-label')).toBe('alpha');
    expect(ref.current).toBe(input);
    expect(root.hasAttribute('data-testid')).toBe(false);
  });

  it('does not mutate the state it is given, nor the one it composes', () => {
    const state = {
      components: { input: 'input', rail: 'div', root: 'div', thumb: 'div' },
      input: { className: 'native' },
      rail: { className: 'consumer-rail' },
      root: { className: 'consumer', style: { '--fui-AlphaSlider--progress': '50%' } },
      shape: 'square',
      thumb: { className: 'consumer-thumb' },
    } as unknown as AlphaSliderState;

    const styled = useAlphaSliderStyles(state);

    expect(styled).not.toBe(state);
    expect(styled.root).not.toBe(state.root);
    expect(styled.rail).not.toBe(state.rail);
    expect(styled.thumb).not.toBe(state.thumb);

    expect(state.root.className).toBe('consumer');
    expect(state.rail.className).toBe('consumer-rail');
    expect(state.thumb.className).toBe('consumer-thumb');
    expect(state.input.className).toBe('native');
    expect('data-shape' in state.root).toBe(false);

    expect(styled.root.style).toBe(state.root.style);
    expect(styled.root.className).toContain(alphaSliderClassNames.root);
    expect(styled.input.className).toContain('native');
  });
});

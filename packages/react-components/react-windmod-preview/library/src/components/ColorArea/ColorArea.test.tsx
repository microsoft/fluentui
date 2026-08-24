import * as React from 'react';
import { fireEvent, render } from '@testing-library/react';

import { isConformant } from '../../testing/isConformant';
import { ColorPicker } from '../ColorPicker/ColorPicker';
import { ColorArea } from './ColorArea';
import type { ColorAreaState } from './ColorArea.types';
import { colorAreaClassNames, useColorAreaStyles } from './useColorAreaStyles';

import styles from './ColorArea.module.css';

// Frozen-state guard: freezes the headless hook's return so any in-place write anywhere in the
// pipeline throws instead of succeeding silently — see testing/freezeState.ts.
jest.mock('@fluentui/react-headless-components-preview/color-picker', () => {
  const actual = jest.requireActual('@fluentui/react-headless-components-preview/color-picker');
  const { deepFreezeState } = require('../../testing/freezeState');

  return {
    ...actual,
    useColorArea: (...args: Parameters<typeof actual.useColorArea>) => deepFreezeState(actual.useColorArea(...args)),
  };
});

const teal = { h: 180, s: 0.5, v: 0.6 };

// The inputs live inside the thumb, which is the root's only child.
const slotsOf = (root: HTMLElement) => {
  const thumb = root.firstElementChild as HTMLElement;
  const [inputX, inputY] = Array.from(thumb.children) as HTMLInputElement[];

  return { inputX, inputY, root, thumb };
};

const renderColorArea = (props: React.ComponentProps<typeof ColorArea> = {}) => {
  const { container } = render(<ColorArea {...props} />);

  return slotsOf(container.firstElementChild as HTMLElement);
};

describe('ColorArea', () => {
  isConformant({
    Component: ColorArea,
    displayName: 'ColorArea',
  });

  it('stamps the marker pair on the root', () => {
    const { root } = renderColorArea();

    expect(root).toHaveClass('fui-color-area');
    expect(root).toHaveClass('group/fui-color-area');
    expect(root.classList[0]).toBe('fui-color-area');
    expect(colorAreaClassNames.root).toBe('fui-color-area group/fui-color-area');
  });

  it('gives both range inputs the same module class and wraps them in the thumb', () => {
    const { inputX, inputY, root, thumb } = renderColorArea();

    expect(root.children).toHaveLength(1);
    expect(thumb.children).toHaveLength(2);
    expect(thumb).toHaveClass(styles.thumb);
    expect(inputX).toHaveClass(styles.input);
    expect(inputY).toHaveClass(styles.input);
    expect(inputX.type).toBe('range');
    expect(inputY.type).toBe('range');
    expect(root).toHaveClass(styles.root);
  });

  it('stamps data-shape on the root alone, defaulting to rounded', () => {
    expect(renderColorArea().root.getAttribute('data-shape')).toBe('rounded');

    (['rounded', 'square'] as const).forEach(shape => {
      const { inputX, inputY, root, thumb } = renderColorArea({ shape });

      expect(root.getAttribute('data-shape')).toBe(shape);
      [inputX, inputY, thumb].forEach(slot => expect(slot.hasAttribute('data-shape')).toBe(false));
    });
  });

  it('takes the shape from an enclosing ColorPicker, its own prop winning', () => {
    const rootOf = (element: React.ReactElement) =>
      (render(element).container.firstElementChild as HTMLElement).firstElementChild as HTMLElement;

    expect(
      rootOf(
        <ColorPicker shape="square">
          <ColorArea />
        </ColorPicker>,
      ).getAttribute('data-shape'),
    ).toBe('square');

    expect(
      rootOf(
        <ColorPicker shape="square">
          <ColorArea shape="rounded" />
        </ColorPicker>,
      ).getAttribute('data-shape'),
    ).toBe('rounded');

    expect(
      rootOf(
        <ColorPicker>
          <ColorArea />
        </ColorPicker>,
      ).getAttribute('data-shape'),
    ).toBe('rounded');
  });

  it('adds no stamp the headless hook did not, and keeps the look prop off the DOM', () => {
    const { root } = renderColorArea({ shape: 'square' });

    expect(root.hasAttribute('data-channel')).toBe(false);
    expect(root.hasAttribute('data-orientation')).toBe(false);
    expect(root.hasAttribute('shape')).toBe(false);
  });

  it('leaves the root inline custom properties exactly as the headless hook wrote them', () => {
    const { root } = renderColorArea({ color: teal, style: { marginTop: 3 } });
    const style = root.getAttribute('style')!;

    expect(root.style.getPropertyValue('--fui-AreaX--progress')).toBe('50%');
    expect(root.style.getPropertyValue('--fui-AreaY--progress')).toBe('60%');
    expect(root.style.getPropertyValue('--fui-Area__thumb--color')).not.toBe('');
    expect(root.style.getPropertyValue('--fui-Area--main-color')).not.toBe('');
    expect(root.style.marginTop).toBe('3px');

    // ColorArea's hook spreads {...state.root.style, ...rootVariables} — the opposite order from
    // the two sliders — so the consumer style lands FIRST and the hook's values win.
    expect(style.indexOf('margin-top')).toBeLessThan(style.indexOf('--fui-AreaX--progress'));
  });

  it('reports a colour change from either input', () => {
    const onChange = jest.fn();
    const { inputX, inputY } = renderColorArea({ color: teal, onChange });

    fireEvent.change(inputX, { target: { value: '80' } });
    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange.mock.calls[0][1].color).toEqual(expect.objectContaining({ s: 0.8 }));

    fireEvent.change(inputY, { target: { value: '20' } });
    expect(onChange).toHaveBeenCalledTimes(2);
    expect(onChange.mock.calls[1][1].color).toEqual(expect.objectContaining({ v: 0.2 }));
  });

  it('keeps a consumer className on every slot exactly once', () => {
    const { inputX, inputY, root, thumb } = renderColorArea({
      className: 'consumer',
      inputX: { className: 'x' },
      inputY: { className: 'y' },
      thumb: { className: 't' },
    });

    // classList is an ordered set, so a duplicated token is only visible in the raw attribute.
    expect(
      root
        .getAttribute('class')!
        .split(/\s+/)
        .filter(name => name === 'consumer'),
    ).toHaveLength(1);
    expect(thumb).toHaveClass('t');
    expect(inputX).toHaveClass('x');
    expect(inputY).toHaveClass('y');
  });

  it('lands native props on the root', () => {
    const ref = React.createRef<HTMLDivElement>();
    const { root } = renderColorArea({
      'data-testid': 'probe',
      id: 'area',
      ref,
    } as React.ComponentProps<typeof ColorArea>);

    expect(root.id).toBe('area');
    expect(root.getAttribute('data-testid')).toBe('probe');
    expect(ref.current).toBe(root);
  });

  it('does not mutate the state it is given', () => {
    const state = {
      components: { inputX: 'input', inputY: 'input', root: 'div', thumb: 'div' },
      inputX: { className: 'x' },
      inputY: { className: 'y' },
      root: { className: 'consumer', style: { '--fui-AreaX--progress': '50%' } },
      shape: 'square',
      thumb: { className: 'consumer-thumb' },
    } as unknown as ColorAreaState;

    const styled = useColorAreaStyles(state);

    expect(styled).not.toBe(state);
    expect(styled.root).not.toBe(state.root);
    expect(styled.thumb).not.toBe(state.thumb);
    expect(styled.inputX).not.toBe(state.inputX);
    expect(styled.inputY).not.toBe(state.inputY);

    expect(state.root.className).toBe('consumer');
    expect(state.thumb.className).toBe('consumer-thumb');
    expect(state.inputX.className).toBe('x');
    expect(state.inputY.className).toBe('y');
    expect('data-shape' in state.root).toBe(false);

    expect(styled.root.style).toBe(state.root.style);
    expect(styled.root.className).toContain(colorAreaClassNames.root);
    expect(styled.inputX.className).toContain('x');
    expect(styled.inputY.className).toContain('y');
  });
});

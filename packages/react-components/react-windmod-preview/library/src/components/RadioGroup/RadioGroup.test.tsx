import * as React from 'react';
import { fireEvent, render } from '@testing-library/react';

import { isConformant } from '../../testing/isConformant';
import { Radio } from '../Radio';
import { RadioGroup } from './RadioGroup';
import type { RadioGroupState } from './RadioGroup.types';
import { radioGroupClassNames, useRadioGroupStyles } from './useRadioGroupStyles';

import styles from './RadioGroup.module.css';

const layouts = ['vertical', 'horizontal', 'horizontal-stacked'] as const;

// The group root is the container's only child; each Radio root is one of its element children.
const renderGroup = (props: React.ComponentProps<typeof RadioGroup> = {}, values = ['a', 'b']) => {
  const { container } = render(
    <RadioGroup {...props}>
      {values.map(value => (
        <Radio key={value} label={value.toUpperCase()} value={value} />
      ))}
    </RadioGroup>,
  );

  const root = container.firstElementChild as HTMLElement;

  return {
    root,
    radios: Array.from(root.children) as HTMLElement[],
    inputs: Array.from(root.querySelectorAll<HTMLInputElement>('input')),
  };
};

// classList is an ordered set, so a duplicated token is only visible in the raw attribute.
const occurrences = (element: Element, token: string) =>
  element
    .getAttribute('class')!
    .split(/\s+/)
    .filter(candidate => candidate === token).length;

describe('RadioGroup', () => {
  isConformant({
    Component: RadioGroup,
    displayName: 'RadioGroup',
  });

  it('stamps the marker pair on the root', () => {
    const { root } = renderGroup();

    expect(root).toHaveClass('fui-radio-group');
    expect(root).toHaveClass('group/fui-radio-group');
    expect(root.classList[0]).toBe('fui-radio-group');
    expect(radioGroupClassNames.root).toBe('fui-radio-group group/fui-radio-group');
  });

  it('applies the module class to the root', () => {
    expect(renderGroup().root).toHaveClass(styles.root);
  });

  it('stamps data-layout on the group root alone', () => {
    expect(renderGroup().root.getAttribute('data-layout')).toBe('vertical');

    layouts.forEach(layout => {
      const { root, radios } = renderGroup({ layout });

      expect(root.getAttribute('data-layout')).toBe(layout);
      radios.forEach(radio => expect(radio.hasAttribute('data-layout')).toBe(false));
    });
  });

  it('propagates layout to each child Radio labelPosition through the headless context', () => {
    // THE canary. `layout` is stripped by the headless surface, so RadioGroup.tsx restores it into
    // the state before useRadioGroupContextValues reads it. Drop that and horizontal-stacked
    // renders identically to horizontal — nothing throws and nothing type-errors.
    expect(
      renderGroup({ layout: 'horizontal-stacked' }).radios.map(r => r.getAttribute('data-label-position')),
    ).toEqual(['below', 'below']);

    (['vertical', 'horizontal'] as const).forEach(layout => {
      expect(renderGroup({ layout }).radios.map(r => r.getAttribute('data-label-position'))).toEqual([
        'after',
        'after',
      ]);
    });

    expect(renderGroup().radios.map(r => r.getAttribute('data-label-position'))).toEqual(['after', 'after']);
  });

  it('lets an explicit Radio labelPosition beat the layout default', () => {
    const { container } = render(
      <RadioGroup layout="horizontal-stacked">
        <Radio label="A" labelPosition="after" value="a" />
        <Radio label="B" value="b" />
      </RadioGroup>,
    );
    const radios = Array.from((container.firstElementChild as HTMLElement).children);

    expect(radios.map(r => r.getAttribute('data-label-position'))).toEqual(['after', 'below']);
  });

  it('shares a generated name across every child input', () => {
    const { inputs } = renderGroup();

    expect(inputs[0].name).not.toBe('');
    expect(inputs[1].name).toBe(inputs[0].name);
  });

  it('passes an explicit name through to every child input', () => {
    expect(renderGroup({ name: 'grp' }).inputs.map(i => i.name)).toEqual(['grp', 'grp']);
  });

  it('propagates disabled to every child input and Radio root', () => {
    const { radios, inputs } = renderGroup({ disabled: true });

    inputs.forEach(input => expect(input.disabled).toBe(true));
    radios.forEach(radio => expect(radio.getAttribute('data-disabled')).toBe(''));
  });

  it('propagates required to every child input', () => {
    renderGroup({ required: true }).inputs.forEach(input => expect(input.required).toBe(true));
  });

  it('checks only the matching input for a controlled value', () => {
    const { inputs } = renderGroup({ onChange: jest.fn(), value: 'b' });

    expect(inputs.map(i => i.checked)).toEqual([false, true]);
  });

  it('checks the matching input for defaultValue and lets a click move the selection', () => {
    const { inputs } = renderGroup({ defaultValue: 'b' });

    expect(inputs.map(i => i.checked)).toEqual([false, true]);

    fireEvent.click(inputs[0]);

    expect(inputs.map(i => i.checked)).toEqual([true, false]);
  });

  it('fires the group onChange with the selected value', () => {
    const onChange = jest.fn();
    const { inputs } = renderGroup({ onChange });

    fireEvent.click(inputs[1]);

    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange.mock.calls[0][1]).toEqual({ value: 'b' });
  });

  it('renders role=radiogroup with the children inside it', () => {
    const { root, radios } = renderGroup();

    expect(root.getAttribute('role')).toBe('radiogroup');
    expect(radios).toHaveLength(2);
    radios.forEach(radio => expect(radio).toHaveClass('fui-radio'));
  });

  it('keeps a consumer className and style on the root', () => {
    const { root } = renderGroup({ className: 'consumer', style: { width: 160 } });

    expect(occurrences(root, 'consumer')).toBe(1);
    expect(occurrences(root, styles.root)).toBe(1);
    expect(root.style.width).toBe('160px');
  });

  it('does not mutate the state it is given', () => {
    const state = {
      components: { root: 'div' },
      layout: 'horizontal',
      root: { className: 'consumer' },
    } as unknown as RadioGroupState;

    const styled = useRadioGroupStyles(state);

    expect(styled).not.toBe(state);
    expect(styled.root).not.toBe(state.root);

    expect(state.root.className).toBe('consumer');
    expect('data-layout' in state.root).toBe(false);

    expect(styled.root.className).toContain('consumer');
    expect(styled.root.className).toContain(radioGroupClassNames.root);
    expect(styled.layout).toBe('horizontal');
  });
});

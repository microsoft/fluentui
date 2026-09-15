import * as React from 'react';
import { render } from '@testing-library/react';

import { isConformant } from '../../testing/isConformant';
import { TagPicker } from '../TagPicker';
import type { TagPickerProps } from '../TagPicker/TagPicker.types';
import { TagPickerControl } from '../TagPickerControl';
import { TagPickerList } from '../TagPickerList';
import { TagPickerInput } from './TagPickerInput';
import type { TagPickerInputState } from './TagPickerInput.types';
import { tagPickerInputClassNames, useTagPickerInputStyles } from './useTagPickerInputStyles';

import styles from './TagPickerInput.module.css';

const renderInput = (picker: Partial<TagPickerProps> = {}) => {
  const { container } = render(
    <TagPicker {...(picker as TagPickerProps)}>
      <TagPickerControl>
        <TagPickerInput aria-label="Pick" />
      </TagPickerControl>
      <TagPickerList />
    </TagPicker>,
  );

  return {
    control: container.querySelector<HTMLElement>('.fui-tag-picker-control')!,
    input: container.querySelector<HTMLInputElement>('input')!,
  };
};

describe('TagPickerInput', () => {
  isConformant({
    Component: TagPickerInput,
    displayName: 'TagPickerInput',
  });

  // T-1
  it('stamps the marker pair on the root', () => {
    const { input } = renderInput();

    expect(input.classList[0]).toBe('fui-tag-picker-input');
    expect(input).toHaveClass('group/fui-tag-picker-input');
    expect(input).toHaveClass(styles.root);
    expect(tagPickerInputClassNames.root).toBe('fui-tag-picker-input group/fui-tag-picker-input');
  });

  // M2 — the input carries no scale of its own; its three padding steps read the control root's.
  it('takes its size from the control and stamps none of its own', () => {
    const { control, input } = renderInput({ size: 'large' });

    expect(control.getAttribute('data-size')).toBe('large');
    expect(input.hasAttribute('data-size')).toBe(false);
  });

  it('reads data-disabled from the headless hook rather than stamping its own', () => {
    const { input } = renderInput({ disabled: true });

    expect(input.getAttribute('data-disabled')).toBe('');
    expect(input.disabled).toBe(true);
  });

  // M13 has NO jest guard — jsdom has no layout, so scrollWidth and offsetWidth are both 0 and the
  // stretch branch never fires. The authored declaration is what a browser probe and scene 1 band G
  // verify; this pins the custom-property spelling, which is fixed by the headless hook.
  it('authors the stretch custom property the headless hook writes', () => {
    const module = require('node:fs').readFileSync(
      require('node:path').join(__dirname, 'TagPickerInput.module.css'),
      'utf8',
    );

    expect(module).toContain('width: var(--fluent-TagPickerInput__width, 0);');
  });

  it('does not mutate the state it is given', () => {
    const state = { root: { className: 'consumer' } } as unknown as TagPickerInputState;
    const styled = useTagPickerInputStyles(state);

    expect(styled).not.toBe(state);
    expect(styled.root).not.toBe(state.root);
    expect(state.root.className).toBe('consumer');
    expect(styled.root.className).toContain('consumer');
  });
});

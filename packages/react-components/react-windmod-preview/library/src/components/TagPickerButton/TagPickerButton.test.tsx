import * as React from 'react';
import { render } from '@testing-library/react';

import { isConformant } from '../../testing/isConformant';
import { Tag } from '../Tag';
import { TagPicker } from '../TagPicker';
import type { TagPickerProps } from '../TagPicker/TagPicker.types';
import { TagPickerControl } from '../TagPickerControl';
import { TagPickerGroup } from '../TagPickerGroup';
import { TagPickerList } from '../TagPickerList';
import { TagPickerButton } from './TagPickerButton';
import type { TagPickerButtonState } from './TagPickerButton.types';
import { tagPickerButtonClassNames, useTagPickerButtonStyles } from './useTagPickerButtonStyles';

import styles from './TagPickerButton.module.css';

const renderButton = (picker: Partial<TagPickerProps> = {}, values: string[] = []) => {
  const { container } = render(
    <TagPicker selectedOptions={values} {...(picker as TagPickerProps)}>
      <TagPickerControl>
        <TagPickerGroup aria-label="Selected">
          {values.map(value => (
            <Tag key={value} value={value}>
              {value}
            </Tag>
          ))}
        </TagPickerGroup>
        <TagPickerButton>Pick</TagPickerButton>
      </TagPickerControl>
      <TagPickerList />
    </TagPicker>,
  );

  return {
    control: container.querySelector<HTMLElement>('.fui-tag-picker-control')!,
    button: container.querySelector<HTMLButtonElement>('.fui-tag-picker-button')!,
  };
};

describe('TagPickerButton', () => {
  isConformant({
    Component: TagPickerButton,
    displayName: 'TagPickerButton',
  });

  // T-1
  it('stamps the marker pair on the root', () => {
    const { button } = renderButton();

    expect(button.classList[0]).toBe('fui-tag-picker-button');
    expect(button).toHaveClass('group/fui-tag-picker-button');
    expect(button).toHaveClass(styles.root);
    expect(tagPickerButtonClassNames.root).toBe('fui-tag-picker-button group/fui-tag-picker-button');
  });

  // M18's JS half. The collapse is driven by selection, which is state and not an attribute on this
  // element, so it stays a JS gate; the block ORDER that makes it win is owned by VR.
  it('collapses only once an option is selected', () => {
    expect(renderButton().button).not.toHaveClass(styles.visuallyHidden);
    expect(renderButton({}, ['cat']).button).toHaveClass(styles.visuallyHidden);
  });

  // M2 — the button carries no scale of its own.
  it('takes its size from the control and stamps none of its own', () => {
    const { control, button } = renderButton({ size: 'extra-large' });

    expect(control.getAttribute('data-size')).toBe('extra-large');
    expect(button.hasAttribute('data-size')).toBe(false);
  });

  // The button's own disabled prop is the only source: unlike the control and the input, nothing
  // threads the picker's disabled state onto this element on either implementation.
  it('reads data-disabled from the headless hook rather than stamping its own', () => {
    const { container } = render(
      <TagPicker>
        <TagPickerControl>
          <TagPickerButton disabled>Pick</TagPickerButton>
        </TagPickerControl>
        <TagPickerList />
      </TagPicker>,
    );

    expect(container.querySelector('.fui-tag-picker-button')!.getAttribute('data-disabled')).toBe('');
    expect(renderButton().button.hasAttribute('data-disabled')).toBe(false);
  });

  it('does not mutate the state it is given', () => {
    const state = { hasSelectedOption: true, root: { className: 'consumer' } } as unknown as TagPickerButtonState;
    const styled = useTagPickerButtonStyles(state);

    expect(styled).not.toBe(state);
    expect(styled.root).not.toBe(state.root);
    expect(state.root.className).toBe('consumer');
    expect(styled.root.className).toContain('consumer');
    expect(styled.root.className).toContain(styles.visuallyHidden);
  });
});

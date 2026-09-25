import { readFileSync } from 'node:fs';
import { join } from 'node:path';

import * as React from 'react';
import { render } from '@testing-library/react';

import { isConformant } from '../../testing/isConformant';
import { TagPicker } from '../TagPicker';
import type { TagPickerProps } from '../TagPicker/TagPicker.types';
import { TagPickerControl } from '../TagPickerControl';
import { TagPickerInput } from '../TagPickerInput';
import { TagPickerList } from '../TagPickerList';
import { TagPickerOption } from './TagPickerOption';
import type { TagPickerOptionProps, TagPickerOptionState } from './TagPickerOption.types';
import { tagPickerOptionClassNames, useTagPickerOptionStyles } from './useTagPickerOptionStyles';

import styles from './TagPickerOption.module.css';

const renderOptions = (options: React.ReactNode, picker: Partial<TagPickerProps> = {}) => {
  const { container } = render(
    <TagPicker open {...(picker as TagPickerProps)}>
      <TagPickerControl>
        <TagPickerInput aria-label="Pick" />
      </TagPickerControl>
      <TagPickerList>{options}</TagPickerList>
    </TagPicker>,
  );

  return {
    container,
    options: Array.from(container.querySelectorAll<HTMLElement>('[role="option"]')),
  };
};

const one = (props: TagPickerOptionProps) => renderOptions(<TagPickerOption {...props} />).options[0];

describe('TagPickerOption', () => {
  isConformant({
    Component: TagPickerOption,
    displayName: 'TagPickerOption',
    requiredProps: { value: 'cat', children: 'Cat' } as Partial<TagPickerOptionProps>,
  });

  // `fui-Option` is react-combobox's literal string, injected by the headless hook and
  // carried through `state.root.className`, which every windmod clsx puts LAST. It is load-bearing
  // behaviour: the picker's active-descendant controller finds options by exactly that class, and
  // its capital O keeps it from ever activating windmod's own lowercase `fui-option` group variants.
  it('carries the injected fui-Option beside its own marker pair', () => {
    const option = one({ value: 'cat', children: 'Cat' });

    expect(option.classList[0]).toBe('fui-tag-picker-option');
    expect(option).toHaveClass('group/fui-tag-picker-option');
    expect(option).toHaveClass('fui-Option');
    expect(option).not.toHaveClass('fui-option');
    expect(tagPickerOptionClassNames.root).toBe('fui-tag-picker-option group/fui-tag-picker-option');
  });

  it('applies the cloned resting look to every option', () => {
    const { options } = renderOptions(
      <>
        <TagPickerOption value="cat">Cat</TagPickerOption>
        <TagPickerOption disabled value="dog">
          Dog
        </TagPickerOption>
      </>,
    );

    options.forEach(option => expect(option).toHaveClass(styles.root));
  });

  // The headless hook stamps all three state attributes — that is exactly why the look is a clone
  // rather than a reuse of windmod Option's module, which reads every one of them.
  it('still carries the state attributes the clone deliberately ignores', () => {
    const option = one({ disabled: true, value: 'cat', children: 'Cat' });

    expect(option.getAttribute('data-disabled')).toBe('');
    expect(option.getAttribute('data-multiselect')).toBe('');
  });

  it('renders no check icon at all', () => {
    const { options } = renderOptions(
      <>
        <TagPickerOption value="cat">Cat</TagPickerOption>
        <TagPickerOption value="dog">Dog</TagPickerOption>
      </>,
      { selectedOptions: ['cat'] },
    );

    options.forEach(option => expect(option.querySelector('svg')).toBeNull());
  });

  it('switches to the two-slot grid only when secondary content is present', () => {
    expect(one({ value: 'cat', children: 'Cat' })).not.toHaveClass(styles.withSecondaryContent);

    const withSecondary = one({ value: 'cat', children: 'Cat', secondaryContent: 'meow', media: <i /> });

    expect(withSecondary).toHaveClass(styles.withSecondaryContent);
    expect(withSecondary.querySelector(`.${styles.secondaryContent}`)).not.toBeNull();
    expect(withSecondary.querySelector(`.${styles.media}`)).not.toBeNull();
  });

  // M15b. No VR, jest or browser guard can reach a `data-selected` or `data-multiselect` selector
  // here: the renderer draws no check icon and Griffel's `selected` bucket is empty, so such a rule
  // would be a live divergence rendering zero pixels. The absence is asserted on the source.
  it('authors no state-attribute selector in its module', () => {
    const module = readFileSync(join(__dirname, 'TagPickerOption.module.css'), 'utf8');
    const authored = module.slice(module.indexOf('@layer'));

    [
      '@variant selected',
      '@variant not-selected',
      '@variant multiselect',
      '@variant disabled',
      '@variant enabled',
      '@variant disabled-control',
      '@variant enabled-control',
      'check-icon',
      'data-selected',
      'data-multiselect',
      'data-disabled',
      'aria-disabled',
    ].forEach(needle => expect(authored).not.toContain(needle));

    // The hover and active blocks are UNGATED, unlike windmod Option's, because Griffel's disabled
    // TagPickerOption still hovers — `disabled` is forced false before the shared bucket applies.
    expect(authored).toContain('@variant hover');
    expect(authored).toContain('@variant active');
  });

  it('does not mutate the state it is given', () => {
    const state = {
      media: { className: 'media' },
      root: { className: 'fui-Option consumer' },
      secondaryContent: { className: 'secondary' },
    } as unknown as TagPickerOptionState;

    const styled = useTagPickerOptionStyles(state);

    expect(styled).not.toBe(state);
    expect(styled.root).not.toBe(state.root);
    expect(state.root.className).toBe('fui-Option consumer');
    expect(styled.root.className).toContain('fui-Option');
    expect(styled.root.className!.indexOf('fui-Option')).toBeGreaterThan(
      styled.root.className!.indexOf('fui-tag-picker-option'),
    );
    expect(styled.media!.className).toContain('media');
    expect(styled.secondaryContent!.className).toContain('secondary');
  });
});

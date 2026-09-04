import * as React from 'react';
import { render } from '@testing-library/react';
import { useTagPicker } from '@fluentui/react-headless-components-preview/tag-picker';

import { isConformant } from '../../testing/isConformant';
import { TagPickerControl } from '../TagPickerControl';
import { TagPickerInput } from '../TagPickerInput';
import { TagPickerList } from '../TagPickerList';
import { TagPickerOption } from '../TagPickerOption';
import { TagPicker } from './TagPicker';
import type { TagPickerProps } from './TagPicker.types';

// The real hook is kept; the spy exposes the state at the seam the windmod layer works on, and the
// frozen return is the mutation guard — see testing/freezeState.ts.
jest.mock('@fluentui/react-headless-components-preview/tag-picker', () => {
  const actual = jest.requireActual('@fluentui/react-headless-components-preview/tag-picker');
  const { deepFreezeState } = require('../../testing/freezeState');

  return {
    ...actual,
    useTagPicker: jest.fn((...args: Parameters<typeof actual.useTagPicker>) =>
      deepFreezeState(actual.useTagPicker(...args)),
    ),
  };
});

const useTagPickerSpy = useTagPicker as unknown as jest.Mock;

const OPTIONS = (
  <>
    <TagPickerOption value="cat">Cat</TagPickerOption>
    <TagPickerOption value="dog">Dog</TagPickerOption>
  </>
);

const renderPicker = (props: Partial<TagPickerProps> = {}) => {
  const { container } = render(
    <TagPicker {...(props as TagPickerProps)}>
      <TagPickerControl>
        <TagPickerInput aria-label="Pick" />
      </TagPickerControl>
      <TagPickerList>{OPTIONS}</TagPickerList>
    </TagPicker>,
  );

  return {
    container,
    control: container.querySelector<HTMLElement>('.fui-tag-picker-control'),
    // Every windmod module's `root` local collapses to one string under the jest css-module proxy,
    // so the surface is reached by the Listbox marker class instead.
    listbox: container.querySelector<HTMLElement>('.fui-listbox'),
  };
};

describe('TagPicker', () => {
  beforeEach(() => useTagPickerSpy.mockClear());

  isConformant({
    Component: TagPicker as React.FunctionComponent<TagPickerProps>,
    displayName: 'TagPicker',
    requiredProps: { children: [<TagPickerControl key="c" />, <TagPickerList key="l" />] } as never,
    // TagPicker's slot map is empty — it renders three context providers and its two children and
    // no element of its own, so there is no root to take a ref, a className or native props.
    disabledTests: ['component-handles-ref', 'component-has-root-ref', 'component-handles-classname'],
  });

  // §1.4 — the picker itself renders no element of its own; it publishes the look on its context,
  // and the control is the one element that stamps a scale.
  it('publishes the resolved look props through the picker context', () => {
    expect(renderPicker().control!.getAttribute('data-size')).toBe('medium');
    expect(renderPicker({ size: 'extra-large' }).control!.getAttribute('data-size')).toBe('extra-large');
  });

  // M19 — the surface is rendered only while open or focused, which is why no `collapsed` class
  // exists anywhere in the family.
  it('renders no surface while closed', () => {
    expect(renderPicker().listbox).toBeNull();
    expect(renderPicker({ open: true }).listbox).not.toBeNull();
  });

  // M10, M11. jsdom keeps the inline placement declarations usePositioning writes; it discards the
  // `width: anchor-size(width)` that matchTargetSize writes, so M9a is owned by the browser probe
  // and both width scenes instead.
  it('restores the five Griffel positioning values the headless layer drops', () => {
    const { listbox } = renderPicker({ open: true });
    const style = listbox!.getAttribute('style')!;

    expect(listbox!.getAttribute('data-placement')).toBe('below-start');
    expect(style).toContain('position-area: block-end span-inline-end');
    expect(style).toContain('position-try-fallbacks: block-start, inline-end, inline-end span-block-end');
    expect(style).toContain('margin-block-start: 2px');
  });

  it.each([
    ['position', { position: 'above' } as const, (el: HTMLElement) => el.getAttribute('data-placement')],
    ['align', { align: 'end' } as const, (el: HTMLElement) => el.getAttribute('data-placement')],
    ['offset', { offset: { crossAxis: 0, mainAxis: 24 } } as const, (el: HTMLElement) => el.getAttribute('style')],
  ])('lets a consumer override the restored %s', (_name, positioning, read) => {
    const restored = read(renderPicker({ open: true }).listbox!);
    const overridden = read(renderPicker({ open: true, positioning }).listbox!);

    expect(overridden).not.toBe(restored);
  });

  it('keeps the restored values a consumer did not override', () => {
    const { listbox } = renderPicker({ open: true, positioning: { offset: { crossAxis: 0, mainAxis: 24 } } });

    expect(listbox!.getAttribute('data-placement')).toBe('below-start');
    expect(listbox!.getAttribute('style')).toContain('margin-block-start: 24px');
  });

  // T-10. Everything the component does not destructure reaches the headless hook untouched, and
  // `inline` is never re-declared — the headless hook hard-sets it.
  it('passes every prop it does not own through to the headless hook', () => {
    renderPicker({ defaultOpen: true, disabled: true, noPopover: true, size: 'large' });

    const passed = useTagPickerSpy.mock.calls.at(-1)![0];

    expect(passed.defaultOpen).toBe(true);
    expect(passed.disabled).toBe(true);
    expect(passed.noPopover).toBe(true);
    expect('size' in passed).toBe(false);
    expect('appearance' in passed).toBe(false);
    expect('inline' in passed).toBe(false);
    expect(useTagPickerSpy.mock.results.at(-1)!.value.inline).toBe(true);
  });

  // The frozen headless return above turns an in-place write on the picker state into a thrown
  // TypeError. The glyph rule is a TagPickerControl pipeline and is guarded in that spec.
  it('renders the whole family without mutating the headless state', () => {
    expect(() => renderPicker({ open: true, size: 'large', appearance: 'filled-darker' })).not.toThrow();
  });
});

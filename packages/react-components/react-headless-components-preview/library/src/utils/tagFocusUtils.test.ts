import { focusLastTag, isLastFocusableTag } from './tagFocusUtils';

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function makeContainer(...children: HTMLElement[]): HTMLElement {
  const container = document.createElement('div');
  children.forEach(child => container.appendChild(child));
  return container;
}

function makeButton(): HTMLButtonElement {
  return document.createElement('button');
}

function makeTagSpan(tabIndex: number = -1): HTMLSpanElement {
  const span = document.createElement('span');
  span.setAttribute('tabindex', String(tabIndex));
  return span;
}

// ---------------------------------------------------------------------------
// focusLastTag
// ---------------------------------------------------------------------------

describe('focusLastTag', () => {
  it('does nothing when the container is empty', () => {
    const container = makeContainer();
    expect(() => focusLastTag(container)).not.toThrow();
  });

  it('focuses the single button in the container', () => {
    const btn = makeButton();
    const focusSpy = jest.spyOn(btn, 'focus');
    const container = makeContainer(btn);

    focusLastTag(container);

    expect(focusSpy).toHaveBeenCalledTimes(1);
  });

  it('focuses the last button when multiple buttons are present', () => {
    const first = makeButton();
    const last = makeButton();
    const firstFocusSpy = jest.spyOn(first, 'focus');
    const lastFocusSpy = jest.spyOn(last, 'focus');
    const container = makeContainer(first, last);

    focusLastTag(container);

    expect(firstFocusSpy).not.toHaveBeenCalled();
    expect(lastFocusSpy).toHaveBeenCalledTimes(1);
  });

  it('focuses the last [tabindex] element when no buttons are present', () => {
    const first = makeTagSpan();
    const last = makeTagSpan();
    const lastFocusSpy = jest.spyOn(last, 'focus');
    const container = makeContainer(first, last);

    focusLastTag(container);

    expect(lastFocusSpy).toHaveBeenCalledTimes(1);
  });

  it('focuses the last element in a mixed buttons / tabindex group', () => {
    const btn = makeButton();
    const tag = makeTagSpan();
    const tagFocusSpy = jest.spyOn(tag, 'focus');
    const container = makeContainer(btn, tag);

    focusLastTag(container);

    expect(tagFocusSpy).toHaveBeenCalledTimes(1);
  });
});

// ---------------------------------------------------------------------------
// isLastFocusableTag
// ---------------------------------------------------------------------------

describe('isLastFocusableTag', () => {
  it('returns false when the container is empty', () => {
    const container = makeContainer();
    const target = makeButton();

    expect(isLastFocusableTag(container, target)).toBe(false);
  });

  it('returns true when target is the only focusable element', () => {
    const btn = makeButton();
    const container = makeContainer(btn);

    expect(isLastFocusableTag(container, btn)).toBe(true);
  });

  it('returns true when target is the last of multiple buttons', () => {
    const first = makeButton();
    const last = makeButton();
    const container = makeContainer(first, last);

    expect(isLastFocusableTag(container, last)).toBe(true);
  });

  it('returns false when target is NOT the last focusable element', () => {
    const first = makeButton();
    const last = makeButton();
    const container = makeContainer(first, last);

    expect(isLastFocusableTag(container, first)).toBe(false);
  });

  it('returns true when target is the last [tabindex] element', () => {
    const first = makeTagSpan();
    const last = makeTagSpan();
    const container = makeContainer(first, last);

    expect(isLastFocusableTag(container, last)).toBe(true);
  });

  it('handles roving tabindex values (tabindex=-1 items are still matched)', () => {
    const tag = makeTagSpan(-1);
    const container = makeContainer(tag);

    expect(isLastFocusableTag(container, tag)).toBe(true);
  });

  it('returns false when target is not in the container at all', () => {
    const inContainer = makeButton();
    const outside = makeButton();
    const container = makeContainer(inContainer);

    expect(isLastFocusableTag(container, outside)).toBe(false);
  });
});

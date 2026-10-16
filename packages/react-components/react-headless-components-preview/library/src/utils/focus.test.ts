import { getFocusables, getInitialFocusTarget, isComboboxControllingPopup, isSameTabStop } from './focus';

const setup = (html: string): HTMLElement => {
  const container = document.createElement('div');
  container.setAttribute('popover', 'manual');
  container.innerHTML = html;
  document.body.appendChild(container);
  return container;
};

afterEach(() => {
  document.body.innerHTML = '';
});

describe('getFocusables', () => {
  it('excludes disabled, negative tabindex, aria-disabled, hidden and inert elements', () => {
    const container = setup(`
      <button id="a">a</button>
      <button disabled>disabled</button>
      <button tabindex="-1">negative</button>
      <button aria-disabled="true">aria-disabled</button>
      <div aria-hidden="true"><button>hidden</button></div>
      <div inert><button>inert</button></div>
      <input type="hidden" />
      <a id="b" href="#">b</a>
    `);

    expect(getFocusables(container).map(element => element.id)).toEqual(['a', 'b']);
  });

  it('excludes elements of nested layers', () => {
    const container = setup(`
      <button id="a">a</button>
      <div popover="auto"><button>nested popover</button></div>
      <dialog><button>nested dialog</button></dialog>
    `);

    expect(getFocusables(container).map(element => element.id)).toEqual(['a']);
  });

  it('orders positive tabindex first', () => {
    const container = setup(`
      <button id="a">a</button>
      <button id="c" tabindex="2">c</button>
      <button id="b" tabindex="1">b</button>
    `);

    expect(getFocusables(container).map(element => element.id)).toEqual(['b', 'c', 'a']);
  });

  it('collapses a named radio group to its checked radio', () => {
    const container = setup(`
      <input type="radio" name="g" id="r1" />
      <input type="radio" name="g" id="r2" checked />
      <input type="radio" name="g" id="r3" />
      <input type="radio" name="other" id="o1" />
      <input type="radio" name="other" id="o2" />
      <input type="radio" id="unnamed" />
    `);

    expect(getFocusables(container).map(element => element.id)).toEqual(['r2', 'o1', 'unnamed']);
  });

  it('keeps same-named radios of different forms as separate tab stops', () => {
    const container = setup(`
      <form><input type="radio" name="g" id="f1" /></form>
      <form><input type="radio" name="g" id="f2" /></form>
    `);

    expect(getFocusables(container).map(element => element.id)).toEqual(['f1', 'f2']);
  });
});

describe('isSameTabStop', () => {
  it('treats radios of one named group as one tab stop', () => {
    const container = setup(`
      <input type="radio" name="g" id="r1" />
      <input type="radio" name="g" id="r2" />
      <input type="radio" name="h" id="h1" />
    `);
    const [r1, r2, h1] = Array.from(container.querySelectorAll('input'));

    expect(isSameTabStop(r1, r2)).toBe(true);
    expect(isSameTabStop(r1, h1)).toBe(false);
    expect(isSameTabStop(r1, r1)).toBe(true);
    expect(isSameTabStop(null, r1)).toBe(false);
  });
});

describe('getInitialFocusTarget', () => {
  it('prefers [autofocus] for dialogs, ignoring nested layers', () => {
    const container = setup(`
      <button id="first">first</button>
      <div popover="auto"><button autofocus id="nested">nested</button></div>
      <input autofocus id="auto" />
    `);

    expect(getInitialFocusTarget(container, 'dialog')?.id).toBe('auto');
  });

  it('falls back to the first focusable element for dialogs', () => {
    const container = setup(
      `<div popover="auto"><button autofocus>nested</button></div><button id="first">first</button>`,
    );

    expect(getInitialFocusTarget(container, 'dialog')?.id).toBe('first');
  });

  it('picks the selected option of a listbox', () => {
    const container = setup(`
      <div role="option" id="o1" tabindex="-1"></div>
      <div role="option" id="o2" tabindex="-1" aria-selected="true"></div>
    `);

    expect(getInitialFocusTarget(container, 'listbox')?.id).toBe('o2');
  });

  it('does not move focus for other roles', () => {
    const container = setup(`<button>a</button>`);

    expect(getInitialFocusTarget(container, 'group')).toBeNull();
  });
});

describe('isComboboxControllingPopup', () => {
  it('detects a focused combobox that controls the popup', () => {
    const container = setup(`<div role="option" tabindex="-1"></div>`);
    container.id = 'popup';
    const input = document.createElement('input');
    input.setAttribute('role', 'combobox');
    input.setAttribute('aria-controls', 'popup');
    document.body.appendChild(input);
    input.focus();

    expect(isComboboxControllingPopup(document, container)).toBe(true);
    expect(getInitialFocusTarget(container, 'listbox')).toBeNull();
  });
});

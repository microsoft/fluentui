import { getDialogTabStops, isInFrame, trapTabInFrame } from './frameTabWrap';

const render = (html: string): HTMLDialogElement => {
  document.body.innerHTML = html;
  return document.querySelector<HTMLDialogElement>('#dialog')!;
};

const byId = (id: string) => document.getElementById(id)!;
const ids = (elements: Element[]) => elements.map(element => element.id || element.tagName);
const focusSentinel = (sentinel: Element, relatedTarget: Element | null) =>
  sentinel.dispatchEvent(new FocusEvent('focus', { relatedTarget }));

describe('isInFrame', () => {
  it('is false for a top-level document', () => {
    expect(isInFrame(document)).toBe(false);
  });

  it('is true when the window is not the top window', () => {
    const view = { top: {} };
    expect(isInFrame({ defaultView: view } as unknown as Document)).toBe(true);
  });

  it('is false without a document or window', () => {
    expect(isInFrame(undefined)).toBe(false);
    expect(isInFrame({ defaultView: null } as unknown as Document)).toBe(false);
  });
});

describe('getDialogTabStops', () => {
  afterEach(() => {
    document.body.innerHTML = '';
  });

  it('skips disabled, negative tabindex, inert and unchecked grouped radio elements', () => {
    const dialog = render(`
      <dialog id="dialog" open tabindex="-1">
        <button id="a"></button>
        <input id="r1" type="radio" name="g" checked />
        <button id="disabled" disabled></button>
        <a id="no-tab" href="#" tabindex="-1"></a>
        <div inert><button id="inert"></button></div>
        <input id="r2" type="radio" name="g" />
        <div id="editable" contenteditable></div>
      </dialog>
    `);

    expect(ids(getDialogTabStops(dialog))).toEqual(['a', 'r1', 'editable']);
  });

  it('puts positive tabindex first', () => {
    const dialog = render(`
      <dialog id="dialog" open><button id="a"></button><button id="p2" tabindex="2"></button><button id="p1" tabindex="1"></button></dialog>
    `);

    expect(ids(getDialogTabStops(dialog))).toEqual(['p1', 'p2', 'a']);
  });

  it('leaves out the tab stops of a nested modal dialog', () => {
    const dialog = render(`
      <dialog id="dialog" open>
        <button id="a"></button>
        <dialog id="inner" open><button id="inner-a"></button></dialog>
      </dialog>
    `);

    expect(ids(getDialogTabStops(dialog))).toEqual(['a']);
    expect(ids(getDialogTabStops(byId('inner') as HTMLDialogElement))).toEqual(['inner-a']);
  });
});

describe('trapTabInFrame', () => {
  afterEach(() => {
    document.body.innerHTML = '';
  });

  const setup = () => {
    const dialog = render(`
      <button id="outside"></button>
      <dialog id="dialog" open tabindex="-1"><button id="a"></button><button id="b"></button></dialog>
    `);
    const cleanup = trapTabInFrame(dialog);
    const start = dialog.firstElementChild!;
    const end = dialog.lastElementChild!;
    return { dialog, cleanup, start, end };
  };

  it('adds focusable, hidden sentinels at both ends and removes them on cleanup', () => {
    const { dialog, cleanup, start, end } = setup();

    expect(ids(Array.from(dialog.children))).toEqual(['SPAN', 'a', 'b', 'SPAN']);
    expect(start.getAttribute('tabindex')).toBe('1');
    expect(end.getAttribute('tabindex')).toBe('0');
    expect(end.getAttribute('aria-hidden')).toBe('true');

    cleanup();
    expect(ids(Array.from(dialog.children))).toEqual(['a', 'b']);
    expect(dialog.getAttribute('tabindex')).toBe('-1');
  });

  it('makes a dialog without tabindex focusable while active, and restores it', () => {
    const dialog = render(`<dialog id="dialog" open><p>Text</p></dialog>`);
    const cleanup = trapTabInFrame(dialog);

    expect(dialog.getAttribute('tabindex')).toBe('-1');
    focusSentinel(dialog.lastElementChild!, dialog);
    expect(document.activeElement).toBe(dialog);

    cleanup();
    expect(dialog.hasAttribute('tabindex')).toBe(false);
  });

  it('moves the sentinels back to the ends when children are added', async () => {
    const { dialog, start, end } = setup();

    dialog.appendChild(document.createElement('button'));
    dialog.prepend(document.createElement('button'));
    await Promise.resolve();

    expect(dialog.firstElementChild).toBe(start);
    expect(dialog.lastElementChild).toBe(end);
  });

  it('wraps focus to the other end when a sentinel is reached from inside', () => {
    const { start, end } = setup();

    focusSentinel(end, byId('b'));
    expect(document.activeElement).toBe(byId('a'));

    focusSentinel(start, byId('a'));
    expect(document.activeElement).toBe(byId('b'));
  });

  it('focuses the near end when a sentinel is reached from outside the dialog', () => {
    const { start, end } = setup();

    focusSentinel(start, null);
    expect(document.activeElement).toBe(byId('a'));

    focusSentinel(end, byId('outside'));
    expect(document.activeElement).toBe(byId('b'));
  });

  it('treats focus from the surface itself as coming from outside', () => {
    const { dialog, start } = setup();

    focusSentinel(start, dialog);
    expect(document.activeElement).toBe(byId('a'));
  });

  it('wraps Shift+Tab on the surface itself to the last tab stop', () => {
    const { dialog } = setup();
    dialog.focus();

    const event = new KeyboardEvent('keydown', { key: 'Tab', shiftKey: true, bubbles: true, cancelable: true });
    dialog.dispatchEvent(event);
    expect(event.defaultPrevented).toBe(true);
    expect(document.activeElement).toBe(byId('b'));

    const tab = new KeyboardEvent('keydown', { key: 'Tab', bubbles: true, cancelable: true });
    dialog.dispatchEvent(tab);
    expect(tab.defaultPrevented).toBe(false);
  });

  it('focuses the surface when the dialog has no tab stops', () => {
    const dialog = render(`<dialog id="dialog" open tabindex="-1"><p>Text</p></dialog>`);
    trapTabInFrame(dialog);

    focusSentinel(dialog.lastElementChild!, dialog);
    expect(document.activeElement).toBe(dialog);
  });
});

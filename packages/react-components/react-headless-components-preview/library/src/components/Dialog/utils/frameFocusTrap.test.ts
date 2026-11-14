import { isInFrame, wrapFrameDialogTab } from './frameFocusTrap';

const render = (html: string): HTMLDialogElement => {
  document.body.innerHTML = html;
  return document.querySelector<HTMLDialogElement>('#dialog')!;
};

const byId = (id: string) => document.getElementById(id)!;

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

describe('wrapFrameDialogTab', () => {
  afterEach(() => {
    document.body.innerHTML = '';
  });

  it('wraps Tab from the last tab stop to the first', () => {
    const dialog = render(`
      <button id="outside"></button>
      <dialog id="dialog" open tabindex="-1"><button id="a"></button><button id="b"></button></dialog>
    `);
    byId('b').focus();

    expect(wrapFrameDialogTab(dialog, byId('b'), false)).toBe(true);
    expect(document.activeElement).toBe(byId('a'));
  });

  it('wraps Shift+Tab from the first tab stop, or the surface itself, to the last', () => {
    const dialog = render(
      `<dialog id="dialog" open tabindex="-1"><button id="a"></button><button id="b"></button></dialog>`,
    );

    expect(wrapFrameDialogTab(dialog, byId('a'), true)).toBe(true);
    expect(document.activeElement).toBe(byId('b'));

    expect(wrapFrameDialogTab(dialog, dialog, true)).toBe(true);
    expect(document.activeElement).toBe(byId('b'));
  });

  it('leaves Tab to the browser when a later tab stop exists in the dialog', () => {
    const dialog = render(
      `<dialog id="dialog" open tabindex="-1"><button id="a"></button><button id="b"></button></dialog>`,
    );

    expect(wrapFrameDialogTab(dialog, byId('a'), false)).toBe(false);
    expect(wrapFrameDialogTab(dialog, byId('b'), true)).toBe(false);
    expect(wrapFrameDialogTab(dialog, dialog, false)).toBe(false);
  });

  it('wraps from an element that is focusable but not a tab stop', () => {
    const dialog = render(`
      <dialog id="dialog" open tabindex="-1"><button id="a"></button><div id="last" tabindex="-1"></div></dialog>
    `);

    expect(wrapFrameDialogTab(dialog, byId('last'), false)).toBe(true);
    expect(document.activeElement).toBe(byId('a'));
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
      </dialog>
    `);

    expect(wrapFrameDialogTab(dialog, byId('r1'), false)).toBe(true);
    expect(document.activeElement).toBe(byId('a'));

    expect(wrapFrameDialogTab(dialog, byId('a'), true)).toBe(true);
    expect(document.activeElement).toBe(byId('r1'));
  });

  it('focuses the surface when the dialog has no tab stops', () => {
    const dialog = render(`<dialog id="dialog" open tabindex="-1"><p>Text</p></dialog>`);

    expect(wrapFrameDialogTab(dialog, dialog, false)).toBe(true);
    expect(document.activeElement).toBe(dialog);
  });

  it('ignores events from a nested modal dialog and its tab stops', () => {
    const dialog = render(`
      <dialog id="dialog" open tabindex="-1">
        <button id="a"></button>
        <dialog id="inner" open tabindex="-1"><button id="inner-a"></button></dialog>
      </dialog>
    `);
    const inner = byId('inner') as HTMLDialogElement;

    expect(wrapFrameDialogTab(dialog, byId('inner-a'), false)).toBe(false);

    expect(wrapFrameDialogTab(inner, byId('inner-a'), false)).toBe(true);
    expect(document.activeElement).toBe(byId('inner-a'));

    expect(wrapFrameDialogTab(dialog, byId('a'), false)).toBe(true);
    expect(document.activeElement).toBe(byId('a'));
  });
});

import { isEscapeForLayer } from './utils';

describe('isEscapeForLayer', () => {
  const setup = () => {
    document.body.innerHTML = `
      <div popover="manual" id="layer">
        <button id="inside"></button>
        <div popover="auto" id="nested"><button id="in-nested"></button></div>
        <dialog id="nested-dialog"><button id="in-nested-dialog"></button></dialog>
      </div>
      <button id="portaled"></button>
    `;
    return (id: string) => document.getElementById(id)!;
  };

  // `composedPath()` is only filled in while the event is dispatched.
  const isEscapeFrom = (layer: Element, target: Element) => {
    let result: boolean | undefined;
    const listener = (event: Event) => {
      result = isEscapeForLayer(layer, event);
    };
    document.addEventListener('keydown', listener, { capture: true });
    target.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true, composed: true }));
    document.removeEventListener('keydown', listener, { capture: true });
    return result;
  };

  it('is true for Escape from content inside the layer', () => {
    const get = setup();
    expect(isEscapeFrom(get('layer'), get('inside'))).toBe(true);
    expect(isEscapeFrom(get('layer'), get('layer'))).toBe(true);
  });

  it('is false for Escape from a popover or dialog nested inside', () => {
    const get = setup();
    expect(isEscapeFrom(get('layer'), get('in-nested'))).toBe(false);
    expect(isEscapeFrom(get('layer'), get('in-nested-dialog'))).toBe(false);
  });

  it('is true for Escape from content portaled out of the layer', () => {
    const get = setup();
    expect(isEscapeFrom(get('layer'), get('portaled'))).toBe(true);
  });

  it('is false for Escape from a popover nested inside a shadow root in the layer', () => {
    const get = setup();
    const host = document.createElement('span');
    get('layer').append(host);
    const shadowRoot = host.attachShadow({ mode: 'open' });
    shadowRoot.innerHTML = '<div popover="manual"><button id="in-shadow"></button></div>';

    expect(isEscapeFrom(get('layer'), shadowRoot.getElementById('in-shadow')!)).toBe(false);
  });
});

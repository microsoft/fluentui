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

  it('is true for Escape from content inside the layer', () => {
    const get = setup();
    expect(isEscapeForLayer(get('layer'), get('inside'))).toBe(true);
    expect(isEscapeForLayer(get('layer'), get('layer'))).toBe(true);
  });

  it('is false for Escape from a popover or dialog nested inside', () => {
    const get = setup();
    expect(isEscapeForLayer(get('layer'), get('in-nested'))).toBe(false);
    expect(isEscapeForLayer(get('layer'), get('in-nested-dialog'))).toBe(false);
  });

  it('is true for Escape from content portaled out of the layer', () => {
    const get = setup();
    expect(isEscapeForLayer(get('layer'), get('portaled'))).toBe(true);
  });
});

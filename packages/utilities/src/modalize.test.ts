import { modalize } from './modalize';

function getHiddenElements() {
  function walkTree(el: HTMLElement) {
    if (el.getAttribute('aria-hidden') === 'true') {
      hiddenIds.push(el.id);
    }
    Array.from(el.children).forEach(walkTree);
  }

  const hiddenIds: string[] = [];
  walkTree(document.body);
  return hiddenIds;
}

describe('modalize', () => {
  afterEach(() => {
    document.body.innerHTML = '';
  });

  const modalizeId = 'childToModalize';

  it('sets and removes aria-hidden', () => {
    document.body.innerHTML = `
      <div id="root">
        <div id="parentBefore">
          <div id="parentBeforeChild"></div>
        </div>
        <div id="parent">
          <div id="siblingBefore">
            <div id="siblingBeforeChild"></div>
          </div>
          <div id="${modalizeId}">
            <div id="grandchild"></div>
          </div>
          <div id="siblingAfter">
            <div id="siblingAfterChild"></div>
          </div>
        </div>
        <div id="parentAfter">
          <div id="parentAfterChild"></div>
        </div>
      </div>
    `;

    expect(getHiddenElements()).toStrictEqual([]);

    // modalize the target element, verify aria-hidden is correct on all elements
    const child = document.getElementById(modalizeId)!;
    const unmodalize = modalize(child);
    expect(getHiddenElements()).toStrictEqual(['parentBefore', 'siblingBefore', 'siblingAfter', 'parentAfter']);

    // unmodalize, verify aria-hidden is correct on all elements
    unmodalize();
    expect(getHiddenElements()).toStrictEqual([]);
  });

  it('does not remove aria-hidden from initially hidden element when unmodalizing', () => {
    document.body.innerHTML = `
      <div id="root">
        <div id="${modalizeId}"></div>
        <div id="alreadyHidden" aria-hidden="true"></div>
        <div id="siblingAfter"></div>
      </div>
    `;

    expect(getHiddenElements()).toStrictEqual(['alreadyHidden']);

    const child = document.getElementById(modalizeId)!;
    const unmodalize = modalize(child);
    expect(getHiddenElements()).toStrictEqual(['alreadyHidden', 'siblingAfter']);

    unmodalize();
    expect(getHiddenElements()).toStrictEqual(['alreadyHidden']);
  });

  it('handles if there is nothing to hide', () => {
    document.body.innerHTML = `
      <div id="root">
        <div id="${modalizeId}">
          <div id="grandchild"></div>
        </div>
      </div>
    `;

    const child = document.getElementById(modalizeId)!;
    const unmodalize = modalize(child);
    expect(getHiddenElements()).toStrictEqual([]);

    unmodalize();
    expect(getHiddenElements()).toStrictEqual([]);
  });

  it('restores original aria-hidden state (false or unset)', () => {
    document.body.innerHTML = `
      <div id="siblingBefore" aria-hidden="false"></div>
      <div id="${modalizeId}"></div>
      <div id="siblingAfter"></div>
    `;

    const child = document.getElementById(modalizeId)!;
    const unmodalize = modalize(child);
    expect(getHiddenElements()).toStrictEqual(['siblingBefore', 'siblingAfter']);

    unmodalize();
    expect(getHiddenElements()).toStrictEqual([]);
    expect(document.getElementById('siblingBefore')!.getAttribute('aria-hidden')).toBe('false');
    expect(document.getElementById('siblingAfter')!.getAttribute('aria-hidden')).toBeNull();
  });

  it('handles if element is direct child of body', () => {
    document.body.innerHTML = `
      <div id="siblingBefore"></div>
      <div id="${modalizeId}"></div>
      <div id="siblingAfter"></div>
    `;

    const child = document.getElementById(modalizeId)!;
    const unmodalize = modalize(child);
    expect(getHiddenElements()).toStrictEqual(['siblingBefore', 'siblingAfter']);

    unmodalize();
    expect(getHiddenElements()).toStrictEqual([]);
  });

  it('handles text nodes', () => {
    // The text nodes can't be hidden, but at least shouldn't cause exceptions
    document.body.innerHTML = `
      <div id="siblingBefore"></div>
      some text
      <div id="${modalizeId}"></div>
      some other text
      <div id="siblingAfter"></div>
    `;

    const child = document.getElementById(modalizeId)!;
    const unmodalize = modalize(child);
    expect(getHiddenElements()).toStrictEqual(['siblingBefore', 'siblingAfter']);

    unmodalize();
    expect(getHiddenElements()).toStrictEqual([]);
  });

  it('ignores template, script, and style tags', () => {
    document.body.innerHTML = `
      <script></script>
      <style></style>
      <template></template>
      <div id="siblingBefore"></div>
      <div id="${modalizeId}"></div>
      <div id="siblingAfter"></div>
    `;

    const child = document.getElementById(modalizeId)!;
    const unmodalize = modalize(child);
    expect(getHiddenElements()).toStrictEqual(['siblingBefore', 'siblingAfter']);

    unmodalize();
    expect(getHiddenElements()).toStrictEqual([]);
  });
});

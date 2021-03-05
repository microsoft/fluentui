import { modalize } from './modalize';
// import * as React from 'react';
// import * as ReactTestUtils from 'react-dom/test-utils';

describe('modalize', () => {
  it('sets aria-hidden as expected', () => {
    const root = document.createElement('div');
    root.id = 'root';
    root.innerHTML = `
      <div id='siblingBefore'>
        <div id='siblingBeforeChild'></div>
      </div>
      <div id='child'>
        <div id='grandchild'></div>
      </div>
      <div id='alreadyHidden' aria-hidden='true'></div>
      <div id='siblingAfter'>
        <div id='siblingAfterChild'></div>
      </div>
    `;
    document.body.append(root);

    const allDivs = document.querySelectorAll('div');
    const child = document.getElementById('child')!;
    const grandchild = document.getElementById('grandchild')!;
    const alreadyHidden = document.getElementById('alreadyHidden')!;
    const siblingBefore = document.getElementById('siblingBefore')!;
    const siblingBeforeChild = document.getElementById('siblingBeforeChild')!;
    const siblingAfter = document.getElementById('siblingAfter')!;
    const siblingAfterChild = document.getElementById('siblingAfterChild')!;

    allDivs.forEach(div => {
      if (div.id !== 'alreadyHidden') {
        expect(div.getAttribute('aria-hidden')).toBeFalsy();
      }
    });

    // modalize the target element, verify aria-hidden is correct on all elements
    const unmodalize = modalize(document.getElementById('child')!);
    expect(root.getAttribute('aria-hidden')).toBeFalsy();
    expect(child.getAttribute('aria-hidden')).toBeFalsy();
    expect(grandchild.getAttribute('aria-hidden')).toBeFalsy();
    expect(alreadyHidden.getAttribute('aria-hidden')).toBe('true');
    expect(siblingBefore.getAttribute('aria-hidden')).toBe('true');
    expect(siblingAfter.getAttribute('aria-hidden')).toBe('true');
    expect(siblingBeforeChild.getAttribute('aria-hidden')).toBeFalsy();
    expect(siblingAfterChild.getAttribute('aria-hidden')).toBeFalsy();

    // unmodalize, verify aria-hidden is correct on all elements
    unmodalize();
    expect(root.getAttribute('aria-hidden')).toBeFalsy();
    expect(child.getAttribute('aria-hidden')).toBeFalsy();
    expect(grandchild.getAttribute('aria-hidden')).toBeFalsy();
    expect(alreadyHidden.getAttribute('aria-hidden')).toBe('true'); // should be unaffected
    expect(siblingBefore.getAttribute('aria-hidden')).toBe('false');
    expect(siblingAfter.getAttribute('aria-hidden')).toBe('false');
    expect(siblingBeforeChild.getAttribute('aria-hidden')).toBeFalsy();
    expect(siblingAfterChild.getAttribute('aria-hidden')).toBeFalsy();
  });
});

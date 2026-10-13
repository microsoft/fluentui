import { getScrollAncestors } from './geometry';

describe('getScrollAncestors', () => {
  afterEach(() => {
    document.body.innerHTML = '';
  });

  it.each(['absolute', 'fixed'])('ignores overflow outside a %s element containing block', position => {
    const ancestor = document.createElement('div');
    ancestor.style.overflow = 'hidden';
    const element = document.createElement('div');
    element.style.position = position;
    ancestor.appendChild(element);
    document.body.appendChild(ancestor);

    expect(getScrollAncestors(element)).toEqual([]);
  });

  it('includes overflow on a transformed fixed-position containing block', () => {
    const ancestor = document.createElement('div');
    ancestor.style.overflow = 'hidden';
    ancestor.style.transform = 'translateZ(0)';
    const element = document.createElement('div');
    element.style.position = 'fixed';
    ancestor.appendChild(element);
    document.body.appendChild(ancestor);

    expect(getScrollAncestors(element)).toEqual([ancestor]);
  });

  it('ignores non-containing overflow ancestors of a fixed-position parent', () => {
    const ancestor = document.createElement('div');
    ancestor.style.overflow = 'auto';
    const fixed = document.createElement('div');
    fixed.style.position = 'fixed';
    const element = document.createElement('button');
    fixed.appendChild(element);
    ancestor.appendChild(fixed);
    document.body.appendChild(ancestor);

    expect(getScrollAncestors(element)).toEqual([]);
  });

  it('includes nested overflow ancestors of an in-flow element', () => {
    const outer = document.createElement('div');
    outer.style.overflow = 'hidden';
    const inner = document.createElement('div');
    inner.style.overflow = 'auto';
    const element = document.createElement('button');
    inner.appendChild(element);
    outer.appendChild(inner);
    document.body.appendChild(outer);

    expect(getScrollAncestors(element)).toEqual([inner, outer]);
  });
});

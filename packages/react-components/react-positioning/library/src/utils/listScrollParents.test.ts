import { listScrollParents } from './listScrollParents';

describe('listScrollParents', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
  });

  const createScrollParent = () => {
    const el = document.createElement('div');
    el.style.overflow = 'auto';
    return el;
  };

  it('falls back to the owner body for the root, the body and detached nodes', () => {
    const doc = document.implementation.createHTMLDocument();
    for (const node of [doc.documentElement, doc.body, doc.createElement('div')]) {
      expect(listScrollParents(node)).toEqual([doc.body]);
    }
  });

  it('finds scrollable ancestors through non-scrolling wrappers and a shadow root, closest first', () => {
    const outer = document.body.appendChild(createScrollParent());
    const host = outer.appendChild(createScrollParent());
    const wrapper = host.attachShadow({ mode: 'open' }).appendChild(document.createElement('div'));
    const child = wrapper.appendChild(document.createElement('span'));
    expect(listScrollParents(child)).toEqual([host, outer, document.body]);
  });

  it('should return all scroll parents include and up to body', () => {
    const start = document.createElement('div');
    const scrollParent1 = createScrollParent();
    const scrollParent2 = createScrollParent();

    scrollParent1.appendChild(start);
    scrollParent2.appendChild(scrollParent1);
    document.body.append(scrollParent2);

    const scrollParents = listScrollParents(start);

    expect(scrollParents.length).toBe(3);
    expect(scrollParents).toContain(scrollParent1);
    expect(scrollParents).toContain(scrollParent2);
    expect(scrollParents).toContain(document.body);
  });
});

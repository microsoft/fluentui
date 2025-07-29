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

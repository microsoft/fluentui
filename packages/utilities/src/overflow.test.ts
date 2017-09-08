import {
  hasHorizontalOverflow,
  hasVerticalOverflow,
  hasOverflow
} from './overflow';

let { expect } = chai;

describe('overflow', () => {
  let content: HTMLDivElement;
  let element: HTMLDivElement;

  beforeEach(() => {
    content = document.createElement('div');
    content.style.minWidth = '200px';
    content.style.minHeight = '200px';

    element = document.createElement('div');
    element.style.overflow = 'auto';
    element.style.maxWidth = '100px';
    element.style.maxHeight = '100px';
    element.appendChild(content);

    // Add to dom to force layout
    document.body.appendChild(element);
  });

  afterEach(() => {
    element.remove();
  });

  it('detects overflow', () => {
    expect(hasOverflow(element)).to.be.true;

    content.style.minWidth = '50px';
    content.style.minHeight = '50px';

    expect(hasOverflow(element)).to.be.false;
  });

  it('detects horizontal overflow', () => {
    expect(hasHorizontalOverflow(element)).to.be.true;

    content.style.minWidth = '50px';

    expect(hasHorizontalOverflow(element)).to.be.false;
  });

  it('detects vertical overflow', () => {
    expect(hasVerticalOverflow(element)).to.be.true;

    content.style.minHeight = '50px';

    expect(hasVerticalOverflow(element)).to.be.false;
  });
});
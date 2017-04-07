import {
  isElementOverflowing
} from './overflow';

let { expect } = chai;

describe('isElementOverflowing', () => {
  let content: HTMLDivElement;
  let element: HTMLDivElement;

  beforeEach(() => {
    content = document.createElement('div');
    content.style.display = 'inline-block';
    content.style.minWidth = '200px';

    element = document.createElement('div');
    element.style.display = 'inline-block';
    element.style.overflow = 'auto';
    element.style.maxWidth = '100px';
    element.appendChild(content);

    // Add to dom to force layout
    document.body.appendChild(element);
  });

  afterEach(() => {
    element.remove();
  });

  it('can disable/enable scroll', () => {
    expect(isElementOverflowing(element)).to.be.true;

    content.style.minWidth = '50px';

    expect(isElementOverflowing(element)).to.be.false;
  });
});
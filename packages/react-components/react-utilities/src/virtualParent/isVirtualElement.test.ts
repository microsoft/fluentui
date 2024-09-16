import { isVirtualElement } from './isVirtualElement';
import { setVirtualParent } from './setVirtualParent';

describe('isVirtualElement', () => {
  it('should detect virtual element', () => {
    // Arrange
    const child = document.createElement('div');
    const virtualParent = document.createElement('div');

    setVirtualParent(child, virtualParent);

    // Assert
    expect(isVirtualElement(child)).toBe(true);
  });

  it('should detect non-virtual element', () => {
    // Arrange
    const child = document.createElement('div');

    // Assert
    expect(isVirtualElement(child)).toBe(false);
  });
});

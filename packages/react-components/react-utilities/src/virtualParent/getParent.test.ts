import { getParent } from './getParent';
import { setVirtualParent } from './setVirtualParent';

describe('getParent', () => {
  it('should return virtual parent over real parent', () => {
    // Arrange
    const child = document.createElement('div');
    const virtualParent = document.createElement('div');
    const realParent = document.createElement('div');

    realParent.appendChild(child);
    setVirtualParent(child, virtualParent);

    // Assert
    expect(getParent(child)).toBe(virtualParent);
  });

  it('should return parent when there is not virtual parent', () => {
    // Arrange
    const child = document.createElement('div');
    const realParent = document.createElement('div');

    realParent.appendChild(child);

    // Assert
    expect(getParent(child)).toBe(realParent);
  });

  it('should return virtual parent', () => {
    // Arrange
    const child = document.createElement('div');
    const virtualParent = document.createElement('div');

    setVirtualParent(child, virtualParent);

    // Assert
    expect(getParent(child)).toBe(virtualParent);
  });

  it('should skip virtual parent based on options', () => {
    // Arrange
    const child = document.createElement('div');
    const virtualParent = document.createElement('div');
    const realParent = document.createElement('div');

    realParent.appendChild(child);
    setVirtualParent(child, virtualParent);

    // Assert
    expect(getParent(child, { skipVirtual: true })).toBe(realParent);
  });

  it('should return undefined for normal DOM element', () => {
    // Arrange
    const child = document.createElement('div');

    // Assert
    expect(getParent(child)).toBeNull();
  });

  it.each([null, undefined])('should return undefined if virtual parent is %s', parent => {
    // Arrange
    const child = document.createElement('div');
    setVirtualParent(child, parent as unknown as HTMLElement);

    // Assert
    expect(getParent(child)).toBeNull();
  });

  it('should return virtual parent in ShadowDOM', () => {
    // Arrange
    const child = document.createElement('div');
    const virtualParent = document.createElement('div');
    const realParent = document.createElement('div');

    const shadowRoot = realParent.attachShadow({ mode: 'open' });
    shadowRoot.appendChild(child);

    setVirtualParent(child, virtualParent);

    // Assert
    expect(getParent(child)).toBe(virtualParent);
  });

  it('should return parent in ShadowDOM', () => {
    // Arrange
    const child = document.createElement('div');
    const parent = document.createElement('div');

    const shadowRoot = parent.attachShadow({ mode: 'open' });
    shadowRoot.appendChild(child);

    // Assert
    expect(getParent(child)).toBe(parent);
  });
});

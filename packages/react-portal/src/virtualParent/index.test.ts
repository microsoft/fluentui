import { isVirtualElement, getVirtualParent, getParent, setVirtualParent, elementContains } from '.';
import type { VirtualElement } from './types';

const createTestElements = (n: number = 2) => {
  const elements: HTMLElement[] = [];
  for (let i = 0; i < n; i++) {
    elements.push(document.createElement('div'));
  }

  return elements;
};

describe('isVirtualElement', () => {
  it('should detect virtual element', () => {
    // Arrange
    const [child, parent] = createTestElements();
    setVirtualParent(child, parent);

    // Assert
    expect(isVirtualElement(child)).toBe(true);
  });

  it('should detect non-virtual element', () => {
    // Arrange
    const [child] = createTestElements();

    // Assert
    expect(isVirtualElement(child)).toBe(false);
  });
});

describe('setVirtualParent', () => {
  it('should set virtual parent', () => {
    // Arrange
    const [child, parent] = createTestElements();

    // Act
    setVirtualParent(child, parent);

    // Assert
    expect(((child as unknown) as VirtualElement)._virtual.parent).toBe(parent);
  });

  it('should remove virtual parent when parent is undefined', () => {
    // Arrange
    const [child] = createTestElements();

    // Act
    setVirtualParent(child);

    // Assert
    expect(((child as unknown) as VirtualElement)._virtual.parent).toBeUndefined();
  });
});

describe('getVirtualParent', () => {
  it('should return virtual parent', () => {
    // Arrange
    const [child, parent] = createTestElements();
    setVirtualParent(child, parent);

    // Assert
    expect(getVirtualParent(child)).toBe(parent);
  });

  it('should return undefined for normal DOM element', () => {
    // Arrange
    const [child] = createTestElements();

    // Assert
    expect(getVirtualParent(child)).toBeUndefined();
  });

  it.each([null, undefined])('should return undefined if virtual parent is %s', parent => {
    // Arrange
    const [child] = createTestElements();
    setVirtualParent(child, (parent as unknown) as HTMLElement);

    // Assert
    expect(getVirtualParent(child)).toBeUndefined();
  });
});

describe('getParent', () => {
  it('should return virtual parent over real parent', () => {
    // Arrange
    const [child, virtualParent, realParent] = createTestElements(3);
    realParent.appendChild(child);
    setVirtualParent(child, virtualParent);

    // Assert
    expect(getParent(child)).toBe(virtualParent);
  });

  it('should return parent when there is not virtual parent', () => {
    // Arrange
    const [child, parent] = createTestElements(3);
    parent.appendChild(child);

    // Assert
    expect(getParent(child)).toBe(parent);
  });
});

describe('elementContains', () => {
  it('should return true if there is a virtual element in the hierarchy', () => {
    // Arrange
    const [child, virtualParent, realParent] = createTestElements(3);
    realParent.appendChild(child);
    setVirtualParent(realParent, virtualParent);

    // Assert
    expect(elementContains(virtualParent, child)).toBe(true);
  });

  it('should return true if there are only real parents', () => {
    // Arrange
    const [child, realParent1, realParent2] = createTestElements(3);
    realParent1.appendChild(child);
    realParent2.appendChild(realParent1);

    // Assert
    expect(elementContains(realParent1, child)).toBe(true);
  });

  it('should return false if there are no virtual or real hierarchy', () => {
    // Arrange
    const [child, parent, dummyVirtualParent] = createTestElements(3);
    setVirtualParent(child, dummyVirtualParent);

    // Assert
    expect(elementContains(parent, child)).toBe(false);
  });
});

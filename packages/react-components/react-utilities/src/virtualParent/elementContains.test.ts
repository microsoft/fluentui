import { elementContains } from './elementContains';
import { setVirtualParent } from './setVirtualParent';

describe('elementContains', () => {
  it('should return true if there is a virtual element in the hierarchy', () => {
    // Arrange
    const child = document.createElement('div');
    const virtualParent = document.createElement('div');
    const realParent = document.createElement('div');

    realParent.appendChild(child);
    setVirtualParent(realParent, virtualParent);

    // Assert
    expect(elementContains(virtualParent, child)).toBe(true);
    expect(elementContains(realParent, child)).toBe(true);
  });

  it('should return true if there are only real parents', () => {
    // Arrange
    const child = document.createElement('div');
    const realParent1 = document.createElement('div');
    const realParent2 = document.createElement('div');

    realParent1.appendChild(child);
    realParent2.appendChild(realParent1);

    // Assert
    expect(elementContains(realParent1, child)).toBe(true);
  });

  it('should return false if there are no virtual or real hierarchy', () => {
    // Arrange
    const child = document.createElement('div');
    const dummyElement = document.createElement('div');
    const dummyVirtualParent = document.createElement('div');

    setVirtualParent(child, dummyVirtualParent);

    // Assert
    expect(elementContains(dummyElement, child)).toBe(false);
  });

  it('should handle circular references in virtual parents', () => {
    // Test represents a circular reference between `portal` and `container`:
    // - `editor` (parent is `wrapper`)
    // - `wrapper` (parent is `container`)
    // - `container` (virtual parent is `portal`)
    // - `portal` (parent is `wrapper`)
    // - `wrapper` (parent is `container`)
    // - a circular loop 💥
    //
    // See https://github.com/microsoft/fluentui/issues/26288

    // Assert
    const container = document.createElement('div');

    const wrapper = document.createElement('wrapper');
    const editor = document.createElement('input');
    const portal = document.createElement('span');

    const button = document.createElement('button');

    container.appendChild(wrapper);

    wrapper.appendChild(editor);
    wrapper.appendChild(portal);

    // Act
    setVirtualParent(container, portal);

    // Assert
    expect(elementContains(button, editor)).toBeFalsy();
    expect(elementContains(button, portal)).toBeFalsy();
    expect(elementContains(button, wrapper)).toBeFalsy();

    expect(elementContains(container, editor)).toBeTruthy();
    expect(elementContains(container, portal)).toBeTruthy();

    expect(elementContains(wrapper, editor)).toBeTruthy();
    expect(elementContains(wrapper, portal)).toBeTruthy();
  });
});

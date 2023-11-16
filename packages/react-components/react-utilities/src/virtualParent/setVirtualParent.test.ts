import { setVirtualParent } from './setVirtualParent';

describe('setVirtualParent', () => {
  it('should set virtual parent', () => {
    // Arrange
    const child = document.createElement('div');
    const virtualParent = document.createElement('div');

    // Act
    setVirtualParent(child, virtualParent);

    // Assert
    expect(child).toEqual(expect.objectContaining({ _virtual: { parent: virtualParent } }));
  });

  it('should remove virtual parent when parent is undefined', () => {
    // Arrange
    const child = document.createElement('div');

    // Act
    setVirtualParent(child);

    // Assert
    expect(child).toEqual(expect.objectContaining({ _virtual: { parent: undefined } }));
  });
});

import { setAttribute } from './useKeytipRef';

describe('useKeytipRef tests', () => {
  it('setAttribute does not add attribute value multiple times', () => {
    // Arrange
    const element: HTMLElement = document.createElement('div');

    // Act
    setAttribute(element, 'aria-describedby', 'h-f-f', true);
    setAttribute(element, 'aria-describedby', 'h-f-f', true);

    // Assert
    expect(element.getAttribute('aria-describedby')).toEqual('h-f-f');
  });
});

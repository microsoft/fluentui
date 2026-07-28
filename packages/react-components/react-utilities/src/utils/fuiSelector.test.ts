import { fuiSelector } from './fuiSelector';

describe('fuiSelector', () => {
  it('escapes the slash in a group marker', () => {
    expect(fuiSelector('group/fui-button')).toBe('.group\\/fui-button');
  });

  it('escapes the slash in a peer marker', () => {
    expect(fuiSelector('peer/fui-field')).toBe('.peer\\/fui-field');
  });

  it('passes a slash-free identity class through unchanged', () => {
    expect(fuiSelector('fui-FluentProvider')).toBe('.fui-FluentProvider');
  });

  it('produces a selector that actually matches an element carrying the token', () => {
    // Arrange
    const el = document.createElement('div');
    el.className = 'fuicm-button-root-a3f2c1 group/fui-button';
    document.body.appendChild(el);

    // Act
    const found = document.querySelector(fuiSelector('group/fui-button'));

    // Assert
    expect(found).toBe(el);
    expect(el.classList.contains('group/fui-button')).toBe(true);

    document.body.removeChild(el);
  });

  it('guards against the naive concatenation, which is an invalid selector', () => {
    expect(() => document.querySelector('.' + 'group/fui-button')).toThrow();
  });

  it('escapes every slash, not just the first', () => {
    expect(fuiSelector('group/fui-a/b')).toBe('.group\\/fui-a\\/b');
  });
});

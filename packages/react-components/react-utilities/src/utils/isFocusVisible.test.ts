import { isFocusVisible } from './isFocusVisible';

describe('isFocusVisible', () => {
  it('returns whether the element matches :focus-visible', () => {
    const element = document.createElement('button');
    const matches = jest.spyOn(element, 'matches');

    matches.mockReturnValue(true);
    expect(isFocusVisible(element)).toBe(true);

    matches.mockReturnValue(false);
    expect(isFocusVisible(element)).toBe(false);

    expect(matches).toHaveBeenCalledWith(':focus-visible');
  });

  it('returns undefined when :focus-visible is not supported', () => {
    const element = document.createElement('button');
    jest.spyOn(element, 'matches').mockImplementation(() => {
      throw new SyntaxError('unsupported selector');
    });

    expect(isFocusVisible(element)).toBeUndefined();
  });
});

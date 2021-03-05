import { createFontStyles } from './createFontStyles';

describe('createFontStyles tests', () => {
  it('creates the correct font styles for en', () => {
    expect(createFontStyles('en')).toMatchSnapshot();
  });

  it('creates the correct font styles for ar', () => {
    expect(createFontStyles('ar')).toMatchSnapshot();
  });

  it('creates the correct font styles for ja', () => {
    expect(createFontStyles('ja')).toMatchSnapshot();
  });
});

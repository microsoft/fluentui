import { createTheme } from './createTheme';

describe('createTheme', () => {
  it('create default theme', () => {
    expect(createTheme({})).toMatchSnapshot();
  });
});

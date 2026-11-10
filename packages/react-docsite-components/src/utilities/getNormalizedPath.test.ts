import { getDocument } from '@fluentui/react/lib/Utilities';
import { getNormalizedPath } from './getNormalizedPath';

jest.mock('@fluentui/react/lib/Utilities', () => ({
  getDocument: jest.fn(),
}));

describe('getNormalizedPath', () => {
  it.each([
    '#/styles/web/icons',
    '#/styles/web/icons#available-icons',
    '#/styles/web/icons%23available-icons',
    '#/styles/web/icons%23available-icons?min=1',
    '#/Styles/Web/Icons%23available-icons',
  ])('resolves the Icons route from %s', hash => {
    (getDocument as jest.Mock).mockReturnValue({ location: { hash } });

    expect(getNormalizedPath()).toBe('#/styles/web/icons');
  });
});

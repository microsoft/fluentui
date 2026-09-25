import { getListboxPositioning } from './getListboxPositioning';

describe('getListboxPositioning', () => {
  it('matches the stable combobox family positioning defaults', () => {
    expect(getListboxPositioning(undefined)).toEqual({
      position: 'below',
      align: 'start',
      offset: { crossAxis: 0, mainAxis: 2 },
      fallbackPositions: ['above', 'after', 'after-top', 'before', 'before-top'],
      matchTargetSize: 'width',
    });
  });

  it('allows consumer positioning options to override the defaults', () => {
    expect(getListboxPositioning({ position: 'above', align: 'end', matchTargetSize: undefined })).toMatchObject({
      position: 'above',
      align: 'end',
      matchTargetSize: undefined,
    });
  });
});

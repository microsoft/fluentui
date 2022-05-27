import calculateNodeScore from '../calculateNodeScore';

import { FONT_TYPE, STATIC_TYPE, KEYFRAME_TYPE, RULE_TYPE } from '../../../../../fela-utils/src/styleTypes';

describe('Calculating the node score', () => {
  it('should return 0', () => {
    expect(calculateNodeScore({ type: FONT_TYPE }, [])).toEqual(0);
  });
  it('should return 1', () => {
    expect(calculateNodeScore({ type: STATIC_TYPE }, [])).toEqual(1);
  });
  it('should return 2', () => {
    expect(calculateNodeScore({ type: KEYFRAME_TYPE }, [])).toEqual(2);
  });
  it('should return 3', () => {
    expect(calculateNodeScore({ type: RULE_TYPE }, [])).toEqual(3);
  });
  it('should return 4', () => {
    expect(calculateNodeScore({ type: RULE_TYPE, support: true }, [])).toEqual(4);
  });
  it('should return 5', () => {
    expect(
      calculateNodeScore(
        {
          type: RULE_TYPE,
          media: 'min-width: 300px',
        },
        ['min-width: 300px'],
      ),
    ).toEqual(5);
  });
  it('should return 6', () => {
    expect(
      calculateNodeScore(
        {
          type: RULE_TYPE,
          media: 'min-width: 300px',
          support: true,
        },
        ['min-width: 300px'],
      ),
    ).toEqual(6);
  });
  it('should return 9', () => {
    expect(
      calculateNodeScore({ type: RULE_TYPE, media: 'min-width: 500px' }, [
        'min-width: 300px',
        'min-width: 400px',
        'min-width: 500px',
      ]),
    ).toEqual(9);
  });
  it('should return 9999', () => {
    expect(
      calculateNodeScore(
        {
          type: RULE_TYPE,
          media: 'min-width: 500px',
        },
        ['min-width: 300px'],
      ),
    ).toEqual(9999);
  });
});

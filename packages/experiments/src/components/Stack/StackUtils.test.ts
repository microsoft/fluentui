import { getHorizontalAlignment, getVerticalAlignment, parseGap } from './StackUtils';

describe('StackUtils', () => {
  describe('getHorizontalAlignment', () => {
    it('returns start when given left', () => {
      expect(getHorizontalAlignment('left')).toEqual('start');
    });

    it('returns end when given right', () => {
      expect(getHorizontalAlignment('right')).toEqual('end');
    });

    it('returns its argument when given a value other than left and right', () => {
      const args = ['center', 'space-around', 'space-between', 'space-evenly'];
      args.forEach((arg: string) => {
        expect(getHorizontalAlignment(arg)).toEqual(arg);
      });
    });
  });

  describe('getVerticalAlignment', () => {
    it('returns start when given top', () => {
      expect(getVerticalAlignment('top')).toEqual('start');
    });

    it('returns end when given bottom', () => {
      expect(getVerticalAlignment('bottom')).toEqual('end');
    });

    it('returns its argument when given a value other than left and right', () => {
      const args = ['center', 'space-around', 'space-between', 'space-evenly'];
      args.forEach((arg: string) => {
        expect(getVerticalAlignment(arg)).toEqual(arg);
      });
    });
  });

  describe('parseGap', () => {
    it('returns a default value when given undefined', () => {
      expect(parseGap(undefined)).toEqual({ value: 0, unit: 'px' });
    });

    it('returns a value with px when given a number', () => {
      expect(parseGap(10)).toEqual({ value: 10, unit: 'px' });
    });

    it('can parse a string value with px', () => {
      expect(parseGap('32px')).toEqual({ value: 32, unit: 'px' });
    });

    it('can parse a string value with a float', () => {
      expect(parseGap('20.5px')).toEqual({ value: 20.5, unit: 'px' });
    });

    it('can parse a string value with em', () => {
      expect(parseGap('5em')).toEqual({ value: 5, unit: 'em' });
    });

    it('can parse a string value with percentage', () => {
      expect(parseGap('100%')).toEqual({ value: 100, unit: '%' });
    });

    it('can parse a string value with no numerical part', () => {
      expect(parseGap('px')).toEqual({ value: 0, unit: 'px' });
    });

    it('defaults to px with given a value with no units', () => {
      expect(parseGap('16')).toEqual({ value: 16, unit: 'px' });
    });
  });
});

import { getHorizontalAlignment, getVerticalAlignment, parseGap } from './StackUtils';
import { loadTheme, getTheme } from 'office-ui-fabric-react/lib/Styling';

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
    loadTheme({
      spacing: {
        m: '16em'
      }
    });
    const theme = getTheme();

    it('returns a default value when given undefined', () => {
      expect(parseGap(undefined, theme)).toEqual({ value: 0, unit: 'px' });
    });

    it('returns a default value when given am empty string', () => {
      expect(parseGap('', theme)).toEqual({ value: 0, unit: 'px' });
    });

    it('returns a value with px when given a number', () => {
      expect(parseGap(10, theme)).toEqual({ value: 10, unit: 'px' });
    });

    it('can parse a string with px', () => {
      expect(parseGap('32px', theme)).toEqual({ value: 32, unit: 'px' });
    });

    it('can parse a string with a float', () => {
      expect(parseGap('20.5px', theme)).toEqual({ value: 20.5, unit: 'px' });
    });

    it('can parse a string with em', () => {
      expect(parseGap('5em', theme)).toEqual({ value: 5, unit: 'em' });
    });

    it('can parse a string with percentage', () => {
      expect(parseGap('100%', theme)).toEqual({ value: 100, unit: '%' });
    });

    it('can parse a string with no numerical part', () => {
      expect(parseGap('px', theme)).toEqual({ value: 0, unit: 'px' });
    });

    it('defaults to px with given a string with no units', () => {
      expect(parseGap('16', theme)).toEqual({ value: 16, unit: 'px' });
    });

    it('parses the value from the theme when given a spacing key', () => {
      expect(parseGap('m', theme)).toEqual({ value: 16, unit: 'em' });
    });
  });
});

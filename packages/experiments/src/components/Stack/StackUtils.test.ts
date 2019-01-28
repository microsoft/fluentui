import { parseGap, parsePadding } from './StackUtils';
import { loadTheme, getTheme } from 'office-ui-fabric-react/lib/Styling';

describe('StackUtils', () => {
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

  describe('parsePadding', () => {
    loadTheme({
      spacing: {
        s2: '5px',
        s1: '10px',
        m: '15px',
        l1: '20px',
        l2: '25px'
      }
    });
    const theme = getTheme();

    it('returns its argument when given undefined, a number, or an empty string', () => {
      expect(parsePadding(undefined, theme)).toEqual(undefined);
      expect(parsePadding(0, theme)).toEqual(0);
      expect(parsePadding('', theme)).toEqual('');
    });

    it('returns its argument when given a CSS-style padding', () => {
      expect(parsePadding('10px', theme)).toEqual('10px');
      expect(parsePadding('10px 20px', theme)).toEqual('10px 20px');
      expect(parsePadding('10px 20px 30px', theme)).toEqual('10px 20px 30px');
      expect(parsePadding('10px 20px 30px 40px', theme)).toEqual('10px 20px 30px 40px');
    });

    it('converts themed spacing keys to CSS-style paddings', () => {
      expect(parsePadding('s2', theme)).toEqual('5px');
      expect(parsePadding('s1 m', theme)).toEqual('10px 15px');
      expect(parsePadding('m l1 l2', theme)).toEqual('15px 20px 25px');
      expect(parsePadding('s2 s1 m l1', theme)).toEqual('5px 10px 15px 20px');
    });

    it('can mix and match themed and CSS-style paddings', () => {
      expect(parsePadding('s2 10em', theme)).toEqual('5px 10em');
      expect(parsePadding('20% s1', theme)).toEqual('20% 10px');
      expect(parsePadding('m 5vw', theme)).toEqual('15px 5vw');
      expect(parsePadding('l1 10vh l2', theme)).toEqual('20px 10vh 25px');
      expect(parsePadding('20vmin s2 20vmax', theme)).toEqual('20vmin 5px 20vmax');
      expect(parsePadding('m 5em l1 10em', theme)).toEqual('15px 5em 20px 10em');
      expect(parsePadding('1px l2 0px s2', theme)).toEqual('1px 25px 0px 5px');
    });
  });
});

import { truncateLongName, truncateLongTooltip } from './truncateLongContent';

const defaultTestNames = [
  ['', ''],
  ['Regular name', 'Regular name'],
  ['Name which is longer than 30 characters', 'Name which is longer than 3...'],
  ['Name which equal 30 characters', 'Name which equal 30 characters'],
];

describe('truncate method', () => {
  it.each(defaultTestNames)('truncates long name correctly', (name, expected) => {
    expect(truncateLongName(name)).toBe(expected);
  });
  it('truncates name correctly with custom length', () => {
    expect(truncateLongName('Name which is longer than 10 characters', 10)).toEqual('Name wh...');
  });
  it('truncates RTL name correctly with custom length', () => {
    expect(truncateLongName('رحیمی خسرو رحیمی', 10)).toEqual('رحیمی خ...');
  });
  it('returns the same content for regular tooltips', () => {
    expect(truncateLongTooltip('Just a tooltip')).toEqual('Just a tooltip');
  });
  it('truncates long tooltip correctly', () => {
    const longTooltipContent =
      "Super long tooltip which is longer than 80 characters. Don't think about what you want to be, but what you want to do.";
    expect(truncateLongTooltip(longTooltipContent)).toEqual(
      "Super long tooltip which is longer than 80 characters. Don't think about what...",
    );
    expect(truncateLongTooltip(longTooltipContent, 100)).toEqual(
      "Super long tooltip which is longer than 80 characters. Don't think about what you want to be, but...",
    );
  });
  it('truncates long tooltip correctly with custom length', () => {
    const longTooltipContent =
      "Super long tooltip which is longer than 80 characters. Don't think about what you want to be, but what you want to do.";
    expect(truncateLongTooltip(longTooltipContent, 100)).toEqual(
      "Super long tooltip which is longer than 80 characters. Don't think about what you want to be, but...",
    );
  });
});

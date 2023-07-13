import { truncateBreadcrumbLongName, truncateBreadcrumLongTooltip } from './truncateBreadcrumb';

describe('truncate method', () => {
  it('returns empty string when name is empty', () => {
    expect(truncateBreadcrumbLongName('')).toEqual('');
  });
  it('returns the same string when name is less than 30 characters', () => {
    expect(truncateBreadcrumbLongName('Regular name')).toEqual('Regular name');
  });
  it('truncates name correctly when length is longer than 30 characters', () => {
    expect(truncateBreadcrumbLongName('Name which is longer than 30 characters')).toEqual(
      'Name which is longer than 30 c...',
    );
  });
  it('returns the same string when name is equal to 30 characters', () => {
    expect(truncateBreadcrumbLongName('Name which equal 30 characters')).toEqual('Name which equal 30 characters');
  });
  it('truncates name correctly with custom length', () => {
    expect(truncateBreadcrumbLongName('Name which is longer than 10 characters', 10)).toEqual('Name which...');
  });
  it('truncates RTL name correctly with custom length', () => {
    expect(truncateBreadcrumbLongName('رحیمی خسرو رحیمی', 10)).toEqual('رحیمی خسرو...');
  });
  it('returns the same content for regular tooltips', () => {
    expect(truncateBreadcrumLongTooltip('Just a tooltip')).toEqual('Just a tooltip');
  });
  it('truncates long tooltip correctly', () => {
    const longTooltipContent =
      "Super long tooltip which is longer than 80 characters. Don't think about what you want to be, but what you want to do.";
    expect(truncateBreadcrumLongTooltip(longTooltipContent)).toEqual(
      "Super long tooltip which is longer than 80 characters. Don't think about what yo...",
    );
    expect(truncateBreadcrumLongTooltip(longTooltipContent, 100)).toEqual(
      "Super long tooltip which is longer than 80 characters. Don't think about what you want to be, but wh...",
    );
  });
  it('truncates long tooltip correctly with custom length', () => {
    const longTooltipContent =
      "Super long tooltip which is longer than 80 characters. Don't think about what you want to be, but what you want to do.";
    expect(truncateBreadcrumLongTooltip(longTooltipContent, 100)).toEqual(
      "Super long tooltip which is longer than 80 characters. Don't think about what you want to be, but wh...",
    );
  });
});

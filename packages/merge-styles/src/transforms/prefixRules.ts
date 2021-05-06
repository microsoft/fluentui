import { getVendorSettings } from '../getVendorSettings';

const autoPrefixNames: { [key: string]: number } = {
  'user-select': 1,
};

export function prefixRules(rulePairs: (string | number)[], index: number): void {
  const vendorSettings = getVendorSettings();

  const name = rulePairs[index];

  if (autoPrefixNames[name]) {
    const value = rulePairs[index + 1];

    if (autoPrefixNames[name]) {
      if (vendorSettings.isWebkit) {
        rulePairs.push('-webkit-' + name, value);
      }
      if (vendorSettings.isMoz) {
        rulePairs.push('-moz-' + name, value);
      }
      if (vendorSettings.isMs) {
        rulePairs.push('-ms-' + name, value);
      }
      if (vendorSettings.isOpera) {
        rulePairs.push('-o-' + name, value);
      }
    }
  }
}

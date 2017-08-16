import { getVendorSettings } from '../getVendorSettings';

let autoPrefixNames: { [key: string]: number } = {
  'user-select': 1
};

export function prefixRules(
  rulePairs: string[]
): void {
  let vendorSettings = getVendorSettings();

  for (let nameIndex = 0, valueIndex = 1; nameIndex < rulePairs.length; nameIndex += 2, valueIndex += 2) {
    let name = rulePairs[nameIndex];
    let value = rulePairs[valueIndex];

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
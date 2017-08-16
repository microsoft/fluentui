import { IVendorSettings } from '../getVendorSettings';

export function expandQuads(
  rulePairs: string[],
  vendorSettings?: IVendorSettings
): void {
  for (let nameIndex = 0; nameIndex < rulePairs.length; nameIndex += 2) {
    let name = rulePairs[nameIndex];

    switch (name) {
      case 'margin':
      case 'padding':
        let parts = rulePairs[nameIndex + 1].split(' ');

        rulePairs.splice(
          nameIndex,
          2,
          name + 'Top',
          parts[0],
          name + 'Right',
          parts[1] || parts[0],
          name + 'Bottom',
          parts[2] || parts[0],
          name + 'Left',
          parts[3] || parts[1] || parts[0],
        );

        nameIndex += 6;
    }
  }
}

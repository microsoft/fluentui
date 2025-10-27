import { GroupPart } from '../groups.types'; // Adjust the import path as needed

// Group focus tokens
export const focusGroup: GroupPart = {
  variants: ['outer', 'inner'],
  variantProperties: ['stroke', 'strokewidth'],
  exceptions: [
    // onBrand is a special case where the focus stroke color is different
    { variants: ['onbrand'], states: ['', 'hover'], variantStateProperties: ['stroke'] },
  ],
};

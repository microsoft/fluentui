import * as React from 'react';
import { getIntrinsicElementProps, slot } from '@fluentui/react-utilities';
import type { FileTypeIconProps, FileTypeIconState } from './FileTypeIcon.types';
import {
  getFileTypeIconNameFromExtensionOrType,
  getFileTypeIconSuffix,
  DEFAULT_ICON_SIZE,
} from '../../utils/getFileTypeIconProps';
import { FileIconType } from '../../utils/FileIconType';

const DEFAULT_BASE_URL = 'https://res.cdn.office.net/files/fabric-cdn-prod_20251119.001/assets/item-types/';

/**
 * Returns the props and state required to render the FileTypeIcon component.
 */
export const useFileTypeIcon_unstable = (
  props: FileTypeIconProps,
  ref: React.Ref<HTMLImageElement>,
): FileTypeIconState => {
  const {
    extension,
    type,
    size = DEFAULT_ICON_SIZE,
    imageFileType = 'svg',
    baseUrl = DEFAULT_BASE_URL,
  } = props;

  // Get the base icon name and suffix separately using v8 pattern
  const baseIconName = getFileTypeIconNameFromExtensionOrType(extension, type);
  const baseSuffix = getFileTypeIconSuffix(size, imageFileType);
  const suffixArray = baseSuffix.split('_'); // eg: ['96', '3x', 'svg'] or ['96', 'svg']

  // Construct the full icon URL using v8's folder-based pattern
  let iconUrl: string;
  if (suffixArray.length === 3) {
    // suffix is of type 96_3x_svg - it has a pixel ratio > 1
    iconUrl = `${baseUrl}${size}_${suffixArray[1]}/${baseIconName}.${suffixArray[2]}`;
  } else if (suffixArray.length === 2) {
    // suffix is of type 96_svg - it has a pixel ratio of 1
    iconUrl = `${baseUrl}${size}/${baseIconName}.${suffixArray[1]}`;
  } else {
    // Fallback to 1x format for unexpected cases
    iconUrl = `${baseUrl}${size}/${baseIconName}.${imageFileType}`;
  }

  // Generate alt text: use extension if provided, otherwise get the enum name for type
  const altText = extension || (type !== undefined ? FileIconType[type] : '');

  const state: FileTypeIconState = {
    size,
    imageFileType,
    iconUrl,
    components: {
      root: 'img',
    },
    root: slot.always(
      getIntrinsicElementProps('img', {
        ref,
        src: iconUrl,
        alt: `${altText} file icon`,
        ...props,
        // Remove our custom props from being passed to the img element
        extension: undefined,
        type: undefined,
        baseUrl: undefined,
      }),
      { elementType: 'img' },
    ),
  };

  return state;
};

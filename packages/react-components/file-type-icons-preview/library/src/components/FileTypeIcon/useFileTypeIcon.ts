import * as React from 'react';
import { getIntrinsicElementProps, slot } from '@fluentui/react-utilities';
import type { FileTypeIconProps, FileTypeIconState } from './FileTypeIcon.types';
import { getFileTypeIconProps, DEFAULT_ICON_SIZE } from '../../utils/getFileTypeIconProps';

const DEFAULT_BASE_URL = 'https://res-1.cdn.office.net/files/fabric-cdn-prod_20251119.001/assets/item-types/';

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

  // Get the icon name using the utility function
  const iconProps = getFileTypeIconProps({
    extension,
    type,
    size,
    imageFileType,
  });

  // Construct the full icon URL
  const iconUrl = `${baseUrl}${iconProps.iconName}.${imageFileType}`;

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
        alt: iconProps['aria-label'] || 'File type icon',
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

import * as React from 'react';
import { getIntrinsicElementProps, slot } from '@fluentui/react-utilities';
import { resolveFileTypeIconUrl } from '../../fileTypeIconUrl';
import { DEFAULT_ICON_SIZE } from '../../getFileTypeIconProps';
import type { FileTypeIconProps, FileTypeIconState } from './FileTypeIcon.types';

/**
 * Given user props, returns state and render function for a FileTypeIcon.
 */
export const useFileTypeIcon_unstable = (
  props: FileTypeIconProps,
  ref: React.Ref<HTMLImageElement>,
): FileTypeIconState => {
  const {
    baseUrl,
    extension,
    type,
    size = DEFAULT_ICON_SIZE,
    imageFileType = 'svg',
    'aria-label': ariaLabel,
    ...rootProps
  } = props;

  const {
    src,
    iconName,
    ariaLabel: resolvedAriaLabel,
  } = resolveFileTypeIconUrl({ extension, type, size, imageFileType }, baseUrl);

  return {
    size,
    imageFileType,
    baseUrl,
    iconName,
    src,
    extension,
    type,
    components: {
      root: 'img',
    },
    root: slot.always(
      getIntrinsicElementProps('img', {
        ref,
        width: size,
        height: size,
        ...rootProps,
        src,
        'aria-label': ariaLabel ?? resolvedAriaLabel,
        'data-icon-name': iconName,
      }),
      { elementType: 'img' },
    ),
  };
};

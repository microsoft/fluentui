import * as React from 'react';
import { getIntrinsicElementProps, slot } from '@fluentui/react-utilities';
import { getFileTypeIconAsUrl } from '../../getFileTypeIconAsUrl';
import { DEFAULT_ICON_SIZE, getFileTypeIconProps } from '../../getFileTypeIconProps';
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

  const options = { extension, type, size, imageFileType };
  const iconProps = getFileTypeIconProps(options);
  const src = getFileTypeIconAsUrl(options, baseUrl);

  const state: FileTypeIconState = {
    size,
    imageFileType,
    baseUrl,
    iconName: iconProps.iconName,
    src,
    extension,
    type,
    components: {
      root: 'img',
    },
    root: slot.always(
      getIntrinsicElementProps('img', {
        ref,
        ...rootProps,
        src,
        'aria-label': ariaLabel ?? iconProps['aria-label'],
        'data-icon-name': iconProps.iconName,
      }),
      { elementType: 'img' },
    ),
  };

  if (state.root.width === undefined) {
    state.root.width = size;
  }

  if (state.root.height === undefined) {
    state.root.height = size;
  }

  return state;
};

import * as React from 'react';
import { registerIcons, FLUENT_CDN_BASE_URL } from '@fluentui/style-utilities';
import type { IIconOptions } from '@fluentui/style-utilities';

const ASSET_CDN_BASE_URL = `${FLUENT_CDN_BASE_URL}/office-ui-fabric-react-assets/foldericons`;

export function initializeFolderCovers(baseUrl: string = ASSET_CDN_BASE_URL, options?: Partial<IIconOptions>): void {
  registerIcons(
    {
      fontFace: {},
      style: {
        width: 118,
        height: 86,
        overflow: 'hidden',
      },
      icons: {
        folderCoverLargeDefaultFront: <img src={`${baseUrl}/lg-fg.svg`} />,
        folderCoverLargeDefaultBack: <img src={`${baseUrl}/lg-bg.svg`} />,
        folderCoverLargeLinkedFront: <img src={`${baseUrl}/lg-fg-linked.svg`} />,
        folderCoverLargeLinkedBack: <img src={`${baseUrl}/lg-bg.svg`} />,
        folderCoverLargeMediaFront: <img src={`${baseUrl}/lg-fg-media.svg`} />,
        folderCoverLargeMediaBack: <img src={`${baseUrl}/lg-bg.svg`} />,
      },
    },
    options,
  );

  registerIcons(
    {
      fontFace: {},
      style: {
        width: 78,
        height: 58,
        overflow: 'hidden',
      },
      icons: {
        folderCoverSmallDefaultFront: <img src={`${baseUrl}/sm-fg.svg`} />,
        folderCoverSmallDefaultBack: <img src={`${baseUrl}/sm-bg.svg`} />,
        folderCoverSmallLinkedFront: <img src={`${baseUrl}/sm-fg-linked.svg`} />,
        folderCoverSmallLinkedBack: <img src={`${baseUrl}/sm-bg.svg`} />,
        folderCoverSmallMediaFront: <img src={`${baseUrl}/sm-fg-media.svg`} />,
        folderCoverSmallMediaBack: <img src={`${baseUrl}/sm-bg.svg`} />,
      },
    },
    options,
  );
}

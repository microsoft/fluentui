import * as React from 'react';
import { registerIcons, IIconOptions } from '@uifabric/styling';

const ASSET_CDN_BASE_URL = 'https://static2.sharepointonline.com/files/fabric/office-ui-fabric-react-assets/foldericons';

export function initializeFolderCovers(baseUrl: string = ASSET_CDN_BASE_URL, options?: Partial<IIconOptions>): void {
  registerIcons(
    {
      fontFace: {},
      style: {
        width: 118,
        height: 86,
        overflow: 'hidden'
      },
      icons: {
        folderCoverLargeDefaultFront: <img src={`${baseUrl}/lg-fg.svg`} />,
        folderCoverLargeDefaultBack: <img src={`${baseUrl}/lg-bg.svg`} />,
        folderCoverLargeMediaFront: <img src={`${baseUrl}/lg-fg-media.svg`} />,
        folderCoverLargeMediaBack: <img src={`${baseUrl}/lg-bg.svg`} />
      }
    },
    options
  );

  registerIcons(
    {
      fontFace: {},
      style: {
        width: 78,
        height: 58,
        overflow: 'hidden'
      },
      icons: {
        folderCoverSmallDefaultFront: <img src={`${baseUrl}/sm-fg.svg`} />,
        folderCoverSmallDefaultBack: <img src={`${baseUrl}/sm-bg.svg`} />,
        folderCoverSmallMediaFront: <img src={`${baseUrl}/sm-fg-media.svg`} />,
        folderCoverSmallMediaBack: <img src={`${baseUrl}/sm-bg.svg`} />
      }
    },
    options
  );
}

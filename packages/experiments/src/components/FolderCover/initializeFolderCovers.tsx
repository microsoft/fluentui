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
        folderCoverLargeDefaultFront: <img src={`${baseUrl}/folder-large_frontplate_nopreview.svg`} />,
        folderCoverLargeDefaultBack: <img src={`${baseUrl}/folder-large_backplate.svg`} />,
        folderCoverLargeMediaFront: <img src={`${baseUrl}/folder-large_frontplate_thumbnail.svg`} />,
        folderCoverLargeMediaBack: <img src={`${baseUrl}/folder-large_backplate.svg`} />
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
        // Yes, it's mis-named.
        folderCoverSmallDefaultFront: <img src={`${baseUrl}/folder-small_frontplate_thumbnail.svg`} />,
        folderCoverSmallDefaultBack: <img src={`${baseUrl}/folder-small_backplate.svg`} />,
        // Yes, it's mis-named.
        folderCoverSmallMediaFront: <img src={`${baseUrl}/folder-small_frontplate_nopreview.svg`} />,
        folderCoverSmallMediaBack: <img src={`${baseUrl}/folder-small_backplate.svg`} />
      }
    },
    options
  );
}

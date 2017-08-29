
import * as React from 'react';
import { IFolderCoverProps, FolderCoverSize, FolderCoverType } from './FolderCover.Props';
import { css } from 'office-ui-fabric-react/lib/Utilities';
import * as FolderCoverStylesModule from './FolderCover.scss';

// tslint:disable-next-line:no-any
const FolderCoverStyles = FolderCoverStylesModule as any;

export interface IFolderCoverState {
  // TODO Add animation support for drag/drop events.
}

const ASSET_CDN_BASE_URL = 'https://static2.sharepointonline.com/files/fabric/office-ui-fabric-react-assets';

const ASSETS: {
  [P in FolderCoverSize]: {
    [T in FolderCoverType]: {
      back: string;
      front: string;
    };
  };
} = {
    small: {
      default: {
        back: `${ASSET_CDN_BASE_URL}/foldericons/s-ldefaultback.png`,
        front: `${ASSET_CDN_BASE_URL}/foldericons/s-ldefaultfront.png`
      },
      media: {
        back: `${ASSET_CDN_BASE_URL}/foldericons/s-lphotoback.png`,
        front: `${ASSET_CDN_BASE_URL}/foldericons/s-lphotosfront.png`
      }
    },
    large: {
      default: {
        back: `${ASSET_CDN_BASE_URL}/foldericons/xxxxl-xldefaultback.png`,
        front: `${ASSET_CDN_BASE_URL}/foldericons/xxxxl-xldefaultfront.png`
      },
      media: {
        back: `${ASSET_CDN_BASE_URL}/foldericons/xxxxl-xlphotoback.png`,
        front: `${ASSET_CDN_BASE_URL}/foldericons/xxxxl-xlphotofront.png`
      }
    }
  };

export class FolderCover extends React.Component<IFolderCoverProps, IFolderCoverState> {
  public render(): JSX.Element | null {
    const {
      folderCoverSize: size = 'large',
      folderCoverType: type = 'default'
    } = this.props;

    const assets = ASSETS[size][type];

    return (
      <div
        className={ css(FolderCoverStyles.root, {
          [FolderCoverStyles.isSmall]: size === 'small',
          [FolderCoverStyles.isLarge]: size === 'large',
          [FolderCoverStyles.isDefault]: type === 'default',
          [FolderCoverStyles.isMedia]: type === 'media'
        }) }
      >
        <img
          className={ css(FolderCoverStyles.back) }
          src={ assets.back }
        />
        <span className={ css(FolderCoverStyles.content) }>
          { this.props.children }
        </span>
        <img
          className={ css(FolderCoverStyles.front) }
          src={ assets.front }
        />
        {
          this.props.metadata ?
            (
              <span className={ css(FolderCoverStyles.metadata) }>
                { this.props.metadata }
              </span>
            ) :
            null
        }
      </div>
    );
  }
}

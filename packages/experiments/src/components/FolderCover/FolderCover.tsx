
import * as React from 'react';
import { IFolderCoverProps, FolderCoverSize, FolderCoverType } from './FolderCover.Props';
import { css } from 'office-ui-fabric-react/lib/Utilities';
import { ISize } from '@uifabric/utilities';
import * as FolderCoverStylesModule from './FolderCover.scss';
import * as SignalStylesModule from '../signals/Signals.scss';

// tslint:disable-next-line:no-any
const FolderCoverStyles = FolderCoverStylesModule as any;
// tslint:disable-next-line:no-any
const SignalStyles = SignalStylesModule as any;

export interface IFolderCoverState {
  // TODO Add animation support for drag/drop events.
}

const enum FolderCoverLayoutValues {
  smallWidth = 72,
  smallHeight = 52,
  largeWidth = 112,
  largeHeight = 80,
  contentPadding = 4
}

const ASSET_CDN_BASE_URL = 'https://static2.sharepointonline.com/files/fabric/office-ui-fabric-react-assets';

const SIZES: {
  [P in FolderCoverSize]: ISize;
} = {
    small: {
      width: FolderCoverLayoutValues.smallWidth - FolderCoverLayoutValues.contentPadding * 2,
      height: FolderCoverLayoutValues.smallHeight - FolderCoverLayoutValues.contentPadding * 2
    },
    large: {
      width: FolderCoverLayoutValues.largeWidth - FolderCoverLayoutValues.contentPadding * 2,
      height: FolderCoverLayoutValues.largeHeight - FolderCoverLayoutValues.contentPadding * 2
    }
  };

const ASSETS: {
  [P in FolderCoverSize]: {
    [T in FolderCoverType]: {
      shadow: string;
      back: string;
      front: string;
    };
  };
} = {
    small: {
      default: {
        shadow: `${ASSET_CDN_BASE_URL}/foldericons/72x52_shadow_empty.png`,
        back: `${ASSET_CDN_BASE_URL}/foldericons/s-ldefaultback.png`,
        front: `${ASSET_CDN_BASE_URL}/foldericons/s-ldefaultfront.png`
      },
      media: {
        shadow: `${ASSET_CDN_BASE_URL}/foldericons/72x52_shadow_empty.png`,
        back: `${ASSET_CDN_BASE_URL}/foldericons/s-lphotoback.png`,
        front: `${ASSET_CDN_BASE_URL}/foldericons/s-lphotosfront.png`
      }
    },
    large: {
      default: {
        shadow: `${ASSET_CDN_BASE_URL}/foldericons/112x80_shadow_empty.png`,
        back: `${ASSET_CDN_BASE_URL}/foldericons/xxxxl-xldefaultback.png`,
        front: `${ASSET_CDN_BASE_URL}/foldericons/xxxxl-xldefaultfront.png`
      },
      media: {
        shadow: `${ASSET_CDN_BASE_URL}/foldericons/112x80_shadow_empty.png`,
        back: `${ASSET_CDN_BASE_URL}/foldericons/xxxxl-xlphotoback.png`,
        front: `${ASSET_CDN_BASE_URL}/foldericons/xxxxl-xlphotofront.png`
      }
    }
  };

export class FolderCover extends React.Component<IFolderCoverProps, IFolderCoverState> {
  public render(): JSX.Element | null {
    const {
      folderCoverSize: size = 'large',
      folderCoverType: type = 'default',
      hideContent = false
    } = this.props;

    const assets = ASSETS[size][type];

    return (
      <div
        className={ css(FolderCoverStyles.root, {
          [`ms-FolderCover--isSmall ${FolderCoverStyles.isSmall}`]: size === 'small',
          [`ms-FolderCover--isLarge ${FolderCoverStyles.isLarge}`]: size === 'large',
          [`ms-FolderCover--isDefault ${FolderCoverStyles.isDefault}`]: type === 'default',
          [`ms-FolderCover--isMedia ${FolderCoverStyles.isMedia}`]: type === 'media',
          [`ms-FolderCover--hideContent ${FolderCoverStyles.hideContent}`]: hideContent
        }) }
      >
        <img
          className={ css('ms-FolderCover-shadow', FolderCoverStyles.shadow) }
          src={ assets.shadow }
        />
        <img
          className={ css('ms-FolderCover-back', FolderCoverStyles.back) }
          src={ assets.back }
        />
        {
          this.props.children ? (
            <span className={ css('ms-FolderCover-content', FolderCoverStyles.content) }>
              <span className={ css('ms-FolderCover-frame', FolderCoverStyles.frame) }>
                { this.props.children }
              </span>
            </span>
          ) : null
        }
        <img
          className={ css('ms-FolderCover-front', FolderCoverStyles.front) }
          src={ assets.front }
        />
        {
          this.props.signal ?
            (
              <span className={ css('ms-FolderCover-signal', FolderCoverStyles.signal, SignalStyles.dark) }>
                { this.props.signal }
              </span>
            ) :
            null
        }
        {
          this.props.metadata ?
            (
              <span className={ css('ms-FolderCover-metadata', FolderCoverStyles.metadata) }>
                { this.props.metadata }
              </span>
            ) :
            null
        }
      </div>
    );
  }
}

export interface IFolderCoverLayout {
  contentSize: ISize;
}

export function getFolderCoverLayout(element: JSX.Element): IFolderCoverLayout {
  const folderCoverProps: IFolderCoverProps = element.props;

  const {
    folderCoverSize = 'large'
  } = folderCoverProps;

  return {
    contentSize: SIZES[folderCoverSize]
  };
}

export function renderFolderCoverWithLayout(element: JSX.Element, props: Partial<IFolderCoverProps>): JSX.Element {
  const Tag = element.type;

  return (
    <Tag
      { ...element.props }
      { ...props }
    />
  );
}

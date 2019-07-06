import * as React from 'react';
import { IFolderCoverProps, FolderCoverSize, FolderCoverType } from './FolderCover.types';
import { ISize, css } from '../../Utilities';
import * as FolderCoverStylesModule from './FolderCover.scss';
import * as SignalStylesModule from '../signals/Signal.scss';
import { Icon } from 'office-ui-fabric-react/lib/Icon';

// tslint:disable-next-line:no-any
const FolderCoverStyles = FolderCoverStylesModule as any;
// tslint:disable-next-line:no-any
const SignalStyles = SignalStylesModule as any;

export interface IFolderCoverState {
  // TODO Add animation support for drag/drop events.
}

const FolderCoverLayoutValues = {
  smallWidth: 72 as 72,
  smallHeight: 52 as 52,
  largeWidth: 112 as 112,
  largeHeight: 80 as 80,
  contentPadding: 4 as 4
};

const SIZES: { [P in FolderCoverSize]: ISize } = {
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
      back: string;
      front: string;
    }
  }
} = {
  small: {
    default: {
      back: `folderCoverSmallDefaultBack`,
      front: `folderCoverSmallDefaultFront`
    },
    media: {
      back: `folderCoverSmallMediaBack`,
      front: `folderCoverSmallMediaFront`
    }
  },
  large: {
    default: {
      back: `folderCoverLargeDefaultBack`,
      front: `folderCoverLargeDefaultFront`
    },
    media: {
      back: `folderCoverLargeMediaBack`,
      front: `folderCoverLargeMediaFront`
    }
  }
};

export class FolderCover extends React.Component<IFolderCoverProps, IFolderCoverState> {
  public render(): JSX.Element | null {
    const {
      folderCoverSize: size = 'large',
      folderCoverType: type = 'default',
      hideContent = false,
      metadata,
      signal,
      children,
      isFluent,
      ...divProps
    } = this.props;

    const assets = ASSETS[size][type];
    const metadataIcon = <span className={css('ms-FolderCover-metadata', FolderCoverStyles.metadata)}>{metadata}</span>;

    const signalIcon = (
      <span className={css('ms-FolderCover-signal', FolderCoverStyles.signal, isFluent ? SignalStyles.isFluent : SignalStyles.dark)}>
        {signal}
      </span>
    );
    return (
      <div
        {...divProps}
        className={css(FolderCoverStyles.root, {
          [`ms-FolderCover--isSmall ${FolderCoverStyles.isSmall}`]: size === 'small',
          [`ms-FolderCover--isLarge ${FolderCoverStyles.isLarge}`]: size === 'large',
          [`ms-FolderCover--isDefault ${FolderCoverStyles.isDefault}`]: type === 'default',
          [`ms-FolderCover--isMedia ${FolderCoverStyles.isMedia}`]: type === 'media',
          [`ms-FolderCover--hideContent ${FolderCoverStyles.hideContent}`]: hideContent,
          [`ms-FolderCover--isFluent ${FolderCoverStyles.isFluent}`]: isFluent
        })}
      >
        <Icon aria-hidden={true} className={css('ms-FolderCover-back', FolderCoverStyles.back)} iconName={assets.back} />
        {this._renderChildren({ children })}
        <Icon aria-hidden={true} className={css('ms-FolderCover-front', FolderCoverStyles.front)} iconName={assets.front} />
        {isFluent ? (
          <React.Fragment>
            {metadataIcon}
            {signalIcon}
          </React.Fragment>
        ) : (
          <React.Fragment>
            {signalIcon}
            {metadataIcon}
          </React.Fragment>
        )}
      </div>
    );
  }

  private _renderChildren({ children }: Pick<IFolderCoverProps, 'children'>): JSX.Element | null {
    const finalChildren = typeof children === 'function' ? children(getFolderCoverLayoutFromProps(this.props)) : children;

    return finalChildren ? (
      <span className={css('ms-FolderCover-content', FolderCoverStyles.content)}>
        <span className={css('ms-FolderCover-frame', FolderCoverStyles.frame)}>{finalChildren}</span>
      </span>
    ) : null;
  }
}

export interface IFolderCoverLayout {
  contentSize: ISize;
}

export function getFolderCoverLayout(element: JSX.Element): IFolderCoverLayout {
  const folderCoverProps: IFolderCoverProps = element.props;

  return getFolderCoverLayoutFromProps(folderCoverProps);
}

function getFolderCoverLayoutFromProps(folderCoverProps: IFolderCoverProps): IFolderCoverLayout {
  const { folderCoverSize = 'large', isFluent } = folderCoverProps;

  const contentSize = { ...SIZES[folderCoverSize] };

  if (isFluent) {
    contentSize.height -= 8;
  }

  return {
    contentSize
  };
}

export function renderFolderCoverWithLayout(element: JSX.Element, props: Partial<IFolderCoverProps>): JSX.Element {
  const Tag = element.type;

  return <Tag {...element.props} {...props} />;
}

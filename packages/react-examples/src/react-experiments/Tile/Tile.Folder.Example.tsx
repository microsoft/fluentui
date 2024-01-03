import * as React from 'react';
import { Checkbox } from '@fluentui/react/lib/Checkbox';
import { SignalField, NewSignal, CommentsSignal, SharedSignal, Tile } from '@fluentui/react-experiments';
import {
  FolderCover,
  getFolderCoverLayout,
  renderFolderCoverWithLayout,
  FolderCoverType,
} from '@fluentui/react-experiments/lib/FolderCover';
import { lorem } from '@fluentui/example-data';
import { css, ISize, fitContentToBounds } from '@fluentui/react-experiments/lib/Utilities';
import * as TileExampleStylesModule from './Tile.Example.scss';

const TileExampleStyles = TileExampleStylesModule as any;

const ITEMS: { name: string; activity: string; isShared?: boolean; childCount?: number }[] = [
  {
    name: lorem(2),
    activity: lorem(6),
    childCount: 4,
  },
  {
    name: lorem(2),
    activity: lorem(6),
  },
  {
    name: lorem(2),
    activity: lorem(6),
    isShared: true,
    childCount: 4,
  },
  {
    name: lorem(2),
    activity: lorem(6),
    childCount: 4,
  },
  {
    name: lorem(2),
    activity: lorem(6),
    childCount: 4,
  },
];

interface IFolderTileWithThumbnailProps {
  folderCoverType?: FolderCoverType;
  originalImageSize?: ISize;
  size: 'small' | 'large';
  item: (typeof ITEMS)[0];
}

const FolderTileWithThumbnail: React.FunctionComponent<IFolderTileWithThumbnailProps> = (
  props: IFolderTileWithThumbnailProps,
): JSX.Element => {
  const folderCover = (
    <FolderCover
      folderCoverSize={props.size}
      folderCoverType={props.folderCoverType}
      metadata={props.item.childCount}
      signal={props.item.isShared ? <SharedSignal /> : null}
    />
  );

  const { contentSize } = getFolderCoverLayout(folderCover);

  const imageSize = props.originalImageSize
    ? fitContentToBounds({
        contentSize: props.originalImageSize,
        boundsSize: contentSize,
        mode: 'contain',
      })
    : undefined;

  return (
    <div
      className={css(TileExampleStyles.tile, {
        [TileExampleStyles.largeTile]: props.size === 'large',
        [TileExampleStyles.smallTile]: props.size === 'small',
      })}
    >
      <Tile
        tileSize={props.size}
        itemName={<SignalField before={<NewSignal />}>{props.item.name}</SignalField>}
        itemActivity={<SignalField before={<CommentsSignal>{'12'}</CommentsSignal>}>{props.item.activity}</SignalField>}
        foreground={
          <span className={css(TileExampleStylesModule.tileFolder)}>
            {renderFolderCoverWithLayout(folderCover, {
              children: imageSize ? (
                <img
                  src="https://res.cdn.office.net/files/fabric-cdn-prod_20230815.002/office-ui-fabric-react-assets/fluent-placeholder.svgs"
                  className={css(TileExampleStyles.tileImage)}
                  height={Math.round(imageSize.height)}
                  width={Math.round(imageSize.width)}
                />
              ) : null,
            })}
          </span>
        }
      />
    </div>
  );
};

export interface ITileFolderExampleState {
  size: 'small' | 'large';
}

export class TileFolderExample extends React.Component<{}, ITileFolderExampleState> {
  constructor(props: {}) {
    super(props);

    this.state = {
      size: 'large',
    };
  }

  public render(): JSX.Element {
    const { size } = this.state;

    return (
      <div>
        <Checkbox label="Use large tiles" checked={size === 'large'} onChange={this._onIsLargeChanged} />
        <h3>Folder</h3>
        <FolderTileWithThumbnail
          originalImageSize={{
            width: 400,
            height: 300,
          }}
          item={ITEMS[0]}
          size={size}
        />
        <FolderTileWithThumbnail item={ITEMS[1]} folderCoverType="media" size={size} />
        <FolderTileWithThumbnail
          originalImageSize={{
            width: 300,
            height: 400,
          }}
          item={ITEMS[2]}
          folderCoverType="media"
          size={size}
        />
        <FolderTileWithThumbnail
          originalImageSize={{
            width: 40,
            height: 40,
          }}
          item={ITEMS[3]}
          folderCoverType="media"
          size={size}
        />
        <FolderTileWithThumbnail
          originalImageSize={{
            width: 16,
            height: 16,
          }}
          item={ITEMS[4]}
          folderCoverType="media"
          size={size}
        />
      </div>
    );
  }

  private _onIsLargeChanged = (event: React.FormEvent<HTMLInputElement>, checked: boolean): void => {
    this.setState({
      size: checked ? 'large' : 'small',
    });
  };
}

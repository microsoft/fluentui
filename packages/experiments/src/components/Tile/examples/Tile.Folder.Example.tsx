
import * as React from 'react';
import { Tile } from '../Tile';
import { css, autobind } from 'office-ui-fabric-react/lib/Utilities';
import { Checkbox } from 'office-ui-fabric-react/lib/Checkbox';
import {
  SignalField,
  NewSignal,
  CommentsSignal
} from '../../signals/Signals';
import { FolderCover, getFolderCoverLayout, renderFolderCoverWithLayout } from '../../FolderCover/FolderCover';
import { FolderCoverType } from '../../FolderCover/FolderCover.Props';
import { lorem } from '@uifabric/example-app-base';
import { ISize, fitContentToBounds } from '@uifabric/utilities';
import * as TileExampleStylesModule from './Tile.Example.scss';

// tslint:disable-next-line:no-any
const TileExampleStyles = TileExampleStylesModule as any;

const ITEMS: { name: string; activity: string; }[] = [
  {
    name: lorem(2),
    activity: lorem(6),
  },
  {
    name: lorem(2),
    activity: lorem(6),
  },
  {
    name: lorem(2),
    activity: lorem(6),
  }
];

interface IFolderTileWithThumbnailProps {
  folderCoverType?: FolderCoverType;
  originalImageSize: ISize;
  size: 'small' | 'large';
  item: typeof ITEMS[0];
}

const FolderTileWithThumbnail: React.StatelessComponent<IFolderTileWithThumbnailProps> =
  (props: IFolderTileWithThumbnailProps): JSX.Element => {
    const folderCover = (
      <FolderCover
        folderCoverSize={ props.size }
        folderCoverType={ props.folderCoverType }
      />
    );

    const {
      contentSize
    } = getFolderCoverLayout(folderCover);

    const imageSize = fitContentToBounds({
      contentSize: props.originalImageSize,
      boundsSize: contentSize,
      mode: 'contain'
    });

    return (
      <div
        className={ css(TileExampleStyles.tile, {
          [TileExampleStyles.largeTile]: props.size === 'large',
          [TileExampleStyles.smallTile]: props.size === 'small'
        }) }
      >
        <Tile
          tileSize={ props.size }
          itemName={
            <SignalField
              before={
                <NewSignal />
              }
            >
              { props.item.name }
            </SignalField>
          }
          itemActivity={
            <SignalField
              before={
                <CommentsSignal>{ '12' }</CommentsSignal>
              }
            >
              { props.item.activity }
            </SignalField>
          }
          foreground={
            renderFolderCoverWithLayout(folderCover, {
              children: (
                <img
                  src={ `//placehold.it/${Math.round(imageSize.width)}x${Math.round(imageSize.height)}` }
                  className={ css(TileExampleStyles.tileImage) }
                />
              )
            })
          }
        />
      </div>
    );
  };

export interface ITileFolderExampleState {
  size: 'small' | 'large';
}

export class TileFolderExample extends React.Component<{}, ITileFolderExampleState> {
  constructor() {
    super();

    this.state = {
      size: 'large'
    };
  }

  public render(): JSX.Element {
    const {
      size
    } = this.state;

    return (
      <div>
        <Checkbox
          label='Use large tiles'
          checked={ size === 'large' }
          onChange={ this._onIsLargeChanged }
        />
        <h3>Folder</h3>
        <FolderTileWithThumbnail
          originalImageSize={
            {
              width: 400,
              height: 300
            }
          }
          item={ ITEMS[0] }
          size={ size }
        />
        <FolderTileWithThumbnail
          originalImageSize={
            {
              width: 300,
              height: 400
            }
          }
          item={ ITEMS[1] }
          folderCoverType='media'
          size={ size }
        />
        <FolderTileWithThumbnail
          originalImageSize={
            {
              width: 40,
              height: 40
            }
          }
          item={ ITEMS[2] }
          folderCoverType='media'
          size={ size }
        />
      </div>
    );
  }

  @autobind
  private _onIsLargeChanged(event: React.FormEvent<HTMLInputElement>, checked: boolean): void {
    this.setState({
      size: checked ? 'large' : 'small'
    });
  }
}

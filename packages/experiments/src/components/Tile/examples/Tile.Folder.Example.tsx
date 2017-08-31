
import * as React from 'react';
import { Tile } from '../Tile';
import { css } from 'office-ui-fabric-react/lib/Utilities';
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

interface IFolderTileWithThumbnailProps {
  folderCoverType?: FolderCoverType;
  originalImageSize: ISize;
}

const FolderTileWithThumbnail: React.StatelessComponent<IFolderTileWithThumbnailProps> =
  (props: IFolderTileWithThumbnailProps): JSX.Element => {
    const folderCover = (
      <FolderCover
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
      <div className={ css(TileExampleStyles.tile, TileExampleStyles.squareTile) }>
        <Tile
          itemName={
            <SignalField
              before={
                <NewSignal />
              }
            >
              { lorem(2) }
            </SignalField>
          }
          itemActivity={
            <SignalField
              before={
                <CommentsSignal>{ '12' }</CommentsSignal>
              }
            >
              { lorem(2) }
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

export class TileFolderExample extends React.Component<{}, {}> {
  public render(): JSX.Element {
    return (
      <div>
        <h3>Folder</h3>
        <FolderTileWithThumbnail
          originalImageSize={
            {
              width: 400,
              height: 300
            }
          }
        />
        <FolderTileWithThumbnail
          originalImageSize={
            {
              width: 300,
              height: 400
            }
          }
          folderCoverType='media'
        />
        <FolderTileWithThumbnail
          originalImageSize={
            {
              width: 40,
              height: 40
            }
          }
          folderCoverType='media'
        />
      </div>
    );
  }
}

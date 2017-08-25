
import * as React from 'react';
import { Tile } from '../Tile';
import { css } from 'office-ui-fabric-react/lib/Utilities';
import {
  SignalField,
  NewSignal,
  CommentsSignal,
  TrendingSignal
} from '../../signals/Signals';
import { FolderCover } from '../../FolderCover/FolderCover';
import { lorem } from '@uifabric/example-app-base';
import * as TileExampleStylesModule from './Tile.Example.scss';

// tslint:disable-next-line:no-any
const TileExampleStyles = TileExampleStylesModule as any;

export class TileFolderExample extends React.Component<{}, {}> {
  public render(): JSX.Element {
    return (
      <div>
        <h3>Folder</h3>
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
              <FolderCover />
            }
          />
        </div>
        <div className={ css(TileExampleStyles.tile, TileExampleStyles.squareTile) }>
          <Tile
            itemName={
              <SignalField
                before={
                  <TrendingSignal />
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
              <FolderCover
                type='media'
              >
                <img src='//placehold.it/104x72' />
              </FolderCover>
            }
          />
        </div>
      </div>
    );
  }
}

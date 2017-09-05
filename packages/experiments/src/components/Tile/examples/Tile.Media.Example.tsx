
import * as React from 'react';
import { Tile, getTileLayout, renderTileWithLayout } from '../Tile';
import { Icon } from 'office-ui-fabric-react/lib/Icon';
import { css } from 'office-ui-fabric-react/lib/Utilities';
import { ISize, fitContentToBounds } from '@uifabric/utilities';
import {
  SignalField,
  Signal,
  NewSignal,
  SharedSignal,
  MentionSignal
} from '../../signals/Signals';
import { lorem } from '@uifabric/example-app-base';
import * as TileExampleStylesModule from './Tile.Example.scss';

// tslint:disable-next-line:no-any
const TileExampleStyles = TileExampleStylesModule as any;

interface IImageTileProps {
  tileSize: ISize;
  originalImageSize: ISize;
}

const ImageTile: React.StatelessComponent<IImageTileProps> = (props: IImageTileProps): JSX.Element => {
  const tile = (
    <Tile
      contentSize={ props.tileSize }
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
            [<Signal key={ 0 }><Icon iconName='play' /></Signal>, <MentionSignal key={ 1 } />]
          }
        >
          { lorem(6) }
        </SignalField>
      }
      background={
        <span /> // Placeholder content
      }
      showBackgroundFrame={ true }
    />
  );

  const {
    backgroundSize
  } = getTileLayout(tile);

  const imageSize = fitContentToBounds({
    contentSize: props.originalImageSize,
    boundsSize: backgroundSize || { width: 0, height: 0 },
    mode: 'cover'
  });

  return (
    <div
      className={ css(TileExampleStyles.tile) }
      // tslint:disable-next-line:jsx-ban-props
      style={
        {
          width: `${props.tileSize.width}px`,
          height: `${props.tileSize.height}px`
        }
      }
    >
      {
        renderTileWithLayout(tile, {
          background: (
            <img
              className={ css(TileExampleStyles.tileImage) }
              src={ `//placehold.it/${Math.round(imageSize.width)}x${Math.round(imageSize.height)}` }
            />
          )
        })
      }
    </div>
  );
};

export class TileMediaExample extends React.Component<{}, {}> {
  public render(): JSX.Element {
    return (
      <div>
        <h3>Landscape</h3>
        <ImageTile
          tileSize={
            {
              width: 250,
              height: 200
            }
          }
          originalImageSize={
            {
              width: 400,
              height: 300
            }
          }
        />
        <h3>Portrait</h3>
        <ImageTile
          tileSize={
            {
              width: 200,
              height: 250
            }
          }
          originalImageSize={
            {
              width: 300,
              height: 400
            }
          }
        />
        <h3>No preview</h3>
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
              (
                <SignalField
                  before={
                    [
                      <Signal key={ 0 }><Icon iconName='play' /></Signal>,
                      <SharedSignal key={ 1 } />
                    ]
                  }
                >
                  { lorem(8) }
                </SignalField>
              )
            }
            foreground={
              <Icon iconName='play' style={ { margin: '11px', fontSize: '40px' } } />
            }
            showBackgroundFrame={ true }
          />
        </div>
      </div>
    );
  }
}

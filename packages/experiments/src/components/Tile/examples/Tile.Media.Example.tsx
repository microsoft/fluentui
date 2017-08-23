
import * as React from 'react';
import { Tile } from '../Tile';
import { Icon } from 'office-ui-fabric-react/lib/Icon';
import { css } from 'office-ui-fabric-react/lib/Utilities';
import {
  SignalField,
  Signal,
  NewSignal,
  CommentsSignal,
  SharedSignal,
  MentionSignal
} from '../../signals/Signals';
import { lorem } from '@uifabric/example-app-base';
import * as TileExampleStylesModule from './Tile.Example.scss';

const TileExampleStyles = TileExampleStylesModule as any;

export class TileMediaExample extends React.Component<any, any> {
  public render() {
    return (
      <div>
        <h3>Landscape</h3>
        <div className={ css(TileExampleStyles.tile, TileExampleStyles.landscapeTile) }>
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
                  [<Signal key={ 0 }><Icon iconName='play' /></Signal>, <MentionSignal key={ 1 } />]
                }
              >
                { lorem(6) }
              </SignalField>
            }
            background={
              <img
                src={ `//placehold.it/250x200` }
                style={
                  {
                    display: 'block'
                  }
                }
              />
            }
            showBackgroundFrame={ true }
          />
        </div>
        <h3>Portrait</h3>
        <div className={ css(TileExampleStyles.tile, TileExampleStyles.portraitTile) }>
          <Tile
            itemName={
              <SignalField
                before={
                  <NewSignal />
                }
              >
                { lorem(1) }
              </SignalField>
            }
            itemActivity={
              <SignalField
                before={
                  <CommentsSignal>{ '6' }</CommentsSignal>
                }
              >
                { lorem(6) }
              </SignalField>
            }
            background={
              <img
                src={ `//placehold.it/175x200` }
                style={
                  {
                    display: 'block'
                  }
                }
              />
            }
            showBackgroundFrame={ true }
          />
        </div>
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

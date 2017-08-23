
import * as React from 'react';
import { Tile } from '../Tile';
import { Icon } from 'office-ui-fabric-react/lib/Icon';
import { css } from 'office-ui-fabric-react/lib/Utilities';
import {
  SignalField,
  Signal,
  NewSignal,
  CommentsSignal,
  TrendingSignal,
  SharedSignal,
  MentionSignal
} from '../../signals/Signals';
import { lorem } from '@uifabric/example-app-base';
import * as TileExampleStylesModule from './Tile.Example.scss';

const TileExampleStyles = TileExampleStylesModule as any;

export class TileDocumentExample extends React.Component<any, any> {
  public render(): JSX.Element {
    return (
      <div>
        <h3>Tiny document thumbnail</h3>
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
              <img
                src={ `//placehold.it/40x40` }
                style={
                  {
                    display: 'block'
                  }
                }
              />
            }
            showForegroundFrame={ true }
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
              <img
                src={ `//placehold.it/80x120` }
                style={
                  {
                    display: 'block'
                  }
                }
              />
            }
            showForegroundFrame={ true }
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
              <img
                src={ `//placehold.it/168x96` }
                style={
                  {
                    display: 'block'
                  }
                }
              />
            }
            showForegroundFrame={ true }
          />
        </div>
        <h3>Maximum-sized document thumbnail</h3>
        <div className={ css(TileExampleStyles.tile, TileExampleStyles.squareTile) }>
          <Tile
            itemName={
              <SignalField
                before={
                  <NewSignal />
                }
              >
                { lorem(10) }
              </SignalField>
            }
            foreground={
              <img
                src={ `//placehold.it/168x120` }
                style={
                  {
                    display: 'block'
                  }
                }
              />
            }
            showForegroundFrame={ true }
          />
        </div>
        <h3>Document icon</h3>
        <div className={ css(TileExampleStyles.tile, TileExampleStyles.squareTile) }>
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
              (
                <SignalField
                  before={
                    <SharedSignal />
                  }
                >
                  { lorem(3) }
                </SignalField>
              )
            }
            foreground={
              <img
                src={
                  `https://static2.sharepointonline.com/files/fabric/assets/brand-icons/document/svg/docx_48x1.svg`
                }
                style={
                  {
                    display: 'block',
                    width: '64px',
                    height: '64px',
                    margin: '16px'
                  }
                }
              />
            }
            showForegroundFrame={ true }
          />
        </div>
      </div>
    );
  }
}

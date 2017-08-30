
import * as React from 'react';
import { Tile, getTileLayout, renderTileWithLayout } from '../Tile';
import { css } from 'office-ui-fabric-react/lib/Utilities';
import {
  SignalField,
  NewSignal,
  CommentsSignal,
  TrendingSignal,
  SharedSignal
} from '../../signals/Signals';
import { lorem } from '@uifabric/example-app-base';
import { ISize, fitContentToBounds } from '@uifabric/utilities';
import * as TileExampleStylesModule from './Tile.Example.scss';

// tslint:disable-next-line:no-any
const TileExampleStyles = TileExampleStylesModule as any;

interface IDocumentTileWithThumbnailProps {
  originalImageSize: ISize;
}

const DocumentTileWithThumbnail: React.StatelessComponent<IDocumentTileWithThumbnailProps> =
  (props: IDocumentTileWithThumbnailProps): JSX.Element => {
    const tile = (
      <Tile
        contentSize={
          {
            width: 200,
            height: 200
          }
        }
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
          <span />
        }
        showForegroundFrame={ true }
      />
    );

    const {
      foregroundSize = { width: 0, height: 0 }
    } = getTileLayout(tile);

    const imageSize = fitContentToBounds({
      contentSize: props.originalImageSize,
      boundsSize: foregroundSize,
      mode: 'contain'
    });

    return (
      <div className={ css(TileExampleStyles.tile, TileExampleStyles.squareTile) }>
        {
          renderTileWithLayout(tile, {
            foreground: (
              <img
                src={ `//placehold.it/${Math.round(imageSize.width)}x${Math.round(imageSize.height)}` }
                className={ css(TileExampleStyles.tileImage) }
              />
            )
          })
        }
      </div>
    );
  };

export class TileDocumentExample extends React.Component<{}, {}> {
  public render(): JSX.Element {
    return (
      <div>
        <h3>Tiny document thumbnail</h3>
        <DocumentTileWithThumbnail
          originalImageSize={
            {
              width: 40,
              height: 40
            }
          }
        />
        <DocumentTileWithThumbnail
          originalImageSize={
            {
              width: 200,
              height: 150
            }
          }
        />
        <DocumentTileWithThumbnail
          originalImageSize={
            {
              width: 150,
              height: 200
            }
          }
        />
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

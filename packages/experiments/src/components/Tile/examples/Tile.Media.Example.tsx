import * as React from 'react';
import { Tile, getTileLayout, renderTileWithLayout } from '@uifabric/experiments/lib/Tile';
import { Icon } from 'office-ui-fabric-react/lib/Icon';
import { Checkbox } from 'office-ui-fabric-react/lib/Checkbox';
import { css, ISize, fitContentToBounds } from '@uifabric/experiments/lib/Utilities';
import { SignalField, Signal, NewSignal, SharedSignal, MentionSignal } from '../../signals/Signals';
import { lorem } from '@uifabric/example-app-base';
import * as TileExampleStylesModule from './Tile.Example.scss';

const ITEMS: { name: string; activity: string }[] = [
  {
    name: lorem(2),
    activity: lorem(6)
  },
  {
    name: lorem(2),
    activity: lorem(6)
  },
  {
    name: lorem(2),
    activity: lorem(6)
  },
  {
    name: lorem(2),
    activity: lorem(6)
  }
];

// tslint:disable-next-line:no-any
const TileExampleStyles = TileExampleStylesModule as any;

interface IImageTileProps {
  tileSize: ISize;
  originalImageSize: ISize;
  showBackground: boolean;
  item: typeof ITEMS[0];
}

const ImageTile: React.StatelessComponent<IImageTileProps> = (props: IImageTileProps): JSX.Element => {
  const tile = (
    <Tile
      contentSize={props.tileSize}
      itemName={<SignalField before={<NewSignal />}>{props.item.name}</SignalField>}
      itemActivity={
        <SignalField
          before={[
            <Signal key={0}>
              <Icon iconName="play" />
            </Signal>,
            <MentionSignal key={1} />
          ]}
        >
          {props.item.activity}
        </SignalField>
      }
      background={
        <span /> // Placeholder content
      }
      hideBackground={!props.showBackground}
      showBackgroundFrame={true}
    />
  );

  const { backgroundSize } = getTileLayout(tile);

  const imageSize = fitContentToBounds({
    contentSize: props.originalImageSize,
    boundsSize: backgroundSize || { width: 0, height: 0 },
    mode: 'cover'
  });

  return (
    <div
      className={css(TileExampleStyles.tile)}
      // tslint:disable-next-line:jsx-ban-props
      style={{
        width: `${props.tileSize.width}px`,
        height: `${props.tileSize.height}px`
      }}
    >
      {renderTileWithLayout(tile, {
        background: (
          <img
            className={css(TileExampleStyles.tileImage)}
            src={`//placehold.it/${Math.round(imageSize.width)}x${Math.round(imageSize.height)}`}
          />
        )
      })}
    </div>
  );
};

export interface ITileMediaExampleState {
  imagesLoaded: boolean;
}

export class TileMediaExample extends React.Component<{}, ITileMediaExampleState> {
  constructor(props: {}) {
    super(props);

    this.state = {
      imagesLoaded: true
    };
  }

  public render(): JSX.Element {
    const { imagesLoaded } = this.state;

    return (
      <div>
        <Checkbox label="Show images as loaded" checked={imagesLoaded} onChange={this._onImagesLoadedChanged} />
        <h3>Landscape</h3>
        <ImageTile
          tileSize={{
            width: 250,
            height: 200
          }}
          item={ITEMS[0]}
          originalImageSize={{
            width: 400,
            height: 300
          }}
          showBackground={imagesLoaded}
        />
        <h3>Portrait</h3>
        <ImageTile
          tileSize={{
            width: 200,
            height: 250
          }}
          item={ITEMS[1]}
          originalImageSize={{
            width: 300,
            height: 400
          }}
          showBackground={imagesLoaded}
        />
        <h3>Small Image</h3>
        <ImageTile
          tileSize={{
            width: 200,
            height: 200
          }}
          item={ITEMS[2]}
          originalImageSize={{
            width: 16,
            height: 16
          }}
          showBackground={imagesLoaded}
        />
        <h3>No preview</h3>
        <div className={css(TileExampleStyles.tile, TileExampleStyles.largeTile)}>
          <Tile
            itemName={<SignalField before={<NewSignal />}>{ITEMS[3].name}</SignalField>}
            itemActivity={
              <SignalField
                before={[
                  <Signal key={0}>
                    <Icon iconName="play" />
                  </Signal>,
                  <SharedSignal key={1} />
                ]}
              >
                {ITEMS[3].name}
              </SignalField>
            }
            foreground={<Icon iconName="play" style={{ margin: '11px', fontSize: '40px' }} />}
            showBackgroundFrame={true}
          />
        </div>
      </div>
    );
  }

  private _onImagesLoadedChanged = (event: React.FormEvent<HTMLInputElement>, checked: boolean): void => {
    this.setState({
      imagesLoaded: checked
    });
  };
}

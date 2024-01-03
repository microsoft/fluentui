import * as React from 'react';
import { Checkbox, css, ISize, fitContentToBounds } from '@fluentui/react';
import {
  SignalField,
  NewSignal,
  CommentsSignal,
  TrendingSignal,
  SharedSignal,
  Tile,
  getTileLayout,
  renderTileWithLayout,
} from '@fluentui/react-experiments';
import { lorem } from '@fluentui/example-data';
import * as TileExampleStylesModule from './Tile.Example.scss';

const TileExampleStyles = TileExampleStylesModule as any;

const ITEMS: { name: string; activity: string }[] = [
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
  },
  {
    name: lorem(2),
    activity: lorem(6),
  },
  {
    name: lorem(2),
    activity: lorem(6),
  },
];

interface IDocumentTileWithThumbnailProps {
  originalImageSize: ISize;
  showForeground: boolean;
  item: (typeof ITEMS)[0];
}

const DocumentTileWithThumbnail: React.FunctionComponent<IDocumentTileWithThumbnailProps> = (
  props: IDocumentTileWithThumbnailProps,
): JSX.Element => {
  const tile = (
    <Tile
      contentSize={{
        width: 176,
        height: 171,
      }}
      itemName={<SignalField before={<TrendingSignal />}>{props.item.name}</SignalField>}
      itemActivity={<SignalField before={<CommentsSignal>{'12'}</CommentsSignal>}>{props.item.activity}</SignalField>}
      foreground={<span />}
      hideForeground={!props.showForeground}
      showForegroundFrame={true}
    />
  );

  const { foregroundSize = { width: 0, height: 0 } } = getTileLayout(tile);

  const imageSize = fitContentToBounds({
    contentSize: props.originalImageSize,
    boundsSize: foregroundSize,
    mode: 'contain',
  });

  return (
    <div className={css(TileExampleStyles.tile, TileExampleStyles.largeTile)}>
      {renderTileWithLayout(tile, {
        foreground: (
          <img
            src="https://res.cdn.office.net/files/fabric-cdn-prod_20230815.002/office-ui-fabric-react-assets/fluent-placeholder.svg"
            className={css(TileExampleStyles.tileImage)}
            height={Math.round(imageSize.height)}
            width={Math.round(imageSize.width)}
          />
        ),
      })}
    </div>
  );
};

export interface ITileDocumentExampleState {
  imagesLoaded: boolean;
}

export class TileDocumentExample extends React.Component<{}, ITileDocumentExampleState> {
  constructor(props: {}) {
    super(props);

    this.state = {
      imagesLoaded: true,
    };
  }

  public render(): JSX.Element {
    const { imagesLoaded } = this.state;

    return (
      <div>
        <Checkbox label="Show images as loaded" checked={imagesLoaded} onChange={this._onImagesLoadedChanged} />
        <h3>Document thumbnail</h3>
        <DocumentTileWithThumbnail
          originalImageSize={{
            width: 40,
            height: 40,
          }}
          showForeground={imagesLoaded}
          item={ITEMS[0]}
        />
        <DocumentTileWithThumbnail
          originalImageSize={{
            width: 200,
            height: 150,
          }}
          showForeground={imagesLoaded}
          item={ITEMS[1]}
        />
        <DocumentTileWithThumbnail
          originalImageSize={{
            width: 150,
            height: 200,
          }}
          showForeground={imagesLoaded}
          item={ITEMS[2]}
        />
        <DocumentTileWithThumbnail
          originalImageSize={{
            width: 16,
            height: 16,
          }}
          showForeground={imagesLoaded}
          item={ITEMS[3]}
        />
        <h3>Document icon</h3>
        <div className={css(TileExampleStyles.tile, TileExampleStyles.largeTile)}>
          <Tile
            itemName={<SignalField before={<NewSignal />}>{ITEMS[3].name}</SignalField>}
            itemActivity={<SignalField before={<SharedSignal />}>{ITEMS[3].activity}</SignalField>}
            foreground={
              <img
                src={`https://res-1.cdn.office.net/files/fabric-cdn-prod_20230815.002/assets/item-types/64/docx.svg`}
                style={{
                  display: 'block',
                  width: '64px',
                  height: '64px',
                  margin: '16px',
                }}
              />
            }
            showForegroundFrame={true}
          />
        </div>
      </div>
    );
  }

  private _onImagesLoadedChanged = (event: React.FormEvent<HTMLInputElement>, checked: boolean): void => {
    this.setState({
      imagesLoaded: checked,
    });
  };
}

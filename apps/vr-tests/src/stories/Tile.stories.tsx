import * as React from 'react';
import {
  Tile,
  SignalField,
  TrendingSignal,
  CommentsSignal,
  NewSignal,
  SharedSignal
} from '@uifabric/experiments';
import Screener from 'screener-storybook/src/screener';
import { storiesOf } from '@storybook/react';
import { ISize, fitContentToBounds, Fabric } from 'office-ui-fabric-react';
import { FabricDecorator } from '../utilities';

interface IDocumentItem { name: string; activity: string; }

interface IDocumentTileWithThumbnailProps {
  originalImageSize: ISize;
  item: IDocumentItem;
}

const DocumentTileBox = (props: React.Props<{}>): JSX.Element => {
  return (
    <div style={{
      position: 'relative',
      width: '176px',
      height: '171px'
    }}>{props.children}</div>
  );
};

const DocumentTileWithThumbnail: React.StatelessComponent<IDocumentTileWithThumbnailProps> = (
  props: IDocumentTileWithThumbnailProps
): JSX.Element => {
  function renderForeground(foregroundProps: { foregroundSize?: ISize; }) {
    const {
      foregroundSize = { width: 0, height: 0 }
    } = foregroundProps;

    const imageSize = fitContentToBounds({
      contentSize: props.originalImageSize,
      boundsSize: foregroundSize,
      mode: 'contain'
    });

    return (
      <img
        src={`//placehold.it/${Math.round(imageSize.width)}x${Math.round(imageSize.height)}`}
        style={{ display: 'block' }}
      />
    );
  }

  return (
    <DocumentTileBox>
      <Tile
        contentSize={{
          width: 176,
          height: 171
        }}
        itemName={<SignalField before={<TrendingSignal />}>{props.item.name}</SignalField>}
        itemActivity={<SignalField before={<CommentsSignal>{'12'}</CommentsSignal>}>{props.item.activity}</SignalField>}
        foreground={renderForeground}
        showForegroundFrame={true}
      />
    </DocumentTileBox>
  );
};

storiesOf('Tile', module)
  .addDecorator(story => (
    <Fabric>{story()}</Fabric>
  ))
  .addDecorator(FabricDecorator)
  .addDecorator(story =>
    // prettier-ignore
    <Screener
      steps={new Screener.Steps()
        .snapshot('default', { cropTo: '.testWrapper' })
        .end()}
    >
      {story()}
    </Screener>
  )
  .addStory('Document tile with fit landscape image', () => (
    <DocumentTileWithThumbnail
      item={{
        name: 'Test Name',
        activity: 'Test Activity'
      }}
      originalImageSize={{
        width: 200,
        height: 150
      }}
    />
  ))
  .addStory('Document tile with fit portrait image', () => (
    <DocumentTileWithThumbnail
      item={{
        name: 'Test Name',
        activity: 'Test Activity'
      }}
      originalImageSize={{
        width: 150,
        height: 200
      }}
    />
  ))
  .addStory('Document tile with icon-sized image', () => (
    <DocumentTileWithThumbnail
      item={{
        name: 'Test Name',
        activity: 'Test Activity'
      }}
      originalImageSize={{
        width: 16,
        height: 16
      }}
    />
  ))
  .addStory('Document tile with icon', () => (
    <DocumentTileBox>
      <Tile
        itemName={<SignalField before={<NewSignal />}>{'Test Name'}</SignalField>}
        itemActivity={<SignalField before={<SharedSignal />}>{'Test Activity'}</SignalField>}
        foreground={
          <img
            src={`https://static2.sharepointonline.com/files/fabric/assets/brand-icons/document/svg/docx_48x1.svg`}
            style={{
              display: 'block',
              width: '64px',
              height: '64px',
              margin: '16px'
            }}
          />
        }
        showForegroundFrame={true}
      />
    </DocumentTileBox>
  ))
  .addStory('Tile with no content and long text', () => (
    <DocumentTileBox>
      <Tile
        itemName={<SignalField before={<NewSignal />}>{'This is a name which should overflow'}</SignalField>}
        itemActivity={<SignalField before={<SharedSignal />}>{'This is an activity which should overflow'}</SignalField>}
        showForegroundFrame={false}
      />
    </DocumentTileBox>
  ));

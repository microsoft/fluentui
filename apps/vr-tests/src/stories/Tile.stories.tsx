import * as React from 'react';
import {
  Tile,
  SignalField,
  TrendingSignal,
  CommentsSignal,
  NewSignal,
  SharedSignal,
  ITileBackgroundProps,
} from '@fluentui/react-experiments';
import { Steps, StoryWright } from 'storywright';
import { storiesOf } from '@storybook/react';
import { ISize, fitContentToBounds, Fabric } from '@fluentui/react';
import { TestWrapperDecorator } from '../utilities/index';

interface IDocumentItem {
  name: JSX.Element;
  activity: JSX.Element;
}

interface IDocumentTileWithThumbnailProps {
  originalImageSize: ISize;
  item: IDocumentItem;
}

interface IMediaTileWithThumbnailProps {
  imageSize: ISize;
  item: IDocumentItem;
  nameplateOnlyOnHover: boolean;
}

const DocumentTileBox = (props: { children: React.ReactNode }): JSX.Element => {
  return (
    <div
      style={{
        position: 'relative',
        width: '176px',
        height: '171px',
      }}
    >
      {props.children}
    </div>
  );
};

const MEDIA_TILE_WIDTH = 200;
const MEDIA_TILE_HEIGHT = 150;

const MediaTileBox = (props: { children: React.ReactNode }): JSX.Element => {
  return (
    <div
      style={{
        position: 'relative',
        width: `${MEDIA_TILE_WIDTH}px`,
        height: `${MEDIA_TILE_HEIGHT}px`,
      }}
    >
      {props.children}
    </div>
  );
};

const DocumentTileWithThumbnail: React.FunctionComponent<IDocumentTileWithThumbnailProps> = (
  props: IDocumentTileWithThumbnailProps,
): JSX.Element => {
  function renderForeground(foregroundProps: { foregroundSize?: ISize }) {
    const { foregroundSize = { width: 0, height: 0 } } = foregroundProps;

    const imageSize = fitContentToBounds({
      contentSize: props.originalImageSize,
      boundsSize: foregroundSize,
      mode: 'contain',
    });

    return (
      <img
        src={`//fabricweb.azureedge.net/fabric-website/placeholders/${Math.round(
          imageSize.width,
        )}x${Math.round(imageSize.height)}.png`}
        style={{ display: 'block' }}
      />
    );
  }

  return (
    <DocumentTileBox>
      <Tile
        contentSize={{
          width: 176,
          height: 171,
        }}
        itemName={<SignalField before={<TrendingSignal />}>{props.item.name}</SignalField>}
        itemActivity={
          <SignalField before={<CommentsSignal>12</CommentsSignal>}>
            {props.item.activity}
          </SignalField>
        }
        foreground={renderForeground}
        showForegroundFrame={true}
      />
    </DocumentTileBox>
  );
};

const MediaTileWithThumbnail: React.FunctionComponent<IMediaTileWithThumbnailProps> = (
  props: IMediaTileWithThumbnailProps,
): JSX.Element => {
  const { imageSize, item, nameplateOnlyOnHover } = props;

  function renderBackground(backgroundProps: ITileBackgroundProps) {
    return (
      <img
        src={`//fabricweb.azureedge.net/fabric-website/placeholders/${Math.round(
          imageSize.width,
        )}x${Math.round(imageSize.height)}.png`}
        style={{ display: 'block' }}
      />
    );
  }

  return (
    <MediaTileBox>
      <Tile
        itemName={item.name}
        itemActivity={item.activity}
        background={renderBackground}
        showBackgroundFrame={true}
        nameplateOnlyOnHover={nameplateOnlyOnHover}
      />
    </MediaTileBox>
  );
};

storiesOf('Tile', module)
  .addDecorator(story => <Fabric>{story()}</Fabric>)
  .addDecorator(TestWrapperDecorator)
  .addDecorator(story =>
    // prettier-ignore
    <StoryWright
      steps={new Steps()
        .snapshot('default', { cropTo: '.testWrapper' })
        .end()}
    >
      {story()}
    </StoryWright>,
  )
  .addStory('Document tile with fit landscape image', () => (
    <DocumentTileWithThumbnail
      item={{
        name: <>Test Name</>,
        activity: <>Test Activity</>,
      }}
      originalImageSize={{
        width: 200,
        height: 150,
      }}
    />
  ))
  .addStory('Document tile with fit portrait image', () => (
    <DocumentTileWithThumbnail
      item={{
        name: <>Test Name</>,
        activity: <>Test Activity</>,
      }}
      originalImageSize={{
        width: 150,
        height: 200,
      }}
    />
  ))
  .addStory('Document tile with icon-sized image', () => (
    <DocumentTileWithThumbnail
      item={{
        name: <>Test Name</>,
        activity: <>Test Activity</>,
      }}
      originalImageSize={{
        width: 16,
        height: 16,
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
            src="https://res-1.cdn.office.net/files/fabric-cdn-prod_20230815.002/assets/item-types/48/docx.svg"
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
    </DocumentTileBox>
  ))
  .addStory('Tile with no content and long text', () => (
    <DocumentTileBox>
      <Tile
        itemName={
          <SignalField before={<NewSignal />}>{'This is a name which should overflow'}</SignalField>
        }
        itemActivity={
          <SignalField before={<SharedSignal />}>
            {'This is an activity which should overflow'}
          </SignalField>
        }
        showForegroundFrame={false}
      />
    </DocumentTileBox>
  ));

storiesOf('MediaTile', module)
  .addDecorator(story => <Fabric>{story()}</Fabric>)
  .addDecorator(TestWrapperDecorator)
  .addDecorator(story =>
    // prettier-ignore
    <StoryWright
      steps={new Steps()
        .snapshot('default', { cropTo: '.testWrapper' })
        .hover('.ms-Tile')
        .snapshot('hover', { cropTo: '.testWrapper' })
        .end()}
    >
      {story()}
    </StoryWright>,
  )
  .addStory('Media tile with single activity line', () => (
    <MediaTileBox>
      <MediaTileWithThumbnail
        item={{
          name: <SignalField before={<NewSignal />}>{'Test Name'}</SignalField>,
          activity: <SignalField before={<SharedSignal />}>{'Test Activity'}</SignalField>,
        }}
        imageSize={{
          width: MEDIA_TILE_WIDTH,
          height: MEDIA_TILE_HEIGHT,
        }}
        nameplateOnlyOnHover={false}
      />
    </MediaTileBox>
  ))
  .addStory('Media tile with two activity lines', () => (
    <MediaTileBox>
      <MediaTileWithThumbnail
        item={{
          name: <SignalField before={<NewSignal />}>{'Test Name'}</SignalField>,
          activity: (
            <>
              <SignalField before={<SharedSignal />}>{'Test Activity'}</SignalField>
              <span style={{ display: 'block' }}>{'Test Activity Second Line'}</span>
            </>
          ),
        }}
        imageSize={{
          width: MEDIA_TILE_WIDTH,
          height: MEDIA_TILE_HEIGHT,
        }}
        nameplateOnlyOnHover={false}
      />
    </MediaTileBox>
  ))
  .addStory('Media tile with very long name and activity', () => (
    <MediaTileBox>
      <MediaTileWithThumbnail
        item={{
          name: (
            <SignalField before={<NewSignal />}>
              {'Lorem ipsum dolor sit amet, consectetur adipiscing elit'}
            </SignalField>
          ),
          activity: (
            <SignalField before={<SharedSignal />}>
              {'Proin elementum erat gravida libero luctus, id consequat risus aliquam'}
            </SignalField>
          ),
        }}
        imageSize={{
          width: MEDIA_TILE_WIDTH,
          height: MEDIA_TILE_HEIGHT,
        }}
        nameplateOnlyOnHover={false}
      />
    </MediaTileBox>
  ))
  .addStory('Media tile with nameplate hidden until hover', () => (
    <MediaTileBox>
      <MediaTileWithThumbnail
        item={{
          name: <SignalField before={<NewSignal />}>{'Test Name'}</SignalField>,
          activity: <SignalField before={<SharedSignal />}>{'Test Activity'}</SignalField>,
        }}
        imageSize={{
          width: MEDIA_TILE_WIDTH,
          height: MEDIA_TILE_HEIGHT,
        }}
        nameplateOnlyOnHover={true}
      />
    </MediaTileBox>
  ));

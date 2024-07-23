import * as React from 'react';
import {
  Tile,
  SignalField,
  NewSignal,
  SharedSignal,
  ITileBackgroundProps,
} from '@fluentui/react-experiments';
import type { Meta } from '@storybook/react';
import { Steps } from 'storywright';
import { ISize, Fabric } from '@fluentui/react';
import { StoryWrightDecorator, TestWrapperDecorator } from '../utilities';

interface IDocumentItem {
  name: JSX.Element;
  activity: JSX.Element;
}

interface IMediaTileWithThumbnailProps {
  imageSize: ISize;
  item: IDocumentItem;
  nameplateOnlyOnHover: boolean;
}

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

export default {
  title: 'MediaTile',

  decorators: [
    story => <Fabric>{story()}</Fabric>,
    TestWrapperDecorator,
    StoryWrightDecorator(
      new Steps()
        .snapshot('default', { cropTo: '.testWrapper' })
        .hover('.ms-Tile')
        .snapshot('hover', { cropTo: '.testWrapper' })
        .end(),
    ),
  ],
} satisfies Meta<typeof Tile>;

export const MediaTileWithSingleActivityLine = () => (
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
);

MediaTileWithSingleActivityLine.storyName = 'Media tile with single activity line';

export const MediaTileWithTwoActivityLines = () => (
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
);

MediaTileWithTwoActivityLines.storyName = 'Media tile with two activity lines';

export const MediaTileWithVeryLongNameAndActivity = () => (
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
);

MediaTileWithVeryLongNameAndActivity.storyName = 'Media tile with very long name and activity';

export const MediaTileWithNameplateHiddenUntilHover = () => (
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
);

MediaTileWithNameplateHiddenUntilHover.storyName = 'Media tile with nameplate hidden until hover';

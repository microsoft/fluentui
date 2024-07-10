import * as React from 'react';
import {
  Tile,
  SignalField,
  TrendingSignal,
  CommentsSignal,
  NewSignal,
  SharedSignal,
} from '@fluentui/react-experiments';
import type { Meta } from '@storybook/react';
import { Steps } from 'storywright';
import { ISize, fitContentToBounds, Fabric } from '@fluentui/react';
import { StoryWrightDecorator, TestWrapperDecorator } from '../utilities';

interface IDocumentItem {
  name: JSX.Element;
  activity: JSX.Element;
}

interface IDocumentTileWithThumbnailProps {
  originalImageSize: ISize;
  item: IDocumentItem;
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

export default {
  title: 'Tile',

  decorators: [
    story => <Fabric>{story()}</Fabric>,
    TestWrapperDecorator,
    StoryWrightDecorator(new Steps().snapshot('default', { cropTo: '.testWrapper' }).end()),
  ],
} satisfies Meta<typeof Tile>;

export const DocumentTileWithFitLandscapeImage = () => (
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
);

DocumentTileWithFitLandscapeImage.storyName = 'Document tile with fit landscape image';

export const DocumentTileWithFitPortraitImage = () => (
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
);

DocumentTileWithFitPortraitImage.storyName = 'Document tile with fit portrait image';

export const DocumentTileWithIconSizedImage = () => (
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
);

DocumentTileWithIconSizedImage.storyName = 'Document tile with icon-sized image';

export const DocumentTileWithIcon = () => (
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
);

DocumentTileWithIcon.storyName = 'Document tile with icon';

export const TileWithNoContentAndLongText = () => (
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
);

TileWithNoContentAndLongText.storyName = 'Tile with no content and long text';

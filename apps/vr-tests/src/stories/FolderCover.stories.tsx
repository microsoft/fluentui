import * as React from 'react';
import {
  FolderCover,
  IFolderCoverProps,
  getFolderCoverLayout,
  renderFolderCoverWithLayout,
  SharedSignal,
} from '@fluentui/react-experiments';
import { Steps, StoryWright } from 'storywright';
import { storiesOf } from '@storybook/react';
import { ISize, fitContentToBounds, Fabric } from '@fluentui/react';
import { TestWrapperDecorator } from '../utilities/index';

interface IFolderCoverWithImageProps extends IFolderCoverProps {
  originalImageSize: ISize;
}

const FolderCoverWithImage: React.FunctionComponent<IFolderCoverWithImageProps> = (
  props: IFolderCoverWithImageProps,
): JSX.Element => {
  const { originalImageSize, ...folderCoverProps } = props;

  const folderCover = <FolderCover {...folderCoverProps} />;

  const { contentSize } = getFolderCoverLayout(folderCover);

  const imageSize = fitContentToBounds({
    contentSize: originalImageSize,
    boundsSize: contentSize,
    mode: 'cover',
  });

  return renderFolderCoverWithLayout(folderCover, {
    children: (
      <img
        title="example"
        src={`//fabricweb.azureedge.net/fabric-website/placeholders/${Math.round(
          imageSize.width,
        )}x${Math.round(imageSize.height)}.png`}
      />
    ),
  });
};

storiesOf('FolderCover', module)
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
  .addStory('Large Default Cover', () => (
    <FolderCoverWithImage
      originalImageSize={{
        width: 200,
        height: 150,
      }}
      folderCoverSize="large"
      metadata={20}
      signal={<SharedSignal />}
    />
  ))
  .addStory('Small Default Cover', () => (
    <FolderCoverWithImage
      originalImageSize={{
        width: 200,
        height: 150,
      }}
      folderCoverSize="small"
      metadata={15}
    />
  ))
  .addStory('Large Media Cover', () => (
    <FolderCoverWithImage
      originalImageSize={{
        width: 200,
        height: 150,
      }}
      folderCoverSize="large"
      folderCoverType="media"
      metadata={20}
      signal={<SharedSignal />}
    />
  ))
  .addStory('Small Media Cover', () => (
    <FolderCoverWithImage
      originalImageSize={{
        width: 200,
        height: 150,
      }}
      folderCoverSize="small"
      folderCoverType="media"
      metadata={15}
    />
  ))
  .addStory('Shared Cover', () => (
    <FolderCoverWithImage
      originalImageSize={{
        width: 200,
        height: 150,
      }}
      folderCoverSize="small"
      folderCoverType="media"
      metadata={15}
      signal={<SharedSignal />}
    />
  ));

import * as React from 'react';
import type { Meta } from '@storybook/react';
import {
  FolderCover,
  IFolderCoverProps,
  getFolderCoverLayout,
  renderFolderCoverWithLayout,
  SharedSignal,
} from '@fluentui/react-experiments';
import { Steps } from 'storywright';
import { ISize, fitContentToBounds, Fabric } from '@fluentui/react';
import { StoryWrightDecorator, TestWrapperDecorator } from '../utilities';

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

export default {
  title: 'FolderCover',

  decorators: [
    story => <Fabric>{story()}</Fabric>,
    TestWrapperDecorator,
    StoryWrightDecorator(new Steps().snapshot('default', { cropTo: '.testWrapper' }).end()),
  ],
} satisfies Meta<typeof FolderCoverWithImage>;

export const LargeDefaultCover = () => (
  <FolderCoverWithImage
    originalImageSize={{
      width: 200,
      height: 150,
    }}
    folderCoverSize="large"
    metadata={20}
    signal={<SharedSignal />}
  />
);

export const SmallDefaultCover = () => (
  <FolderCoverWithImage
    originalImageSize={{
      width: 200,
      height: 150,
    }}
    folderCoverSize="small"
    metadata={15}
  />
);

export const LargeMediaCover = () => (
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
);

export const SmallMediaCover = () => (
  <FolderCoverWithImage
    originalImageSize={{
      width: 200,
      height: 150,
    }}
    folderCoverSize="small"
    folderCoverType="media"
    metadata={15}
  />
);

export const SharedCover = () => (
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
);

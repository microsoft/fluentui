import * as React from 'react';
import {
  Fabric,
  FolderCover,
  IFolderCoverProps,
  getFolderCoverLayout,
  renderFolderCoverWithLayout,
  SharedSignal
} from '@uifabric/experiments';
import Screener from 'screener-storybook/src/screener';
import { storiesOf } from '@storybook/react';
import { ISize, fitContentToBounds } from 'office-ui-fabric-react';
import { FabricDecorator } from '../utilities';

interface IFolderCoverWithImageProps extends IFolderCoverProps {
  originalImageSize: ISize;
}

const FolderCoverWithImage: React.StatelessComponent<IFolderCoverWithImageProps> = (props: IFolderCoverWithImageProps): JSX.Element => {
  const { originalImageSize, ...folderCoverProps } = props;

  const folderCover = <FolderCover {...folderCoverProps} />;

  const { contentSize } = getFolderCoverLayout(folderCover);

  const imageSize = fitContentToBounds({
    contentSize: originalImageSize,
    boundsSize: contentSize,
    mode: 'cover'
  });

  return renderFolderCoverWithLayout(folderCover, {
    children: <img src={`//placehold.it/${Math.round(imageSize.width)}x${Math.round(imageSize.height)}`} />
  });
};

storiesOf('FolderCover', module)
  .addDecorator(FabricDecorator)
  .addDecorator(story => <Screener steps={new Screener.Steps().snapshot('default', { cropTo: '.testWrapper' }).end()}>{story()}</Screener>)
  .addStory('Large Default Cover', () => (
    <Fabric>
      <FolderCoverWithImage
        originalImageSize={{
          width: 200,
          height: 150
        }}
        folderCoverSize="large"
        metadata={20}
        signal={<SharedSignal />}
      />
    </Fabric>
  ))
  .addStory('Small Default Cover', () => (
    <Fabric>
      <FolderCoverWithImage
        originalImageSize={{
          width: 200,
          height: 150
        }}
        folderCoverSize="small"
        metadata={15}
      />
    </Fabric>
  ))
  .addStory('Large Media Cover', () => (
    <Fabric>
      <FolderCoverWithImage
        originalImageSize={{
          width: 200,
          height: 150
        }}
        folderCoverSize="large"
        folderCoverType="media"
        metadata={20}
        signal={<SharedSignal />}
      />
    </Fabric>
  ))
  .addStory('Small Media Cover', () => (
    <Fabric>
      <FolderCoverWithImage
        originalImageSize={{
          width: 200,
          height: 150
        }}
        folderCoverSize="small"
        folderCoverType="media"
        metadata={15}
      />
    </Fabric>
  ))
  .addStory('Shared Cover', () => (
    <Fabric>
      <FolderCoverWithImage
        originalImageSize={{
          width: 200,
          height: 150
        }}
        folderCoverSize="small"
        folderCoverType="media"
        metadata={15}
        signal={<SharedSignal />}
      />
    </Fabric>
  ));

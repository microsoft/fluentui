import * as React from 'react';
import { FolderCover, getFolderCoverLayout, renderFolderCoverWithLayout, IFolderCoverProps } from '@uifabric/experiments/lib/FolderCover';
import { ISize, fitContentToBounds } from '@uifabric/experiments/lib/Utilities';
import { SharedSignal } from '../../signals/Signals';

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

export class FolderCoverBasicExample extends React.Component<{}, {}> {
  public render(): JSX.Element {
    return (
      <div>
        <h3>Large Default Cover</h3>
        <FolderCoverWithImage
          isFluent={false}
          originalImageSize={{
            width: 200,
            height: 150
          }}
          folderCoverSize="large"
          metadata={20}
          signal={<SharedSignal />}
        />
        <h3>Fluent Large Default Cover</h3>
        <FolderCoverWithImage
          isFluent={true}
          originalImageSize={{
            width: 200,
            height: 150
          }}
          folderCoverSize="large"
          metadata={20}
          signal={<SharedSignal />}
        />
        <h3>Fluent Large Default Cover -- item count only</h3>
        <FolderCoverWithImage
          isFluent={true}
          originalImageSize={{
            width: 200,
            height: 150
          }}
          folderCoverSize="large"
          metadata={20}
        />
        <h3>Large Default Cover -- signal icon only</h3>
        <FolderCoverWithImage
          isFluent={true}
          originalImageSize={{
            width: 200,
            height: 150
          }}
          folderCoverSize="large"
          signal={<SharedSignal />}
        />
        <h3>Small Default Cover</h3>
        <FolderCoverWithImage
          isFluent={false}
          originalImageSize={{
            width: 200,
            height: 150
          }}
          folderCoverSize="small"
          metadata={15}
        />
        <h3>Fluent Small Default Cover - metadata only</h3>
        <FolderCoverWithImage
          isFluent={true}
          originalImageSize={{
            width: 200,
            height: 150
          }}
          folderCoverSize="small"
          metadata={15}
        />
        <h3>Large Media Cover</h3>
        <FolderCoverWithImage
          isFluent={false}
          originalImageSize={{
            width: 200,
            height: 150
          }}
          folderCoverSize="large"
          folderCoverType="media"
          metadata={20}
          signal={<SharedSignal />}
        />
        <h3>Small Media Cover</h3>
        <FolderCoverWithImage
          isFluent={false}
          originalImageSize={{
            width: 200,
            height: 150
          }}
          folderCoverSize="small"
          folderCoverType="media"
          metadata={15}
        />
        <h3>Small Media Cover -- signal icon only</h3>
        <FolderCoverWithImage
          isFluent={true}
          originalImageSize={{
            width: 200,
            height: 150
          }}
          folderCoverSize="small"
          folderCoverType="media"
          signal={<SharedSignal />}
        />
        <h3>Shared Cover</h3>
        <FolderCoverWithImage
          isFluent={false}
          originalImageSize={{
            width: 200,
            height: 150
          }}
          folderCoverSize="small"
          folderCoverType="media"
          metadata={15}
          signal={<SharedSignal />}
        />
      </div>
    );
  }
}

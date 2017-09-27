
import * as React from 'react';
import { FolderCover, getFolderCoverLayout, renderFolderCoverWithLayout } from '../FolderCover';
import { IFolderCoverProps } from '../FolderCover.Props';
import { ISize, fitContentToBounds } from '../../../Utilities';
import { SharedSignal } from '../../signals/Signals';
import { lorem } from '@uifabric/example-app-base';

interface IFolderCoverWithImageProps extends IFolderCoverProps {
  originalImageSize: ISize;
}

const FolderCoverWithImage: React.StatelessComponent<IFolderCoverWithImageProps> = (props: IFolderCoverWithImageProps): JSX.Element => {
  const {
    originalImageSize,
    ...folderCoverProps
  } = props;

  const folderCover = (
    <FolderCover
      { ...folderCoverProps }
    />
  );

  const {
    contentSize
  } = getFolderCoverLayout(folderCover);

  const imageSize = fitContentToBounds({
    contentSize: originalImageSize,
    boundsSize: contentSize,
    mode: 'cover'
  });

  return renderFolderCoverWithLayout(folderCover, {
    children: (
      <img src={ `//placehold.it/${Math.round(imageSize.width)}x${Math.round(imageSize.height)}` } />
    )
  });
};

export class FolderCoverBasicExample extends React.Component<{}, {}> {
  public render(): JSX.Element {
    return (
      <div>
        <h3>Large Default Cover</h3>
        <FolderCoverWithImage
          originalImageSize={
            {
              width: 200,
              height: 150
            }
          }
          folderCoverSize='large'
          metadata={ 20 }
          signal={ <SharedSignal /> }
        />
        <h3>Small Default Cover</h3>
        <FolderCoverWithImage
          originalImageSize={
            {
              width: 200,
              height: 150
            }
          }
          folderCoverSize='small'
          metadata={ 15 }
        />
        <h3>Large Media Cover</h3>
        <FolderCoverWithImage
          originalImageSize={
            {
              width: 200,
              height: 150
            }
          }
          folderCoverSize='large'
          folderCoverType='media'
          metadata={ lorem(5) }
        />
        <h3>Small Media Cover</h3>
        <FolderCoverWithImage
          originalImageSize={
            {
              width: 200,
              height: 150
            }
          }
          folderCoverSize='small'
          folderCoverType='media'
          metadata={ 15 }
        />
        <h3>Shared Cover</h3>
        <FolderCoverWithImage
          originalImageSize={
            {
              width: 200,
              height: 150
            }
          }
          folderCoverSize='small'
          folderCoverType='media'
          metadata={ 15 }
          signal={ <SharedSignal /> }
        />
      </div>
    );
  }
}

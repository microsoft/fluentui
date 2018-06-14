import * as React from 'react';
import { ThumbnailItem } from './ThumbnailItem';
import { IThumbnailListProps, IThumbnailItemProps } from './ThumbnailList.types'

export class ThumbnailList extends React.Component<IThumbnailListProps> {
  constructor(props: IThumbnailListProps) {
    super(props);
  }

  public renderThumbnails() {
    const thumbnailList = this.props.thumbnailItems;
    var thumbnailItemComponentArray: React.ReactElement<ThumbnailItem>[] = [];
    thumbnailList.forEach((thumbnailItem: IThumbnailItemProps, i: number) => {
      thumbnailItemComponentArray.push(
        <ThumbnailItem key={ i } imageSource={ thumbnailItem.imageSource }
          description={ thumbnailItem.description }
          subheaderText={ thumbnailItem.subheaderText }
          handleThumbnailItemClick={ thumbnailItem.handleThumbnailItemClick }
        />
      );
    });
    return thumbnailItemComponentArray;
  }

  public render() {

    return (
      <div>
        { this.renderThumbnails() }
      </div>
    );
  }
}
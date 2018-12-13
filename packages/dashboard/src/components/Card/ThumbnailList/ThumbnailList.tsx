import * as React from 'react';
import { ThumbnailItem } from './ThumbnailItem';
import { IThumbnailListProps, IThumbnailItemProps } from './ThumbnailList.types';

export class ThumbnailList extends React.Component<IThumbnailListProps> {
  constructor(props: IThumbnailListProps) {
    super(props);
  }

  public render(): JSX.Element {
    return <div>{this._renderThumbnails()}</div>;
  }

  private _renderThumbnails(): React.ReactElement<ThumbnailItem>[] {
    const thumbnailList = this.props.thumbnailItems;
    const thumbnailItemComponentArray: React.ReactElement<ThumbnailItem>[] = [];
    thumbnailList.forEach((thumbnailItem: IThumbnailItemProps, i: number) => {
      thumbnailItemComponentArray.push(
        <ThumbnailItem
          key={i}
          imageSource={thumbnailItem.imageSource}
          description={thumbnailItem.description}
          subheaderText={thumbnailItem.subheaderText}
          handleThumbnailItemClick={thumbnailItem.handleThumbnailItemClick}
          imageAriaHidden={thumbnailItem.imageAriaHidden}
          altImageText={thumbnailItem.altImageText}
        />
      );
    });
    return thumbnailItemComponentArray;
  }
}

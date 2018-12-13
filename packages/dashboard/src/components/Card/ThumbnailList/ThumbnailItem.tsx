import * as React from 'react';
import { CompoundButton } from 'office-ui-fabric-react/lib/Button';
import { getThumbnailItemStyles, getCustomCommandBarStyles } from './ThumbnailList.styles';
import { classNamesFunction } from 'office-ui-fabric-react/lib/Utilities';
import { IThumbnailItemProps, IThumbnailItemStyles } from './ThumbnailList.types';
import { Image } from 'office-ui-fabric-react/lib/Image';

export class ThumbnailItem extends React.Component<IThumbnailItemProps> {
  constructor(props: IThumbnailItemProps) {
    super(props);
  }
  public render(): JSX.Element {
    const getClassNames = classNamesFunction<IThumbnailItemProps, IThumbnailItemStyles>();
    const classNames = getClassNames(getThumbnailItemStyles);
    const customStyles = getCustomCommandBarStyles();
    const { altImageText, imageAriaHidden, imageSource, subheaderText, description } = this.props;
    return (
      <div className={classNames.root}>
        <div className={classNames.image}>
          <Image src={imageSource} aria-hidden={imageAriaHidden} alt={altImageText} />
          <CompoundButton secondaryText={description} styles={customStyles} onClick={this.props.handleThumbnailItemClick}>
            {subheaderText}
          </CompoundButton>
        </div>
      </div>
    );
  }
}

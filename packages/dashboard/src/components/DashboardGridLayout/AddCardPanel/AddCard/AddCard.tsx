import * as React from 'react';

import { classNamesFunction } from 'office-ui-fabric-react/lib/Utilities';
import { IconButton } from 'office-ui-fabric-react/lib/Button';
import { Image, ImageFit } from 'office-ui-fabric-react/lib/Image';
import { getStyles } from './AddCard.styles';
import { IAddCardProps, IAddCardStyles } from './AddCard.types';

export class AddCard extends React.Component<IAddCardProps> {
  constructor(props: IAddCardProps) {
    super(props);
  }

  public render(): JSX.Element {
    const getClassNames = classNamesFunction<IAddCardProps, IAddCardStyles>();
    const classNames = getClassNames(getStyles!);
    const { title, imageSrc, description, id } = this.props;
    let imgClassName = classNames.imageWrapper;
    let textContainerClassName = classNames.textContainer;
    let addIconClassName = classNames.icon;
    if (id) {
      imgClassName = 'addCardImg' + id + ' ' + imgClassName;
      textContainerClassName = 'addCardText' + id + ' ' + textContainerClassName;
      addIconClassName = 'addCardIcon' + id + +addIconClassName;
    }
    return (
      <div
        className={classNames.root}
        onMouseEnter={this.mouseEnter.bind(this, imgClassName, textContainerClassName, addIconClassName)}
        onMouseLeave={this.mouseLeave.bind(this, imgClassName, textContainerClassName, addIconClassName)}
      >
        <div className={imgClassName}>
          <Image src={imageSrc} imageFit={ImageFit.cover} width={150} height={100} alt={title} />
        </div>
        <div className={textContainerClassName}>
          <div className={classNames.header}>{title}</div>
          <div className={classNames.bodyText}>{description}</div>
        </div>
        <div className={classNames.iconWrapper}>
          {/* tslint:disable-next-line:jsx-ban-props */}
          <div style={{ display: 'none' }} className={addIconClassName}>
            <IconButton
              onClick={this.cardClicked.bind(this, id)}
              menuIconProps={{ iconName: 'Add' }}
              styles={{
                root: {
                  selectors: {
                    div: {
                      alignItems: 'baseline'
                    }
                  }
                }
              }}
            />
          </div>
        </div>
      </div>
    );
  }

  private cardClicked = (cardId: string) => {
    if (this.props.cardClicked) {
      this.props.cardClicked(cardId);
    }
  };

  private mouseEnter = (imgClassName: string, textClassName: string, addCardIconClassName: string) => {
    const addCardImgElements = document.getElementsByClassName(imgClassName);
    if (addCardImgElements && addCardImgElements[0]) {
      (addCardImgElements[0] as HTMLElement).style.boxShadow = '0 1.2px 3.6px rgba(0,0,0,.18), 0 6.4px 14.4px rgba(0,0,0,.22)';
    }
    const addCardTextElements = document.getElementsByClassName(textClassName);
    if (addCardTextElements && addCardTextElements[0]) {
      (addCardTextElements[0] as HTMLElement).style.opacity = '.5';
    }
    const addCardIconElements = document.getElementsByClassName(addCardIconClassName);
    if (addCardIconElements && addCardIconElements[0]) {
      (addCardIconElements[0] as HTMLElement).style.display = 'block';
    }
  };

  private mouseLeave = (imgClassName: string, textClassName: string, addCardIconClassName: string) => {
    const addCardImgElements = document.getElementsByClassName(imgClassName);
    if (addCardImgElements && addCardImgElements[0]) {
      (addCardImgElements[0] as HTMLElement).style.boxShadow = '0 1.2px 1.8px rgba(0,0,0,.18), 0 3.2px 7.2px rgba(0,0,0,.22)';
    }
    const addCardTextElements = document.getElementsByClassName(textClassName);
    if (addCardTextElements && addCardTextElements[0]) {
      (addCardTextElements[0] as HTMLElement).style.opacity = '1';
    }
    const addCardIconElements = document.getElementsByClassName(addCardIconClassName);
    if (addCardIconElements && addCardIconElements[0]) {
      (addCardIconElements[0] as HTMLElement).style.display = 'none';
    }
  };
}

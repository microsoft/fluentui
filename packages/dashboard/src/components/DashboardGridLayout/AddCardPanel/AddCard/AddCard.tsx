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
    const { addCardIconAriaLabel, addCardImageAltText, title, imageSrc, description, id } = this.props;
    let imgClassName = classNames.imageWrapper;
    let textContainerClassName = classNames.textContainer;
    if (id) {
      imgClassName = 'addCardImg' + id + ' ' + imgClassName;
      textContainerClassName = 'addCardText' + id + ' ' + textContainerClassName;
    }
    return (
      <div
        id={'addCard' + id + 'DGL'}
        className={classNames.root}
        onMouseEnter={this.mouseEnter.bind(this, imgClassName, textContainerClassName)}
        onMouseLeave={this.mouseLeave.bind(this, imgClassName, textContainerClassName)}
        onMouseDown={this.dragPlaceholder}
      >
        <div className={imgClassName}>
          <Image src={imageSrc} imageFit={ImageFit.cover} width={150} height={100} alt={addCardImageAltText} />
        </div>
        <div className={textContainerClassName}>
          <div className={classNames.header} tabIndex={0} aria-label={title}>
            {title}
          </div>
          <div className={classNames.bodyText} tabIndex={0} aria-label={description}>
            {description}
          </div>
        </div>
        <div className={classNames.iconWrapper}>
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
            ariaLabel={addCardIconAriaLabel}
          />
        </div>
      </div>
    );
  }

  private dragPlaceholder = () => {
    window.document.addEventListener('mousemove', this.handleInitialMove);
    window.document.addEventListener('mouseup', this._releaseDrag);
  };

  private handleInitialMove = (event: MouseEvent) => {
    window.document.removeEventListener('mousemove', this.handleInitialMove);
    this.props.draggingCardCallback(this.props.id, this.props.title, this.props.cardSize, event.clientX, this.props.draggingAnimation);
  };

  private cardClicked = (cardId: string) => {
    if (this.props.cardClicked) {
      this.props.cardClicked(cardId);
    }
  };

  private _releaseDrag = () => {
    window.document.removeEventListener('mouseup', this._releaseDrag);
    window.document.removeEventListener('mousemove', this.handleInitialMove);
    this.props.expandAddCardPanelBack();
  };

  private mouseEnter = (imgClassName: string, textClassName: string) => {
    const addCardImgElements = document.getElementsByClassName(imgClassName);
    if (addCardImgElements && addCardImgElements[0]) {
      (addCardImgElements[0] as HTMLElement).style.boxShadow = '0 1.2px 3.6px rgba(0,0,0,.18), 0 6.4px 14.4px rgba(0,0,0,.22)';
    }
    const addCardTextElements = document.getElementsByClassName(textClassName);
    if (addCardTextElements && addCardTextElements[0]) {
      (addCardTextElements[0] as HTMLElement).style.opacity = '.5';
    }
  };

  private mouseLeave = (imgClassName: string, textClassName: string) => {
    const addCardImgElements = document.getElementsByClassName(imgClassName);
    if (addCardImgElements && addCardImgElements[0]) {
      (addCardImgElements[0] as HTMLElement).style.boxShadow = '0 1.2px 1.8px rgba(0,0,0,.18), 0 3.2px 7.2px rgba(0,0,0,.22)';
    }
    const addCardTextElements = document.getElementsByClassName(textClassName);
    if (addCardTextElements && addCardTextElements[0]) {
      (addCardTextElements[0] as HTMLElement).style.opacity = '1';
    }
  };
}

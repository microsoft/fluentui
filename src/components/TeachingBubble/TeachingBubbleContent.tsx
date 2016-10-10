/* tslint:disable:no-unused-variable */
import * as React from 'react';
/* tslint:enable:no-unused-variable */
import { BaseComponent } from '../../common/BaseComponent';
import { ITeachingBubbleProps } from './TeachingBubble.Props';
import { ITeachingBubbleState } from './TeachingBubble';
import { Button, ButtonType } from '../../Button';
import { Image, ImageFit } from '../../Image';
import { css, getId } from '../../Utilities';
import './TeachingBubble.scss';

export class TeachingBubbleContent extends BaseComponent<ITeachingBubbleProps, ITeachingBubbleState> {

  // Specify default props values
  public static defaultProps = {
    hasCondensedHeadline: false,
    imageProps: {
      imageFit: ImageFit.cover,
      width: 364,
      height: 130
    }
  };

  // Specify any private variables
  private _id: string;

  // Constructor
  constructor(props: ITeachingBubbleProps) {
    super(props);

    this._id = getId('TeachingBubble');
    this.state = {
    };
  }

  public render() {
    let { illustrationImage, primaryButtonProps, secondaryButtonProps, headline, hasCondensedHeadline, hasCloseIcon, onDismiss, closeButtonAriaLabel } = this.props;

    let imageContent;
    let headerContent;
    let bodyContent;
    let footerContent;
    let closeButton;

    if (illustrationImage && illustrationImage.src) {
      imageContent = (
         <div className='ms-TeachingBubble-header'>
            <Image { ...illustrationImage as any } />
         </div>
      );
     }

    if (headline) {
      headerContent = (
        <div className={ css(
              'ms-TeachingBubble-header',
              hasCondensedHeadline ? 'ms-TeachingBubble-header--small' : 'ms-TeachingBubble-header--large'
             ) }>
          <p className='ms-TeachingBubble-headline' >
            { headline }
          </p>
        </div>
      );
    }

    if (this.props.children) {
      bodyContent = (
        <div className='ms-TeachingBubble-body'>
          <p className='ms-TeachingBubble-subText'>
            { this.props.children }
          </p>
         </div>
      );
    }

    if (primaryButtonProps || secondaryButtonProps) {
      footerContent = (
        <div className='ms-TeachingBubble-footer'>
          { primaryButtonProps ? <Button className='ms-TeachingBubble-primaryButton' { ...primaryButtonProps }/> : null }
          { secondaryButtonProps ? <Button className='ms-TeachingBubble-secondaryButton' { ...secondaryButtonProps }/> : null }
        </div>
      );
    }

    if (hasCloseIcon) {
      closeButton = (
        <Button
          className='ms-TeachingBubble-closebutton'
          buttonType={ ButtonType.icon }
          icon='Cancel'
          rootProps={ { title: closeButtonAriaLabel } }
          ariaLabel={ closeButtonAriaLabel }
          onClick={ onDismiss }
        />
      );
    }

    return (
        <div className='ms-TeachingBubble-content'>
          { imageContent }
          { closeButton }
          <div className='ms-TeachingBubble-bodycontent'>
            { headerContent }
            { bodyContent   }
            { footerContent }
          </div>
        </div>
    );
  }
}
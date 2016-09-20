/* tslint:disable:no-unused-variable */
import * as React from 'react';
/* tslint:enable:no-unused-variable */
import { BaseComponent } from '../../common/BaseComponent';
import {
  ITeachingBubble,
  ITeachingBubbleProps
} from './TeachingBubble.Props';
import {
  Callout,
  Button,
  ButtonType,
  Image,
  ImageFit
} from '../../index';
import { DirectionalHint } from '../../common/DirectionalHint';
import { css } from '../../utilities';
import { getId } from '../../utilities/object';

import './TeachingBubble.scss';

export interface ITeachingBubbleState {
  isTeachingBubbleVisible?: boolean;
}

export class TeachingBubble extends BaseComponent<ITeachingBubbleProps, ITeachingBubbleState> implements ITeachingBubble {

  // State Any Initial Prop Values
  public static initialProps = {
    hasCondensedHeadline: false,
    primaryButtonProps: {
      type: ButtonType.primary
    },
    secondaryButtonProps: {
      type: ButtonType.normal
    },
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
    let { imageProps, primaryButtonProps, secondaryButtonProps, headline, hasCondensedHeadline, hasCloseIcon, body, targetElement, onDismiss, closeButtonAriaLabel } = this.props;

    let imageContent;
    let headerContent;
    let bodyContent;
    let footerContent;
    let closeButton;

    if (imageProps && imageProps.src) {
      imageContent = (
         <div className='ms-TeachingBubble-header'>
            <Image { ...imageProps as any } />
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

    // @TODO find better name for 'body'?
    // @TODO support passing through children unless this prop is present
    if (body) {
      bodyContent = (
        <div className='ms-TeachingBubble-body'>
          <p className='ms-TeachingBubble-subText'>
            { body }
          </p>
         </div>
      );
    }

    // @TODO support single button, i.e. only render the button passed in
    // @TODO update button to support passing in displayText as a property (Discuss with David)
    // @TODO button styles still need to be done to match redlines
    if (primaryButtonProps || secondaryButtonProps ) {
      footerContent = (
        <div className='ms-TeachingBubble-footer'>
          <Button { ...primaryButtonProps as any }>Button One</Button>
          <Button { ...secondaryButtonProps as any }>Button Two</Button>
        </div>
      );
    }

    if (hasCloseIcon) {
      closeButton = (
        <Button
          className='ms-TeachingBubble-button'
          buttonType={ ButtonType.icon }
          icon='Cancel'
          rootProps={ { title: closeButtonAriaLabel } }
          ariaLabel={ closeButtonAriaLabel }
          onClick={ onDismiss }
        />
      );
    }

    // MISC TODOS
    // @TODO fix example - currently clicking button jumps you to top of the page
    // @TODO remove unused styles from TeachingBubble.scss
    return (
        <Callout
          className='ms-TeachingBubble'
          ref={this._resolveRef('_callout')}
          beakStyle='ms-Callout-smallbeak'
          beakWidth= { 16 }
          gapSpace={ 20 }
          targetElement={ targetElement }
          setInitialFocus={ true }
          doNotLayer={ true }
          directionalHint={ DirectionalHint.leftBottomEdge }
        >
          { imageContent }
          { closeButton }
          <div className='ms-TeachingBubble-content'>
            { headerContent }
            { bodyContent   }
            { footerContent }
          </div>
        </Callout>
    );
  }
}
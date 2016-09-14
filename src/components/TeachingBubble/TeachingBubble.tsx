import * as React from 'react';
import { BaseComponent } from '../../common/BaseComponent';
import {
  ITeachingBubble,
  ITeachingBubbleProps,
  TeachingBubbleBGColor
} from './TeachingBubble.Props';
import {
  Callout,
  CalloutBackgroundColor,
  Button,
  ButtonType,
  Image,
  IImageProps,
  ImageFit
} from '../../index';
import { css } from '../../utilities/css';
import { getId } from '../../utilities/object';

import './TeachingBubble.scss';

export interface ITeachingBubbleState {
  isTeachingBubbleVisible?: boolean;
}

export class TeachingBubble extends BaseComponent<ITeachingBubbleProps, ITeachingBubbleState> implements ITeachingBubble {

  // State Any Initial Prop Values
  public static initialProps = {
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
    let { title, body, img, backgroundColor, targetElement } = this.props;
    let imageProps: IImageProps = {
      src: img,
      imageFit: ImageFit.cover,
      width: 220,
      height: 130
    };
    let CalloutColor;
    let TeachingBubbleTheme;

    switch (backgroundColor) {
      case TeachingBubbleBGColor.white:
        CalloutColor = CalloutBackgroundColor.white;
        TeachingBubbleTheme = 'ms-TeachingBubble--light';
        break;
      case TeachingBubbleBGColor.blue:
        CalloutColor = CalloutBackgroundColor.blue;
        TeachingBubbleTheme = 'ms-TeachingBubble--dark';
        break;
    }

    let headerContent;
    let footerContent;

    if (img) {
      headerContent = (
        <div className='ms-TeachingBubble-header'>
          <Image { ...imageProps as any } />
        </div>
      );
    } else if (title) {
      headerContent = (
        <div className='ms-TeachingBubble-header'>
          <p className='ms-TeachingBubble-title'>
            { title }
          </p>
        </div>
      );
    }

    footerContent = (
      <div className='ms-TeachingBubble-actions'>
        <Button buttonType={ ButtonType.primary } >Save</Button>
        <Button>Cancel</Button>
      </div>
    );

    return (
      <Callout
        className='ms-TeachingBubble-callout'
        gapSpace={ 20 }
        targetElement={ targetElement }
        hasCloseButton= { true }
        onDismiss={ (ev: any) => { this.dismiss(); } }
        setInitialFocus={ true }
        backgroundColor={ CalloutColor }
      >
        <div className={
          css('ms-TeachingBubble', TeachingBubbleTheme)
        }>

        { headerContent }

          <div className='ms-TeachingBubble-inner'>
            <div className='ms-TeachingBubble-content'>
              <p className='ms-TeachingBubble-subText'>
               { body }
              </p>
            </div>
          </div>
        </div>
        </Callout>
    );
  }

  public dismiss() {
    let { onDismiss } = this.props;

    if (onDismiss) {
      onDismiss();
    }
  }

}

import * as React from 'react';
import { BaseComponent, css, createRef } from '../../Utilities';
import { ITeachingBubbleProps, ITeachingBubble } from './TeachingBubble.types';
import { ITeachingBubbleState } from './TeachingBubble';
import { PrimaryButton, DefaultButton, IconButton } from '../../Button';
import { Image, ImageFit } from '../../Image';
import * as stylesImport from './TeachingBubble.scss';
const styles: any = stylesImport;

export class TeachingBubbleContent extends BaseComponent<ITeachingBubbleProps, ITeachingBubbleState>
  implements ITeachingBubble {
  // Specify default props values
  public static defaultProps = {
    hasCondensedHeadline: false,
    imageProps: {
      imageFit: ImageFit.cover,
      width: 364,
      height: 130
    }
  };

  private _rootElement = createRef<HTMLDivElement>();

  constructor(props: ITeachingBubbleProps) {
    super(props);

    this.state = {};
  }

  public focus(): void {
    if (this._rootElement.current) {
      this._rootElement.current.focus();
    }
  }

  public render(): JSX.Element {
    const {
      illustrationImage,
      primaryButtonProps,
      secondaryButtonProps,
      headline,
      hasCondensedHeadline,
      hasCloseIcon,
      onDismiss,
      closeButtonAriaLabel,
      hasSmallHeadline,
      children,
      ariaDescribedBy,
      ariaLabelledBy
    } = this.props;

    let imageContent;
    let headerContent;
    let bodyContent;
    let footerContent;
    let closeButton;

    if (illustrationImage && illustrationImage.src) {
      imageContent = (
        <div className={'ms-TeachingBubble-header ms-TeachingBubble-image'}>
          <Image {...illustrationImage as any} />
        </div>
      );
    }

    if (headline) {
      headerContent = (
        <div
          className={css(
            'ms-TeachingBubble-header',
            hasCondensedHeadline
              ? 'ms-TeachingBubble-header--condensed ' + styles.headerIsCondensed
              : hasSmallHeadline
                ? 'ms-TeachingBubble-header--small ' + styles.headerIsSmall
                : 'ms-TeachingBubble-header--large ' + styles.headerIsLarge
          )}
        >
          <p className={css('ms-TeachingBubble-headline', styles.headline)} id={ariaLabelledBy}>
            {headline}
          </p>
        </div>
      );
    }

    if (children) {
      bodyContent = (
        <div className={css('ms-TeachingBubble-body', styles.body)}>
          <p className={css('ms-TeachingBubble-subText', styles.subText)} id={ariaDescribedBy}>
            {this.props.children}
          </p>
        </div>
      );
    }

    if (primaryButtonProps || secondaryButtonProps) {
      footerContent = (
        <div className={css('ms-TeachingBubble-footer', styles.footer)}>
          {primaryButtonProps && (
            <PrimaryButton
              {...primaryButtonProps}
              className={css('ms-TeachingBubble-primaryButton', styles.primaryButton, primaryButtonProps.className)}
            />
          )}
          {secondaryButtonProps && (
            <DefaultButton
              {...secondaryButtonProps}
              className={css(
                'ms-TeachingBubble-secondaryButton',
                styles.secondaryButton,
                secondaryButtonProps.className
              )}
            />
          )}
        </div>
      );
    }

    if (hasCloseIcon) {
      closeButton = (
        <IconButton
          className={css('ms-TeachingBubble-closebutton', styles.closeButton)}
          iconProps={{ iconName: 'Cancel' }}
          title={closeButtonAriaLabel}
          ariaLabel={closeButtonAriaLabel}
          onClick={onDismiss}
        />
      );
    }

    return (
      <div
        ref={this._rootElement}
        className={css('ms-TeachingBubble-content', styles.root)}
        role={'dialog'}
        tabIndex={-1}
        aria-labelledby={ariaLabelledBy}
        aria-describedby={ariaDescribedBy}
      >
        {imageContent}
        {closeButton}
        <div className={css('ms-TeachingBubble-bodycontent', styles.bodyContent)}>
          {headerContent}
          {bodyContent}
          {footerContent}
        </div>
      </div>
    );
  }
}

import * as React from 'react';
import { BaseComponent, classNamesFunction } from '../../Utilities';
import { ITeachingBubbleProps, ITeachingBubbleStyleProps, ITeachingBubbleStyles } from './TeachingBubble.types';
import { ITeachingBubbleState } from './TeachingBubble.base';
import { PrimaryButton, DefaultButton, IconButton } from '../../Button';
import { Image, ImageFit } from '../../Image';

const getClassNames = classNamesFunction<ITeachingBubbleStyleProps, ITeachingBubbleStyles>();

export class TeachingBubbleContentBase extends BaseComponent<ITeachingBubbleProps, ITeachingBubbleState> {
  // Specify default props values
  public static defaultProps = {
    hasCondensedHeadline: false,
    imageProps: {
      imageFit: ImageFit.cover,
      width: 364,
      height: 130
    }
  };

  constructor(props: ITeachingBubbleProps) {
    super(props);

    this.state = {};
  }

  public render(): JSX.Element {
    const {
      children,
      illustrationImage,
      primaryButtonProps,
      secondaryButtonProps,
      headline,
      hasCondensedHeadline,
      hasCloseIcon,
      onDismiss,
      closeButtonAriaLabel,
      hasSmallHeadline,
      isWide,
      styles,
      theme
    } = this.props;

    let imageContent;
    let headerContent;
    let bodyContent;
    let footerContent;
    let closeButton;

    const classNames = getClassNames(styles, {
      theme: theme!,
      hasCondensedHeadline,
      hasSmallHeadline,
      isWide,
      primaryButtonClassName: primaryButtonProps ? primaryButtonProps.className : undefined,
      secondaryButtonClassName: secondaryButtonProps ? secondaryButtonProps.className : undefined
    });

    if (illustrationImage && illustrationImage.src) {
      imageContent = (
        <div className={classNames.imageContent}>
          <Image {...illustrationImage as any} />
        </div>
      );
    }

    if (headline) {
      headerContent = (
        <div className={classNames.header}>
          <p className={classNames.headline}>{headline}</p>
        </div>
      );
    }

    if (children) {
      bodyContent = (
        <div className={classNames.body}>
          <p className={classNames.subText}>{children}</p>
        </div>
      );
    }

    if (primaryButtonProps || secondaryButtonProps) {
      footerContent = (
        <div className={classNames.footer}>
          {primaryButtonProps && <PrimaryButton {...primaryButtonProps} className={classNames.primaryButton} />}
          {secondaryButtonProps && <DefaultButton {...secondaryButtonProps} className={classNames.secondaryButton} />}
        </div>
      );
    }

    if (hasCloseIcon) {
      closeButton = (
        <IconButton
          className={classNames.closeButton}
          iconProps={{ iconName: 'Cancel' }}
          title={closeButtonAriaLabel}
          ariaLabel={closeButtonAriaLabel}
          onClick={onDismiss}
        />
      );
    }

    return (
      <div className={classNames.content}>
        {imageContent}
        <div className={classNames.bodyContent}>
          {headerContent}
          {bodyContent}
          {footerContent}
        </div>
        {closeButton}
      </div>
    );
  }
}

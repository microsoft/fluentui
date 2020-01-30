import * as React from 'react';
import { BaseComponent, classNamesFunction, KeyCodes } from '../../Utilities';
import { ITeachingBubbleProps, ITeachingBubbleStyleProps, ITeachingBubbleStyles } from './TeachingBubble.types';
import { ITeachingBubbleState } from './TeachingBubble.base';
import { PrimaryButton, DefaultButton, IconButton } from '../../Button';
import { Image, ImageFit } from '../../Image';
import { Stack } from '../../Stack';
import { FocusTrapZone } from '../../FocusTrapZone';

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

  public rootElement = React.createRef<HTMLDivElement>();

  constructor(props: ITeachingBubbleProps) {
    super(props);

    this.state = {};
  }

  public componentDidMount(): void {
    if (this.props.onDismiss) {
      document.addEventListener('keydown', this._onKeyDown, false);
    }
  }

  public componentWillUnmount(): void {
    if (this.props.onDismiss) {
      document.removeEventListener('keydown', this._onKeyDown);
    }
  }

  public focus(): void {
    if (this.rootElement.current) {
      this.rootElement.current.focus();
    }
  }

  public render(): JSX.Element {
    const {
      children,
      illustrationImage,
      primaryButtonProps,
      secondaryButtonProps,
      headline,
      hasCondensedHeadline,
      hasCloseButton = this.props.hasCloseIcon,
      onDismiss,
      closeButtonAriaLabel,
      hasSmallHeadline,
      isWide,
      styles,
      theme,
      ariaDescribedBy,
      ariaLabelledBy,
      footerContent: customFooterContent
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
      hasCloseButton,
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
      const HeaderWrapperAs = typeof headline === 'string' ? 'p' : 'div';

      headerContent = (
        <div className={classNames.header}>
          <HeaderWrapperAs role="heading" className={classNames.headline} id={ariaLabelledBy}>
            {headline}
          </HeaderWrapperAs>
        </div>
      );
    }

    if (children) {
      const BodyContentWrapperAs = typeof children === 'string' ? 'p' : 'div';

      bodyContent = (
        <div className={classNames.body}>
          <BodyContentWrapperAs className={classNames.subText} id={ariaDescribedBy}>
            {children}
          </BodyContentWrapperAs>
        </div>
      );
    }

    if (primaryButtonProps || secondaryButtonProps || customFooterContent) {
      footerContent = (
        <Stack className={classNames.footer} horizontal horizontalAlign={customFooterContent ? 'space-between' : 'end'}>
          <Stack.Item align="center">{<span>{customFooterContent}</span>}</Stack.Item>
          <Stack.Item>
            {secondaryButtonProps && <DefaultButton {...secondaryButtonProps} className={classNames.secondaryButton} />}
            {primaryButtonProps && <PrimaryButton {...primaryButtonProps} className={classNames.primaryButton} />}
          </Stack.Item>
        </Stack>
      );
    }

    if (hasCloseButton) {
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
      <div
        className={classNames.content}
        ref={this.rootElement}
        role={'dialog'}
        tabIndex={-1}
        aria-labelledby={ariaLabelledBy}
        aria-describedby={ariaDescribedBy}
        data-is-focusable={true}
      >
        {imageContent}
        <FocusTrapZone isClickableOutsideFocusTrap={true}>
          <div className={classNames.bodyContent}>
            {headerContent}
            {bodyContent}
            {footerContent}
            {closeButton}
          </div>
        </FocusTrapZone>
      </div>
    );
  }

  private _onKeyDown = (e: any): void => {
    if (this.props.onDismiss) {
      if (e.which === KeyCodes.escape) {
        this.props.onDismiss();
      }
    }
  };
}

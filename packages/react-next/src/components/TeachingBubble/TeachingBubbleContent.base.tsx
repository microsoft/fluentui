import * as React from 'react';
import { classNamesFunction, KeyCodes } from '../../Utilities';
import {
  ITeachingBubbleProps,
  ITeachingBubbleStyleProps,
  ITeachingBubbleStyles,
  ITeachingBubble,
} from './TeachingBubble.types';
import { PrimaryButton, DefaultButton, IconButton } from '../../compat/Button';
import { Stack } from '../../Stack';
import { FocusTrapZone } from '../../FocusTrapZone';
import { Image } from '../../Image';
import { useOnEvent, useMergedRefs } from '@uifabric/react-hooks';
import { getDocument } from '../../Utilities';

const getClassNames = classNamesFunction<ITeachingBubbleStyleProps, ITeachingBubbleStyles>();

const useComponentRef = (
  componentRef: React.Ref<ITeachingBubble> | undefined,
  rootElementRef: React.RefObject<HTMLDivElement>,
) => {
  React.useImperativeHandle(
    componentRef,
    () => ({
      focus: () => rootElementRef.current?.focus(),
    }),
    [rootElementRef],
  );
};

export const TeachingBubbleContentBase: React.FunctionComponent<ITeachingBubbleProps> = React.forwardRef(
  (props, forwardedRef: React.Ref<HTMLDivElement>) => {
    const rootElementRef = React.useRef<HTMLDivElement>(null);
    const mergedRootRef = useMergedRefs(rootElementRef, forwardedRef);

    const {
      illustrationImage,
      primaryButtonProps,
      secondaryButtonProps,
      headline,
      hasCondensedHeadline,
      // eslint-disable-next-line deprecation/deprecation
      hasCloseButton = props.hasCloseIcon,
      onDismiss,
      closeButtonAriaLabel,
      hasSmallHeadline,
      isWide,
      styles,
      theme,
      ariaDescribedBy,
      ariaLabelledBy,
      footerContent: customFooterContent,
      focusTrapZoneProps,
    } = props;

    const classNames = getClassNames(styles, {
      theme: theme!,
      hasCondensedHeadline,
      hasSmallHeadline,
      hasCloseButton,
      hasHeadline: !!headline,
      isWide,
      primaryButtonClassName: primaryButtonProps ? primaryButtonProps.className : undefined,
      secondaryButtonClassName: secondaryButtonProps ? secondaryButtonProps.className : undefined,
    });

    const onKeyDown = React.useCallback(
      (ev: React.KeyboardEvent<HTMLElement> | KeyboardEvent): void => {
        if (props.onDismiss) {
          // eslint-disable-next-line deprecation/deprecation
          if (ev.which === KeyCodes.escape) {
            props.onDismiss(ev);
          }
        }
      },
      [props.onDismiss],
    );

    useOnEvent(getDocument(rootElementRef.current), 'keydown', onKeyDown as (ev: Event) => void);

    let imageContent;
    let headerContent;
    let bodyContent;
    let footerContent;
    let closeButton;

    if (illustrationImage && illustrationImage.src) {
      imageContent = (
        <div className={classNames.imageContent}>
          <Image
            {
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              ...(illustrationImage as any)
            }
          />
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

    if (props.children) {
      const BodyContentWrapperAs = typeof props.children === 'string' ? 'p' : 'div';

      bodyContent = (
        <div className={classNames.body}>
          <BodyContentWrapperAs className={classNames.subText} id={ariaDescribedBy}>
            {props.children}
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

    useComponentRef(props.componentRef, rootElementRef);

    return (
      <div
        className={classNames.content}
        ref={mergedRootRef}
        role={'dialog'}
        tabIndex={-1}
        aria-labelledby={ariaLabelledBy}
        aria-describedby={ariaDescribedBy}
        data-is-focusable
      >
        {imageContent}
        <FocusTrapZone isClickableOutsideFocusTrap {...focusTrapZoneProps}>
          <div className={classNames.bodyContent}>
            {headerContent}
            {bodyContent}
            {footerContent}
            {closeButton}
          </div>
        </FocusTrapZone>
      </div>
    );
  },
);

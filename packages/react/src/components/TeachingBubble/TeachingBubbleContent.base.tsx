import * as React from 'react';
import { classNamesFunction, KeyCodes } from '../../Utilities';
import { PrimaryButton, DefaultButton, IconButton } from '../../Button';
import { Stack } from '../../Stack';
import { FocusTrapZone } from '../../FocusTrapZone';
import { Image } from '../../Image';
import { useOnEvent, useMergedRefs, useId } from '@fluentui/react-hooks';
import { useDocument } from '../../WindowProvider';
import type {
  ITeachingBubbleProps,
  ITeachingBubbleStyleProps,
  ITeachingBubbleStyles,
  ITeachingBubble,
} from './TeachingBubble.types';

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

export const TeachingBubbleContentBase: React.FunctionComponent<ITeachingBubbleProps> = React.forwardRef<
  HTMLDivElement,
  ITeachingBubbleProps
>((props, forwardedRef) => {
  const rootElementRef = React.useRef<HTMLDivElement>(null);
  const documentRef = useDocument();
  const mergedRootRef = useMergedRefs(rootElementRef, forwardedRef);

  const ariaDescribedById = useId('teaching-bubble-content-');
  const ariaLabelledById = useId('teaching-bubble-title-');

  const ariaDescribedBy = props.ariaDescribedBy ?? ariaDescribedById;
  const ariaLabelledBy = props.ariaLabelledBy ?? ariaLabelledById;

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
      if (onDismiss) {
        // eslint-disable-next-line deprecation/deprecation
        if (ev.which === KeyCodes.escape) {
          onDismiss(ev);
        }
      }
    },
    [onDismiss],
  );

  useOnEvent(documentRef, 'keydown', onKeyDown as (ev: Event) => void);

  let imageContent: JSX.Element | undefined;
  let headerContent: JSX.Element | undefined;
  let bodyContent: JSX.Element | undefined;
  let footerContent: JSX.Element | undefined;
  let closeButton: JSX.Element | undefined;

  if (illustrationImage && illustrationImage.src) {
    imageContent = (
      <div className={classNames.imageContent}>
        <Image {...(illustrationImage as any)} />
      </div>
    );
  }

  if (headline) {
    const HeaderWrapperAs = typeof headline === 'string' ? 'p' : 'div';

    headerContent = (
      <div className={classNames.header}>
        <HeaderWrapperAs role="heading" aria-level={3} className={classNames.headline} id={ariaLabelledBy}>
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
          {primaryButtonProps && <PrimaryButton {...primaryButtonProps} className={classNames.primaryButton} />}
          {secondaryButtonProps && <DefaultButton {...secondaryButtonProps} className={classNames.secondaryButton} />}
        </Stack.Item>
      </Stack>
    );
  }

  if (hasCloseButton) {
    closeButton = (
      <IconButton
        className={classNames.closeButton}
        iconProps={{ iconName: 'Cancel' }}
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
});

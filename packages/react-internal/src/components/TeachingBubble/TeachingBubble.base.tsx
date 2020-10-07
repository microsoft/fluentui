import * as React from 'react';
import { classNamesFunction } from '../../Utilities';
import { TeachingBubbleContent } from './TeachingBubbleContent';
import {
  ITeachingBubble,
  ITeachingBubbleProps,
  ITeachingBubbleStyleProps,
  ITeachingBubbleStyles,
  ITeachingBubbleSubComponentStyles,
} from './TeachingBubble.types';
import { Callout, ICalloutProps } from '../../Callout';
import { DirectionalHint } from '../../common/DirectionalHint';
import { useMergedRefs } from '@uifabric/react-hooks';

const COMPONENT_NAME = 'TeachingBubble';
const defaultCalloutProps: ICalloutProps = {
  beakWidth: 16,
  gapSpace: 0,
  setInitialFocus: true,
  doNotLayer: false,
  directionalHint: DirectionalHint.rightCenter,
};

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

export const TeachingBubbleBase: React.FunctionComponent<ITeachingBubbleProps> = React.forwardRef<
  HTMLDivElement,
  ITeachingBubbleProps
>((props, forwardedRef) => {
  const rootElementRef = React.useRef<HTMLDivElement>(null);
  const mergedRootRef = useMergedRefs(rootElementRef, forwardedRef);
  const {
    calloutProps: setCalloutProps,
    // eslint-disable-next-line deprecation/deprecation
    targetElement,
    onDismiss,
    // eslint-disable-next-line deprecation/deprecation
    hasCloseButton = props.hasCloseIcon,
    isWide,
    styles,
    theme,
    target,
  } = props;

  const calloutProps: ICalloutProps = React.useMemo(() => ({ ...defaultCalloutProps, ...setCalloutProps }), [
    setCalloutProps,
  ]);

  const stylesProps: ITeachingBubbleStyleProps = {
    theme: theme!,
    isWide,
    calloutProps: calloutProps as ICalloutProps & Required<Pick<ICalloutProps, 'theme'>>,
    hasCloseButton,
  };

  const classNames = getClassNames(styles, stylesProps);
  const calloutStyles = classNames.subComponentStyles
    ? (classNames.subComponentStyles as ITeachingBubbleSubComponentStyles).callout
    : undefined;

  useComponentRef(props.componentRef, rootElementRef);

  return (
    <Callout
      target={target || targetElement}
      onDismiss={onDismiss}
      {...calloutProps}
      className={classNames.root}
      styles={calloutStyles}
      hideOverflow
    >
      <div ref={mergedRootRef}>
        <TeachingBubbleContent {...props} />
      </div>
    </Callout>
  );
});
TeachingBubbleBase.displayName = COMPONENT_NAME;

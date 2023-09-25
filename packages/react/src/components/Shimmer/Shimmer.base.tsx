import * as React from 'react';
import { classNamesFunction, DelayedRender, getNativeProps, divProperties } from '../../Utilities';
import { ShimmerElementsGroup } from './ShimmerElementsGroup/ShimmerElementsGroup';
import { useSetTimeout, useConst } from '@fluentui/react-hooks';
import type { IShimmerProps, IShimmerStyleProps, IShimmerStyles } from './Shimmer.types';

const TRANSITION_ANIMATION_INTERVAL = 200; /* ms */
const COMPONENT_NAME = 'Shimmer';

const getClassNames = classNamesFunction<IShimmerStyleProps, IShimmerStyles>();

/**
 * {@docCategory Shimmer}
 */
export const ShimmerBase: React.FunctionComponent<IShimmerProps> = React.forwardRef<HTMLDivElement, IShimmerProps>(
  (props, ref) => {
    const {
      styles,
      shimmerElements,
      children,
      width,
      className,
      customElementsGroup,
      theme,
      ariaLabel,
      shimmerColors,
      isDataLoaded = false,
      improveCSSPerformance,
    } = props;

    const divProps = getNativeProps<React.HTMLAttributes<HTMLDivElement>>(props, divProperties);

    const classNames: { [key in keyof IShimmerStyles]: string } = getClassNames(styles!, {
      theme: theme!,
      isDataLoaded,
      className,
      transitionAnimationInterval: TRANSITION_ANIMATION_INTERVAL,
      shimmerColor: shimmerColors && shimmerColors.shimmer,
      shimmerWaveColor: shimmerColors && shimmerColors.shimmerWave,
      improveCSSPerformance: improveCSSPerformance || !customElementsGroup,
    });

    const internalState = useConst({
      lastTimeoutId: 0,
    });

    const { setTimeout, clearTimeout } = useSetTimeout();

    /**
     * Flag for knowing when to remove the shimmerWrapper from the DOM.
     */
    const [contentLoaded, setContentLoaded] = React.useState(isDataLoaded);

    const divStyleProp = { width: width ? width : '100%' };

    React.useEffect(() => {
      if (isDataLoaded !== contentLoaded) {
        if (isDataLoaded) {
          internalState.lastTimeoutId = setTimeout(() => {
            setContentLoaded(true);
          }, TRANSITION_ANIMATION_INTERVAL);

          return () => clearTimeout(internalState.lastTimeoutId);
        } else {
          setContentLoaded(false);
        }
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps -- Should only run when isDataLoaded changes.
    }, [isDataLoaded]);

    return (
      <div {...divProps} className={classNames.root} ref={ref}>
        {!contentLoaded && (
          <div style={divStyleProp} className={classNames.shimmerWrapper}>
            <div className={classNames.shimmerGradient} />
            {customElementsGroup ? (
              customElementsGroup
            ) : (
              <ShimmerElementsGroup
                shimmerElements={shimmerElements}
                backgroundColor={shimmerColors && shimmerColors.background}
              />
            )}
          </div>
        )}
        {children && <div className={classNames.dataWrapper}>{children}</div>}
        {ariaLabel && !isDataLoaded && (
          <div role="status" aria-live="polite">
            <DelayedRender>
              <div className={classNames.screenReaderText}>{ariaLabel}</div>
            </DelayedRender>
          </div>
        )}
      </div>
    );
  },
);
ShimmerBase.displayName = COMPONENT_NAME;

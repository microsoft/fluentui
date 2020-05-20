import * as React from 'react';
import { ISliderProps, ISliderStyleProps, ISliderStyles, ISliderState } from './Slider.types';
import { useId, useBoolean, useControllableValue } from '@uifabric/react-hooks';
import { KeyCodes, css, getRTL, getRTLSafeKeyCode, warnMutuallyExclusive, on, FocusRects } from '../../Utilities';
import { classNamesFunction, getNativeProps, divProperties } from '../../Utilities';

const getClassNames = classNamesFunction<ISliderStyleProps, ISliderStyles>({
  useStaticStyles: true,
});

const useComponentRef = (props: ISliderProps, thumb: React.RefObject<HTMLSpanElement>, value: number | undefined) => {
  React.useImperativeHandle(
    props.componentRef,
    () => ({
      get value() {
        return value;
      },
      focus() {
        if (thumb.current) {
          thumb.current.focus();
        }
      },
    }),
    [value],
  );
};

export const useSlider: (props: ISliderProps, ref: React.Ref<HTMLDivElement>) => ISliderState = (props, ref) => {
  const {
    step = 1,
    ariaLabel,
    className,
    disabled = false,
    label,
    max = 10,
    min = 0,
    showValue = true,
    buttonProps = {},
    vertical = false,
    valueFormat,
    styles,
    theme,
    originFromZero = false,
  } = props;
  const [useShowTransitions, { toggle: toggleUseShowTransitions }] = useBoolean(true);
  const classNames = getClassNames(styles, {
    className,
    disabled,
    vertical,
    showTransitions: useShowTransitions,
    showValue,
    theme: theme!,
  });
  const rootProps = {
    className: classNames.root,
    ref: ref,
  };

  return {
    root: rootProps,
  };
};

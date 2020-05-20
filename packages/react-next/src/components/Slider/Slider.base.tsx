import * as React from 'react';
import { KeyCodes, css, getRTL, getRTLSafeKeyCode, warnMutuallyExclusive, on, FocusRects } from '../../Utilities';
import { ISliderProps, ISliderStyleProps, ISliderStyles } from './Slider.types';
import { classNamesFunction, getNativeProps, divProperties } from '../../Utilities';
import { Label } from '../../Label';
import { useBoolean, useControllableValue } from '@uifabric/react-hooks';
import { useSlider } from './useSlider';

const getClassNames = classNamesFunction<ISliderStyleProps, ISliderStyles>({
  useStaticStyles: true,
});

const COMPONENT_NAME = 'SliderBase';
export const ONKEYDOWN_TIMEOUT_DURATION = 1000;

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
const SliderLabel = (props: {
  className?: string;
  label?: string;
  ariaLabel?: string;
  disabled?: boolean;
  id?: string;
}) => {
  const { className, label, ariaLabel, disabled, id } = props;

  if (!label) {
    return null;
  }

  return (
    <Label className={className} {...(ariaLabel ? {} : { htmlFor: id })} disabled={disabled}>
      {label}
    </Label>
  );
};

export const SliderBase = React.forwardRef((props: ISliderProps, ref: React.Ref<HTMLDivElement>) => {
  const thumb = React.useRef<HTMLSpanElement>(null);
  const [useShowTransitions, { toggle: toggleUseShowTransitions }] = useBoolean(true);
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
  // Ensure that value is always a number and is clamped by min/max.

  const slotProps = useSlider(props, ref);
  const thumbOffsetPercent: number = min === max ? 0 : ((slotProps.value! - min!) / (max! - min!)) * 100;
  const zeroOffsetPercent: number = min! >= 0 ? 0 : (-min! / (max! - min!)) * 100;
  const lengthString = vertical ? 'height' : 'width';
  const classNames = getClassNames(styles, {
    className,
    disabled,
    vertical,
    showTransitions: useShowTransitions,
    showValue,
    theme: theme!,
  });
  const inactiveSectionStyles = { [lengthString]: Math.min(thumbOffsetPercent, zeroOffsetPercent) + '%' };
  const activeSectionStyles = { [lengthString]: Math.abs(zeroOffsetPercent - thumbOffsetPercent) + '%' };
  const inactiveSectionFromZeroStyles = {
    [lengthString]: Math.min(100 - thumbOffsetPercent, 100 - zeroOffsetPercent) + '%',
  };
  const activeSectionOffsetStyles = { [lengthString]: thumbOffsetPercent + '%' };
  const inactiveSectionOffsetStyles = { [lengthString]: 100 - thumbOffsetPercent + '%' };

  warnMutuallyExclusive(COMPONENT_NAME, props, {
    value: 'defaultValue',
  });

  const getStyleUsingOffsetPercent = (verticalProp: boolean | undefined, thumbOffsetPercentProp: number): any => {
    const direction: string = verticalProp ? 'bottom' : getRTL(props.theme) ? 'right' : 'left';
    return {
      [direction]: thumbOffsetPercentProp + '%',
    };
  };

  useComponentRef(props, thumb, slotProps.value);

  return (
    <div {...slotProps.root}>
      <SliderLabel {...slotProps.label} />
      <div {...slotProps.container}>
        <div {...slotProps.sliderBox}>
          <div ref={slotProps.sliderLine} className={classNames.line}>
            {originFromZero && (
              <span
                className={css(classNames.zeroTick)}
                style={getStyleUsingOffsetPercent(vertical, zeroOffsetPercent)}
              />
            )}
            <span
              ref={thumb}
              className={classNames.thumb}
              style={getStyleUsingOffsetPercent(vertical, thumbOffsetPercent)}
            />
            {originFromZero ? (
              <>
                <span
                  className={css(classNames.lineContainer, classNames.inactiveSection)}
                  style={inactiveSectionStyles}
                />
                <span className={css(classNames.lineContainer, classNames.activeSection)} style={activeSectionStyles} />
                <span
                  className={css(classNames.lineContainer, classNames.inactiveSection)}
                  style={inactiveSectionFromZeroStyles}
                />
              </>
            ) : (
              <>
                <span
                  className={css(classNames.lineContainer, classNames.activeSection)}
                  style={activeSectionOffsetStyles}
                />
                <span
                  className={css(classNames.lineContainer, classNames.inactiveSection)}
                  style={inactiveSectionOffsetStyles}
                />
              </>
            )}
          </div>
        </div>
        {showValue && (
          <Label className={classNames.valueLabel} disabled={disabled}>
            {valueFormat ? valueFormat(slotProps.value!) : slotProps.value}
          </Label>
        )}
      </div>
      <FocusRects />
    </div>
  ) as React.ReactElement<{}>;
});
SliderBase.displayName = COMPONENT_NAME;

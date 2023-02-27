import * as React from 'react';
import { classNamesFunction, css, format, divProperties, getNativeProps, useFocusRects } from '../../Utilities';
import { Icon } from '../../Icon';
import { FocusZone, FocusZoneDirection } from '../../FocusZone';
import { RatingSize } from './Rating.types';
import { useId, useWarnings, useControllableValue, useMergedRefs } from '@fluentui/react-hooks';
import type { IRatingProps, IRatingStyleProps, IRatingStyles, IRating, IRatingStarProps } from './Rating.types';

const getClassNames = classNamesFunction<IRatingStyleProps, IRatingStyles>();

const RatingStar = (props: IRatingStarProps) => {
  return (
    <div className={props.classNames.ratingStar}>
      <Icon
        className={props.classNames.ratingStarBack}
        iconName={props.fillPercentage === 0 || props.fillPercentage === 100 ? props.icon : props.unselectedIcon}
      />
      {!props.disabled && (
        <Icon
          className={props.classNames.ratingStarFront}
          iconName={props.icon}
          style={{ width: props.fillPercentage + '%' }}
        />
      )}
    </div>
  );
};

const useComponentRef = (componentRef: React.Ref<IRating> | undefined, rating: number) => {
  React.useImperativeHandle(
    componentRef,
    () => ({
      rating,
    }),
    [rating],
  );
};

const useDebugWarnings = (props: IRatingProps) => {
  if (process.env.NODE_ENV !== 'production') {
    // eslint-disable-next-line react-hooks/rules-of-hooks -- build-time conditional
    useWarnings({
      name: 'Rating',
      props,
      controlledUsage: {
        valueProp: 'rating',
        defaultValueProp: 'defaultRating',
        onChangeProp: 'onChange',
        readOnlyProp: 'readOnly',
      },
    });
  }
};

const getClampedRating = (rating: number | undefined, min: number, max: number): number => {
  return Math.min(Math.max(rating ?? min, min), max);
};

const getFillingPercentage = (starNum: number, displayRating: number): number => {
  const ceilValue = Math.ceil(displayRating);
  let fillPercentage = 100;

  if (starNum === displayRating) {
    fillPercentage = 100;
  } else if (starNum === ceilValue) {
    fillPercentage = 100 * (displayRating % 1);
  } else if (starNum > ceilValue) {
    fillPercentage = 0;
  }
  return fillPercentage;
};

const getStarId = (id: string, starNum: number) => {
  return `${id}-star-${starNum - 1}`;
};

export const RatingBase: React.FunctionComponent<IRatingProps> = React.forwardRef<HTMLDivElement, IRatingProps>(
  (props, forwardedRef) => {
    const id = useId('Rating');
    const labelId = useId('RatingLabel');
    const {
      ariaLabel,
      ariaLabelFormat,
      disabled,
      getAriaLabel,
      styles,
      // eslint-disable-next-line deprecation/deprecation
      min: minFromProps = props.allowZeroStars ? 0 : 1,
      max = 5,
      readOnly,
      size,
      theme,
      icon = 'FavoriteStarFill',
      unselectedIcon = 'FavoriteStar',
      onRenderStar,
    } = props;

    // Ensure min is >= 0 to avoid issues elsewhere
    const min = Math.max(minFromProps, 0);

    const [rating, setRating] = useControllableValue(props.rating, props.defaultRating, props.onChange);
    /** Rating clamped within valid range. Will be `min` if `rating` is undefined. */
    const displayRating = getClampedRating(rating, min, max);

    useDebugWarnings(props);

    useComponentRef(props.componentRef, displayRating);

    const rootRef = React.useRef<HTMLDivElement | null>(null);
    const mergedRootRefs = useMergedRefs(rootRef, forwardedRef);
    useFocusRects(rootRef);

    const divProps = getNativeProps<React.HTMLAttributes<HTMLDivElement>>(props, divProperties);

    const classNames = getClassNames(styles!, {
      disabled,
      readOnly,
      theme: theme!,
    });

    const readOnlyAriaLabel = getAriaLabel?.(displayRating, max);
    const normalModeAriaLabel = ariaLabel ? ariaLabel : readOnlyAriaLabel;

    const stars: JSX.Element[] = [];

    const renderStar = (starProps: IRatingStarProps, renderer?: IRatingProps['onRenderStar']) =>
      renderer ? renderer(starProps) : <RatingStar {...starProps} />;

    for (let starNum = 1; starNum <= max; starNum++) {
      const fillPercentage = getFillingPercentage(starNum, displayRating);

      const onSelectStar = (ev: React.SyntheticEvent<HTMLElement>): void => {
        // Use the actual rating (not display value) here, to ensure that we update if the actual
        // rating is undefined and the user clicks the first star.
        if (rating === undefined || Math.ceil(rating) !== starNum) {
          setRating(starNum, ev);
        }
      };

      stars.push(
        <button
          className={css(
            classNames.ratingButton,
            size === RatingSize.Large ? classNames.ratingStarIsLarge : classNames.ratingStarIsSmall,
          )}
          id={getStarId(id, starNum)}
          key={starNum}
          {...(starNum === Math.ceil(displayRating) && { 'data-is-current': true })}
          onFocus={onSelectStar}
          onClick={onSelectStar} // For Safari & Firefox on OSX
          disabled={!!(disabled || readOnly)}
          role="radio"
          aria-hidden={readOnly ? 'true' : undefined}
          type="button"
          aria-checked={starNum === Math.ceil(displayRating)}
        >
          <span id={`${labelId}-${starNum}`} className={classNames.labelText}>
            {format(ariaLabelFormat || '', starNum, max)}
          </span>
          {renderStar(
            {
              fillPercentage,
              disabled,
              classNames,
              icon: fillPercentage > 0 ? icon : unselectedIcon,
              starNum,
              unselectedIcon,
            },
            onRenderStar,
          )}
        </button>,
      );
    }

    const rootSizeClass = size === RatingSize.Large ? classNames.rootIsLarge : classNames.rootIsSmall;

    return (
      <div
        ref={mergedRootRefs}
        className={css('ms-Rating-star', classNames.root, rootSizeClass)}
        aria-label={!readOnly ? normalModeAriaLabel : undefined}
        id={id}
        role={!readOnly ? 'radiogroup' : undefined}
        {...divProps}
      >
        <FocusZone
          direction={FocusZoneDirection.bidirectional}
          className={css(classNames.ratingFocusZone, rootSizeClass)}
          defaultActiveElement={'#' + getStarId(id, Math.ceil(displayRating))}
          // When in read-only mode, we allow focus (per ARIA standards) and set up ARIA attributes to indicate element
          // is read-only. https://www.w3.org/TR/wai-aria-1.1/#aria-readonly
          {...(readOnly && {
            allowFocusRoot: true,
            disabled: true,
            role: 'textbox',
            'aria-label': readOnlyAriaLabel,
            'aria-readonly': true,
            'data-is-focusable': true,
            tabIndex: 0,
          })}
        >
          {stars}
        </FocusZone>
      </div>
    );
  },
);
RatingBase.displayName = 'RatingBase';

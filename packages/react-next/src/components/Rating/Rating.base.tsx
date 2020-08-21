import * as React from 'react';
import { classNamesFunction, css, format, divProperties, getNativeProps } from '../../Utilities';
import { IProcessedStyleSet } from '../../Styling';
import { Icon } from '../../Icon';
import { FocusZone, FocusZoneDirection, IFocusZoneProps } from '../../FocusZone';
import { IRatingProps, RatingSize, IRatingStyleProps, IRatingStyles } from './Rating.types';
import { useId, useConst, useWarnings } from '@uifabric/react-hooks';

const getClassNames = classNamesFunction<IRatingStyleProps, IRatingStyles>();

interface IRatingStarProps extends React.AllHTMLAttributes<HTMLElement> {
  fillPercentage: number;
  disabled?: boolean;
  readOnly?: boolean;
  classNames: IProcessedStyleSet<IRatingStyles>;
  icon?: string;
}

const RatingStar = (props: IRatingStarProps) => {
  const icon = props.icon || 'FavoriteStarFill';
  return (
    <div className={props.classNames.ratingStar} key={props.id}>
      <Icon className={props.classNames.ratingStarBack} iconName={icon} />
      {!props.disabled && (
        <Icon
          className={props.classNames.ratingStarFront}
          iconName={icon}
          style={{ width: props.fillPercentage + '%' }}
        />
      )}
    </div>
  );
};

export const RatingBase = React.forwardRef<HTMLDivElement, IRatingProps>((props, ref) => {
  const id = useId('Rating');
  const labelId = useId('RatingLabel');
  const {
    ariaLabelFormat,
    allowZeroStars,
    disabled,
    getAriaLabel,
    onChange,
    // eslint-disable-next-line deprecation/deprecation
    onChanged,
    styles,
    // eslint-disable-next-line deprecation/deprecation
    min = 1,
    max = 5,
    readOnly,
    size,
    theme,
    icon = 'FavoriteStarFill',
    unselectedIcon = 'FavoriteStar',
  } = props;

  const minimumStars = useConst<number>(allowZeroStars ? 0 : 1);

  const divProps = getNativeProps<React.HTMLAttributes<HTMLDivElement>>(props, divProperties);

  const classNames = getClassNames(styles!, {
    disabled,
    readOnly,
    theme: theme!,
  });

  const stars = [];

  const starIds = [];

  const getClampedRating = (ratingProp: number): number => {
    return Math.min(Math.max(ratingProp, minimumStars as number), max as number);
  };

  const getInitialValue = (): number | undefined => {
    if (typeof props.rating === 'undefined') {
      return min;
    }

    if (props.rating === null) {
      return undefined;
    }

    return getClampedRating(props.rating);
  };

  const [rating, setRating] = React.useState<number | null | undefined>(getInitialValue());

  const getRating = (): number => {
    if (props.rating !== undefined) {
      return getClampedRating(props.rating);
    }
    if (rating !== undefined && rating !== null) {
      return getClampedRating(rating);
    }
    return 0;
  };

  useDebugWarnings(props);

  const ariaLabel = getAriaLabel ? getAriaLabel(getRating() ? getRating() : 0, max as number) : undefined;

  // When in read-only mode, we allow focus (per ARIA standards) and set up ARIA attributes to indicate element
  // is read-only. https://www.w3.org/TR/wai-aria-1.1/#aria-readonly
  const readOnlyProps: IFocusZoneProps | undefined = readOnly
    ? ({
        allowFocusRoot: true,
        disabled: true,
        'aria-label': ariaLabel,
        'aria-readonly': true,
        'data-is-focusable': true,
        tabIndex: 0,
      } as IFocusZoneProps)
    : undefined;

  const getStarId = (index: number): string => {
    return id + '-star-' + index;
  };

  const onFocus = (value: number, ev: React.FocusEvent<HTMLElement>): void => {
    // const currentRating = getRating();
    if (Math.ceil(rating!) !== value) {
      setRating(value);
      onChange?.(ev, value);
      onChanged?.(value);
    }
  };

  const getLabel = (ratingProp: number): JSX.Element => {
    const text = ariaLabelFormat || '';

    return (
      <span id={`${labelId}-${ratingProp}`} className={classNames.labelText}>
        {format(text, ratingProp, max)}
      </span>
    );
  };

  const getFillingPercentage = (starPosition: number): number => {
    const currentRating = getRating();
    const ceilValue = Math.ceil(currentRating as number);
    let fillPercentage = 100;

    if (starPosition === currentRating) {
      fillPercentage = 100;
    } else if (starPosition === ceilValue) {
      fillPercentage = 100 * ((currentRating as number) % 1);
    } else if (starPosition > ceilValue) {
      fillPercentage = 0;
    }
    return fillPercentage;
  };

  for (let i = minimumStars as number; i <= (max as number); i++) {
    if (i !== 0) {
      const currentRating = getRating();
      const fillPercentage = getFillingPercentage(i);
      const ratingStarProps: IRatingStarProps = {
        fillPercentage,
        disabled,
        classNames: classNames,
        icon: fillPercentage > 0 ? icon : unselectedIcon,
      };

      starIds.push(getStarId(i - 1));

      stars.push(
        <button
          className={css(classNames.ratingButton, {
            [classNames.ratingStarIsLarge]: size === RatingSize.Large,
            [classNames.ratingStarIsSmall]: size !== RatingSize.Large,
          })}
          id={starIds[i - 1]}
          key={i}
          {...(i === Math.ceil(currentRating) ? { 'data-is-current': true } : {})}
          onFocus={onFocus.bind(currentRating, i)}
          onClick={onFocus.bind(currentRating, i)} // For Safari & Firefox on OSX
          disabled={disabled || readOnly ? true : false}
          role="presentation"
          type="button"
        >
          {getLabel(i)}
          <RatingStar key={i + 'rating'} {...ratingStarProps} />
        </button>,
      );
    }
  }

  return (
    <div
      ref={ref}
      className={css('ms-Rating-star', classNames.root, {
        [classNames.rootIsLarge]: size === RatingSize.Large,
        [classNames.rootIsSmall]: size !== RatingSize.Large,
      })}
      aria-label={!readOnly ? ariaLabel : ''}
      id={id}
      {...divProps}
    >
      <FocusZone
        direction={FocusZoneDirection.horizontal}
        className={css(classNames.ratingFocusZone, {
          [classNames.rootIsLarge]: size === RatingSize.Large,
          [classNames.rootIsSmall]: size !== RatingSize.Large,
        })}
        defaultActiveElement={
          getRating() ? starIds[Math.ceil(getRating()) - 1] && '#' + starIds[Math.ceil(getRating()) - 1] : undefined
        }
        {...readOnlyProps}
      >
        {stars}
      </FocusZone>
    </div>
  );
});

function useDebugWarnings(props: IRatingProps) {
  if (process.env.NODE_ENV !== 'production') {
    // eslint-disable-next-line react-hooks/rules-of-hooks -- build-time conditional
    useWarnings({
      name: 'Rating',
      props,
      deprecations: { onChanged: 'onChange' },
    });
  }
}

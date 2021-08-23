import * as React from 'react';
import {
  warnDeprecations,
  initializeComponentRef,
  classNamesFunction,
  css,
  format,
  getId,
  divProperties,
  getNativeProps,
} from '../../Utilities';
import { IProcessedStyleSet } from '../../Styling';
import { Icon } from '../../Icon';
import { FocusZone, FocusZoneDirection, IFocusZoneProps } from '../../FocusZone';
import { IRatingProps, RatingSize, IRatingStyleProps, IRatingStyles, IRatingStarProps } from './Rating.types';

const getClassNames = classNamesFunction<IRatingStyleProps, IRatingStyles>();

export interface IRatingState {
  rating: number | null | undefined;
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

export class RatingBase extends React.Component<IRatingProps, IRatingState> {
  public static defaultProps: IRatingProps = {
    min: 1,
    max: 5,
  };
  private _id: string;
  private _min: number;
  private _labelId: string;
  private _classNames: IProcessedStyleSet<IRatingStyles>;

  constructor(props: IRatingProps) {
    super(props);

    initializeComponentRef(this);

    warnDeprecations('Rating', props, { onChanged: 'onChange' });

    this._id = getId('Rating');
    this._min = this.props.allowZeroStars ? 0 : 1;
    /* eslint-disable deprecation/deprecation */
    if (this.props.min !== undefined && this.props.min !== 1) {
      this._min = this.props.min;
    }
    /* eslint-enable deprecation/deprecation */
    this._labelId = getId('RatingLabel');

    this.state = {
      rating: this._getInitialValue(props),
    };
  }

  public render(): JSX.Element {
    const {
      ariaLabel,
      disabled,
      getAriaLabel,
      styles,
      max,
      readOnly,
      size,
      theme,
      icon = 'FavoriteStarFill',
      unselectedIcon = 'FavoriteStar',
      onRenderStar,
    } = this.props;

    const id = this._id;
    const stars = [];
    const starIds = [];
    const rating = this._getRating();
    const divProps = getNativeProps<React.HTMLAttributes<HTMLDivElement>>(this.props, divProperties);

    this._classNames = getClassNames(styles!, {
      disabled,
      readOnly,
      theme: theme!,
    });

    const renderStar = (starProps: IRatingStarProps, renderer?: IRatingProps['onRenderStar']) =>
      renderer ? renderer(starProps) : <RatingStar key={starProps.starNum + 'rating'} {...starProps} />;

    for (let i = this._min as number; i <= (max as number); i++) {
      if (i !== 0) {
        const fillPercentage = this._getFillingPercentage(i);
        const ratingStarProps: IRatingStarProps = {
          fillPercentage,
          disabled,
          classNames: this._classNames,
          icon: fillPercentage > 0 ? icon : unselectedIcon,
          starNum: i,
        };

        starIds.push(this._getStarId(i - 1));

        stars.push(
          <button
            className={css(this._classNames.ratingButton, {
              [this._classNames.ratingStarIsLarge]: size === RatingSize.Large,
              [this._classNames.ratingStarIsSmall]: size !== RatingSize.Large,
            })}
            id={starIds[i - 1]}
            key={i}
            {...(i === Math.ceil(rating) ? { 'data-is-current': true } : {})}
            onFocus={this._onFocus.bind(this, i)}
            onClick={this._onFocus.bind(this, i)} // For Safari & Firefox on OSX
            disabled={disabled || readOnly ? true : false}
            role="radio"
            aria-checked={i === Math.ceil(rating)}
            aria-hidden={readOnly ? 'true' : undefined}
            type="button"
          >
            {this._getLabel(i)}
            {renderStar(ratingStarProps, onRenderStar)}
          </button>,
        );
      }
    }

    const readOnlyAriaLabel = getAriaLabel ? getAriaLabel(rating ? rating : 0, max as number) : undefined;
    const normalModeAriaLabel = ariaLabel ? ariaLabel : readOnlyAriaLabel;

    // When in read-only mode, we allow focus (per ARIA standards) and set up ARIA attributes to indicate element
    // is read-only. https://www.w3.org/TR/wai-aria-1.1/#aria-readonly
    const readOnlyProps: IFocusZoneProps | undefined = readOnly
      ? ({
          allowFocusRoot: true,
          disabled: true,
          'aria-label': readOnlyAriaLabel,
          'aria-readonly': true,
          'data-is-focusable': true,
          role: 'textbox',
          tabIndex: 0,
        } as IFocusZoneProps)
      : undefined;

    return (
      <div
        className={css('ms-Rating-star', this._classNames.root, {
          [this._classNames.rootIsLarge]: size === RatingSize.Large,
          [this._classNames.rootIsSmall]: size !== RatingSize.Large,
        })}
        aria-label={!readOnly ? normalModeAriaLabel : undefined}
        id={id}
        role={!readOnly ? 'radiogroup' : undefined}
        {...divProps}
      >
        <FocusZone
          direction={FocusZoneDirection.horizontal}
          className={css(this._classNames.ratingFocusZone, {
            [this._classNames.rootIsLarge]: size === RatingSize.Large,
            [this._classNames.rootIsSmall]: size !== RatingSize.Large,
          })}
          defaultActiveElement={
            rating ? starIds[Math.ceil(rating) - 1] && '#' + starIds[Math.ceil(rating) - 1] : undefined
          }
          {...readOnlyProps}
        >
          {stars}
        </FocusZone>
      </div>
    );
  }

  private _getStarId(index: number): string {
    return this._id + '-star-' + index;
  }

  private _onFocus(value: number, ev: React.FocusEvent<HTMLElement>): void {
    if (Math.ceil(this.state.rating!) !== value) {
      this.setState({
        rating: value,
      } as IRatingState);

      // eslint-disable-next-line deprecation/deprecation
      const { onChange, onChanged } = this.props;

      if (onChange) {
        onChange(ev, value);
      }

      if (onChanged) {
        onChanged(value);
      }
    }
  }

  private _getLabel(rating: number): JSX.Element {
    const text = this.props.ariaLabelFormat || '';

    return (
      <span id={`${this._labelId}-${rating}`} className={this._classNames.labelText}>
        {format(text, rating, this.props.max)}
      </span>
    );
  }

  private _getInitialValue(props: IRatingProps): number | undefined {
    if (typeof props.rating === 'undefined') {
      return this._min;
    }

    if (props.rating === null) {
      return undefined;
    }

    return this._getClampedRating(props.rating);
  }

  private _getClampedRating(rating: number): number {
    return Math.min(Math.max(rating, this._min as number), this.props.max as number);
  }

  private _getRating(): number {
    if (this.props.rating !== undefined) {
      return this._getClampedRating(this.props.rating);
    }
    if (this.state.rating !== undefined && this.state.rating !== null) {
      return this._getClampedRating(this.state.rating);
    }
    return 0;
  }

  private _getFillingPercentage(starPosition: number): number {
    const rating = this._getRating();
    const ceilValue = Math.ceil(rating as number);
    let fillPercentage = 100;

    if (starPosition === rating) {
      fillPercentage = 100;
    } else if (starPosition === ceilValue) {
      fillPercentage = 100 * ((rating as number) % 1);
    } else if (starPosition > ceilValue) {
      fillPercentage = 0;
    }
    return fillPercentage;
  }
}

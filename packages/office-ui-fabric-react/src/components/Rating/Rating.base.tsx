import * as React from 'react';
import { BaseComponent, classNamesFunction, css, format, getId } from '../../Utilities';
import { IProcessedStyleSet } from '../../Styling';
import { Icon } from '../../Icon';
import { FocusZone, FocusZoneDirection } from '../../FocusZone';
import { IRatingProps, RatingSize, IRatingStyleProps, IRatingStyles } from './Rating.types';

const getClassNames = classNamesFunction<IRatingStyleProps, IRatingStyles>();

interface IRatingStarProps extends React.AllHTMLAttributes<HTMLElement> {
  fillPercentage: number;
  disabled: boolean;
  readOnly: boolean;
  classNames: IProcessedStyleSet<IRatingStyles>;
}

export interface IRatingState {
  rating: number | null | undefined;
}

const RatingStar = (props: IRatingStarProps) => (
  <div className={props.classNames.ratingStar} key={props.id}>
    <Icon className={props.classNames.ratingStarBack} iconName="FavoriteStarFill" />
    {!props.disabled && (
      <Icon className={props.classNames.ratingStarFront} iconName="FavoriteStarFill" style={{ width: props.fillPercentage + '%' }} />
    )}
  </div>
);

export class RatingBase extends BaseComponent<IRatingProps, IRatingState> {
  public static defaultProps: IRatingProps = {
    min: 1,
    max: 5
  };
  private _id: string;
  private _min: number;
  private _labelId: string;
  private _classNames: IProcessedStyleSet<IRatingStyles>;

  constructor(props: IRatingProps) {
    super(props);

    this._warnDeprecations({
      onChanged: 'onChange'
    });

    this._id = getId('Rating');
    this._min = this.props.allowZeroStars ? 0 : 1;
    if (this.props.min !== undefined && this.props.min !== 1) {
      this._min = this.props.min;
    }
    this._labelId = getId('RatingLabel');

    this.state = {
      rating: this._getInitialValue(props)
    };
  }

  public componentWillReceiveProps(nextProps: IRatingProps): void {
    if (typeof nextProps.rating !== 'undefined' && nextProps.rating !== this.state.rating) {
      this.setState({
        rating: this._getClampedRating(nextProps.rating)
      } as IRatingState);
    }
  }

  public render(): JSX.Element {
    const id = this._id;
    const stars = [];
    const starIds = [];
    const { disabled, getAriaLabel, styles, max, rating, readOnly, size, theme } = this.props;

    this._classNames = getClassNames(styles!, {
      disabled,
      readOnly,
      theme: theme!
    });

    for (let i = this._min as number; i <= (max as number); i++) {
      if (i !== 0) {
        const ratingStarProps: IRatingStarProps = {
          fillPercentage: this._getFillingPercentage(i),
          disabled: disabled ? true : false,
          readOnly: readOnly ? true : false,
          classNames: this._classNames
        };

        starIds.push(this._getStarId(i - 1));

        stars.push(
          <button
            className={css(this._classNames.ratingButton, {
              [this._classNames.ratingStarIsLarge]: size === RatingSize.Large,
              [this._classNames.ratingStarIsSmall]: size !== RatingSize.Large
            })}
            id={starIds[i - 1]}
            key={i}
            {...(i === Math.ceil(this.state.rating as number) ? { 'data-is-current': true } : {})}
            onFocus={this._onFocus.bind(this, i)}
            onClick={this._onFocus.bind(this, i)} // For Safari & Firefox on OSX
            disabled={disabled || readOnly ? true : false}
            role="presentation"
            type="button"
          >
            {this._getLabel(i)}
            <RatingStar key={i + 'rating'} {...ratingStarProps} />
          </button>
        );
      }
    }

    return (
      <div
        className={css('ms-Rating-star', this._classNames.root, {
          [this._classNames.rootIsLarge]: size === RatingSize.Large,
          [this._classNames.rootIsSmall]: size !== RatingSize.Large
        })}
        aria-label={getAriaLabel ? getAriaLabel(this.state.rating ? this.state.rating : 0, this.props.max as number) : ''}
        id={id}
      >
        <FocusZone
          direction={FocusZoneDirection.horizontal}
          tabIndex={readOnly ? 0 : -1}
          className={css(this._classNames.ratingFocusZone, {
            [this._classNames.rootIsLarge]: size === RatingSize.Large,
            [this._classNames.rootIsSmall]: size !== RatingSize.Large
          })}
          data-is-focusable={readOnly ? true : false}
          defaultActiveElement={rating ? starIds[rating - 1] && '#' + starIds[rating - 1] : undefined}
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
    if (this.state.rating !== value) {
      this.setState({
        rating: value
      } as IRatingState);

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

  private _getFillingPercentage(starPosition: number): number {
    const ceilValue = Math.ceil(this.state.rating as number);
    let fillPercentage = 100;

    if (starPosition === this.state.rating) {
      fillPercentage = 100;
    } else if (starPosition === ceilValue) {
      fillPercentage = 100 * ((this.state.rating as number) % 1);
    } else if (starPosition > ceilValue) {
      fillPercentage = 0;
    }
    return fillPercentage;
  }
}

import * as React from 'react';
import {
  BaseComponent,
  classNamesFunction,
  css,
  customizable,
  format,
  getId
} from '../../Utilities';
import {
  IClassNames
} from '@uifabric/utilities/lib/IClassNames';
import { Icon } from '../../Icon';
import { FocusZone, FocusZoneDirection } from '../../FocusZone';
import { IRatingProps, RatingSize, IRatingStyleProps, IRatingStyles } from './Rating.types';

const getClassNames = classNamesFunction<IRatingStyleProps, IRatingStyles>();

interface IRatingStarProps extends React.AllHTMLAttributes<HTMLElement> {
  fillPercentage: number;
  disabled: boolean;
  classNames: IClassNames<IRatingStyles>;
}

export interface IRatingState {
  rating: number | null | undefined;
}

const RatingStar = (props: IRatingStarProps, ) => (
  <div
    className={ props.classNames.ratingStar }
    key={ props.id }
  >
    <Icon
      className={ props.classNames.ratingStarBack }
      iconName='FavoriteStarFill'
    />
    {
      !props.disabled &&
      <Icon
        className={ props.classNames.ratingStarFront }
        iconName='FavoriteStarFill'
        style={ { width: props.fillPercentage + '%' } }
      />
    }
  </div >
);

@customizable('Rating', ['theme', 'getStyles'])
export class RatingBase extends BaseComponent<IRatingProps, IRatingState> {
  public static defaultProps: IRatingProps = {
    min: 1,
    max: 5
  };
  private _id: string;
  private _labelId: string;
  private _classNames: {[key in keyof IRatingStyles]: string };

  constructor(props: IRatingProps) {
    super(props);

    this.state = {
      rating: this._getInitialValue(props)
    };

    this._id = getId('Rating');
    this._labelId = getId('RatingLabel');
  }

  public componentWillReceiveProps(nextProps: IRatingProps) {
    if (typeof nextProps.rating !== 'undefined' && nextProps.rating !== this.state.rating) {
      this.setState({
        rating: this._getClampedRating(nextProps.rating)
      } as IRatingState);
    }
  }

  public render() {
    let id = this._id;
    let stars = [];
    let starIds = [];
    let {
      disabled,
      getAriaLabel,
      getStyles,
      max,
      min,
      rating,
      readOnly,
      size,
      theme
    } = this.props;

    this._classNames = getClassNames(getStyles!, {
      disabled,
      theme: theme!
    });

    for (let i = min as number; i <= (max as number); i++) {
      let ratingStarProps: IRatingStarProps = {
        fillPercentage: this._getFillingPercentage(i),
        disabled: disabled ? true : false,
        classNames: this._classNames
      };

      starIds.push(this._getStarId(i - 1));

      stars.push(
        <button
          className={ css(this._classNames.ratingButton, {
            [this._classNames.rootIsLarge]: size === RatingSize.Large,
            [this._classNames.rootIsSmall]: size !== RatingSize.Large
          }) }
          id={ starIds[i - 1] }
          key={ i }
          { ...((i === Math.ceil(this.state.rating as number)) ? { 'data-is-current': true } : {}) }
          onFocus={ this._onFocus.bind(this, i) }
          disabled={ disabled || readOnly ? true : false }
          role='presentation'
        >
          { this._getLabel(i) }
          <RatingStar key={ i + 'rating' }  {...ratingStarProps} />
        </button>
      );
    }

    return (
      <div
        className={ 'ms-Rating-star' }
        aria-label={ getAriaLabel ? getAriaLabel(this.state.rating ? this.state.rating : 0, this.props.max as number) : '' }
        id={ id }
      >
        <FocusZone
          direction={ FocusZoneDirection.horizontal }
          tabIndex={ readOnly ? 0 : -1 }
          className={ this._classNames.ratingFocusZone }
          data-is-focusable={ readOnly ? true : false }
          defaultActiveElement={ rating ? starIds[rating - 1] && '#' + starIds[rating - 1] : undefined }
        >
          { stars }
        </FocusZone>
      </div>
    );
  }

  private _getStarId(index: number): string {
    return this._id + '-star-' + index;
  }

  private _onFocus(value: number, ev: React.FocusEvent<HTMLElement>): void {
    this.setState({
      rating: value
    } as IRatingState);

    const { onChanged } = this.props;
    if (onChanged) {
      onChanged(value);
    }
  }

  private _getLabel(rating: number): JSX.Element {
    const text = this.props.ariaLabelFormat || '';

    return (
      <span
        id={ `${this._labelId}-${rating}` }
        className={ this._classNames.labelText }
      >
        { format(text, rating, this.props.max) }
      </span >
    );
  }

  private _getInitialValue(props: IRatingProps) {
    if (typeof props.rating === 'undefined') {
      return props.min;
    }

    if (props.rating === null) {
      return null;
    }

    return this._getClampedRating(props.rating);
  }

  private _getClampedRating(rating: number): number {
    return Math.min(Math.max(rating, this.props.min as number), this.props.max as number);
  }

  private _getFillingPercentage(starPosition: number): number {
    let ceilValue = Math.ceil((this.state.rating as number));
    let fillPercentage = 100;

    if (starPosition === this.state.rating) {
      fillPercentage = 100;
    } else if (starPosition === ceilValue) {
      fillPercentage = 100 * (this.state.rating as number % 1);
    } else if (starPosition > ceilValue) {
      fillPercentage = 0;
    }
    return fillPercentage;
  }
}

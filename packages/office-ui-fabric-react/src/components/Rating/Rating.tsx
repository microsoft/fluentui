import * as React from 'react';
import {
  BaseComponent,
  css,
  getId
} from '../../Utilities';
import { Icon } from '../../Icon';
import { IRatingProps, RatingSize } from './Rating.Props';
import { FocusZone, FocusZoneDirection } from '../../FocusZone';
import * as stylesImport from './Rating.scss';
const styles: any = stylesImport;

interface IRatingStarProps extends React.AllHTMLAttributes<HTMLElement> {
  fillPercentage: number;
  disabled: boolean;
}

export interface IRatingState {
  rating: number | null | undefined;
}

const RatingStar = (props: IRatingStarProps) => (
  <div
    className={ css('ms-RatingStar-container', styles.ratingStar) }
    key={ props.id }
  >
    <Icon
      className={ css('ms-RatingStar-back', styles.ratingStarBack, {
        ['is-disabled ' + styles.ratingStarDisabled]: props.disabled
      }) }
      iconName='FavoriteStarFill'
    />
    { !props.disabled &&
      <Icon
        className={ css('ms-RatingStar-front', styles.ratingStarFront) }
        iconName='FavoriteStarFill'
        style={ { width: props.fillPercentage + '%' } }
      />
    }
  </div>
);

export class Rating extends BaseComponent<IRatingProps, IRatingState> {
  public static defaultProps: IRatingProps = {
    min: 1,
    max: 5
  };
  private _id: string;
  private _labelId: string;

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
    let stars = [];

    for (let i = this.props.min as number; i <= (this.props.max as number); i++) {
      let ratingStarProps: IRatingStarProps = {
        fillPercentage: this._getFillingPercentage(i),
        disabled: this.props.disabled ? true : false
      };

      stars.push(
        <button
          className={ css('ms-Rating-button', styles.ratingButton, {
            ['ms-Rating--large ' + styles.rootIsLarge]: this.props.size === RatingSize.Large,
            ['ms-Rating--small ' + styles.rootIsSmall]: this.props.size !== RatingSize.Large
          }) }
          key={ i }
          { ...((i === Math.ceil(this.state.rating as number)) ? { 'data-is-current': true } : {}) }
          onFocus={ this._onFocus.bind(this, i) }
          disabled={ this.props.disabled || this.props.readOnly ? true : false }
          role='presentation'
        >
          { this._getLabel(i) }
          < RatingStar key={ i + 'rating' }  {...ratingStarProps} />
        </button >
      );
    }

    return (
      <div
        className={ css('ms-Rating-star') }
        aria-labelledby={ this.props.ariaLabelId ? this.props.ariaLabelId : '' }
      >
        <FocusZone
          direction={ FocusZoneDirection.horizontal }
          tabIndex={ this.props.readOnly ? 0 : -1 }
          className={ css('ms-Rating-focuszone', styles.ratingFocusZone) }
        >
          { stars }
        </FocusZone>
      </div>
    );
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
    const text = this.props.ariaLabelIcon || 'Star';

    return (
      <span
        id={ `${this._labelId}-${rating}` }
        className={ css('ms-Rating-labelText', styles.labelText) }
      >
        { `${rating} of ${this.props.max} ${text} selected` }
      </span>
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
    if (!this.props.enableHalfStar) {
      rating = Math.floor(rating);
    }

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

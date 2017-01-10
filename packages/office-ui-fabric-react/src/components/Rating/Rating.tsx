import * as React from 'react';
import './Rating.scss';
import { IRatingProps, RatingSize } from './Rating.Props';
import { BaseComponent } from '../../common/BaseComponent';
import { getId } from '../../utilities/object';
import { css } from '../../utilities/css';

export interface IRatingState {
  rating: number;
  focusedRating: number;
}

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
      rating: this._getInitialValue(props),
      focusedRating: null
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
    let stars: JSX.Element[] = [];
    for (let i = this.props.min; i <= this.props.max; ++i) {
      stars.push(this._renderStar(i));
    }

    return <div className={ css('ms-Rating', this.props.className) } role='application'>
      <div className={ css('ms-Rating-container', {
        'large': this.props.size === RatingSize.Large
      }) } role='radiogroup'>
        { stars }
      </div>
    </div>;
  }

  private _renderStar(rating: number): JSX.Element {
    const inputId = `${this._id}-${rating}`;

    return <div className={ css('ms-Rating-star', {
      'is-selected': rating <= this.state.rating,
      'is-inFocus': rating === this.state.focusedRating,
      'is-disabled': this.props.disabled
    }) } key={ rating }>
      <input
        className='ms-Rating-input'
        type='radio'
        name={ this._id }
        id={ inputId }
        value={ rating }
        aria-labelledby={ `${this._labelId}-${rating}` }
        disabled={ this.props.disabled }
        checked={ rating === this.state.rating }
        onChange={ this._onChange.bind(this, rating) }
        onFocus={ this._onFocus.bind(this, rating) }
        onBlur={ this._onBlur.bind(this, rating) }
        />
      <label className='ms-Rating-label' htmlFor={ inputId }>
        { this._getLabel(rating) }
        { this._getIcon() }
      </label>
    </div>;
  }

  private _onFocus(value: number, ev: React.FocusEvent<HTMLElement>): void {
    this.setState({
      focusedRating: value
    } as IRatingState);
  }

  private _onBlur(option: number, ev: React.FocusEvent<HTMLElement>): void {
    this.setState({
      focusedRating: null
    } as IRatingState);
  }

  private _onChange(rating: number, evt: React.FormEvent<HTMLInputElement>) {
    this.setState({
      rating: rating
    } as IRatingState);

    const { onChanged } = this.props;
    if (onChanged) {
      onChanged(rating);
    }
  }

  private _getLabel(rating: number): JSX.Element {
    const text = this.props.ratingText || "Star";

    return <span id={ `${this._labelId}-${rating}` } className="ms-Rating-labelText">{ `${rating} ${text}` }</span>;
  }

  private _getIcon(): JSX.Element {
    return <i className={ css('ms-Icon', this.props.icon || 'ms-Icon--FavoriteStarFill') } />;
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
    return Math.min(Math.max(rating, this.props.min), this.props.max);
  }
}
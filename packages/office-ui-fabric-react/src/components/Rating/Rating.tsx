import * as React from 'react';
import {
  BaseComponent,
  css,
  getId
} from '../../Utilities';
import { Icon } from '../../Icon';
import { IRatingProps, RatingSize } from './Rating.Props';
import * as stylesImport from './Rating.scss';
const styles: any = stylesImport;

export interface IRatingState {
  rating: number | null | undefined;
  focusedRating: number | null;
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
    for (let i = this.props.min as number; i <= (this.props.max as number); ++i) {
      stars.push(this._renderStar(i));
    }

    return (
      <div
        className={ css('ms-Rating', this.props.className, {
          ['ms-Rating--large ' + styles.rootIsLarge]: this.props.size === RatingSize.Large
        }) }
        role='application'
      >
        <div className={ css('ms-Rating-container', styles.container) } role='radiogroup' aria-labelledby={ this.props.ariaLabelId }>
          { stars }
        </div>
      </div>
    );
  }

  private _renderStar(rating: number): JSX.Element {
    const inputId = `${this._id}-${rating}`;

    return (
      <div
        className={ css('ms-Rating-star', styles.star, {
          ['is-selected ' + styles.starIsSelected]: rating <= (this.state.rating as number),
          ['is-inFocus ' + styles.starIsInFocus]: rating === this.state.focusedRating,
          ['is-disabled ' + styles.starIsDisabled]: this.props.disabled
        }) }
        key={ rating }
      >
        <input
          className={ css('ms-Rating-input', styles.input) }
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
        <label className={ css('ms-Rating-label', styles.label) } htmlFor={ inputId }>
          { this._getLabel(rating) }
          { this._getIcon() }
        </label>
      </div>
    );
  }

  private _onFocus(value: number, ev: React.FocusEvent<HTMLElement>): void {
    this.setState({
      focusedRating: value
    } as IRatingState);

    if (this.props.onFocus) {
      this.props.onFocus(ev);
    }
  }

  private _onBlur(option: number, ev: React.FocusEvent<HTMLElement>): void {
    this.setState({
      focusedRating: null
    } as IRatingState);

    if (this.props.onBlur) {
      this.props.onBlur(ev);
    }
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
    const text = this.props.ariaLabelIcon || 'Star';

    return (
      <span
        id={ `${this._labelId}-${rating}` }
        className={ css('ms-Rating-labelText', styles.labelText) }
      >
        { `${rating} ${text}` }
      </span>
    );
  }

  private _getIcon(): JSX.Element {
    return <Icon iconName={ this.props.icon || 'favoriteStarFill' } />;
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
    rating = Math.floor(rating);

    return Math.min(Math.max(rating, this.props.min as number), this.props.max as number);
  }
}
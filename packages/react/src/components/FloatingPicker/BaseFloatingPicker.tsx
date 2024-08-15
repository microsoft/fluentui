import * as React from 'react';
import * as stylesImport from './BaseFloatingPicker.scss';
import { Async, initializeComponentRef, css, KeyCodes } from '../../Utilities';
import { DirectionalHint } from '../../common/DirectionalHint';
import { Callout } from '../../Callout';
import { SuggestionsControl } from './Suggestions/SuggestionsControl';
import { SuggestionsStore } from './Suggestions/SuggestionsStore';
import type { IBaseFloatingPicker, IBaseFloatingPickerProps } from './BaseFloatingPicker.types';
import type { ISuggestionModel } from '../../Pickers';
import type { ISuggestionsControlProps } from './Suggestions/Suggestions.types';

const styles: any = stylesImport;

export interface IBaseFloatingPickerState {
  queryString: string;
  suggestionsVisible?: boolean;
  didBind: boolean;
}

export class BaseFloatingPicker<T extends {}, P extends IBaseFloatingPickerProps<T>>
  extends React.Component<P, IBaseFloatingPickerState>
  implements IBaseFloatingPicker
{
  protected selection: Selection;

  protected root = React.createRef<HTMLDivElement>();
  protected suggestionStore: SuggestionsStore<T>;
  protected suggestionsControl: React.RefObject<SuggestionsControl<T>> = React.createRef();
  protected SuggestionsControlOfProperType: new (props: ISuggestionsControlProps<T>) => SuggestionsControl<T> =
    SuggestionsControl as new (props: ISuggestionsControlProps<T>) => SuggestionsControl<T>;
  protected currentPromise: PromiseLike<T[]>;
  protected isComponentMounted: boolean = false;

  private _async: Async;
  constructor(basePickerProps: P) {
    super(basePickerProps);

    this._async = new Async(this);
    initializeComponentRef(this);

    this.suggestionStore = basePickerProps.suggestionsStore;
    this.state = {
      queryString: '',
      didBind: false,
    };
  }

  public get inputText(): string {
    return this.state.queryString;
  }

  public get suggestions(): any[] {
    return this.suggestionStore.suggestions;
  }

  public forceResolveSuggestion(): void {
    if (this.suggestionsControl.current && this.suggestionsControl.current.hasSuggestionSelected()) {
      this.completeSuggestion();
    } else {
      this._onValidateInput();
    }
  }

  public get currentSelectedSuggestionIndex(): number {
    return this.suggestionsControl.current ? this.suggestionsControl.current.currentSuggestionIndex : -1;
  }

  public get isSuggestionsShown(): boolean {
    return this.state.suggestionsVisible === undefined ? false : this.state.suggestionsVisible;
  }

  public onQueryStringChanged = (queryString: string): void => {
    if (queryString !== this.state.queryString) {
      this.setState({
        queryString,
      });

      if (this.props.onInputChanged) {
        (this.props.onInputChanged as (filter: string) => void)(queryString);
      }

      this.updateValue(queryString);
    }
  };

  public hidePicker = (): void => {
    const wasShownBeforeUpdate = this.isSuggestionsShown;

    this.setState({
      suggestionsVisible: false,
    });

    if (this.props.onSuggestionsHidden && wasShownBeforeUpdate) {
      this.props.onSuggestionsHidden();
    }
  };

  public showPicker = (updateValue: boolean = false): void => {
    const wasShownBeforeUpdate = this.isSuggestionsShown;
    this.setState({
      suggestionsVisible: true,
    });

    // Update the suggestions if updateValue == true
    const value = this.props.inputElement ? this.props.inputElement.value : '';
    if (updateValue) {
      this.updateValue(value);
    }

    if (this.props.onSuggestionsShown && !wasShownBeforeUpdate) {
      this.props.onSuggestionsShown();
    }
  };

  public componentDidMount(): void {
    this._bindToInputElement();
    this.isComponentMounted = true;

    this._onResolveSuggestions = this._async.debounce(this._onResolveSuggestions, this.props.resolveDelay);
  }

  public componentDidUpdate(): void {
    this._bindToInputElement();
  }

  public componentWillUnmount(): void {
    this._unbindFromInputElement();
    this.isComponentMounted = false;
  }

  public completeSuggestion = (): void => {
    if (this.suggestionsControl.current && this.suggestionsControl.current.hasSuggestionSelected()) {
      this.onChange(this.suggestionsControl.current.currentSuggestion!.item);
    }
  };

  public updateSuggestions(suggestions: T[], forceUpdate: boolean = false): void {
    this.suggestionStore.updateSuggestions(suggestions);

    if (forceUpdate) {
      this.forceUpdate();
    }
  }

  public render(): JSX.Element {
    const { className } = this.props;
    return (
      <div ref={this.root} className={css('ms-BasePicker ms-BaseFloatingPicker', className ? className : '')}>
        {this.renderSuggestions()}
      </div>
    );
  }

  protected renderSuggestions(): JSX.Element | null {
    const TypedSuggestionsControl = this.SuggestionsControlOfProperType;

    if (this.props.suggestionItems) {
      this.suggestionStore.updateSuggestions(this.props.suggestionItems!);
    }

    return this.state.suggestionsVisible ? (
      <Callout
        className={styles.callout}
        isBeakVisible={false}
        gapSpace={5}
        target={this.props.inputElement}
        onDismiss={this.hidePicker}
        directionalHint={DirectionalHint.bottomLeftEdge}
        directionalHintForRTL={DirectionalHint.bottomRightEdge}
        calloutWidth={this.props.calloutWidth ? this.props.calloutWidth : 0}
        {...this.props.pickerCalloutProps}
      >
        <TypedSuggestionsControl
          onRenderSuggestion={this.props.onRenderSuggestionsItem}
          onSuggestionClick={this.onSuggestionClick}
          onSuggestionRemove={this.onSuggestionRemove}
          suggestions={this.suggestionStore.getSuggestions()}
          componentRef={this.suggestionsControl}
          completeSuggestion={this.completeSuggestion}
          shouldLoopSelection={false}
          {...this.props.pickerSuggestionsProps}
        />
      </Callout>
    ) : null;
  }

  protected onSelectionChange(): void {
    this.forceUpdate();
  }

  protected updateValue(updatedValue: string): void {
    if (updatedValue === '') {
      this.updateSuggestionWithZeroState();
    } else {
      this._onResolveSuggestions(updatedValue);
    }
  }

  protected updateSuggestionWithZeroState(): void {
    if (this.props.onZeroQuerySuggestion) {
      const onEmptyInputFocus = this.props.onZeroQuerySuggestion as (selectedItems?: T[]) => T[] | PromiseLike<T[]>;
      const suggestions: T[] | PromiseLike<T[]> = onEmptyInputFocus(this.props.selectedItems);
      this.updateSuggestionsList(suggestions);
    } else {
      this.hidePicker();
    }
  }

  protected updateSuggestionsList(suggestions: T[] | PromiseLike<T[]>): void {
    // Check to see if the returned value is an array, if it is then just pass it into the next function.
    // If the returned value is not an array then check to see if it's a promise or PromiseLike.
    // If it is then resolve it asynchronously.
    if (Array.isArray(suggestions)) {
      this.updateSuggestions(suggestions, true /*forceUpdate*/);
    } else if (suggestions && (suggestions as PromiseLike<T[]>).then) {
      // Ensure that the promise will only use the callback if it was the most recent one.
      this.currentPromise = suggestions;
      suggestions.then((newSuggestions: T[]) => {
        // Only update if the next promise has not yet resolved and
        // the floating picker is still mounted.
        if (suggestions === this.currentPromise && this.isComponentMounted) {
          this.updateSuggestions(newSuggestions, true /*forceUpdate*/);
        }
      });
    }
  }

  protected onChange(item: T): void {
    if (this.props.onChange) {
      (this.props.onChange as (items: T) => void)(item);
    }
  }

  protected onSuggestionClick = (ev: React.MouseEvent<HTMLElement>, item: T, index: number): void => {
    this.onChange(item);
    this._updateSuggestionsVisible(false /*shouldShow*/);
  };

  protected onSuggestionRemove = (ev: React.MouseEvent<HTMLElement>, item: T, index: number): void => {
    if (this.props.onRemoveSuggestion) {
      (this.props.onRemoveSuggestion as (item: T) => void)(item);
    }

    if (this.suggestionsControl.current) {
      this.suggestionsControl.current.removeSuggestion(index);
    }
  };

  protected onKeyDown = (ev: MouseEvent): void => {
    if (
      !this.state.suggestionsVisible ||
      (this.props.inputElement && !(this.props.inputElement as HTMLElement).contains(ev.target as HTMLElement))
    ) {
      return;
    }
    // eslint-disable-next-line deprecation/deprecation
    const keyCode = ev.which;
    switch (keyCode) {
      case KeyCodes.escape:
        this.hidePicker();
        ev.preventDefault();
        ev.stopPropagation();
        break;

      case KeyCodes.tab:
      case KeyCodes.enter:
        if (
          !ev.shiftKey &&
          !ev.ctrlKey &&
          this.suggestionsControl.current &&
          this.suggestionsControl.current.handleKeyDown(keyCode)
        ) {
          ev.preventDefault();
          ev.stopPropagation();
        } else {
          this._onValidateInput();
        }
        break;

      case KeyCodes.del:
        if (
          this.props.onRemoveSuggestion &&
          this.suggestionsControl.current &&
          this.suggestionsControl.current.hasSuggestionSelected() &&
          this.suggestionsControl.current.currentSuggestion &&
          ev.shiftKey
        ) {
          (this.props.onRemoveSuggestion as (item: T) => void)(this.suggestionsControl.current.currentSuggestion!.item);

          this.suggestionsControl.current.removeSuggestion();
          this.forceUpdate();
          ev.stopPropagation();
        }
        break;

      case KeyCodes.up:
        if (this.suggestionsControl.current && this.suggestionsControl.current.handleKeyDown(keyCode)) {
          ev.preventDefault();
          ev.stopPropagation();
          this._updateActiveDescendant();
        }
        break;

      case KeyCodes.down:
        if (this.suggestionsControl.current && this.suggestionsControl.current.handleKeyDown(keyCode)) {
          ev.preventDefault();
          ev.stopPropagation();
          this._updateActiveDescendant();
        }
        break;
    }
  };

  private _updateActiveDescendant(): void {
    if (this.props.inputElement && this.suggestionsControl.current && this.suggestionsControl.current.selectedElement) {
      const selectedElId = this.suggestionsControl.current.selectedElement.getAttribute('id');
      if (selectedElId) {
        this.props.inputElement.setAttribute('aria-activedescendant', selectedElId as string);
      }
    }
  }

  private _onResolveSuggestions(updatedValue: string): void {
    const suggestions: T[] | PromiseLike<T[]> | null = this.props.onResolveSuggestions(
      updatedValue,
      this.props.selectedItems,
    );

    this._updateSuggestionsVisible(true /*shouldShow*/);
    if (suggestions !== null) {
      this.updateSuggestionsList(suggestions);
    }
  }

  private _onValidateInput = (): void => {
    if (this.state.queryString && this.props.onValidateInput && this.props.createGenericItem) {
      const itemToConvert: ISuggestionModel<T> = (
        this.props.createGenericItem as (input: string, isValid: boolean) => ISuggestionModel<T>
      )(this.state.queryString, (this.props.onValidateInput as (input: string) => boolean)(this.state.queryString));
      const convertedItems = this.suggestionStore.convertSuggestionsToSuggestionItems([itemToConvert]);
      this.onChange(convertedItems[0].item);
    }
  };

  private _updateSuggestionsVisible(shouldShow: boolean): void {
    if (shouldShow) {
      this.showPicker();
    } else {
      this.hidePicker();
    }
  }

  private _bindToInputElement(): void {
    if (this.props.inputElement && !this.state.didBind) {
      this.props.inputElement.addEventListener('keydown', this.onKeyDown);
      this.setState({ didBind: true });
    }
  }

  private _unbindFromInputElement(): void {
    if (this.props.inputElement && this.state.didBind) {
      this.props.inputElement.removeEventListener('keydown', this.onKeyDown);
      this.setState({ didBind: false });
    }
  }
}

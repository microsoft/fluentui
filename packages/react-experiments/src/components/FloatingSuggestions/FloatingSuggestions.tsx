import * as React from 'react';
import * as styles from './FloatingSuggestions.scss';
import { Async, initializeComponentRef, css, KeyCodes } from '@fluentui/react/lib/Utilities';
import { Callout, DirectionalHint } from '@fluentui/react/lib/Callout';
import { SuggestionsControl } from './Suggestions/SuggestionsControl';
import { SuggestionsStore } from './Suggestions/SuggestionsStore';
import type {
  IFloatingSuggestions,
  IFloatingSuggestionsProps,
  IFloatingSuggestionsInnerSuggestionProps,
} from './FloatingSuggestions.types';
import type { ISuggestionModel } from '@fluentui/react/lib/Pickers';

export interface IFloatingSuggestionsState {
  queryString: string;
  suggestionsVisible?: boolean;
  didBind: boolean;
}

export class FloatingSuggestions<TItem extends {}>
  extends React.Component<IFloatingSuggestionsProps<TItem>, IFloatingSuggestionsState>
  implements IFloatingSuggestions<TItem>
{
  private root = React.createRef<HTMLDivElement>();
  private suggestionStore: SuggestionsStore<TItem>;
  private suggestionsControl: React.RefObject<SuggestionsControl<TItem>> = React.createRef();
  private currentPromise: PromiseLike<TItem[]>;
  private isComponentMounted: boolean = false;
  private _async: Async;

  constructor(basePickerProps: IFloatingSuggestionsProps<TItem>) {
    super(basePickerProps);

    this._async = new Async(this);
    initializeComponentRef(this);

    this.suggestionStore = basePickerProps.suggestionsStore;
    this.state = {
      queryString: '',
      didBind: false,
    };
  }

  // TODO FloatingSuggestions should not be responsible for getting the
  // input text.
  public get inputText(): string {
    return this.state.queryString;
  }

  public get suggestions(): ISuggestionModel<TItem>[] {
    return this.suggestionStore.suggestions;
  }

  public forceResolveSuggestion(): void {
    if (this.suggestionsControl.current && this.suggestionsControl.current.hasSuggestionSelected()) {
      this.onCurrentlySelectedSuggestionChosen();
    } else {
      this._validateAndInsertCurrentQueryString();
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
        this.props.onInputChanged(queryString);
      }

      this.updateValue(queryString);
    }
  };

  public hidePicker = (): void => {
    if (this.props.onSuggestionsHidden && this.isSuggestionsShown) {
      this.props.onSuggestionsHidden();
    }

    this.setState({
      suggestionsVisible: false,
    });
  };

  public showPicker = (updateValue: boolean = false): void => {
    if (this.props.onSuggestionsShown && !this.isSuggestionsShown) {
      this.props.onSuggestionsShown();
    }

    this.setState({
      suggestionsVisible: true,
    });

    // Update the suggestions if updateValue == true
    const value = this.props.inputElement ? this.props.inputElement.value : '';
    if (updateValue) {
      this.updateValue(value);
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
    this._async.dispose();
  }

  public UNSAFE_componentWillReceiveProps(newProps: IFloatingSuggestionsProps<TItem>): void {
    if (newProps.suggestionItems) {
      this.updateSuggestions(newProps.suggestionItems);
    }
  }

  public onCurrentlySelectedSuggestionChosen = (): void => {
    if (this.suggestionsControl.current && this.suggestionsControl.current.hasSuggestionSelected()) {
      this._onSuggestionSelected(this.suggestionsControl.current.currentSuggestion!.item);
    }
  };

  public updateSuggestions(suggestions: TItem[], forceUpdate: boolean = false): void {
    this.suggestionStore.updateSuggestions(suggestions);

    if (forceUpdate) {
      this.forceUpdate();
    }
  }

  public render(): JSX.Element {
    const { className } = this.props;
    return (
      <div ref={this.root} className={css('ms-BasePicker ms-BaseFloatingPicker', className ? className : '')}>
        {this._renderSuggestions()}
      </div>
    );
  }

  public updateValue(updatedValue: string): void {
    if (updatedValue === '') {
      this.updateSuggestionWithZeroState();
    } else {
      this._onResolveSuggestions(updatedValue);
    }
  }

  public updateSuggestionWithZeroState(): void {
    if (this.props.onZeroQuerySuggestion) {
      const suggestions: TItem[] | PromiseLike<TItem[]> | null = this.props.onZeroQuerySuggestion();
      this.updateSuggestionsList(suggestions || []);
    } else {
      this.hidePicker();
    }
  }

  public updateSuggestionsList(suggestions: TItem[] | PromiseLike<TItem[]>): void {
    // Check to see if the returned value is an array, if it is then just pass it into the next function.
    // If the returned value is not an array then check to see if it's a promise or PromiseLike.
    // If it is then resolve it asynchronously.
    if (Array.isArray(suggestions)) {
      this.updateSuggestions(suggestions, true /*forceUpdate*/);
    } else if (suggestions && (suggestions as PromiseLike<TItem[]>).then) {
      // Ensure that the promise will only use the callback if it was the most recent one.
      this.currentPromise = suggestions;
      suggestions.then((newSuggestions: TItem[]) => {
        // Only update if the next promise has not yet resolved and
        // the floating picker is still mounted.
        if (suggestions === this.currentPromise && this.isComponentMounted) {
          this.updateSuggestions(newSuggestions, true /*forceUpdate*/);
        }
      });
    }
  }

  private _renderSuggestions(): JSX.Element | null {
    // Express this as 2 separate statements instead of a single one, because `undefined` isn't filtered out of the type
    // when using `|| SuggestionsControl`
    let TypedSuggestionsControl: React.ComponentType<IFloatingSuggestionsInnerSuggestionProps<TItem>> | undefined =
      this.props.onRenderSuggestionControl;
    if (TypedSuggestionsControl === undefined) {
      TypedSuggestionsControl = SuggestionsControl;
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
      >
        <TypedSuggestionsControl
          onRenderSuggestion={this.props.onRenderSuggestionsItem}
          onSuggestionClick={this._onSuggestionClick}
          onSuggestionRemove={this._onSuggestionRemove}
          suggestions={this.suggestionStore.getSuggestions()}
          componentRef={this.suggestionsControl}
          onCurrentlySelectedSuggestionChosen={this.onCurrentlySelectedSuggestionChosen}
          shouldLoopSelection={false}
        />
      </Callout>
    ) : null;
  }

  private _onSuggestionSelected(item: TItem): void {
    if (this.props.onSuggestionSelected) {
      this.props.onSuggestionSelected(item);
    }
  }

  private _onSuggestionClick = (ev: React.MouseEvent<HTMLElement>, item: TItem, index: number): void => {
    this._onSuggestionSelected(item);
    this._updateSuggestionsVisible(false /*shouldShow*/);
  };

  private _onSuggestionRemove = (ev: React.MouseEvent<HTMLElement>, item: TItem, index: number): void => {
    if (this.props.onRemoveSuggestion) {
      this.props.onRemoveSuggestion(item);
    }

    if (this.suggestionsControl.current) {
      this.suggestionsControl.current.removeSuggestion(index);
    }
  };

  private _onKeyDown = (ev: MouseEvent): void => {
    if (
      !this.state.suggestionsVisible ||
      (this.props.inputElement && ev.target instanceof Node && !this.props.inputElement.contains(ev.target))
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
          // no selection. Try to force resolve the current query
          this._validateAndInsertCurrentQueryString();
        }
        break;

      case KeyCodes.del:
        if (
          this.props.onRemoveSuggestion &&
          this.suggestionsControl.current?.hasSuggestionSelected &&
          this.suggestionsControl.current?.currentSuggestion &&
          ev.shiftKey
        ) {
          this.props.onRemoveSuggestion(this.suggestionsControl.current.currentSuggestion!.item);

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
        this.props.inputElement.setAttribute('aria-activedescendant', selectedElId);
      }
    }
  }

  private _onResolveSuggestions(updatedValue: string): void {
    const suggestions: TItem[] | PromiseLike<TItem[]> | null = this.props.onResolveSuggestions(updatedValue);

    this._updateSuggestionsVisible(true /*shouldShow*/);
    if (suggestions !== null) {
      this.updateSuggestionsList(suggestions);
    }
  }

  private _validateAndInsertCurrentQueryString = (): void => {
    if (this.state.queryString && this.props.isQueryForceResolveable && this.props.createForceResolvedItem) {
      const isForceResolvable: boolean = this.props.isQueryForceResolveable(this.state.queryString);
      if (!isForceResolvable) {
        return;
      }

      const itemToConvert: ISuggestionModel<TItem> = this.props.createForceResolvedItem(this.state.queryString);
      const convertedItems = this.suggestionStore.convertSuggestionsToSuggestionItems([itemToConvert]);
      this._onSuggestionSelected(convertedItems[0].item);
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
      this.props.inputElement.addEventListener('keydown', this._onKeyDown);
      this.setState({ didBind: true });
    }
  }

  private _unbindFromInputElement(): void {
    if (this.props.inputElement && this.state.didBind) {
      this.props.inputElement.removeEventListener('keydown', this._onKeyDown);
      this.setState({ didBind: false });
    }
  }
}

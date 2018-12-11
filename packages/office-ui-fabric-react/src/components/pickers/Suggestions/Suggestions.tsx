import * as React from 'react';
import { BaseComponent, css, KeyCodes, createRef } from '../../../Utilities';
import { CommandButton, IconButton, IButton } from '../../../Button';
import { Spinner } from '../../../Spinner';
import { ISuggestionItemProps, ISuggestionsProps } from './Suggestions.types';
import * as stylesImport from './Suggestions.scss';
const styles: any = stylesImport;

export enum SuggestionActionType {
  none,
  forceResolve,
  searchMore
}

export interface ISuggestionsState {
  selectedActionType: SuggestionActionType;
}

export class SuggestionsItem<T> extends BaseComponent<ISuggestionItemProps<T>, {}> {
  public render(): JSX.Element {
    const { suggestionModel, RenderSuggestion, onClick, className, onRemoveItem, isSelectedOverride, removeButtonAriaLabel } = this.props;
    return (
      <div
        className={css(
          'ms-Suggestions-item',
          styles.suggestionsItem,
          {
            ['is-suggested ' + styles.suggestionsItemIsSuggested]: suggestionModel.selected || isSelectedOverride
          },
          className
        )}
      >
        <CommandButton onClick={onClick} className={css('ms-Suggestions-itemButton', styles.itemButton)}>
          {RenderSuggestion(suggestionModel.item, this.props)}
        </CommandButton>
        {this.props.showRemoveButton ? (
          <IconButton
            iconProps={{ iconName: 'Cancel', style: { fontSize: '12px' } }}
            title={removeButtonAriaLabel}
            ariaLabel={removeButtonAriaLabel}
            onClick={onRemoveItem}
            className={css('ms-Suggestions-closeButton', styles.closeButton)}
          />
        ) : null}
      </div>
    );
  }
}

export class Suggestions<T> extends BaseComponent<ISuggestionsProps<T>, ISuggestionsState> {
  protected _forceResolveButton = createRef<IButton>();
  protected _searchForMoreButton = createRef<IButton>();
  protected _selectedElement = createRef<HTMLDivElement>();
  private SuggestionsItemOfProperType = SuggestionsItem as new (props: ISuggestionItemProps<T>) => SuggestionsItem<T>;
  private activeSelectedElement: HTMLDivElement | null;
  constructor(suggestionsProps: ISuggestionsProps<T>) {
    super(suggestionsProps);
    this.state = {
      selectedActionType: SuggestionActionType.none
    };
  }

  public componentDidMount(): void {
    this.scrollSelected();
    this.activeSelectedElement = this._selectedElement ? this._selectedElement.current : null;
  }

  public componentDidUpdate(): void {
    // Only scroll to selected element if the selected element has changed. Otherwise do nothing.
    // This prevents some odd behavior where scrolling the active element out of view and clicking on a selected element
    // will trigger a focus event and not give the clicked element the click.
    if (this._selectedElement.current && this.activeSelectedElement !== this._selectedElement.current) {
      this.scrollSelected();
      this.activeSelectedElement = this._selectedElement.current;
    }
  }

  public render(): JSX.Element {
    const {
      forceResolveText,
      mostRecentlyUsedHeaderText,
      searchForMoreText,
      className,
      moreSuggestionsAvailable,
      noResultsFoundText,
      suggestions,
      isLoading,
      isSearching,
      loadingText,
      onRenderNoResultFound,
      searchingText,
      isMostRecentlyUsedVisible,
      resultsMaximumNumber,
      resultsFooterFull,
      resultsFooter,
      isResultsFooterVisible = true,
      suggestionsAvailableAlertText,
      suggestionsHeaderText
    } = this.props;

    const noResults = () => {
      return noResultsFoundText ? (
        <div role="alert" className={css('ms-Suggestions-none', styles.suggestionsNone)}>
          {noResultsFoundText}
        </div>
      ) : null;
    };
    // MostRecently Used text should supercede the header text if it's there and available.
    let headerText: string | undefined = suggestionsHeaderText;
    if (isMostRecentlyUsedVisible && mostRecentlyUsedHeaderText) {
      headerText = mostRecentlyUsedHeaderText;
    }
    let footerTitle: ((props: ISuggestionsProps<T>) => JSX.Element) | undefined = undefined;
    if (isResultsFooterVisible) {
      footerTitle = suggestions.length >= (resultsMaximumNumber as number) ? resultsFooterFull : resultsFooter;
    }
    const hasNoSuggestions = (!suggestions || !suggestions.length) && !isLoading;
    return (
      <div className={css('ms-Suggestions', className ? className : '', styles.root)}>
        {headerText ? <div className={css('ms-Suggestions-title', styles.suggestionsTitle)}>{headerText}</div> : null}
        {forceResolveText && this._shouldShowForceResolve() && (
          <CommandButton
            componentRef={this._forceResolveButton}
            className={css('ms-forceResolve-button', styles.actionButton, {
              ['is-selected ' + styles.buttonSelected]: this.state.selectedActionType === SuggestionActionType.forceResolve
            })}
            onClick={this._forceResolve}
          >
            {forceResolveText}
          </CommandButton>
        )}
        {isLoading && <Spinner className={css('ms-Suggestions-spinner', styles.suggestionsSpinner)} label={loadingText} />}
        {hasNoSuggestions ? (onRenderNoResultFound ? onRenderNoResultFound(undefined, noResults) : noResults()) : this._renderSuggestions()}
        {searchForMoreText && moreSuggestionsAvailable && (
          <CommandButton
            componentRef={this._searchForMoreButton}
            className={css('ms-SearchMore-button', styles.actionButton, {
              ['is-selected ' + styles.buttonSelected]: this.state.selectedActionType === SuggestionActionType.searchMore
            })}
            iconProps={{ iconName: 'Search' }}
            onClick={this._getMoreResults}
          >
            {searchForMoreText}
          </CommandButton>
        )}
        {isSearching ? <Spinner className={css('ms-Suggestions-spinner', styles.suggestionsSpinner)} label={searchingText} /> : null}
        {footerTitle && !moreSuggestionsAvailable && !isMostRecentlyUsedVisible && !isSearching ? (
          <div className={css('ms-Suggestions-title', styles.suggestionsTitle)}>{footerTitle(this.props)}</div>
        ) : null}
        {
          <span role="alert" aria-live="polite" className={css('ms-Suggestions-suggestionsAvailable', styles.suggestionsAvailable)}>
            {!isLoading && !isSearching && suggestions && suggestions.length > 0 && suggestionsAvailableAlertText
              ? suggestionsAvailableAlertText
              : null}
          </span>
        }
      </div>
    );
  }

  /**
   * Returns true if the event was handled, false otherwise
   */
  public tryHandleKeyDown = (keyCode: number, currentSuggestionIndex: number): boolean => {
    let isEventHandled = false;
    let newSelectedActionType = null;
    const currentSelectedAction = this.state.selectedActionType;
    const suggestionLength = this.props.suggestions.length;
    if (keyCode === KeyCodes.down) {
      switch (currentSelectedAction) {
        case SuggestionActionType.forceResolve:
          if (suggestionLength > 0) {
            this._refocusOnSuggestions(keyCode);
            newSelectedActionType = SuggestionActionType.none;
          } else if (this._searchForMoreButton.current) {
            newSelectedActionType = SuggestionActionType.searchMore;
          } else {
            newSelectedActionType = SuggestionActionType.forceResolve;
          }
          break;
        case SuggestionActionType.searchMore:
          if (this._forceResolveButton.current) {
            newSelectedActionType = SuggestionActionType.forceResolve;
          } else if (suggestionLength > 0) {
            this._refocusOnSuggestions(keyCode);
            newSelectedActionType = SuggestionActionType.none;
          } else {
            newSelectedActionType = SuggestionActionType.searchMore;
          }
          break;
        case SuggestionActionType.none:
          if (currentSuggestionIndex === -1 && this._forceResolveButton.current) {
            newSelectedActionType = SuggestionActionType.forceResolve;
          }
          break;
      }
    } else if (keyCode === KeyCodes.up) {
      switch (currentSelectedAction) {
        case SuggestionActionType.forceResolve:
          if (this._searchForMoreButton.current) {
            newSelectedActionType = SuggestionActionType.searchMore;
          } else if (suggestionLength > 0) {
            this._refocusOnSuggestions(keyCode);
            newSelectedActionType = SuggestionActionType.none;
          }
          break;
        case SuggestionActionType.searchMore:
          if (suggestionLength > 0) {
            this._refocusOnSuggestions(keyCode);
            newSelectedActionType = SuggestionActionType.none;
          } else if (this._forceResolveButton.current) {
            newSelectedActionType = SuggestionActionType.forceResolve;
          }
          break;
        case SuggestionActionType.none:
          if (currentSuggestionIndex === -1 && this._searchForMoreButton.current) {
            newSelectedActionType = SuggestionActionType.searchMore;
          }
          break;
      }
    }

    if (newSelectedActionType !== null) {
      this.setState({ selectedActionType: newSelectedActionType });
      isEventHandled = true;
    }

    return isEventHandled;
  };

  public hasSuggestedAction(): boolean {
    return this._searchForMoreButton.current !== undefined || this._forceResolveButton.current !== undefined;
  }

  public hasSuggestedActionSelected(): boolean {
    return this.state.selectedActionType !== SuggestionActionType.none;
  }

  public executeSelectedAction(): void {
    switch (this.state.selectedActionType) {
      case SuggestionActionType.forceResolve:
        this._forceResolve();
        break;
      case SuggestionActionType.searchMore:
        this._getMoreResults();
        break;
    }
  }

  public focusAboveSuggestions(): void {
    if (this._forceResolveButton.current) {
      this.setState({ selectedActionType: SuggestionActionType.forceResolve });
    } else if (this._searchForMoreButton.current) {
      this.setState({ selectedActionType: SuggestionActionType.searchMore });
    }
  }

  public focusBelowSuggestions(): void {
    if (this._searchForMoreButton.current) {
      this.setState({ selectedActionType: SuggestionActionType.searchMore });
    } else if (this._forceResolveButton.current) {
      this.setState({ selectedActionType: SuggestionActionType.forceResolve });
    }
  }

  public focusSearchForMoreButton(): void {
    if (this._searchForMoreButton.current) {
      this._searchForMoreButton.current.focus();
    }
  }

  // TODO get the element to scroll into view properly regardless of direction.
  public scrollSelected(): void {
    if (this._selectedElement.current && this._selectedElement.current.scrollIntoView !== undefined) {
      this._selectedElement.current.scrollIntoView(false);
    }
  }

  private _renderSuggestions(): JSX.Element | null {
    const {
      onRenderSuggestion,
      removeSuggestionAriaLabel,
      suggestionsItemClassName,
      resultsMaximumNumber,
      showRemoveButtons,
      suggestionsContainerAriaLabel,
      suggestionsListId,
      suggestionsClassName
    } = this.props;
    let { suggestions } = this.props;
    const TypedSuggestionsItem = this.SuggestionsItemOfProperType;

    if (resultsMaximumNumber) {
      suggestions = suggestions.slice(0, resultsMaximumNumber);
    }

    if (suggestions.length === 0) {
      return null;
    }

    return (
      <div
        className={css('ms-Suggestions-container', styles.suggestionsContainer, suggestionsClassName)}
        id={suggestionsListId}
        role="listbox"
        aria-label={suggestionsContainerAriaLabel}
      >
        {suggestions.map((suggestion, index) => (
          <div
            ref={suggestion.selected ? this._selectedElement : ''}
            // tslint:disable-next-line:no-string-literal
            key={(suggestion.item as any)['key'] ? (suggestion.item as any)['key'] : index}
            id={'sug-' + index}
            aria-selected={suggestion.selected}
            role="option"
            aria-label={suggestion.ariaLabel}
          >
            <TypedSuggestionsItem
              suggestionModel={suggestion}
              RenderSuggestion={onRenderSuggestion as any}
              onClick={this._onClickTypedSuggestionsItem(suggestion.item, index)}
              className={suggestionsItemClassName}
              showRemoveButton={showRemoveButtons}
              removeButtonAriaLabel={removeSuggestionAriaLabel}
              onRemoveItem={this._onRemoveTypedSuggestionsItem(suggestion.item, index)}
            />
          </div>
        ))}
      </div>
    );
  }

  private _getMoreResults = (): void => {
    if (this.props.onGetMoreResults) {
      this.props.onGetMoreResults();
    }
  };

  private _forceResolve = (): void => {
    if (this.props.createGenericItem) {
      this.props.createGenericItem();
    }
  };

  private _shouldShowForceResolve = (): boolean => {
    return this.props.showForceResolve ? this.props.showForceResolve() : false;
  };

  private _onClickTypedSuggestionsItem = (item: T, index: number): ((ev: React.MouseEvent<HTMLElement>) => void) => {
    return (ev: React.MouseEvent<HTMLElement>): void => {
      this.props.onSuggestionClick(ev, item, index);
    };
  };

  private _refocusOnSuggestions = (keyCode: number): void => {
    if (typeof this.props.refocusSuggestions === 'function') {
      this.props.refocusSuggestions(keyCode);
    }
  };

  private _onRemoveTypedSuggestionsItem = (item: T, index: number): ((ev: React.MouseEvent<HTMLElement>) => void) => {
    return (ev: React.MouseEvent<HTMLElement>): void => {
      const onSuggestionRemove = this.props.onSuggestionRemove!;
      onSuggestionRemove(ev, item, index);
      ev.stopPropagation();
    };
  };
}

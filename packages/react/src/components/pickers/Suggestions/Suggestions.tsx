import * as React from 'react';

import { initializeComponentRef, KeyCodes, classNamesFunction, css, styled } from '../../../Utilities';
import { CommandButton } from '../../../Button';
import { Spinner } from '../../../Spinner';
import { Announced } from '../../../Announced';
import { SuggestionActionType } from './Suggestions.types';
import { SuggestionsItem } from './SuggestionsItem';
import { getStyles as suggestionsItemStyles } from './SuggestionsItem.styles';
import * as stylesImport from './Suggestions.scss';
import type { IStyleFunctionOrObject } from '../../../Utilities';
import type { IProcessedStyleSet } from '../../../Styling';
import type { IButton } from '../../../Button';
import type { ISpinnerStyleProps, ISpinnerStyles } from '../../../Spinner';
import type { ISuggestionsProps, ISuggestionsStyleProps, ISuggestionsStyles } from './Suggestions.types';
import type { ISuggestionItemProps, ISuggestionsItemStyleProps, ISuggestionsItemStyles } from './SuggestionsItem.types';

const legacyStyles: any = stylesImport;

const getClassNames = classNamesFunction<ISuggestionsStyleProps, ISuggestionsStyles>();

export interface ISuggestionsState {
  selectedActionType: SuggestionActionType;
}

const StyledSuggestionsItem = styled<ISuggestionItemProps<any>, ISuggestionsItemStyleProps, ISuggestionsItemStyles>(
  SuggestionsItem,
  suggestionsItemStyles,
  undefined,
  {
    scope: 'SuggestionItem',
  },
);

/**
 * {@docCategory Pickers}
 */
export class Suggestions<T> extends React.Component<ISuggestionsProps<T>, ISuggestionsState> {
  protected _forceResolveButton = React.createRef<IButton>();
  protected _searchForMoreButton = React.createRef<IButton>();
  protected _selectedElement = React.createRef<HTMLDivElement>();
  protected _scrollContainer = React.createRef<HTMLDivElement>();
  private activeSelectedElement: HTMLDivElement | null;
  private _classNames: Partial<IProcessedStyleSet<ISuggestionsStyles>>;

  constructor(suggestionsProps: ISuggestionsProps<T>) {
    super(suggestionsProps);

    initializeComponentRef(this);

    this.state = {
      selectedActionType: SuggestionActionType.none,
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
      searchForMoreIcon,
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
      suggestionsHeaderText,
      suggestionsClassName,
      theme,
      styles,
      suggestionsListId,
      suggestionsContainerAriaLabel,
    } = this.props;

    // TODO
    // Clean this up by leaving only the first part after removing support for SASS.
    // Currently we can not remove the SASS styles from Suggestions class because it
    // might be used by consumers separately from pickers extending from BasePicker
    // and have not used the new 'styles' prop. Because it's expecting a type parameter,
    // we can not use the 'styled' function without adding some helpers which can break
    // downstream consumers who did not use the new helpers.
    // We check for 'styles' prop which is going to be injected by the 'styled' HOC
    // in BasePicker when the typed Suggestions class is ready to be rendered. If the check
    // passes we can use the CSS-in-JS styles. If the check fails (ex: custom picker),
    // then we just use the old SASS styles instead.
    this._classNames = styles
      ? getClassNames(styles, {
          theme: theme!,
          className,
          suggestionsClassName,
          forceResolveButtonSelected: this.state.selectedActionType === SuggestionActionType.forceResolve,
          searchForMoreButtonSelected: this.state.selectedActionType === SuggestionActionType.searchMore,
        })
      : {
          root: css('ms-Suggestions', className, legacyStyles.root),
          title: css('ms-Suggestions-title', legacyStyles.suggestionsTitle),
          searchForMoreButton: css('ms-SearchMore-button', legacyStyles.actionButton, {
            ['is-selected ' + legacyStyles.buttonSelected]:
              this.state.selectedActionType === SuggestionActionType.searchMore,
          }),
          forceResolveButton: css('ms-forceResolve-button', legacyStyles.actionButton, {
            ['is-selected ' + legacyStyles.buttonSelected]:
              this.state.selectedActionType === SuggestionActionType.forceResolve,
          }),
          suggestionsAvailable: css('ms-Suggestions-suggestionsAvailable', legacyStyles.suggestionsAvailable),
          suggestionsContainer: css(
            'ms-Suggestions-container',
            legacyStyles.suggestionsContainer,
            suggestionsClassName,
          ),
          noSuggestions: css('ms-Suggestions-none', legacyStyles.suggestionsNone),
        };

    const spinnerStyles = this._classNames.subComponentStyles
      ? (this._classNames.subComponentStyles.spinner as IStyleFunctionOrObject<ISpinnerStyleProps, ISpinnerStyles>)
      : undefined;

    // TODO: cleanup after refactor of pickers to composition pattern and remove SASS support.
    const spinnerClassNameOrStyles = styles
      ? { styles: spinnerStyles }
      : {
          className: css('ms-Suggestions-spinner', legacyStyles.suggestionsSpinner),
        };

    const noResults = () => (
      // This ID can be used by the parent to set aria-activedescendant to this
      <div id="sug-noResultsFound" role="option">
        {onRenderNoResultFound ? (
          onRenderNoResultFound(undefined, noResults)
        ) : (
          <div className={this._classNames.noSuggestions}>{noResultsFoundText}</div>
        )}
      </div>
    );

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

    const forceResolveId =
      this.state.selectedActionType === SuggestionActionType.forceResolve ? 'sug-selectedAction' : undefined;
    const searchForMoreId =
      this.state.selectedActionType === SuggestionActionType.searchMore ? 'sug-selectedAction' : undefined;

    return (
      <div
        className={this._classNames.root}
        aria-label={suggestionsContainerAriaLabel || headerText}
        id={suggestionsListId}
        role="listbox"
      >
        <Announced message={this._getAlertText()} aria-live="polite" />

        {headerText ? <div className={this._classNames.title}>{headerText}</div> : null}
        {forceResolveText && this._shouldShowForceResolve() && (
          <CommandButton
            componentRef={this._forceResolveButton}
            className={this._classNames.forceResolveButton}
            id={forceResolveId}
            onClick={this._forceResolve}
            data-automationid={'sug-forceResolve'}
          >
            {forceResolveText}
          </CommandButton>
        )}
        {isLoading && <Spinner {...spinnerClassNameOrStyles} ariaLabel={loadingText} label={loadingText} />}
        {hasNoSuggestions ? noResults() : this._renderSuggestions()}
        {searchForMoreText && moreSuggestionsAvailable && (
          <CommandButton
            componentRef={this._searchForMoreButton}
            className={this._classNames.searchForMoreButton}
            iconProps={searchForMoreIcon || { iconName: 'Search' }}
            id={searchForMoreId}
            onClick={this._getMoreResults}
            data-automationid={'sug-searchForMore'}
            role={'option'}
          >
            {searchForMoreText}
          </CommandButton>
        )}
        {isSearching ? <Spinner {...spinnerClassNameOrStyles} ariaLabel={searchingText} label={searchingText} /> : null}
        {footerTitle && !moreSuggestionsAvailable && !isMostRecentlyUsedVisible && !isSearching ? (
          <div className={this._classNames.title}>{footerTitle(this.props)}</div>
        ) : null}
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
    return !!this._searchForMoreButton.current || !!this._forceResolveButton.current;
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

  public scrollSelected(): void {
    if (
      this._selectedElement.current &&
      this._scrollContainer.current &&
      this._scrollContainer.current.scrollTo !== undefined
    ) {
      const { offsetHeight, offsetTop } = this._selectedElement.current;
      const { offsetHeight: parentOffsetHeight, scrollTop } = this._scrollContainer.current;

      const isAbove = offsetTop < scrollTop;
      const isBelow = offsetTop + offsetHeight > scrollTop + parentOffsetHeight;

      if (isAbove) {
        this._scrollContainer.current.scrollTo(0, offsetTop);
      } else if (isBelow) {
        this._scrollContainer.current.scrollTo(0, offsetTop - parentOffsetHeight + offsetHeight);
      }
    }
  }

  private _getAlertText = () => {
    const { isLoading, isSearching, suggestions, suggestionsAvailableAlertText, noResultsFoundText } = this.props;
    if (!isLoading && !isSearching) {
      if (suggestions.length > 0) {
        return suggestionsAvailableAlertText || '';
      }
      if (noResultsFoundText) {
        return noResultsFoundText;
      }
    }
    return '';
  };

  private _renderSuggestions(): JSX.Element | null {
    const {
      onRenderSuggestion,
      removeSuggestionAriaLabel,
      suggestionsItemClassName,
      resultsMaximumNumber,
      showRemoveButtons,
      removeButtonIconProps,
    } = this.props;

    let { suggestions } = this.props;

    const StyledTypedSuggestionsItem: React.FunctionComponent<ISuggestionItemProps<T>> = StyledSuggestionsItem;

    let selectedIndex = -1;
    suggestions.some((element, index) => {
      if (element.selected) {
        selectedIndex = index;
        return true;
      }
      return false;
    });

    if (resultsMaximumNumber) {
      suggestions =
        selectedIndex >= resultsMaximumNumber
          ? suggestions.slice(selectedIndex - resultsMaximumNumber + 1, selectedIndex + 1)
          : suggestions.slice(0, resultsMaximumNumber);
    }

    if (suggestions.length === 0) {
      return null;
    }

    return (
      <div className={this._classNames.suggestionsContainer} ref={this._scrollContainer} role="presentation">
        {suggestions.map((suggestion, index) => (
          <div
            ref={suggestion.selected ? this._selectedElement : undefined}
            key={(suggestion.item as any).key ? (suggestion.item as any).key : index}
            role="presentation"
          >
            <StyledTypedSuggestionsItem
              suggestionModel={suggestion}
              RenderSuggestion={onRenderSuggestion}
              onClick={this._onClickTypedSuggestionsItem(suggestion.item, index)}
              className={suggestionsItemClassName}
              showRemoveButton={showRemoveButtons}
              removeButtonAriaLabel={removeSuggestionAriaLabel}
              onRemoveItem={this._onRemoveTypedSuggestionsItem(suggestion.item, index)}
              id={'sug-' + index}
              removeButtonIconProps={removeButtonIconProps}
            />
          </div>
        ))}
      </div>
    );
  }

  private _getMoreResults = (): void => {
    if (this.props.onGetMoreResults) {
      this.props.onGetMoreResults();

      // Reset selected action type as it will be of type SuggestionActionType.none after more results are gotten
      this.setState({ selectedActionType: SuggestionActionType.none });
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

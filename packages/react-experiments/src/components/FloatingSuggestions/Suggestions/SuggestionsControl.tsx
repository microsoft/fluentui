import * as React from 'react';
import { css, KeyCodes, initializeComponentRef } from '@fluentui/react/lib/Utilities';
import { SuggestionsCore } from './SuggestionsCore';
import * as stylesImport from './SuggestionsControl.scss';
import type { ISuggestionModel } from '@fluentui/react/lib/Pickers';
import type {
  ISuggestionsHeaderFooterItemProps,
  ISuggestionsControlProps,
  ISuggestionsHeaderFooterProps,
} from './Suggestions.types';

const styles: any = stylesImport;

export enum SuggestionItemType {
  header,
  suggestion,
  footer,
}

export interface ISuggestionsControlState<T> {
  selectedHeaderIndex: number;
  selectedFooterIndex: number;
  suggestions: ISuggestionModel<T>[];
}

export class SuggestionsHeaderFooterItem extends React.Component<ISuggestionsHeaderFooterItemProps, {}> {
  constructor(props: ISuggestionsHeaderFooterItemProps) {
    super(props);

    initializeComponentRef(this);
  }

  public render(): JSX.Element {
    const { renderItem, onExecute, isSelected, id, className } = this.props;
    return onExecute ? (
      <div
        id={id}
        onClick={onExecute}
        className={css('ms-Suggestions-sectionButton', className, styles.actionButton, {
          ['is-selected ' + styles.buttonSelected]: isSelected,
        })}
      >
        {renderItem()}
      </div>
    ) : (
      <div id={id} className={css('ms-Suggestions-section', className, styles.suggestionsTitle)}>
        {renderItem()}
      </div>
    );
  }
}

/**
 * Class when used with SuggestionsStore, renders a suggestions control with customizable headers and footers
 */
export class SuggestionsControl<T extends {}> extends React.Component<
  ISuggestionsControlProps<T>,
  ISuggestionsControlState<T>
> {
  private _selectedElement = React.createRef<HTMLDivElement>();
  private _suggestions = React.createRef<SuggestionsCore<T>>();

  constructor(suggestionsProps: ISuggestionsControlProps<T>) {
    super(suggestionsProps);

    initializeComponentRef(this);

    this.state = {
      selectedHeaderIndex: -1,
      selectedFooterIndex: -1,
      suggestions: suggestionsProps.suggestions,
    };
  }

  public componentDidMount(): void {
    this._resetSelectedItem();
  }

  public componentDidUpdate(prevProps: ISuggestionsControlProps<T>, prevState: ISuggestionsControlState<T>): void {
    this.scrollSelected();
  }

  public UNSAFE_componentWillReceiveProps(newProps: ISuggestionsControlProps<T>): void {
    if (newProps.suggestions) {
      this.setState({ suggestions: newProps.suggestions }, () => {
        this._resetSelectedItem();
      });
    }
  }

  public componentWillUnmount(): void {
    this._suggestions.current?.deselectAllSuggestions();
  }

  public render(): JSX.Element {
    const { className, headerItemsProps, footerItemsProps } = this.props;

    return (
      <div className={css('ms-Suggestions', className ? className : '', styles.root)}>
        {headerItemsProps && this._renderHeaderItems()}
        {this._renderSuggestions()}
        {footerItemsProps && this._renderFooterItems()}
      </div>
    );
  }

  public get currentSuggestion(): ISuggestionModel<T> | undefined {
    return this._suggestions.current?.getCurrentItem();
  }

  public get currentSuggestionIndex(): number {
    return this._suggestions.current ? this._suggestions.current.currentIndex : -1;
  }

  public get selectedElement(): HTMLDivElement | undefined {
    return this._suggestions.current?.selectedElement;
  }

  public hasSuggestionSelected(): boolean {
    return this._suggestions.current?.hasSuggestionSelected() || false;
  }

  public hasSelection(): boolean {
    const { selectedHeaderIndex, selectedFooterIndex } = this.state;
    return selectedHeaderIndex !== -1 || this.hasSuggestionSelected() || selectedFooterIndex !== -1;
  }

  public executeSelectedAction(): void {
    const { headerItemsProps, footerItemsProps } = this.props;
    const { selectedHeaderIndex, selectedFooterIndex } = this.state;

    if (headerItemsProps && selectedHeaderIndex !== -1 && selectedHeaderIndex < headerItemsProps.length) {
      const selectedHeaderItem = headerItemsProps[selectedHeaderIndex];
      if (selectedHeaderItem.onExecute) {
        selectedHeaderItem.onExecute();
      }
    } else if (this._suggestions.current?.hasSuggestionSelected()) {
      this.props.onCurrentlySelectedSuggestionChosen();
    } else if (footerItemsProps && selectedFooterIndex !== -1 && selectedFooterIndex < footerItemsProps.length) {
      const selectedFooterItem = footerItemsProps[selectedFooterIndex];
      if (selectedFooterItem.onExecute) {
        selectedFooterItem.onExecute();
      }
    }
  }

  public removeSuggestion(index?: number): void {
    this._suggestions.current?.removeSuggestion(index ? index : this._suggestions.current?.currentIndex);
  }

  /**
   * Handles the key down, returns true, if the event was handled, false otherwise
   * @param keyCode - The keyCode to handle
   */
  public handleKeyDown(keyCode: number): boolean {
    const { selectedHeaderIndex, selectedFooterIndex } = this.state;
    let isKeyDownHandled = false;
    if (keyCode === KeyCodes.down) {
      if (
        selectedHeaderIndex === -1 &&
        !this._suggestions.current?.hasSuggestionSelected() &&
        selectedFooterIndex === -1
      ) {
        this._selectFirstItem();
      } else if (selectedHeaderIndex !== -1) {
        this._selectNextItem(SuggestionItemType.header);
        isKeyDownHandled = true;
      } else if (this._suggestions.current?.hasSuggestionSelected()) {
        this._selectNextItem(SuggestionItemType.suggestion);
        isKeyDownHandled = true;
      } else if (selectedFooterIndex !== -1) {
        this._selectNextItem(SuggestionItemType.footer);
        isKeyDownHandled = true;
      }
    } else if (keyCode === KeyCodes.up) {
      if (
        selectedHeaderIndex === -1 &&
        !this._suggestions.current?.hasSuggestionSelected() &&
        selectedFooterIndex === -1
      ) {
        this._selectLastItem();
      } else if (selectedHeaderIndex !== -1) {
        this._selectPreviousItem(SuggestionItemType.header);
        isKeyDownHandled = true;
      } else if (this._suggestions.current?.hasSuggestionSelected()) {
        this._selectPreviousItem(SuggestionItemType.suggestion);
        isKeyDownHandled = true;
      } else if (selectedFooterIndex !== -1) {
        this._selectPreviousItem(SuggestionItemType.footer);
        isKeyDownHandled = true;
      }
    } else if (keyCode === KeyCodes.enter || keyCode === KeyCodes.tab) {
      if (this.hasSelection()) {
        this.executeSelectedAction();
        isKeyDownHandled = true;
      }
    }

    return isKeyDownHandled;
  }

  // TODO get the element to scroll into view properly regardless of direction.
  public scrollSelected(): void {
    if (this._selectedElement.current) {
      this._selectedElement.current.scrollIntoView(false);
    }
  }

  private _renderHeaderItems(): JSX.Element | null {
    const { headerItemsProps, suggestionsHeaderContainerAriaLabel } = this.props;
    const { selectedHeaderIndex } = this.state;

    return headerItemsProps ? (
      <div
        className={css('ms-Suggestions-headerContainer', styles.suggestionsContainer)}
        id="suggestionHeader-list"
        role="list"
        aria-label={suggestionsHeaderContainerAriaLabel}
      >
        {headerItemsProps.map((headerItemProps: ISuggestionsHeaderFooterProps, index: number) => {
          const isSelected = selectedHeaderIndex !== -1 && selectedHeaderIndex === index;
          return headerItemProps.shouldShow() ? (
            <div
              ref={isSelected ? this._selectedElement : undefined}
              id={'sug-header' + index}
              key={'sug-header' + index}
              role="listitem"
              aria-label={headerItemProps.ariaLabel}
            >
              <SuggestionsHeaderFooterItem
                id={'sug-header-item' + index}
                isSelected={isSelected}
                renderItem={headerItemProps.renderItem}
                onExecute={headerItemProps.onExecute}
                className={headerItemProps.className}
              />
            </div>
          ) : null;
        })}
      </div>
    ) : null;
  }

  private _renderFooterItems(): JSX.Element | null {
    const { footerItemsProps, suggestionsFooterContainerAriaLabel } = this.props;
    const { selectedFooterIndex } = this.state;
    return footerItemsProps ? (
      <div
        className={css('ms-Suggestions-footerContainer', styles.suggestionsContainer)}
        id="suggestionFooter-list"
        role="list"
        aria-label={suggestionsFooterContainerAriaLabel}
      >
        {footerItemsProps.map((footerItemProps: ISuggestionsHeaderFooterProps, index: number) => {
          const isSelected = selectedFooterIndex !== -1 && selectedFooterIndex === index;
          return footerItemProps.shouldShow() ? (
            <div
              ref={isSelected ? this._selectedElement : undefined}
              id={'sug-footer' + index}
              key={'sug-footer' + index}
              role="listitem"
              aria-label={footerItemProps.ariaLabel}
            >
              <SuggestionsHeaderFooterItem
                id={'sug-footer-item' + index}
                isSelected={isSelected}
                renderItem={footerItemProps.renderItem}
                onExecute={footerItemProps.onExecute}
                className={footerItemProps.className}
              />
            </div>
          ) : null;
        })}
      </div>
    ) : null;
  }

  private _renderSuggestions(): JSX.Element {
    return <SuggestionsCore<T> ref={this._suggestions} {...this.props} suggestions={this.state.suggestions} />;
  }

  /**
   * Selects the next selectable item
   */
  private _selectNextItem(itemType: SuggestionItemType, originalItemType?: SuggestionItemType): void {
    // If the recursive calling has not found a selectable item in the other suggestion item type groups
    // And the method is being called again with the original item type,
    // Select the first selectable item of this suggestion item type group (could be the currently selected item)
    if (itemType === originalItemType) {
      this._selectNextItemOfItemType(itemType);
      return;
    }

    const startedItemType = originalItemType !== undefined ? originalItemType : itemType;

    // Try to set the selection to the next selectable item, of the same suggestion item type group
    // If this is the original item type, use the current index
    const selectionChanged = this._selectNextItemOfItemType(
      itemType,
      startedItemType === itemType ? this._getCurrentIndexForType(itemType) : undefined,
    );

    // If the selection did not change, try to select from the next suggestion type group
    if (!selectionChanged) {
      this._selectNextItem(this._getNextItemSectionType(itemType), startedItemType);
    }
  }

  /**
   * Selects the previous selectable item
   */
  private _selectPreviousItem(itemType: SuggestionItemType, originalItemType?: SuggestionItemType): void {
    // If the recursive calling has not found a selectable item in the other suggestion item type groups
    // And the method is being called again with the original item type,
    // Select the last selectable item of this suggestion item type group (could be the currently selected item)
    if (itemType === originalItemType) {
      this._selectPreviousItemOfItemType(itemType);
      return;
    }

    const startedItemType = originalItemType !== undefined ? originalItemType : itemType;

    // Try to set the selection to the previous selectable item, of the same suggestion item type group
    const selectionChanged = this._selectPreviousItemOfItemType(
      itemType,
      startedItemType === itemType ? this._getCurrentIndexForType(itemType) : undefined,
    );

    // If the selection did not change, try to select from the previous suggestion type group
    if (!selectionChanged) {
      this._selectPreviousItem(this._getPreviousItemSectionType(itemType), startedItemType);
    }
  }

  /**
   * Resets the selected state and selects the first selectable item
   */
  private _resetSelectedItem(): void {
    this.setState({ selectedHeaderIndex: -1, selectedFooterIndex: -1 });
    this._suggestions.current?.deselectAllSuggestions();

    // Select the first item if the shouldSelectFirstItem prop is not set or it is set and it returns true
    if (this.props.shouldSelectFirstItem === undefined || this.props.shouldSelectFirstItem()) {
      this._selectFirstItem();
    }
  }

  /**
   * Selects the first item
   */
  private _selectFirstItem(): void {
    if (this._selectNextItemOfItemType(SuggestionItemType.header)) {
      return;
    }

    if (this._selectNextItemOfItemType(SuggestionItemType.suggestion)) {
      return;
    }

    this._selectNextItemOfItemType(SuggestionItemType.footer);
  }

  /**
   * Selects the last item
   */
  private _selectLastItem(): void {
    if (this._selectPreviousItemOfItemType(SuggestionItemType.footer)) {
      return;
    }

    if (this._selectPreviousItemOfItemType(SuggestionItemType.suggestion)) {
      return;
    }

    this._selectPreviousItemOfItemType(SuggestionItemType.header);
  }

  /**
   * Selects the next item in the suggestion item type group, given the current index
   * If none is able to be selected, returns false, otherwise returns true
   * @param itemType - The suggestion item type
   * @param currentIndex - The current index, default is -1
   */
  private _selectNextItemOfItemType(itemType: SuggestionItemType, currentIndex: number = -1): boolean {
    if (itemType === SuggestionItemType.suggestion) {
      if (this.state.suggestions.length > currentIndex + 1) {
        this._suggestions.current?.setSelectedSuggestion(currentIndex + 1);
        this.setState({ selectedHeaderIndex: -1, selectedFooterIndex: -1 });
        return true;
      }
    } else {
      const isHeader = itemType === SuggestionItemType.header;
      const itemProps = isHeader ? this.props.headerItemsProps : this.props.footerItemsProps;

      if (itemProps && itemProps.length > currentIndex + 1) {
        for (let i = currentIndex + 1; i < itemProps.length; i++) {
          const item = itemProps[i];
          if (item.onExecute && item.shouldShow()) {
            this.setState({ selectedHeaderIndex: isHeader ? i : -1 });
            this.setState({ selectedFooterIndex: isHeader ? -1 : i });
            this._suggestions.current?.deselectAllSuggestions();
            return true;
          }
        }
      }
    }

    return false;
  }

  /**
   * Selects the previous item in the suggestion item type group, given the current index
   * If none is able to be selected, returns false, otherwise returns true
   * @param itemType - The suggestion item type
   * @param currentIndex - The current index. If none is provided, the default is the items length of specified type
   */
  private _selectPreviousItemOfItemType(itemType: SuggestionItemType, currentIndex?: number): boolean {
    if (itemType === SuggestionItemType.suggestion) {
      const index = currentIndex !== undefined ? currentIndex : this.state.suggestions.length;
      if (index > 0) {
        this._suggestions.current?.setSelectedSuggestion(index - 1);
        this.setState({ selectedHeaderIndex: -1, selectedFooterIndex: -1 });
        return true;
      }
    } else {
      const isHeader = itemType === SuggestionItemType.header;
      const itemProps = isHeader ? this.props.headerItemsProps : this.props.footerItemsProps;
      if (itemProps) {
        const index = currentIndex !== undefined ? currentIndex : itemProps.length;
        if (index > 0) {
          for (let i = index - 1; i >= 0; i--) {
            const item = itemProps[i];
            if (item.onExecute && item.shouldShow()) {
              this.setState({ selectedHeaderIndex: isHeader ? i : -1 });
              this.setState({ selectedFooterIndex: isHeader ? -1 : i });
              this._suggestions.current?.deselectAllSuggestions();
              return true;
            }
          }
        }
      }
    }

    return false;
  }

  private _getCurrentIndexForType(itemType: SuggestionItemType): number {
    switch (itemType) {
      case SuggestionItemType.header:
        return this.state.selectedHeaderIndex;
      case SuggestionItemType.suggestion:
        return this._suggestions.current!.currentIndex;
      case SuggestionItemType.footer:
        return this.state.selectedFooterIndex;
    }
  }

  private _getNextItemSectionType(itemType: SuggestionItemType): SuggestionItemType {
    switch (itemType) {
      case SuggestionItemType.header:
        return SuggestionItemType.suggestion;
      case SuggestionItemType.suggestion:
        return SuggestionItemType.footer;
      case SuggestionItemType.footer:
        return SuggestionItemType.header;
    }
  }

  private _getPreviousItemSectionType(itemType: SuggestionItemType): SuggestionItemType {
    switch (itemType) {
      case SuggestionItemType.header:
        return SuggestionItemType.footer;
      case SuggestionItemType.suggestion:
        return SuggestionItemType.header;
      case SuggestionItemType.footer:
        return SuggestionItemType.suggestion;
    }
  }
}

import * as React from 'react';
import { classNamesFunction, css } from '../../../Utilities';
import { FloatingSuggestionsItemMemo } from '../FloatingSuggestionsItem/FloatingSuggestionsItem';
import { getStyles } from './FloatingSuggestionsList.styles';
import { FloatingSuggestionsHeaderFooterItem } from '../FloatingSuggestionsHeaderFooterItem/FloatingSuggestionsHeaderFooterItem';
import type {
  IFloatingSuggestionsListStyleProps,
  IFloatingSuggestionsListStyle,
  IFloatingSuggestionsListProps,
} from './FloatingSuggestionsList.types';
import type { IFloatingSuggestionsHeaderFooterProps } from '../FloatingSuggestionsHeaderFooterItem/FloatingSuggestionsHeaderFooterItem.types';

const getClassNames = classNamesFunction<IFloatingSuggestionsListStyleProps, IFloatingSuggestionsListStyle>();

export const FloatingSuggestionsList = <T extends {}>(props: IFloatingSuggestionsListProps<T>): JSX.Element => {
  const classNames = getClassNames(getStyles);
  const { className, suggestionItems, onRenderNoResultFound, ariaLabel, noResultsFoundText } = props;
  const hasNoSuggestions = !suggestionItems || !suggestionItems.length;

  const noResults = () => {
    return noResultsFoundText ? <div className={classNames.noSuggestions}>{noResultsFoundText}</div> : null;
  };

  const renderHeader = (): JSX.Element | null => {
    const {
      onRenderHeader,
      suggestionsHeaderText,
      headerItemsProps,
      selectedHeaderIndex,
      suggestionsHeaderContainerAriaLabel,
    } = props;

    if (headerItemsProps) {
      return (
        <div
          className={css('ms-Suggestions-headerContainer', classNames.suggestionsContainer)}
          id="suggestionHeader-list"
          role="list"
          aria-label={suggestionsHeaderContainerAriaLabel}
        >
          {headerItemsProps.map((headerItemProps: IFloatingSuggestionsHeaderFooterProps, index: number) => {
            const isSelected = selectedHeaderIndex !== -1 && selectedHeaderIndex === index;
            return headerItemProps.shouldShow() ? (
              <div
                id={'sug-header' + index}
                key={'sug-header' + index}
                role="listitem"
                aria-label={headerItemProps.ariaLabel}
              >
                <FloatingSuggestionsHeaderFooterItem
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
      );
    }

    if (onRenderHeader) {
      return onRenderHeader(suggestionItems);
    }
    return suggestionsHeaderText ? <div className={classNames.title}>{suggestionsHeaderText}</div> : null;
  };

  const renderFooter = (): JSX.Element | null => {
    const { onRenderFooter, footerItemsProps, selectedFooterIndex, suggestionsFooterContainerAriaLabel } = props;

    if (footerItemsProps) {
      return (
        <div
          className={css('ms-Suggestions-footerContainer', classNames.suggestionsContainer)}
          id="suggestionFooter-list"
          role="list"
          aria-label={suggestionsFooterContainerAriaLabel}
        >
          {footerItemsProps.map((footerItemProps: IFloatingSuggestionsHeaderFooterProps, index: number) => {
            const isSelected = selectedFooterIndex !== -1 && selectedFooterIndex === index;
            return footerItemProps.shouldShow() ? (
              <div
                id={'sug-footer' + index}
                key={'sug-footer' + index}
                role="listitem"
                aria-label={footerItemProps.ariaLabel}
              >
                <FloatingSuggestionsHeaderFooterItem
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
      );
    }

    if (onRenderFooter) {
      return onRenderFooter(suggestionItems);
    }
    return null;
  };

  const renderSuggestions = (): JSX.Element | null => {
    if (suggestionItems.length === 0) {
      return null;
    }

    const {
      onRenderItem,
      suggestionsItemClassName,
      removeItemAriaLabel,
      showSuggestionRemoveButton,
      suggestionsContainerAriaLabel,
      onSuggestionRemove,
      onItemClick,
      selectedSuggestionIndex,
      pickerWidth,
    } = props;

    return (
      <div className={classNames.suggestionsContainer} role="list" aria-label={suggestionsContainerAriaLabel}>
        {suggestionItems.map((suggestionItem, index) => (
          <div
            key={`FloatingSuggestionsItemKey-${index}`}
            id={`FloatingSuggestionsItemId-${index}`}
            role="listitem"
            aria-label={suggestionItem.ariaLabel}
            style={{
              width: pickerWidth ? pickerWidth : 'auto',
            }}
          >
            <FloatingSuggestionsItemMemo
              item={suggestionItem.item}
              onClick={onItemClick}
              isSelected={index === selectedSuggestionIndex}
              onRemoveItem={onSuggestionRemove}
              onRenderSuggestion={onRenderItem}
              className={suggestionsItemClassName}
              removeButtonAriaLabel={removeItemAriaLabel}
              showRemoveButton={suggestionItem.showRemoveButton || showSuggestionRemoveButton}
              displayText={suggestionItem.displayText}
              key={suggestionItem.key}
              id={suggestionItem.id}
            />
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className={css(classNames.root, className ? className : '')} aria-label={ariaLabel}>
      {renderHeader()}
      {hasNoSuggestions
        ? onRenderNoResultFound
          ? onRenderNoResultFound(undefined, noResults)
          : noResults()
        : renderSuggestions()}
      {renderFooter()}
    </div>
  );
};

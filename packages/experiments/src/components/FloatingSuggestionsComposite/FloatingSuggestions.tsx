import { IBaseFloatingSuggestionsProps } from './FloatingSuggestions.types';
import { Callout, DirectionalHint } from 'office-ui-fabric-react/lib/Callout';
import * as React from 'react';
import { getStyles } from './FloatingSuggestions.styles';
import { classNamesFunction, css } from '../../Utilities';
import { IBaseFloatingSuggestionsStyles, IBaseFloatingSuggestionsStylesProps } from './FloatingSuggestions.types';
import { FloatingSuggestionsList } from './FloatingSuggestionsList/FloatingSuggestionsList';

export const BaseFloatingSuggestions = <T extends {}>(props: IBaseFloatingSuggestionsProps<T>): JSX.Element => {
  const getClassNames = classNamesFunction<IBaseFloatingSuggestionsStylesProps, IBaseFloatingSuggestionsStyles>();
  const classNames = getClassNames(getStyles);
  const {
    componentRef,
    suggestions,
    isSuggestionsVisible,
    onSuggestionSelected,
    onRemoveSuggestion,
    onRenderSuggestion,
    onRenderHeader,
    onRenderFooter,
    onRenderNoResultFound,
    noResultsFoundText,
    maximumSuggestionsToShow,
    showSuggestionRemoveButton,
    removeItemButtonAriaLabel,
    suggestionsContainerAriaLabel,
    selectedSuggestionIndex,
    suggestionsHeaderText,
    onFloatingSuggestionsDismiss,
    targetElement,
    calloutProps,
    pickerWidth,
    onKeyDown,
    pickerSuggestionsProps,
    selectedFooterIndex,
    selectedHeaderIndex,
    suggestionsFooterContainerAriaLabel,
    suggestionsHeaderContainerAriaLabel,
  } = props;

  const hidePicker = (ev: React.MouseEvent): void => {
    onFloatingSuggestionsDismiss ? onFloatingSuggestionsDismiss(ev) : null;
  };

  return (
    <div
      ref={componentRef}
      className={css('ms-BasePicker ms-BaseFloatingPicker', classNames.root, props.className ? props.className : '')}
    >
      {isSuggestionsVisible ? (
        <Callout
          className={classNames.callout}
          isBeakVisible={false}
          gapSpace={5}
          target={targetElement}
          // eslint-disable-next-line react/jsx-no-bind
          onDismiss={hidePicker}
          onKeyDown={onKeyDown}
          directionalHint={DirectionalHint.bottomLeftEdge}
          directionalHintForRTL={DirectionalHint.bottomRightEdge}
          {...calloutProps}
        >
          <FloatingSuggestionsList<T>
            suggestionItems={suggestions}
            onItemClick={onSuggestionSelected}
            onSuggestionRemove={onRemoveSuggestion}
            showSuggestionRemoveButton={showSuggestionRemoveButton}
            removeItemAriaLabel={removeItemButtonAriaLabel}
            onRenderItem={onRenderSuggestion}
            onRenderHeader={onRenderHeader}
            onRenderFooter={onRenderFooter}
            headerItemsProps={pickerSuggestionsProps?.headerItemsProps}
            footerItemsProps={pickerSuggestionsProps?.footerItemsProps}
            onRenderNoResultFound={onRenderNoResultFound}
            noResultsFoundText={noResultsFoundText}
            maximumSuggestionsToShow={maximumSuggestionsToShow}
            suggestionsContainerAriaLabel={suggestionsContainerAriaLabel}
            selectedSuggestionIndex={selectedSuggestionIndex}
            selectedFooterIndex={selectedFooterIndex}
            selectedHeaderIndex={selectedHeaderIndex}
            suggestionsHeaderText={suggestionsHeaderText}
            pickerWidth={pickerWidth}
            suggestionsHeaderContainerAriaLabel={suggestionsHeaderContainerAriaLabel}
            suggestionsFooterContainerAriaLabel={suggestionsFooterContainerAriaLabel}
          />
        </Callout>
      ) : null}
    </div>
  );
};

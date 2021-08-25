import { Callout, DirectionalHint } from '@fluentui/react/lib/Callout';
import * as React from 'react';
import { getStyles } from './FloatingSuggestions.styles';
import { classNamesFunction, css } from '../../Utilities';
import { FloatingSuggestionsList } from './FloatingSuggestionsList/FloatingSuggestionsList';
import type {
  IBaseFloatingSuggestionsProps,
  IBaseFloatingSuggestionsStyles,
  IBaseFloatingSuggestionsStylesProps,
} from './FloatingSuggestions.types';

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
    onSuggestionsShown,
    onSuggestionsHidden,
    gapSpace,
  } = props;

  // Picker shown/hidden callback logic
  // Ref gate to prevent the onHidden callback from being called the first time
  const suggestionsCallbackGate = React.useRef(false);
  React.useEffect(() => {
    if (suggestionsCallbackGate.current || isSuggestionsVisible) {
      if (isSuggestionsVisible) {
        onSuggestionsShown?.();
      } else {
        onSuggestionsHidden?.();
      }
    }
    suggestionsCallbackGate.current = true;
  }, [isSuggestionsVisible, onSuggestionsShown, onSuggestionsHidden]);

  const hidePicker = React.useCallback(
    (ev?: React.MouseEvent | Event | React.KeyboardEvent): void => {
      onFloatingSuggestionsDismiss?.(ev);
    },
    [onFloatingSuggestionsDismiss],
  );

  return (
    <div
      ref={componentRef}
      className={css('ms-BasePicker ms-BaseFloatingPicker', classNames.root, props.className ? props.className : '')}
    >
      {isSuggestionsVisible ? (
        <Callout
          className={classNames.callout}
          isBeakVisible={false}
          gapSpace={gapSpace ?? 5}
          target={targetElement}
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
            suggestionsHeaderContainerAriaLabel={pickerSuggestionsProps?.suggestionsHeaderContainerAriaLabel}
            suggestionsFooterContainerAriaLabel={pickerSuggestionsProps?.suggestionsFooterContainerAriaLabel}
          />
        </Callout>
      ) : null}
    </div>
  );
};

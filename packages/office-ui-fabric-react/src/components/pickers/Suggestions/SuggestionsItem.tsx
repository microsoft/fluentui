import * as React from 'react';

import { classNamesFunction, BaseComponent, css } from '../../../Utilities';
import { IProcessedStyleSet } from '../../../Styling';
import { CommandButton, IconButton } from '../../../Button';
import { ISuggestionItemProps, ISuggestionsItemStyleProps, ISuggestionsItemStyles } from './SuggestionsItem.types';

import * as stylesImport from './Suggestions.scss';
const legacyStyles: any = stylesImport;

const getClassNames = classNamesFunction<ISuggestionsItemStyleProps, ISuggestionsItemStyles>();

/**
 * {@docCategory Pickers}
 */
export class SuggestionsItem<T> extends BaseComponent<ISuggestionItemProps<T>, {}> {
  public render(): JSX.Element {
    const {
      suggestionModel,
      RenderSuggestion,
      onClick,
      className,
      onRemoveItem,
      isSelectedOverride,
      removeButtonAriaLabel,
      styles,
      theme
    } = this.props;

    // TODO
    // Clean this up by leaving only the first part after removing support for SASS.
    // Currently we can not remove the SASS styles from SuggestionsItem class because it
    // might be used by consumers separately from pickers extending from BasePicker
    // and have not used the new 'styles' prop. Because it's expecting a type parameter,
    // we can not use the 'styled' function without adding some helpers which can break
    // downstream consumers who did not use the new helpers.
    // We check for 'styles' prop which is going to be injected by the 'styled' HOC
    // in Suggestions when the typed SuggestionsItem class is ready to be rendered. If the
    // check passes we can use the CSS-in-JS styles. If the check fails (ex: custom picker),
    // then we just use the old SASS styles instead.
    const classNames: Partial<IProcessedStyleSet<ISuggestionsItemStyles>> = styles
      ? getClassNames(styles, {
          theme: theme!,
          className,
          suggested: suggestionModel.selected || isSelectedOverride
        })
      : {
          root: css(
            'ms-Suggestions-item',
            legacyStyles.suggestionsItem,
            {
              ['is-suggested ' + legacyStyles.suggestionsItemIsSuggested]: suggestionModel.selected || isSelectedOverride
            },
            className
          ),
          itemButton: css('ms-Suggestions-itemButton', legacyStyles.itemButton),
          closeButton: css('ms-Suggestions-closeButton', legacyStyles.closeButton)
        };

    return (
      <div className={classNames.root}>
        <CommandButton onClick={onClick} className={classNames.itemButton}>
          {RenderSuggestion(suggestionModel.item, this.props)}
        </CommandButton>
        {this.props.showRemoveButton ? (
          <IconButton
            iconProps={{ iconName: 'Cancel', styles: { root: { fontSize: '12px' } } }}
            title={removeButtonAriaLabel}
            ariaLabel={removeButtonAriaLabel}
            onClick={onRemoveItem}
            className={classNames.closeButton}
          />
        ) : null}
      </div>
    );
  }
}

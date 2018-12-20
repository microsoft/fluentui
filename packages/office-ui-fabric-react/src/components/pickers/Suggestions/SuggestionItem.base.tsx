import * as React from 'react';

import { classNamesFunction, BaseComponent } from '../../../Utilities';
import { CommandButton, IconButton } from '../../../Button';
import { ISuggestionItemProps, ISuggestionItemStyleProps, ISuggestionItemStyles } from './SuggestionItem.types';

const getClassNames = classNamesFunction<ISuggestionItemStyleProps, ISuggestionItemStyles>();

export class SuggestionItemBase<T> extends BaseComponent<ISuggestionItemProps<T>, {}> {
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

    const classNames = getClassNames(styles, {
      theme: theme!,
      className,
      suggested: suggestionModel.selected || isSelectedOverride
    });

    return (
      <div
        className={classNames.root}
      >
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
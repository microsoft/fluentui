import * as React from 'react';

import { styled, classNamesFunction } from '../../../Utilities';
import { Icon } from '../../../Icon';
import { ITagItemProps, ITagItemStyleProps, ITagItemStyles } from './TagPicker.types';
import { getStyles } from './TagItem.styles';

const getClassNames = classNamesFunction<ITagItemStyleProps, ITagItemStyles>();

export const TagItemBase = (props: ITagItemProps) => {
  const { theme, styles, selected, disabled, enableTagFocusInDisabledPicker, children, className, index, onRemoveItem } = props;

  const classNames = getClassNames(styles, {
    theme: theme!,
    className,
    selected
  });

  return (
    <div
      className={classNames.root}
      role={'listitem'}
      key={index}
      data-selection-index={index}
      data-is-focusable={(enableTagFocusInDisabledPicker || !disabled) && true}
    >
      <span className={classNames.text} aria-label={children as string}>
        {children}
      </span>
      {!disabled && (
        <span className={classNames.close} onClick={onRemoveItem}>
          <Icon iconName="Cancel" />
        </span>
      )}
    </div>
  );
};

export const TagItem = styled<ITagItemProps, ITagItemStyleProps, ITagItemStyles>(TagItemBase, getStyles, undefined, { scope: 'TagItem' });

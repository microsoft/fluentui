import * as React from 'react';

import { styled, classNamesFunction } from '../../../Utilities';
import { IconButton } from '../../../Button';

import { ITagItemProps, ITagItemStyleProps, ITagItemStyles } from './TagPicker.types';
import { getStyles } from './TagItem.styles';
import { useId } from '@fluentui/react-hooks';

const getClassNames = classNamesFunction<ITagItemStyleProps, ITagItemStyles>();

/**
 * {@docCategory TagPicker}
 */
export const TagItemBase = (props: ITagItemProps) => {
  const {
    theme,
    styles,
    selected,
    disabled,
    enableTagFocusInDisabledPicker,
    children,
    className,
    index,
    onRemoveItem,
    removeButtonAriaLabel,
    title = typeof props.children === 'string' ? props.children : props.item.name,
  } = props;

  const classNames = getClassNames(styles, {
    theme: theme!,
    className,
    selected,
    disabled,
  });

  const itemId = useId();

  const disabledAttrs = enableTagFocusInDisabledPicker
    ? {
        'aria-disabled': disabled,
        tabindex: 0,
      }
    : {
        disabled: disabled,
      };

  return (
    <div className={classNames.root} role={'listitem'} key={index}>
      <span className={classNames.text} title={title} id={`${itemId}-text`}>
        {children}
      </span>
      <IconButton
        id={itemId}
        onClick={onRemoveItem}
        {...disabledAttrs}
        iconProps={{ iconName: 'Cancel', styles: { root: { fontSize: '12px' } } }}
        className={classNames.close}
        ariaLabel={removeButtonAriaLabel}
        aria-labelledby={`${itemId} ${itemId}-text`}
        data-selection-index={index}
      />
    </div>
  );
};

export const TagItem = styled<ITagItemProps, ITagItemStyleProps, ITagItemStyles>(TagItemBase, getStyles, undefined, {
  scope: 'TagItem',
});

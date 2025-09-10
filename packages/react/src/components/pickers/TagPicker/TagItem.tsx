import * as React from 'react';

import { styled, classNamesFunction } from '../../../Utilities';
import { IconButton, IButton } from '../../../Button';
import { getStyles } from './TagItem.styles';
import { useId } from '@fluentui/react-hooks';
import type { ITagItemProps, ITagItemStyleProps, ITagItemStyles } from './TagPicker.types';

const getClassNames = classNamesFunction<ITagItemStyleProps, ITagItemStyles>();

/**
 * {@docCategory TagPicker}
 */
// eslint-disable-next-line @typescript-eslint/no-deprecated
export const TagItemBase = (props: ITagItemProps): JSX.Element => {
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
    removeButtonIconProps,
    removeButtonProps,
  } = props;

  const buttonRef = React.createRef<IButton>();

  const handleClick: React.MouseEventHandler<HTMLDivElement> = () => {
    buttonRef.current?.focus();
  };

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
        disabled,
      };

  return (
    <div data-selection-index={index} className={classNames.root} role={'listitem'} key={index} onClick={handleClick}>
      <span className={classNames.text} title={title} id={`${itemId}-text`}>
        {children}
      </span>
      <IconButton
        componentRef={buttonRef}
        id={itemId}
        onClick={onRemoveItem}
        {...disabledAttrs}
        iconProps={removeButtonIconProps ?? { iconName: 'Cancel' }}
        styles={{ icon: { fontSize: '12px' } }}
        className={classNames.close}
        aria-labelledby={`${itemId}-removeLabel ${itemId}-text`}
        {...removeButtonProps}
      />
      <span id={`${itemId}-removeLabel`} hidden>
        {removeButtonAriaLabel}
      </span>
    </div>
  );
};

export const TagItem = styled<ITagItemProps, ITagItemStyleProps, ITagItemStyles>(TagItemBase, getStyles, undefined, {
  scope: 'TagItem',
});

import * as React from 'react';
import { css, getNativeProps, buttonProperties } from '../../Utilities';
import { CommandButton } from '../../Button';
import { useId } from '@fluentui/react-hooks';
import type { IButtonGridCellProps } from './ButtonGridCell.types';

export const ButtonGridCell = <T, P extends IButtonGridCellProps<T>>(props: IButtonGridCellProps<T>) => {
  const defaultId = useId('gridCell');
  const {
    item,
    id = defaultId,
    className,
    selected,
    disabled = false,
    onRenderItem,
    cellDisabledStyle,
    cellIsSelectedStyle,
    index,
    label,
    getClassNames,
    onClick,
    onHover,
    onMouseMove,
    onMouseLeave,
    onMouseEnter,
    onFocus,
  } = props;

  const buttonProps = getNativeProps(props, buttonProperties);

  const handleClick = React.useCallback(
    (event: React.MouseEvent<HTMLButtonElement>): void => {
      if (onClick && !disabled) {
        onClick(item, event);
      }
    },
    [disabled, item, onClick],
  );

  const handleMouseEnter = React.useCallback(
    (ev: React.MouseEvent<HTMLButtonElement>): void => {
      const didUpdateOnEnter = onMouseEnter && onMouseEnter(ev);

      if (!didUpdateOnEnter && onHover && !disabled) {
        onHover(item, ev);
      }
    },
    [disabled, item, onHover, onMouseEnter],
  );

  const handleMouseMove = React.useCallback(
    (ev: React.MouseEvent<HTMLButtonElement>): void => {
      const didUpdateOnMove = onMouseMove && onMouseMove(ev);

      if (!didUpdateOnMove && onHover && !disabled) {
        onHover(item, ev);
      }
    },
    [disabled, item, onHover, onMouseMove],
  );

  const handleMouseLeave = React.useCallback(
    (ev: React.MouseEvent<HTMLButtonElement>): void => {
      const didUpdateOnLeave = onMouseLeave && onMouseLeave(ev);

      if (!didUpdateOnLeave && onHover && !disabled) {
        onHover(undefined, ev);
      }
    },
    [disabled, onHover, onMouseLeave],
  );

  const handleFocus = React.useCallback(
    (event: React.FocusEvent<HTMLButtonElement>): void => {
      if (onFocus && !disabled) {
        onFocus(item, event);
      }
    },
    [disabled, item, onFocus],
  );

  return (
    <CommandButton
      id={id}
      data-index={index}
      data-is-focusable
      aria-selected={selected}
      ariaLabel={label}
      title={label}
      {...buttonProps}
      className={css(className, {
        ['' + cellIsSelectedStyle]: selected,
        ['' + cellDisabledStyle]: disabled,
      })}
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onFocus={handleFocus}
      getClassNames={getClassNames}
    >
      {onRenderItem(item)}
    </CommandButton>
  );
};

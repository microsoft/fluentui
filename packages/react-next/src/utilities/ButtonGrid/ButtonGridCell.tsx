import * as React from 'react';
import { css } from '../../Utilities';
import { IButtonGridCellProps } from './ButtonGridCell.types';
import { CommandButton } from '../../compat/Button';
import { useId } from '@uifabric/react-hooks';

export const ButtonGridCell = <T, P extends IButtonGridCellProps<T>>(props: IButtonGridCellProps<T>) => {
  const defaultId = useId('gridCell');
  const {
    item,
    id = defaultId,
    className,
    role,
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

  const handleClick = React.useCallback((): void => {
    if (onClick && !disabled) {
      onClick(item);
    }
  }, [disabled, item, onClick]);

  const handleMouseEnter = React.useCallback(
    (ev: React.MouseEvent<HTMLButtonElement>): void => {
      const didUpdateOnEnter = onMouseEnter && onMouseEnter(ev);

      if (!didUpdateOnEnter && onHover && !disabled) {
        onHover(item);
      }
    },
    [disabled, item, onHover, onMouseEnter],
  );

  const handleMouseMove = React.useCallback(
    (ev: React.MouseEvent<HTMLButtonElement>): void => {
      const didUpdateOnMove = onMouseMove && onMouseMove(ev);

      if (!didUpdateOnMove && onHover && !disabled) {
        onHover(item);
      }
    },
    [disabled, item, onHover, onMouseMove],
  );

  const handleMouseLeave = React.useCallback(
    (ev: React.MouseEvent<HTMLButtonElement>): void => {
      const didUpdateOnLeave = onMouseLeave && onMouseLeave(ev);

      if (!didUpdateOnLeave && onHover && !disabled) {
        onHover();
      }
    },
    [disabled, onHover, onMouseLeave],
  );

  const handleFocus = React.useCallback((): void => {
    if (onFocus && !disabled) {
      onFocus(item);
    }
  }, [disabled, item, onFocus]);

  return (
    <CommandButton
      id={id}
      data-index={index}
      data-is-focusable
      disabled={disabled}
      className={css(className, {
        ['' + cellIsSelectedStyle]: selected,
        ['' + cellDisabledStyle]: disabled,
      })}
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onFocus={handleFocus}
      role={role}
      aria-selected={selected}
      ariaLabel={label}
      title={label}
      getClassNames={getClassNames}
    >
      {onRenderItem(item)}
    </CommandButton>
  );
};

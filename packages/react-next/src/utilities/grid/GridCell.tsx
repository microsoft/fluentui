import * as React from 'react';
import { css, getId } from '../../Utilities';
import { IGridCellProps } from './GridCell.types';
import { CommandButton } from '../../compat/Button';

export const GridCell = <T, P extends IGridCellProps<T>>(props: IGridCellProps<T>) => {
  const {
    item,
    id = getId('gridCell'),
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
  } = props;

  const _onClick = React.useCallback((): void => {
    const { onClick } = props as P;

    if (onClick && !disabled) {
      onClick(item);
    }
  }, [disabled, item, props]);

  const _onMouseEnter = React.useCallback(
    (ev: React.MouseEvent<HTMLButtonElement>): void => {
      const { onHover, onMouseEnter } = props as P;

      const didUpdateOnEnter = onMouseEnter && onMouseEnter(ev);

      if (!didUpdateOnEnter && onHover && !disabled) {
        onHover(item);
      }
    },
    [disabled, item, props],
  );

  const _onMouseMove = React.useCallback(
    (ev: React.MouseEvent<HTMLButtonElement>): void => {
      const { onHover, onMouseMove } = props as P;

      const didUpdateOnMove = onMouseMove && onMouseMove(ev);

      if (!didUpdateOnMove && onHover && !disabled) {
        onHover(item);
      }
    },
    [disabled, item, props],
  );

  const _onMouseLeave = React.useCallback(
    (ev: React.MouseEvent<HTMLButtonElement>): void => {
      const { onMouseLeave, onHover } = props as P;

      const didUpdateOnLeave = onMouseLeave && onMouseLeave(ev);

      if (!didUpdateOnLeave && onHover && !disabled) {
        onHover();
      }
    },
    [disabled, props],
  );

  const _onFocus = React.useCallback((): void => {
    const { onFocus } = props as P;

    if (onFocus && !disabled) {
      onFocus(item);
    }
  }, [disabled, item, props]);

  return (
    <CommandButton
      id={id}
      data-index={index}
      data-is-focusable={true}
      disabled={disabled}
      className={css(className, {
        ['' + cellIsSelectedStyle]: selected,
        ['' + cellDisabledStyle]: disabled,
      })}
      onClick={_onClick}
      onMouseEnter={_onMouseEnter}
      onMouseMove={_onMouseMove}
      onMouseLeave={_onMouseLeave}
      onFocus={_onFocus}
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

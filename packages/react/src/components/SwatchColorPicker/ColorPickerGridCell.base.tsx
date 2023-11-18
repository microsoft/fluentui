import * as React from 'react';
import { mergeStyleSets } from '../../Styling';
import { classNamesFunction, memoizeFunction } from '../../Utilities';
import { getColorFromString } from '../../Color';
import { ButtonGridCell } from '../../utilities/ButtonGrid/ButtonGridCell';
import { getStyles as getActionButtonStyles } from '../Button/ActionButton/ActionButton.styles';
import type { ITheme, IProcessedStyleSet } from '../../Styling';
import type { IButtonClassNames } from '../Button/BaseButton.classNames';
import type {
  IColorCellProps,
  IColorPickerGridCellProps,
  IColorPickerGridCellStyleProps,
  IColorPickerGridCellStyles,
} from './ColorPickerGridCell.types';

const getClassNames = classNamesFunction<IColorPickerGridCellStyleProps, IColorPickerGridCellStyles>();

/** Validate if the cell's color is white or not to apply whiteCell style */
const isWhiteCell = (inputColor: string): boolean => {
  const currentColor = getColorFromString(inputColor!);
  return currentColor?.hex === 'ffffff';
};

const getColorPickerGridCellButtonClassNames = memoizeFunction(
  (
    theme: ITheme,
    className: string,
    variantClassName: string,
    iconClassName: string | undefined,
    menuIconClassName: string | undefined,
    disabled: boolean,
    checked: boolean,
    expanded: boolean,
    isSplit: boolean | undefined,
  ): IButtonClassNames => {
    const styles = getActionButtonStyles(theme);
    return mergeStyleSets({
      root: [
        'ms-Button',
        styles.root,
        variantClassName,
        className,
        checked && ['is-checked', styles.rootChecked],
        disabled && ['is-disabled', styles.rootDisabled],
        !disabled &&
          !checked && {
            selectors: {
              ':hover': styles.rootHovered,
              ':focus': styles.rootFocused,
              ':active': styles.rootPressed,
            },
          },
        disabled && checked && [styles.rootCheckedDisabled],
        !disabled &&
          checked && {
            selectors: {
              ':hover': styles.rootCheckedHovered,
              ':active': styles.rootCheckedPressed,
            },
          },
      ],
      flexContainer: ['ms-Button-flexContainer', styles.flexContainer],
    });
  },
);

export const ColorPickerGridCellBase: React.FunctionComponent<IColorPickerGridCellProps> = props => {
  const {
    item,
    // eslint-disable-next-line deprecation/deprecation
    idPrefix = props.id,
    isRadio,
    selected = false,
    disabled = false,
    styles,
    circle = true,
    color,
    onClick,
    onHover,
    onFocus,
    onMouseEnter,
    onMouseMove,
    onMouseLeave,
    onWheel,
    onKeyDown,
    height,
    width,
    borderWidth,
  } = props;

  const classNames: IProcessedStyleSet<IColorPickerGridCellStyles> = getClassNames(styles!, {
    theme: props.theme!,
    disabled,
    selected,
    circle,
    isWhite: isWhiteCell(color!),
    height,
    width,
    borderWidth,
  });

  // Render the core of a color cell
  const renderColorOption = (colorOption: IColorCellProps): JSX.Element => {
    const svgClassName = classNames.svg;

    // Build an SVG for the cell with the given shape and color properties
    // Include role="img" and aria-label here for better virtual cursor accessibility,
    // and for a VoiceOver bug where it skips grid cells that lack inner content
    return (
      <svg
        className={svgClassName}
        role="img"
        aria-label={colorOption.label}
        viewBox="0 0 20 20"
        fill={getColorFromString(colorOption.color as string)?.str}
      >
        {circle ? <circle cx="50%" cy="50%" r="50%" /> : <rect width="100%" height="100%" />}
      </svg>
    );
  };

  const onRenderItem = (option: IColorCellProps): JSX.Element => {
    const { onRenderColorCellContent = renderColorOption } = props;
    return onRenderColorCellContent(option, renderColorOption) as JSX.Element;
  };

  const cellSemantics = isRadio
    ? {
        role: 'radio',
        'aria-checked': selected,
        selected: undefined,
      }
    : {
        role: 'gridcell',
        selected,
      };

  return (
    <ButtonGridCell
      item={item}
      id={`${idPrefix}-${item.id}-${item.index}`}
      key={item.id}
      disabled={disabled}
      {...cellSemantics}
      // eslint-disable-next-line react/jsx-no-bind
      onRenderItem={onRenderItem}
      onClick={onClick}
      onHover={onHover}
      onFocus={onFocus}
      label={item.label}
      className={classNames.colorCell}
      getClassNames={getColorPickerGridCellButtonClassNames}
      index={item.index}
      onMouseEnter={onMouseEnter}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      onWheel={onWheel}
      onKeyDown={onKeyDown}
    />
  );
};

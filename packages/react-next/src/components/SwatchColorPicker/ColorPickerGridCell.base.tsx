import * as React from 'react';
import { ITheme, mergeStyleSets, IProcessedStyleSet } from '../../Styling';
import { classNamesFunction } from '../../Utilities';
import { getColorFromString } from 'office-ui-fabric-react/lib/Color';
import { GridCell } from '../../utilities/grid/GridCell';
import { getStyles as getActionButtonStyles } from 'office-ui-fabric-react/lib/components/Button/ActionButton/ActionButton.styles';
import { IButtonClassNames } from 'office-ui-fabric-react/lib/components/Button/BaseButton.classNames';
import {
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

export const ColorPickerGridCellBase: React.FunctionComponent<IColorPickerGridCellProps> = props => {
  const {
    item,
    // eslint-disable-next-line deprecation/deprecation
    idPrefix = props.id,
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

  const getColorPickerGridCellButtonClassNames = (
    theme: ITheme,
    className: string,
    variantClassName: string,
    iconClassName: string | undefined,
    menuIconClassName: string | undefined,
    checked: boolean,
  ): IButtonClassNames => {
    const actionButtonStyles = getActionButtonStyles(theme);
    return mergeStyleSets({
      root: [
        'ms-Button',
        actionButtonStyles.root,
        variantClassName,
        className,
        checked && ['is-checked', actionButtonStyles.rootChecked],
        disabled && ['is-disabled', actionButtonStyles.rootDisabled],
        !disabled &&
          !checked && {
            selectors: {
              ':hover': actionButtonStyles.rootHovered,
              ':focus': actionButtonStyles.rootFocused,
              ':active': actionButtonStyles.rootPressed,
            },
          },
        disabled && checked && [actionButtonStyles.rootCheckedDisabled],
        !disabled &&
          checked && {
            selectors: {
              ':hover': actionButtonStyles.rootCheckedHovered,
              ':active': actionButtonStyles.rootCheckedPressed,
            },
          },
      ],
      flexContainer: ['ms-Button-flexContainer', actionButtonStyles.flexContainer],
    });
  };

  // Render the core of a color cell
  const onRenderColorOption = (colorOption: IColorCellProps): JSX.Element => {
    const svgClassName = classNames.svg;

    // Build an SVG for the cell with the given shape and color properties
    return (
      <svg className={svgClassName} viewBox="0 0 20 20" fill={getColorFromString(colorOption.color)?.str}>
        {circle ? <circle cx="50%" cy="50%" r="50%" /> : <rect width="100%" height="100%" />}
      </svg>
    );
  };

  return (
    <GridCell
      item={item}
      id={`${idPrefix}-${item.id}-${item.index}`}
      key={item.id}
      disabled={disabled}
      role={'gridcell'}
      // eslint-disable-next-line react/jsx-no-bind
      onRenderItem={onRenderColorOption}
      selected={selected}
      onClick={onClick}
      onHover={onHover}
      onFocus={onFocus}
      label={item.label}
      className={classNames.colorCell}
      // eslint-disable-next-line react/jsx-no-bind
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

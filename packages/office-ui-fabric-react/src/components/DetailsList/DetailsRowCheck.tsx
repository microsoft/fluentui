import * as React from 'react';
import { IDetailsRowCheckProps, IDetailsCheckboxProps, IDetailsRowCheckStyleProps, IDetailsRowCheckStyles } from './DetailsRowCheck.types';
import { css, styled, classNamesFunction } from '../../Utilities';
import { Check, getCheck } from '../../Check';
import { ICheckStyleProps, ICheckStyles } from '../Check/Check.types';
import { getStyles as getCheckStyles } from '../Check/Check.styles';
import { getStyles } from './DetailsRowCheck.styles';

const getCheckClassNames = classNamesFunction<ICheckStyleProps, ICheckStyles>({
  disableCaching: true
});
const getClassNames = classNamesFunction<IDetailsRowCheckStyleProps, IDetailsRowCheckStyles>({
  disableCaching: true
});

const DetailsRowCheckBase: React.StatelessComponent<IDetailsRowCheckProps> = props => {
  const {
    isVisible = false,
    canSelect = false,
    isSelected = false,
    anySelected = false,
    selected = false,
    isHeader = false,
    className,
    checkClassName,
    styles,
    theme,
    compact,
    onRenderDetailsCheckbox,
    useFastIcons, // must be removed from buttonProps
    ...buttonProps
  } = props;
  const defaultCheckboxRender = useFastIcons ? _fastDefaultCheckboxRender : _defaultCheckboxRender;
  const onRenderCheckbox = onRenderDetailsCheckbox || defaultCheckboxRender;

  const isPressed = isSelected || selected;

  const checkStyles = useFastIcons ? undefined : getCheckStyles({ theme: theme! });

  const checkClassNames = useFastIcons
    ? undefined
    : getCheckClassNames(checkStyles, {
        theme: theme!
      });

  const classNames = getClassNames(styles, {
    theme: theme!,
    canSelect,
    selected: isPressed,
    anySelected,
    className,
    isHeader,
    isVisible,
    compact,
    useGlobalCheckHostClass: useFastIcons
  });

  const detailsCheckboxProps: IDetailsCheckboxProps = {
    checked: isPressed,
    theme
  };

  return canSelect ? (
    <div
      {...buttonProps}
      role="checkbox"
      className={css(classNames.root, classNames.check, checkClassNames && checkClassNames.checkHost)}
      aria-checked={isPressed}
      data-selection-toggle={true}
      data-automationid="DetailsRowCheck"
    >
      {onRenderCheckbox(detailsCheckboxProps, defaultCheckboxRender)}
    </div>
  ) : (
    <div {...buttonProps} className={css(classNames.root, classNames.check)} />
  );
};

function _defaultCheckboxRender(checkboxProps: IDetailsCheckboxProps) {
  return <Check checked={checkboxProps.checked} />;
}

function _fastDefaultCheckboxRender(checkboxProps: IDetailsCheckboxProps) {
  return getCheck(checkboxProps.theme, checkboxProps.checked);
}

export const DetailsRowCheck = styled<IDetailsRowCheckProps, IDetailsRowCheckStyleProps, IDetailsRowCheckStyles>(
  DetailsRowCheckBase,
  getStyles,
  undefined,
  { scope: 'DetailsRowCheck' },
  true
);

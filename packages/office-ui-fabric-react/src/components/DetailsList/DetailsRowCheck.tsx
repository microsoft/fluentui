import * as React from 'react';
import { IDetailsRowCheckProps, IDetailsCheckboxProps, IDetailsRowCheckStyleProps, IDetailsRowCheckStyles } from './DetailsRowCheck.types';
import { css, styled, classNamesFunction } from '../../Utilities';
import { Check } from '../../Check';
import { getStyles } from './DetailsRowCheck.styles';

const getClassNames = classNamesFunction<IDetailsRowCheckStyleProps, IDetailsRowCheckStyles>();

const DetailsRowCheckBase: React.FunctionComponent<IDetailsRowCheckProps> = props => {
  const {
    isVisible = false,
    canSelect = false,
    anySelected = false,
    selected = false,
    isHeader = false,
    className,
    checkClassName,
    styles,
    theme,
    compact,
    onRenderDetailsCheckbox = _defaultCheckboxRender,
    ...buttonProps
  } = props;

  const classNames = getClassNames(styles, {
    theme: theme!,
    canSelect,
    selected,
    anySelected,
    className,
    isHeader,
    isVisible,
    compact
  });

  const detailsCheckboxProps: IDetailsCheckboxProps = {
    checked: selected
  };

  return canSelect ? (
    <div
      {...buttonProps}
      role="checkbox"
      className={css(classNames.root, classNames.check)}
      aria-checked={selected}
      data-selection-toggle={true}
      data-automationid="DetailsRowCheck"
    >
      {onRenderDetailsCheckbox(detailsCheckboxProps, _defaultCheckboxRender)}
    </div>
  ) : (
    <div {...buttonProps} className={css(classNames.root, classNames.check)} />
  );
};

function _defaultCheckboxRender(checkboxProps: IDetailsCheckboxProps) {
  return <Check checked={checkboxProps.checked} />;
}

export const DetailsRowCheck = styled<IDetailsRowCheckProps, IDetailsRowCheckStyleProps, IDetailsRowCheckStyles>(
  DetailsRowCheckBase,
  getStyles,
  undefined,
  { scope: 'DetailsRowCheck' },
  true
);

import * as React from 'react';
import {
  IDetailsRowCheckProps,
  IDetailsCheckboxProps,
  IDetailsRowCheckStyleProps,
  IDetailsRowCheckStyles,
} from './DetailsRowCheck.types';
import { css, styled, classNamesFunction } from '../../Utilities';
import { Check } from '../../Check';
import { getStyles } from './DetailsRowCheck.styles';
import { composeRenderFunction } from '@uifabric/utilities';
import { ITheme } from '../../Styling';

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
    onRenderDetailsCheckbox,
    useFastIcons = true, // must be removed from buttonProps
    ...buttonProps
  } = props;
  const defaultCheckboxRender = useFastIcons ? _fastDefaultCheckboxRender : _defaultCheckboxRender;

  const onRenderCheckbox = onRenderDetailsCheckbox
    ? composeRenderFunction(onRenderDetailsCheckbox, defaultCheckboxRender)
    : defaultCheckboxRender;

  const classNames = getClassNames(styles, {
    theme: theme!,
    canSelect,
    selected,
    anySelected,
    className,
    isHeader,
    isVisible,
    compact,
  });

  const detailsCheckboxProps: IDetailsCheckboxProps = {
    checked: selected,
    theme,
  };

  return canSelect ? (
    <div
      {...buttonProps}
      role="checkbox"
      // eslint-disable-next-line deprecation/deprecation
      className={css(classNames.root, classNames.check)}
      aria-checked={selected}
      data-selection-toggle={true}
      data-automationid="DetailsRowCheck"
    >
      {onRenderCheckbox(detailsCheckboxProps)}
    </div>
  ) : (
    // eslint-disable-next-line deprecation/deprecation
    <div {...buttonProps} className={css(classNames.root, classNames.check)} />
  );
};

const FastCheck = React.memo((props: { theme?: ITheme; checked?: boolean; className?: string }) => {
  return <Check theme={props.theme} checked={props.checked} className={props.className} useFastIcons />;
});

function _defaultCheckboxRender(checkboxProps: IDetailsCheckboxProps) {
  return <Check checked={checkboxProps.checked} />;
}

function _fastDefaultCheckboxRender(checkboxProps: IDetailsCheckboxProps) {
  return <FastCheck theme={checkboxProps.theme} checked={checkboxProps.checked} />;
}

export const DetailsRowCheck = styled<IDetailsRowCheckProps, IDetailsRowCheckStyleProps, IDetailsRowCheckStyles>(
  DetailsRowCheckBase,
  getStyles,
  undefined,
  { scope: 'DetailsRowCheck' },
  true,
);

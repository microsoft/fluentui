import * as React from 'react';
import { classNamesFunction, ICheckboxProps, ICheckboxStyles, ICheckboxStyleProps } from '@fluentui/react';
import { Checkbox, mergeClasses } from '@fluentui/react-components';
import { useControllableValue } from '@fluentui/react-hooks';
import { shimCheckboxProps } from './shimCheckboxProps';
import { useCheckboxStyles } from './Checkbox.styles';

const getClassNames = classNamesFunction<ICheckboxStyleProps, ICheckboxStyles>({
  useStaticStyles: true,
});

export const CheckboxShim = (props: ICheckboxProps) => {
  const { className, styles: stylesV8, onRenderLabel, label } = props;
  const shimProps = shimCheckboxProps(props);
  const styles = getClassNames(stylesV8);
  const stylesV9 = useCheckboxStyles();
  const [isChecked, setIsChecked] = useControllableValue(props.checked, props.defaultChecked, props.onChange);

  const onChange = React.useCallback(
    (event: React.ChangeEvent<HTMLElement>): void => {
      setIsChecked(!isChecked, event);
    },
    [setIsChecked, isChecked],
  );

  shimProps.checked = isChecked;
  shimProps.onChange = onChange;

  const defaultLabelRenderer = (checkboxProps?: ICheckboxProps): JSX.Element | null => {
    if (!checkboxProps) {
      return null;
    }
    const { label: defualtLabel, title } = checkboxProps;
    return defualtLabel ? (
      <span title={title} className={styles.text}>
        {defualtLabel}
      </span>
    ) : null;
  };

  if (label || onRenderLabel) {
    shimProps.label = {
      className: mergeClasses('ms-Checkbox-text', styles.label, styles.text),
      children: onRenderLabel ? onRenderLabel(props, defaultLabelRenderer) : label,
    };
  }

  return (
    <Checkbox
      {...shimProps}
      className={mergeClasses(stylesV9.root, 'ms-Checkbox', className, styles.root)}
      indicator={{ className: mergeClasses('ms-Checkbox-checkbox', styles.checkbox) }}
    />
  );
};

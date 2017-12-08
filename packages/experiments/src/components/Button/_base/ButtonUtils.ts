import { IButtonBaseProps } from './Button.base.types';

export function getAriaProps(props: IButtonBaseProps, nativeProps: {}) {
  let ariaDescribedBy: string | null = null;
  let ariaLabelledBy: string | null = null;
  let nativeAriaDescribedBy: string | null = (nativeProps as any)['aria-describedby'];
  let nativeAriaLabelledBy: string | null = (nativeProps as any)['aria-labelledby'];

  if (props.ariaDescription) {
    ariaDescribedBy = this._ariaDescriptionId;
  } else if (props.description) {
    ariaDescribedBy = this._descriptionId;
  } else if (nativeAriaDescribedBy) {
    ariaDescribedBy = nativeAriaDescribedBy;
  }

  if (!props.ariaLabel) {
    if (nativeAriaLabelledBy) {
      ariaLabelledBy = nativeAriaLabelledBy;
    } else if (ariaDescribedBy) {
      ariaLabelledBy = props.text ? this._labelId : null;
    }
  }

  return {
    ariaDescribedBy,
    ariaLabelledBy,
    ariaLabel: props.ariaLabel,
    ariaHidden: props.ariaHidden,
    ariaDescription: props.ariaDescription
  };
}
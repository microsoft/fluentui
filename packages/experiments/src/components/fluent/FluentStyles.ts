import { FontWeights } from 'office-ui-fabric-react/lib/Styling';
import { NeutralColors } from './FluentColors';
import {
  IChoiceGroupOptionStyleProps,
  IChoiceGroupOptionStyles
} from 'office-ui-fabric-react/lib/components/ChoiceGroup/ChoiceGroupOption';
import { FontSizes } from './FluentType';
import { Depths } from './FluentDepths';

const fluentBorderRadius = '2px';

const BreadcrumbStyles = {
  itemLink: {
    fontSize: FontSizes.size18,
    fontWeight: 400,
    color: NeutralColors.gray130,
    selectors: {
      '&:last-child': {
        fontWeight: 600
      }
    }
  }
};

const PrimaryButtonStyles = {
  root: {
    borderRadius: fluentBorderRadius
  }
};

const CompoundButtonStyles = {
  root: {
    borderRadius: fluentBorderRadius
  }
};

const DefaultButtonStyles = {
  root: {
    borderRadius: fluentBorderRadius,
    backgroundColor: '#fff',
    border: `1px solid ${NeutralColors.gray110}`
  },
  rootHovered: {
    backgroundColor: '#f3f2f1',
    border: `1px solid ${NeutralColors.gray110}`
  }
};

const CheckboxStyles = {
  checkbox: {
    borderRadius: fluentBorderRadius
  }
};

const ChoiceGroupOptionStyles = (props: IChoiceGroupOptionStyleProps): IChoiceGroupOptionStyles => {
  const { checked, disabled, hasIcon, hasImage } = props;
  const radioButtonSpacing = 1;
  const radioButtonInnerSize = 6;
  return {
    field: {
      selectors: {
        ':before': [
          disabled && {
            backgroundColor: NeutralColors.white,
            borderColor: NeutralColors.gray60
          }
        ],
        ':after': [
          checked &&
            (hasIcon || hasImage) && {
              top: radioButtonSpacing + radioButtonInnerSize,
              right: radioButtonSpacing + radioButtonInnerSize,
              left: 'auto' // To reset the value of 'left' to its default value, so that 'right' works
            },
          checked &&
            disabled && {
              borderColor: NeutralColors.gray60
            }
        ]
      }
    }
  };
};

const ComboBoxStyles = {
  root: {
    borderRadius: fluentBorderRadius // the bound input box
  },
  callout: {
    borderRadius: `0 0 ${fluentBorderRadius} ${fluentBorderRadius}`,
    overflow: 'hidden',
    boxShadow: Depths.depth8
  }
};

const DialogStyles = {
  main: {
    selectors: {
      '.ms-Modal.ms-Dialog &': {
        boxShadow: Depths.depth64,
        borderRadius: fluentBorderRadius
      }
    }
  }
};

const DialogContentStyles = {
  title: {
    fontSize: FontSizes.size20,
    fontWeight: FontWeights.semibold,
    padding: '16px',
    lineHeight: 'normal'
  },
  topButton: {
    padding: '16px 10px 0 0'
  },
  inner: {
    padding: '0 16px 16px'
  },
  subText: {
    fontWeight: FontWeights.regular
  }
};

const DialogFooterStyles = {
  actions: {
    margin: '16px 0 0'
  }
};

const LabelStyles = {
  root: {
    fontWeight: FontWeights.semibold
  }
};

const TextFieldStyles = {
  fieldGroup: {
    borderRadius: fluentBorderRadius
  }
};

const ToggleStyles = {
  pill: {
    width: '40px',
    height: '20px',
    borderRadius: '10px',
    padding: '0 4px'
  },
  thumb: {
    width: '12px',
    height: '12px',
    borderRadius: '12px',
    borderColor: 'transparent'
  }
};

// Roll up all style overrides in a single "Fluent theme" object
export const FluentStyles = {
  Breadcrumb: {
    styles: BreadcrumbStyles
  },
  PrimaryButton: {
    styles: PrimaryButtonStyles
  },
  DefaultButton: {
    styles: DefaultButtonStyles
  },
  CompoundButton: {
    styles: CompoundButtonStyles
  },
  Checkbox: {
    styles: CheckboxStyles
  },
  ChoiceGroupOption: {
    styles: ChoiceGroupOptionStyles
  },
  ComboBox: {
    styles: ComboBoxStyles
  },
  Dialog: {
    styles: DialogStyles
  },
  DialogContent: {
    styles: DialogContentStyles
  },
  DialogFooter: {
    styles: DialogFooterStyles
  },
  Label: {
    styles: LabelStyles
  },
  TextField: {
    styles: TextFieldStyles
  },
  Toggle: {
    styles: ToggleStyles
  }
};

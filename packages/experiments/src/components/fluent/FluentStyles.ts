import { FontWeights } from 'office-ui-fabric-react/lib/Styling';
import { NeutralColors } from './FluentColors';
import {
  IChoiceGroupOptionStyleProps,
  IChoiceGroupOptionStyles
} from 'office-ui-fabric-react/lib/components/ChoiceGroup/ChoiceGroupOption';
import { FontSizes } from './FluentType';
import { Depths } from './FluentDepths';

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
    borderRadius: '2px'
    // boxShadow: Depths.depth4
  }
};

const CompoundButtonStyles = {
  root: {
    borderRadius: '2px'
    // boxShadow: Depths.depth4
  }
};

const DefaultButtonStyles = {
  root: {
    borderRadius: '2px',
    backgroundColor: '#fff',
    border: `1px solid ${NeutralColors.gray20}`
  },
  rootHovered: {
    backgroundColor: '#f3f2f1'
  }
};

const CheckboxStyles = {
  checkbox: {
    borderRadius: '2px'
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
          {
            top: 4,
            left: 4,
            width: 12,
            height: 12,
            borderWidth: 6
          },
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

const DialogStyles = {
  main: {
    boxShadow: Depths.depth64
  }
};

const DialogContentStyles = {
  title: {
    fontWeight: FontWeights.semibold
  }
};

const LabelStyles = {
  root: {
    fontWeight: FontWeights.semibold
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
  Dialog: {
    styles: DialogStyles
  },
  DialogContent: {
    styles: DialogContentStyles
  },
  Label: {
    styles: LabelStyles
  },
  Toggle: {
    styles: ToggleStyles
  }
};

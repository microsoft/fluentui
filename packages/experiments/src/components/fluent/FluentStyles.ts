import { FontWeights } from 'office-ui-fabric-react/lib/Styling';
import { NeutralColors } from './FluentColors';
import {
  IChoiceGroupOptionStyleProps,
  IChoiceGroupOptionStyles
} from 'office-ui-fabric-react/lib/components/ChoiceGroup/ChoiceGroupOption';

/** Definitions for Depth, or shadow, levels. */
const FluentDepthLevels = {
  /**
   * Level 0 of Fluent Depth system.
   * Recommended uses: Surfaces.
   * */
  Level0: '0 0 0 0 transparent',

  /**
   * Level 1 of Fluent Depth system.
   * Recommended uses: Buttons, Cards, Grid items, List items.
   * */
  Level1: '0 2px 4px -0.75px rgba(0, 0, 0, 0.1)',

  /**
   * Level 2 of Fluent Depth system.
   * Recommended uses: Command Bar, Contextual Menus.
   * */
  Level2: '0 4px 8px -1px rgba(0, 0, 0, 0.1)',

  /**
   * Level 3 of Fluent Depth system.
   * Recommended uses: Teaching Callouts, Search Results, Dropdowns, Hover cards, Tooltips.
   * */
  Level3: '0 8px 10px -2px rgba(0, 0, 0, 0.1)',

  /**
   * Level 4 of Fluent Depth system.
   * Recommended uses: Panels, Dialogs.
   * */
  Level4: '0 16px 18px -4px rgba(0, 0, 0, 0.1)'
};

// const LinkStyles = {
//   root: {
//     // Styles
//   }
// };

const BreadcrumbStyles = {
  itemLink: {
    fontSize: '18px',
    fontWeight: 400,
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
    // boxShadow: FluentDepthLevels.Level1
  }
};

const CompoundButtonStyles = {
  root: {
    borderRadius: '2px'
    // boxShadow: FluentDepthLevels.Level1
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
    // borderColor: GrayColors.gray160
  }
};

const ChoiceGroupOptionStyles = (props: IChoiceGroupOptionStyleProps): IChoiceGroupOptionStyles => {
  const { checked, hasIcon, hasImage } = props;
  const radioButtonSpacing = 1;
  const radioButtonInnerSize = 6;
  return {
    field: {
      selectors: {
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
            }
        ]
      }
    }
  };
};

const DialogStyles = {
  main: {
    boxShadow: FluentDepthLevels.Level4
  }
};

const DialogContentStyles = {
  title: {
    fontWeight: FontWeights.semibold
  }
};

// Roll up all style overrides in a single "Fluent theme" object
export const FluentStyles = {
  Breadcrumb: {
    styles: BreadcrumbStyles
  },
  // Link: {
  //   styles: LinkStyles
  // },
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
  }
};

// export class FluentStylesBasicExample extends React.Component<{}, {}> {
//   public render(): JSX.Element {
//     return (
//       <div>
//         <h2>Link</h2>
//         <h3>Current theme</h3>
//         <FluentThemeLinkExample />
//         <h3>Fluent theme</h3>
//         <Customizer scopedSettings={{ ...FluentStyles }}>
//           <FluentThemeLinkExample />
//         </Customizer>
//         <h2>Buttons</h2>
//         <h3>Current theme</h3>
//         <FluentThemeButtonExample />
//         <h3>Fluent theme</h3>
//         <Customizer scopedSettings={{ ...FluentStyles }}>
//           <FluentThemeButtonExample />
//         </Customizer>
//       </div>
//     );
//   }
// }

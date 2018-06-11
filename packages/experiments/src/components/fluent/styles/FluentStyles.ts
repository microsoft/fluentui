// import * as React from 'react';
// import { Dialog, DialogFooter, DialogType } from 'office-ui-fabric-react/lib/Dialog';
// import { PrimaryButton, DefaultButton, CompoundButton } from 'office-ui-fabric-react/lib/Button';
// import { Customizer } from 'office-ui-fabric-react/lib/Utilities';
import { FontWeights } from 'office-ui-fabric-react/lib/Styling';
// import { FluentThemeLinkExample } from './FluentStylesLink.Basic.Examples';
// import { FluentThemeButtonExample } from './FluentStylesButton.Basic.Examples';

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

const linkStyles = {
  root: {
    color: 'red',
    background: 'transparent'
  }
};

const PrimaryButtonStyles = {
  root: {
    borderRadius: '2px',
    backgroundColor: 'red',
    boxShadow: FluentDepthLevels.Level1
  }
};

const CompoundButtonStyles = {
  root: {
    borderRadius: '2px',
    boxShadow: FluentDepthLevels.Level1
  }
};

const DefaultButtonStyles = {
  root: {
    borderRadius: '2px',
    boxShadow: FluentDepthLevels.Level1
  }
};

// Note: For some reason, all Dialog style overrides aren't being respected here.
const DialogStyles = {
  main: {
    boxShadow: FluentDepthLevels.Level4,
    border: '2px solid red'
  }
};

const DialogContentStyles = {
  title: {
    fontWeight: FontWeights.semibold,
    color: 'red'
  }
};

// Roll up all style overrides in a single "Fluent theme" object
export const FluentStyles = {
  Link: {
    styles: linkStyles
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

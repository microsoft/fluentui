import 'react';

type FocusgroupLinearBehavior = 'toolbar' | 'menubar' | 'tablist' | 'radiogroup' | 'listbox' | 'menu' | 'feed';
type FocusgroupAxis = 'inline' | 'block';
type FocusgroupWrap = 'wrap' | 'nowrap';
type FocusgroupMemory = 'nomemory';
type FocusgroupItemControls = 'itemcontrols' | 'noitemcontrols';
type FocusgroupGridEdge = 'wrap' | 'nowrap' | 'flow';
type FocusgroupGridRowEdge = 'rowwrap' | 'rowflow';
type FocusgroupGridColumnEdge = 'colwrap' | 'colflow';

type FocusgroupLinearWithAxis = FocusgroupLinearBehavior | `${FocusgroupLinearBehavior} ${FocusgroupAxis}`;
type FocusgroupLinearWithWrap = FocusgroupLinearWithAxis | `${FocusgroupLinearWithAxis} ${FocusgroupWrap}`;
type FocusgroupLinearWithMemory = FocusgroupLinearWithWrap | `${FocusgroupLinearWithWrap} ${FocusgroupMemory}`;
type FocusgroupLinearAttribute = FocusgroupLinearWithMemory | `${FocusgroupLinearWithMemory} ${FocusgroupItemControls}`;

type FocusgroupGridWithTopology = 'grid' | 'grid manual';
type FocusgroupGridWithEdges =
  | FocusgroupGridWithTopology
  | `${FocusgroupGridWithTopology} ${FocusgroupGridEdge}`
  | `${FocusgroupGridWithTopology} ${FocusgroupGridRowEdge}`
  | `${FocusgroupGridWithTopology} ${FocusgroupGridColumnEdge}`
  | `${FocusgroupGridWithTopology} ${FocusgroupGridRowEdge} ${FocusgroupGridColumnEdge}`;
type FocusgroupGridWithMemory = FocusgroupGridWithEdges | `${FocusgroupGridWithEdges} ${FocusgroupMemory}`;
type FocusgroupGridAttribute = FocusgroupGridWithMemory | `${FocusgroupGridWithMemory} ${FocusgroupItemControls}`;

type FocusgroupAttribute = 'none' | FocusgroupLinearAttribute | FocusgroupGridAttribute;

declare module 'react' {
  interface HTMLAttributes<T> {
    /**
     * The `focusgroup` attribute is used to indicate that a group of elements should be treated as
     * a single focusable unit for keyboard navigation purposes. It can be used to create accessible
     * components that support keyboard navigation and focus management.
     */
    focusgroup?: FocusgroupAttribute;

    /**
     * The `focusgroupstart` attribute is used to indicate that an element is the starting
     * point of a focus group. It can be used in conjunction with the `focusgroup` attribute
     * to create accessible components that support keyboard navigation and focus management.
     */
    focusgroupstart?: string;
  }
}

export {};

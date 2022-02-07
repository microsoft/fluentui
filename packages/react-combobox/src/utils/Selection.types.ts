export type SelectionProps = {
  /* For an uncontrolled component, sets the initial selection */
  initialSelectedKeys?: string[];

  /**
   * Sets the selection type to multiselect.
   * Set this to true for multiselect, even if fully controlling selection state.
   * This enables styles and accessibility properties to be set.
   * @default false
   */
  multiselect?: boolean;

  /* Callback when an option is selected */
  onSelect?(optionKey: string): void;

  /* Array of selected option keys, set this to control selected state */
  selectedKeys?: string[];
};

export type SelectionState = Required<Pick<SelectionProps, 'selectedKeys'>>;

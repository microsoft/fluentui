/**
 * Toggle component props.
 */
export interface IToggleProps {
  /**
   * A label for the toggle.
   */
  label: string;

  /**
   * Whether or not the toggled component is toggled.
   * @defaultvalue false
   */
  isToggled?: boolean;

  /**
   * Text to display when toggle is ON.
   */
  onText?: string;

  /**
   * Test display when toggle is OFF.
   */
  offText?: string;

  /**
   * onchange callback.
   */
  onChanged?: (isToggled: boolean) => void;
}
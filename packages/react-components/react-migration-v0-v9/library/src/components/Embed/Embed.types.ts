import { VideoProps } from "../Video/Video";

export interface EmbedControlProps extends React.HTMLAttributes<HTMLButtonElement> {
  /** Whether the control is active (playing). */
  active?: boolean;
  /** Callback when the control is clicked. */
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

export interface EmbedProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Whether the embedded object should be active
   */
  active?: boolean;

  /**
   * Whether the embedded object should start active
   */
  defaultActive?: boolean;

  /**
   * Image source URL for when video isn't playing
   */
  placeholder?: string;

  /**
   * Called when active state changes
   */
  onActiveChange?: (event: React.MouseEvent, data: { active: boolean }) => void;

  /**
   * Video slot props
   */
  video?: VideoProps | string;

  control?: EmbedControlProps;
};

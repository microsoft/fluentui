import { INavPage } from '../Nav/index';

/**
 * Props for the platform picker.
 * TPlatform can be an enum type and is expected to contain the key `default`.
 */
export interface IPlatformPickerProps<TPlatforms extends string = string> {
  /**
   * The currently active platform.
   */
  activePlatform: TPlatforms;

  /**
   * The platforms to display in the platform picker.
   */
  platforms: { [platform in TPlatforms]?: IPlatform };

  /**
   * The object of platforms defined for the current page.
   */
  pagePlatforms?: TPlatformPages<TPlatforms>;

  /**
   * Function callback invoked when a platform is clicked.
   */
  onPlatformClick?: (name: TPlatforms) => void;
}

/**
 * Defines the platforms rendered by the app's platform picker.
 */
export interface IPlatform {
  /** The full name of the platform. */
  name: string;

  /** The icon rendered on the platform picker button. */
  icon?: string;

  /** Custom className for the icon when rendered on the platform picker button. */
  iconClassName?: string;

  /** Optional className to be added the platform picker button. */
  className?: string;

  /** Optional color code to use on the platform picker button. */
  color?: string;
}

/**
 * An object of platform arrays containing pages specific to each platform.
 */
export type TPlatformPages<TPlatforms extends string> = { [x in TPlatforms]?: INavPage<TPlatforms>[] };

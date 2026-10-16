import type {
  AvatarProps as AvatarBaseProps,
  AvatarState as AvatarBaseState,
} from '@fluentui/react-headless-components-preview/avatar';
export type { AvatarSlots } from '@fluentui/react-headless-components-preview/avatar';

export type AvatarSize = 16 | 20 | 24 | 28 | 32 | 36 | 40 | 48 | 56 | 64 | 72 | 96 | 120 | 128;

export type AvatarNamedColor =
  | 'dark-red'
  | 'cranberry'
  | 'red'
  | 'pumpkin'
  | 'peach'
  | 'marigold'
  | 'gold'
  | 'brass'
  | 'brown'
  | 'forest'
  | 'seafoam'
  | 'dark-green'
  | 'light-teal'
  | 'teal'
  | 'steel'
  | 'blue'
  | 'royal-blue'
  | 'cornflower'
  | 'navy'
  | 'lavender'
  | 'purple'
  | 'grape'
  | 'lilac'
  | 'pink'
  | 'magenta'
  | 'plum'
  | 'beige'
  | 'mink'
  | 'platinum'
  | 'anchor';

export type AvatarProps = AvatarBaseProps & {
  /** @default 'ring' */
  activeAppearance?: 'ring' | 'shadow' | 'ring-shadow';
  /** @default 'neutral' */
  color?: 'neutral' | 'brand' | 'colorful' | AvatarNamedColor;
  idForColor?: string;
  /** @default 'circular' */
  shape?: 'circular' | 'square';
  /** @default 32 */
  size?: AvatarSize;
};

export type AvatarState = AvatarBaseState & {
  activeAppearance: NonNullable<AvatarProps['activeAppearance']>;
  color: NonNullable<Exclude<AvatarProps['color'], 'colorful'>>;
  shape: NonNullable<AvatarProps['shape']>;
  size: NonNullable<AvatarProps['size']>;
  root: AvatarBaseState['root'] & {
    'data-active-appearance': NonNullable<AvatarProps['activeAppearance']>;
    'data-badge-size'?: 'tiny' | 'extra-small' | 'small' | 'medium' | 'large' | 'extra-large';
    'data-color': AvatarState['color'];
    'data-has-badge'?: '';
    'data-shape': NonNullable<AvatarProps['shape']>;
    'data-size': `${AvatarSize}`;
  };
};

import type { ButtonProps, InputProps } from '@proj/react-components';
import type { FluentIcon } from '@proj/react-icons';

export type CustomButtonProps = ButtonProps & {
  tooltip?: string;
};

export type SearchInputProps = InputProps & {
  onSearch?: (value: string) => void;
};

export type IconType = FluentIcon;

import type { ButtonProps, InputProps } from '@fluentui/react-components';
import type { FluentIcon } from '@fluentui/react-icons';

export type CustomButtonProps = ButtonProps & {
  tooltip?: string;
};

export type SearchInputProps = InputProps & {
  onSearch?: (value: string) => void;
};

export type IconType = FluentIcon;

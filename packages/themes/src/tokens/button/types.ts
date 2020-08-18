import { ColorTokenSet } from '../../types';

export type ButtonTokenSet = ColorTokenSet & {
  size: {
    smallest: string;
    smaller: string;
    small: string;
    regular: string;
    large: string;
    larger: string;
    largest: string;
  };

  padding: string;
  margin: string;
  height: string;
  minHeight: string;
  width: string;
  contentGap: string;
  borderRadius: string;
  borderWidth: string;
  boxShadow: string;
  iconSize: string | number;
  transition: string;

  dividerLength: string;
  dividerThickness: string;

  fontFamily: string;
  fontSize: string | number;
  fontWeight: string | number;
};

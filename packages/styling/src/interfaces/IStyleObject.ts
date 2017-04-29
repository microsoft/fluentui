import { CSSProperties } from 'react';

export interface IStyleObject extends CSSProperties {
  ':hover': CSSProperties;
  ':hover:before': CSSProperties;
  ':hover:after': CSSProperties;
  ':focus': CSSProperties;
  ':focus:before': CSSProperties;
}
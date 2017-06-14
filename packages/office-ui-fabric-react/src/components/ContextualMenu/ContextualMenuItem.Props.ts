import { IButtonProps } from '../../Button';

export interface IContextualMenuItem extends IButtonProps {

}

export enum ContextualMenuItemType {
  Normal = 0,
  Divider = 1,
  Header = 2
}
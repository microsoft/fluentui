import { IStyle, ITheme } from '../../../../Styling';
import { IStyleFunctionOrObject } from '../../../../Utilities';
import { IPersonaProps, IPersonaStyleProps, IPersonaCoinStyleProps } from '../../../../Persona';
import { IPickerItemProps } from '../../PickerItem.types';
import { IContextualMenuItem } from '../../../../ContextualMenu';
import { ValidationState } from '../../BasePicker.types';

/** Common props in between IPeoplePickerItemProps and IPeoplePickerItemWithMenuProps. */
export interface IPeoplePickerItemSharedProps {
  /** Additional CSS class(es) to apply to the PeoplePickerItem root element. */
  className?: string;

  /** Call to provide customized styling that will layer on top of the variant rules. */
  styles?: IStyleFunctionOrObject<IPeoplePickerItemStyleProps, IPeoplePickerItemStyles>;

  /** Theme provided by High-Order Component. */
  theme?: ITheme;
}

export interface IPeoplePickerItemProps
  extends IPickerItemProps<IPersonaProps & { ValidationState: ValidationState }>,
    IPeoplePickerItemSharedProps {}

export interface IPeoplePickerItemWithMenuProps extends IPickerItemProps<IPersonaWithMenu>, IPeoplePickerItemSharedProps {}

export interface IPersonaWithMenu extends IPersonaProps {
  menuItems?: IContextualMenuItem[];
}

/** The props needed to construct PeoplePickerItem styles. */
export type IPeoplePickerItemStyleProps = Required<Pick<IPeoplePickerItemProps, 'theme'>> &
  Pick<IPeoplePickerItemProps, 'className' | 'selected'> & {
    /** Whether it's invalid. */
    invalid?: boolean;
  };

/** Represents the stylable areas of the PeoplePickerItem. */
export interface IPeoplePickerItemStyles {
  /** Root element of picked PeoplePickerItem */
  root: IStyle;

  /** Refers to the element holding the content (Persona) of the PeoplePickerItem already picked. */
  itemContent: IStyle;

  /** Refers to the remove action button on a picked PeoplePickerItem. */
  removeButton: IStyle;

  /** SubComponent styles. */
  subComponentStyles: IPeoplePickerItemSubComponentStyles;
}

export interface IPeoplePickerItemSubComponentStyles {
  /** Refers to the Persona rendered within the PeoplePickerItem */
  persona: IStyleFunctionOrObject<IPersonaStyleProps, any>;

  /** Refers to the PersonaCoin rendered within the PeoplePickerItem */
  personaCoin: IStyleFunctionOrObject<IPersonaCoinStyleProps, any>;
}

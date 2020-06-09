import { IStyle, ITheme } from '../../../../Styling';
import { IStyleFunctionOrObject } from '../../../../Utilities';
import { IPersonaProps, IPersonaStyleProps, IPersonaCoinStyleProps } from '../../../../Persona';
import { IPickerItemProps } from '../../PickerItem.types';
import { IContextualMenuItem } from '../../../../ContextualMenu';
import { ValidationState, IBasePickerSuggestionsProps } from '../../BasePicker.types';

/**
 * Common props in between IPeoplePickerItemSelectedProps, IPeoplePickerItemWithMenuProps and
 * IPeoplePickerItemSuggestionProps.
 * {@docCategory PeoplePicker}
 */
export interface IPeoplePickerItemSharedProps {
  /** Additional CSS class(es) to apply to the PeoplePickerItem root element. */
  className?: string;

  /** Theme provided by High-Order Component. */
  theme?: ITheme;
}

/**
 * PeoplePickerItemSelected props interface. Refers to the PeoplePicker items that have been picked already.
 * {@docCategory PeoplePicker}
 */
export interface IPeoplePickerItemSelectedProps
  extends IPickerItemProps<IPersonaProps & { ValidationState: ValidationState }>,
    IPeoplePickerItemSharedProps {
  /** Call to provide customized styling that will layer on top of the variant rules. */
  styles?: IStyleFunctionOrObject<IPeoplePickerItemSelectedStyleProps, IPeoplePickerItemSelectedStyles>;
}

/**
 * Props needed to construct PeoplePickerItemSelected styles.
 * {@docCategory PeoplePicker}
 */
export type IPeoplePickerItemSelectedStyleProps = Required<Pick<IPeoplePickerItemSelectedProps, 'theme'>> &
  Pick<IPeoplePickerItemSelectedProps, 'className' | 'selected' | 'disabled'> & {
    /** Whether it's invalid. */
    invalid?: boolean;
  };

/**
 * Represents the stylable areas of the PeoplePickerItemSelected.
 * {@docCategory PeoplePicker}
 */
export interface IPeoplePickerItemSelectedStyles {
  /** Root element of picked PeoplePicker item */
  root: IStyle;

  /** Refers to the element holding the content (Persona) of the PeoplePicker item already picked. */
  itemContent: IStyle;

  /** Refers to the remove action button on a picked PeoplePicker item. */
  removeButton: IStyle;

  /** SubComponent (Persona, PersonaCoin) styles. */
  subComponentStyles: IPeoplePickerItemSelectedSubComponentStyles;
}

/**
 * Styles interface of the SubComponents rendered within PeoplePickerItemSelected.
 * {@docCategory PeoplePicker}
 */
export interface IPeoplePickerItemSelectedSubComponentStyles {
  /** Refers to the Persona rendered within the PeoplePickerItemSelected */
  persona: IStyleFunctionOrObject<IPersonaStyleProps, any>;

  /** Refers to the PersonaCoin in the Persona rendered within the PeoplePickerItemSelected */
  personaCoin?: IStyleFunctionOrObject<IPersonaCoinStyleProps, any>;
}

/**
 * PeoplePickerItemSuggestion props interface. Refers to the PeoplePicker items that are suggested for picking.
 * {@docCategory PeoplePicker}
 */
export interface IPeoplePickerItemSuggestionProps extends IPeoplePickerItemSharedProps {
  /** Persona props for each suggested for picking PeoplePicker item. */
  personaProps?: IPersonaProps;

  /** Call to provide customized styling that will layer on top of the variant rules. */
  styles?: IStyleFunctionOrObject<IPeoplePickerItemSuggestionStyleProps, IPeoplePickerItemSuggestionStyles>;

  /** General common props for all PeoplePicker items suggestions. */
  suggestionsProps?: IBasePickerSuggestionsProps;

  /**
   * Flag that controls whether each suggested PeoplePicker item (Persona) is rendered with or without secondary text
   * for compact look.
   * @defaultvalue false
   */
  compact?: boolean;
}

/**
 * Props needed to construct PeoplePickerItemSuggestion styles.
 * {@docCategory PeoplePicker}
 */
export type IPeoplePickerItemSuggestionStyleProps = Required<Pick<IPeoplePickerItemSuggestionProps, 'theme'>> &
  Pick<IPeoplePickerItemSuggestionProps, 'className'> & {};

/**
 * Represents the stylable areas of the PeoplePickerItemSuggestion.
 * {@docCategory PeoplePicker}
 */
export interface IPeoplePickerItemSuggestionStyles {
  /** Root container element of a suggested PeoplePicker item. */
  root: IStyle;

  /** Refers to the element wrapping the Persona of the suggested PeoplePicker item. */
  personaWrapper: IStyle;

  /** SubComponent (Persona, PersonaCoin) styles. */
  subComponentStyles: IPeoplePickerItemSelectedSubComponentStyles;
}

/**
 * PeoplePickerItemWithMenu props interface.
 * @deprecated Do not use. Will be removed in Fabric 7.0
 */
// tslint:disable-next-line:deprecation
export interface IPeoplePickerItemWithMenuProps extends IPickerItemProps<IPersonaWithMenu> {}

/**
 * Extended interface from IPersonaProps to add `menuItems` property PeoplePickerItemWithMenu items.
 * @deprecated Do not use. Will be removed in Fabric 7.0
 */
export interface IPersonaWithMenu extends IPersonaProps {
  /** Additional menuItems to be rendered in a contextualMenu for each Persona. */
  menuItems?: IContextualMenuItem[];
}

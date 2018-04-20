import * as React from 'react';
import {
  BaseComponent,
  buttonProperties,
  css,
  getId,
  getNativeProps
} from '../../Utilities';
import {
  IFacepileProps,
  IFacepilePersona,
  OverflowButtonType
} from './Facepile.types';
import {
  FocusZone,
  FocusZoneDirection
} from '../../FocusZone';
import {
  FacepileButton
} from './FacepileButton';
import {
  Icon
} from '../../Icon';
import {
  Persona
} from '../../Persona';
import {
  PersonaCoin,
  PersonaSize,
  PersonaInitialsColor
} from '../../PersonaCoin';
import * as stylesImport from './Facepile.scss';
const styles: any = stylesImport;

export class Facepile extends BaseComponent<IFacepileProps, {}> {
  public static defaultProps: IFacepileProps = {
    maxDisplayablePersonas: 5,
    personas: [],
    overflowPersonas: [],
    personaSize: PersonaSize.size32
  };

  private _ariaDescriptionId: string;

  constructor(props: IFacepileProps) {
    super(props);

    this._ariaDescriptionId = getId();
  }

  public render(): JSX.Element {
    let { overflowButtonProps } = this.props;
    const {
      ariaDescription,
      chevronButtonProps,
      maxDisplayablePersonas,
      className,
      personas,
      overflowPersonas,
      showAddButton
    } = this.props;

    const numPersonasToShow: number = Math.min(personas.length, maxDisplayablePersonas || personas.length);

    // Added for deprecating chevronButtonProps.  Can remove after v1.0
    if (chevronButtonProps && !overflowButtonProps) {
      overflowButtonProps = chevronButtonProps;
    }

    const hasOverflowPersonas = overflowPersonas && overflowPersonas.length > 0;
    const personasPrimary: IFacepilePersona[] = hasOverflowPersonas ? personas : personas.slice(0, numPersonasToShow);
    const personasOverflow: IFacepilePersona[] = (hasOverflowPersonas ? overflowPersonas : personas.slice(numPersonasToShow)) || [];

    return (
      <div className={ css('ms-Facepile', styles.root, className) } >
        { this.onRenderAriaDescription() }
        <div className={ css('ms-Facepile-itemContainer', styles.itemContainer) } >
          { showAddButton ? this._getAddNewElement() : null }
          <FocusZone
            ariaDescribedBy={ ariaDescription && this._ariaDescriptionId }
            role='listbox'
            className={ css('ms-Facepile-members', styles.members) }
            direction={ FocusZoneDirection.horizontal }
          >
            { this._onRenderVisiblePersonas(personasPrimary, personasOverflow.length === 0 && personas.length === 1) }
          </FocusZone>
          { overflowButtonProps ? this._getOverflowElement(personasOverflow) : null }
        </div>
      </div>
    );
  }

  protected onRenderAriaDescription() {
    const { ariaDescription } = this.props;

    // If ariaDescription is given, descriptionId will be assigned to ariaDescriptionSpan,
    // otherwise it will be assigned to descriptionSpan.
    return ariaDescription && (
      <span className={ styles.screenReaderOnly } id={ this._ariaDescriptionId }>{ ariaDescription }</span>
    );
  }

  private _onRenderVisiblePersonas(personas: IFacepilePersona[], singlePersona: boolean): JSX.Element[] {
    return personas.map((persona: IFacepilePersona, index: number) => {
      const personaControl: JSX.Element = singlePersona ? this._getPersonaControl(persona) : this._getPersonaCoinControl(persona);
      return persona.onClick ?
        this._getElementWithOnClickEvent(personaControl, persona, index) :
        this._getElementWithoutOnClickEvent(personaControl, persona, index);
    });
  }

  private _getPersonaControl(persona: IFacepilePersona): JSX.Element {
    const { getPersonaProps, personaSize } = this.props;
    return (
      <Persona
        imageInitials={ persona.imageInitials }
        imageUrl={ persona.imageUrl }
        initialsColor={ persona.initialsColor }
        allowPhoneInitials={ persona.allowPhoneInitials }
        primaryText={ persona.personaName }
        size={ personaSize }
        { ...(getPersonaProps ? getPersonaProps(persona) : null) }
      />
    );
  }

  private _getPersonaCoinControl(persona: IFacepilePersona): JSX.Element {
    const { getPersonaProps, personaSize } = this.props;
    return (
      <PersonaCoin
        imageInitials={ persona.imageInitials }
        imageUrl={ persona.imageUrl }
        initialsColor={ persona.initialsColor }
        allowPhoneInitials={ persona.allowPhoneInitials }
        primaryText={ persona.personaName }
        size={ personaSize }
        { ...(getPersonaProps ? getPersonaProps(persona) : null) }
      />
    );
  }

  private _getElementWithOnClickEvent(personaControl: JSX.Element, persona: IFacepilePersona, index: number): JSX.Element {
    return (
      <FacepileButton
        { ...getNativeProps(persona, buttonProperties) }
        { ...this._getElementProps(persona, index) }
        onClick={ this._onPersonaClick.bind(this, persona) }
      >
        { personaControl }
      </FacepileButton>
    );
  }

  private _getElementWithoutOnClickEvent(personaControl: JSX.Element, persona: IFacepilePersona, index: number): JSX.Element {
    return (
      <div
        { ...getNativeProps(persona, buttonProperties) }
        { ...this._getElementProps(persona, index) }
      >
        { personaControl }
      </div>
    );
  }

  private _getElementProps(persona: IFacepilePersona, index: number): { key: React.Key, ['data-is-focusable']: boolean } & React.HTMLAttributes<HTMLDivElement> {
    return {
      key: (!!persona.imageUrl ? 'i' : '') + index,
      'data-is-focusable': true,
      role: 'option',
      className: css('ms-Facepile-itemButton ms-Facepile-person', styles.itemButton),
      title: persona.personaName,
      onMouseMove: this._onPersonaMouseMove.bind(this, persona),
      onMouseOut: this._onPersonaMouseOut.bind(this, persona)
    };
  }

  private _getOverflowElement(personasOverflow: IFacepilePersona[]): JSX.Element | null {
    switch (this.props.overflowButtonType) {
      case OverflowButtonType.descriptive:
        return this._getDescriptiveOverflowElement(personasOverflow);
      case OverflowButtonType.downArrow:
        return this._getIconElement('ChevronDown');
      case OverflowButtonType.more:
        return this._getIconElement('More');
      default:
        return null;
    }
  }

  private _getDescriptiveOverflowElement(personasOverflow: IFacepilePersona[]): JSX.Element | null {
    const { overflowButtonProps, personaSize } = this.props;

    if (!personasOverflow || personasOverflow.length < 1) { return null; }

    const personaNames: string = personasOverflow.map((p: IFacepilePersona) => p.personaName).join(', ');
    const numPersonasNotPictured: number = Math.max(personasOverflow.length, 0);

    return (
      <FacepileButton
        { ...overflowButtonProps }
        ariaDescription={ personaNames }
        className={ css('ms-Facepile-descriptiveOverflowButton', 'ms-Facepile-itemButton', styles.descriptiveOverflowButton, styles.itemButton) }
      >
        <PersonaCoin
          title={ personaNames }
          size={ personaSize }
          onRenderInitials={ this._renderInitialsNotPictured(numPersonasNotPictured) }
          initialsColor={ PersonaInitialsColor.transparent }
        />
      </FacepileButton>
    );
  }

  private _getIconElement(icon: string): JSX.Element {
    const { overflowButtonProps, personaSize } = this.props;
    const overflowInitialsIcon = true;

    return (
      <FacepileButton
        { ...overflowButtonProps }
        className={ css('ms-Facepile-overflowButton', 'ms-Facepile-itemButton', styles.overflowButton, styles.itemButton) }
      >
        <PersonaCoin
          size={ personaSize }
          onRenderInitials={ this._renderInitials(icon, overflowInitialsIcon) }
          initialsColor={ PersonaInitialsColor.transparent }
        />
      </FacepileButton>
    );
  }

  private _getAddNewElement(): JSX.Element {
    const { addButtonProps, personaSize } = this.props;

    return (
      <FacepileButton
        { ...addButtonProps }
        className={ css('ms-Facepile-addButton', 'ms-Facepile-itemButton', styles.itemButton, styles.addButton) }
      >
        <PersonaCoin
          size={ personaSize }
          onRenderInitials={ this._renderInitials('AddFriend') }
        />
      </FacepileButton>
    );
  }

  private _onPersonaClick(persona: IFacepilePersona, ev?: React.MouseEvent<HTMLElement>): void {
    persona.onClick!(ev, persona);
    ev!.preventDefault();
    ev!.stopPropagation();
  }

  private _onPersonaMouseMove(persona: IFacepilePersona, ev?: React.MouseEvent<HTMLElement>): void {
    if (!!persona.onMouseMove) {
      persona.onMouseMove(ev, persona);
    }
  }

  private _onPersonaMouseOut(persona: IFacepilePersona, ev?: React.MouseEvent<HTMLElement>): void {
    if (!!persona.onMouseOut) {
      persona.onMouseOut(ev, persona);
    }
  }

  private _renderInitials(iconName: string, overflowButton?: boolean): () => JSX.Element {
    return (): JSX.Element => {
      return (
        <Icon
          iconName={ iconName }
          className={ overflowButton ? styles.overflowInitialsIcon : '' }
        />
      );
    };
  }

  private _renderInitialsNotPictured(numPersonasNotPictured: number): () => JSX.Element {
    return (): JSX.Element => {
      return (
        <span
          className={ styles.overflowInitialsIcon }
        >
          { '+' + numPersonasNotPictured }
        </span>
      );
    };
  }
}

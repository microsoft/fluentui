import * as React from 'react';
import { BaseComponent, buttonProperties, classNamesFunction, getId, getNativeProps } from '../../Utilities';
import { IFacepileProps, IFacepilePersona, IFacepileStyleProps, IFacepileStyles, OverflowButtonType } from './Facepile.types';
import { FacepileButton } from './FacepileButton';
import { Icon } from '../../Icon';
import { Persona, IPersonaStyles } from '../../Persona';
import { PersonaCoin, PersonaSize, PersonaInitialsColor } from '../../PersonaCoin';
import { IButtonProps } from '../Button/Button.types';

const getClassNames = classNamesFunction<IFacepileStyleProps, IFacepileStyles>();

/**
 * FacePile with no default styles.
 * [Use the `styles` API to add your own styles.](https://github.com/OfficeDev/office-ui-fabric-react/wiki/Component-Styling)
 */
export class FacepileBase extends BaseComponent<IFacepileProps, {}> {
  public static defaultProps: IFacepileProps = {
    maxDisplayablePersonas: 5,
    personas: [],
    overflowPersonas: [],
    personaSize: PersonaSize.size32
  };

  private _ariaDescriptionId: string;

  private _classNames = getClassNames(this.props.styles, {
    theme: this.props.theme!,
    className: this.props.className
  });

  constructor(props: IFacepileProps) {
    super(props);

    this._ariaDescriptionId = getId();
  }

  public render(): JSX.Element {
    let { overflowButtonProps } = this.props;
    const { chevronButtonProps, maxDisplayablePersonas, personas, overflowPersonas, showAddButton } = this.props;

    const { _classNames } = this;

    // Add a check to make sure maxDisplayalePersonas is defined to cover the edge case of it being 0.
    const numPersonasToShow: number =
      typeof maxDisplayablePersonas === 'number' ? Math.min(personas.length, maxDisplayablePersonas) : personas.length;

    // Added for deprecating chevronButtonProps.  Can remove after v1.0
    if (chevronButtonProps && !overflowButtonProps) {
      overflowButtonProps = chevronButtonProps;
    }

    const hasOverflowPersonas = overflowPersonas && overflowPersonas.length > 0;
    const personasPrimary: IFacepilePersona[] = hasOverflowPersonas ? personas : personas.slice(0, numPersonasToShow);
    const personasOverflow: IFacepilePersona[] = (hasOverflowPersonas ? overflowPersonas : personas.slice(numPersonasToShow)) || [];

    return (
      <div className={_classNames.root}>
        {this.onRenderAriaDescription()}
        <div className={_classNames.itemContainer}>
          {showAddButton ? this._getAddNewElement() : null}
          <ul className={_classNames.members} role="listbox">
            {this._onRenderVisiblePersonas(personasPrimary, personasOverflow.length === 0 && personas.length === 1)}
          </ul>
          {overflowButtonProps ? this._getOverflowElement(personasOverflow) : null}
        </div>
      </div>
    );
  }

  protected onRenderAriaDescription() {
    const { ariaDescription } = this.props;

    const { _classNames } = this;

    // If ariaDescription is given, descriptionId will be assigned to ariaDescriptionSpan,
    // otherwise it will be assigned to descriptionSpan.
    return (
      ariaDescription && (
        <span className={_classNames.screenReaderOnly} id={this._ariaDescriptionId}>
          {ariaDescription}
        </span>
      )
    );
  }

  private _onRenderVisiblePersonas(personas: IFacepilePersona[], singlePersona: boolean): JSX.Element[] {
    return personas.map((persona: IFacepilePersona, index: number) => {
      const personaControl: JSX.Element = singlePersona ? this._getPersonaControl(persona) : this._getPersonaCoinControl(persona);
      return (
        <li role="option" key={`${singlePersona ? 'persona' : 'personaCoin'}-${index}`} className={this._classNames.member}>
          {persona.onClick
            ? this._getElementWithOnClickEvent(personaControl, persona, index)
            : this._getElementWithoutOnClickEvent(personaControl, persona, index)}
        </li>
      );
    });
  }

  private _getPersonaControl(persona: IFacepilePersona): JSX.Element {
    const { getPersonaProps, personaSize } = this.props;
    const personaStyles: Partial<IPersonaStyles> = {
      details: {
        flex: '1 0 auto'
      }
    };

    return (
      <Persona
        imageInitials={persona.imageInitials}
        imageUrl={persona.imageUrl}
        initialsColor={persona.initialsColor}
        allowPhoneInitials={persona.allowPhoneInitials}
        text={persona.personaName}
        size={personaSize}
        {...(getPersonaProps ? getPersonaProps(persona) : null)}
        styles={personaStyles}
      />
    );
  }

  private _getPersonaCoinControl(persona: IFacepilePersona): JSX.Element {
    const { getPersonaProps, personaSize } = this.props;
    return (
      <PersonaCoin
        imageInitials={persona.imageInitials}
        imageUrl={persona.imageUrl}
        initialsColor={persona.initialsColor}
        allowPhoneInitials={persona.allowPhoneInitials}
        text={persona.personaName}
        size={personaSize}
        {...(getPersonaProps ? getPersonaProps(persona) : null)}
      />
    );
  }

  private _getElementWithOnClickEvent(personaControl: JSX.Element, persona: IFacepilePersona, index: number): JSX.Element {
    const { keytipProps } = persona;
    return (
      <FacepileButton
        {...getNativeProps(persona, buttonProperties)}
        {...this._getElementProps(persona, index)}
        keytipProps={keytipProps}
        onClick={this._onPersonaClick.bind(this, persona)}
      >
        {personaControl}
      </FacepileButton>
    );
  }

  private _getElementWithoutOnClickEvent(personaControl: JSX.Element, persona: IFacepilePersona, index: number): JSX.Element {
    return (
      <div {...getNativeProps(persona, buttonProperties)} {...this._getElementProps(persona, index)}>
        {personaControl}
      </div>
    );
  }

  private _getElementProps(
    persona: IFacepilePersona,
    index: number
  ): { key: React.Key; ['data-is-focusable']: boolean } & React.HTMLAttributes<HTMLDivElement> {
    const { _classNames } = this;

    return {
      key: (!!persona.imageUrl ? 'i' : '') + index,
      'data-is-focusable': true,
      role: 'option',
      className: _classNames.itemButton,
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
    const { personaSize } = this.props;
    if (!personasOverflow || personasOverflow.length < 1) {
      return null;
    }

    const personaNames: string = personasOverflow.map((p: IFacepilePersona) => p.personaName).join(', ');
    const overflowButtonProps: IButtonProps = { ...{ title: personaNames }, ...this.props.overflowButtonProps };
    const numPersonasNotPictured: number = Math.max(personasOverflow.length, 0);

    const { _classNames } = this;

    return (
      <FacepileButton
        {...overflowButtonProps}
        ariaDescription={overflowButtonProps.title}
        className={_classNames.descriptiveOverflowButton}
      >
        <PersonaCoin
          size={personaSize}
          onRenderInitials={this._renderInitialsNotPictured(numPersonasNotPictured)}
          initialsColor={PersonaInitialsColor.transparent}
        />
      </FacepileButton>
    );
  }

  private _getIconElement(icon: string): JSX.Element {
    const { overflowButtonProps, personaSize } = this.props;
    const overflowInitialsIcon = true;

    const { _classNames } = this;

    return (
      <FacepileButton {...overflowButtonProps} className={_classNames.overflowButton}>
        <PersonaCoin
          size={personaSize}
          onRenderInitials={this._renderInitials(icon, overflowInitialsIcon)}
          initialsColor={PersonaInitialsColor.transparent}
        />
      </FacepileButton>
    );
  }
  private _getAddNewElement(): JSX.Element {
    const { addButtonProps, personaSize } = this.props;

    const { _classNames } = this;

    return (
      <FacepileButton {...addButtonProps} className={_classNames.addButton}>
        <PersonaCoin size={personaSize} onRenderInitials={this._renderInitials('AddFriend')} />
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
    const { _classNames } = this;

    return (): JSX.Element => {
      return <Icon iconName={iconName} className={overflowButton ? _classNames.overflowInitialsIcon : ''} />;
    };
  }

  private _renderInitialsNotPictured(numPersonasNotPictured: number): () => JSX.Element {
    const { _classNames } = this;

    return (): JSX.Element => {
      return <span className={_classNames.overflowInitialsIcon}>{'+' + numPersonasNotPictured}</span>;
    };
  }
}

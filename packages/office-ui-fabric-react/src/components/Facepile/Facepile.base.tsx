import * as React from 'react';
<<<<<<< HEAD
import {
  BaseComponent,
  buttonProperties,
  classNamesFunction,
  customizable,
  getId,
  getNativeProps
} from '../../Utilities';
import {
  IFacepileProps,
  IFacepilePersona,
  IFacepileStyleProps,
  IFacepileStyles,
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
  Persona,
  IPersonaStyleProps,
  IPersonaStyles
} from '../../Persona';
import {
  PersonaCoin,
  PersonaSize,
  PersonaInitialsColor
} from '../../PersonaCoin';
=======
import { BaseComponent, buttonProperties, css, getId, getNativeProps } from '../../Utilities';
import { IFacepileProps, IFacepilePersona, OverflowButtonType } from './Facepile.types';
import { FocusZone, FocusZoneDirection } from '../../FocusZone';
import { FacepileButton } from './FacepileButton';
import { Icon } from '../../Icon';
import { Persona } from '../../Persona';
import { PersonaCoin, PersonaSize, PersonaInitialsColor } from '../../PersonaCoin';
import * as stylesImport from './Facepile.scss';
const styles: any = stylesImport;
>>>>>>> 0d91de6a0a15de3bdde6819751eff3cdca870ec0

const getClassNames = classNamesFunction<IFacepileStyleProps, IFacepileStyles>();

@customizable('Facepile', ['theme'])
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
    className: this.props.className,
  });

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
      personas,
      overflowPersonas,
      showAddButton
    } = this.props;

    const { _classNames } = this;

    const numPersonasToShow: number = Math.min(personas.length, maxDisplayablePersonas || personas.length);

    // Added for deprecating chevronButtonProps.  Can remove after v1.0
    if (chevronButtonProps && !overflowButtonProps) {
      overflowButtonProps = chevronButtonProps;
    }

    const hasOverflowPersonas = overflowPersonas && overflowPersonas.length > 0;
    const personasPrimary: IFacepilePersona[] = hasOverflowPersonas ? personas : personas.slice(0, numPersonasToShow);
    const personasOverflow: IFacepilePersona[] =
      (hasOverflowPersonas ? overflowPersonas : personas.slice(numPersonasToShow)) || [];

    return (
<<<<<<< HEAD
      <div className={ _classNames.root } >
        { this.onRenderAriaDescription() }
        <div className={ _classNames.itemContainer } >
          { showAddButton ? this._getAddNewElement() : null }
          <FocusZone
            ariaDescribedBy={ ariaDescription && this._ariaDescriptionId }
            role='listbox'
            className={ _classNames.members }
            direction={ FocusZoneDirection.horizontal }
=======
      <div className={css('ms-Facepile', styles.root, className)}>
        {this.onRenderAriaDescription()}
        <div className={css('ms-Facepile-itemContainer', styles.itemContainer)}>
          {showAddButton ? this._getAddNewElement() : null}
          <FocusZone
            ariaDescribedBy={ariaDescription && this._ariaDescriptionId}
            role="listbox"
            className={css('ms-Facepile-members', styles.members)}
            direction={FocusZoneDirection.horizontal}
>>>>>>> 0d91de6a0a15de3bdde6819751eff3cdca870ec0
          >
            {this._onRenderVisiblePersonas(personasPrimary, personasOverflow.length === 0 && personas.length === 1)}
          </FocusZone>
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
<<<<<<< HEAD
    return ariaDescription && (
      <span className={ _classNames.screenReaderOnly } id={ this._ariaDescriptionId }>{ ariaDescription }</span>
=======
    return (
      ariaDescription && (
        <span className={styles.screenReaderOnly} id={this._ariaDescriptionId}>
          {ariaDescription}
        </span>
      )
>>>>>>> 0d91de6a0a15de3bdde6819751eff3cdca870ec0
    );
  }

  private _onRenderVisiblePersonas(personas: IFacepilePersona[], singlePersona: boolean): JSX.Element[] {
    return personas.map((persona: IFacepilePersona, index: number) => {
      const personaControl: JSX.Element = singlePersona
        ? this._getPersonaControl(persona)
        : this._getPersonaCoinControl(persona);
      return persona.onClick
        ? this._getElementWithOnClickEvent(personaControl, persona, index)
        : this._getElementWithoutOnClickEvent(personaControl, persona, index);
    });
  }

  private _getPersonaControl(persona: IFacepilePersona): JSX.Element {
    const { getPersonaProps, personaSize } = this.props;
    const personaStyles = (props: IPersonaStyleProps): Partial<IPersonaStyles> => ({
      details: {
        flex: '1 0 auto'
      }
    });

    return (
      <Persona
<<<<<<< HEAD
        imageInitials={ persona.imageInitials }
        imageUrl={ persona.imageUrl }
        initialsColor={ persona.initialsColor }
        allowPhoneInitials={ persona.allowPhoneInitials }
        text={ persona.personaName }
        size={ personaSize }
        { ...(getPersonaProps ? getPersonaProps(persona) : null) }
        styles={ personaStyles }
=======
        imageInitials={persona.imageInitials}
        imageUrl={persona.imageUrl}
        initialsColor={persona.initialsColor}
        allowPhoneInitials={persona.allowPhoneInitials}
        text={persona.personaName}
        size={personaSize}
        {...(getPersonaProps ? getPersonaProps(persona) : null)}
>>>>>>> 0d91de6a0a15de3bdde6819751eff3cdca870ec0
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

  private _getElementWithOnClickEvent(
    personaControl: JSX.Element,
    persona: IFacepilePersona,
    index: number
  ): JSX.Element {
    return (
      <FacepileButton
        {...getNativeProps(persona, buttonProperties)}
        {...this._getElementProps(persona, index)}
        onClick={this._onPersonaClick.bind(this, persona)}
      >
        {personaControl}
      </FacepileButton>
    );
  }

  private _getElementWithoutOnClickEvent(
    personaControl: JSX.Element,
    persona: IFacepilePersona,
    index: number
  ): JSX.Element {
    return (
      <div {...getNativeProps(persona, buttonProperties)} {...this._getElementProps(persona, index)}>
        {personaControl}
      </div>
    );
  }

<<<<<<< HEAD
  private _getElementProps(persona: IFacepilePersona, index: number): { key: React.Key, ['data-is-focusable']: boolean } & React.HTMLAttributes<HTMLDivElement> {
    const { _classNames } = this;

=======
  private _getElementProps(
    persona: IFacepilePersona,
    index: number
  ): { key: React.Key; ['data-is-focusable']: boolean } & React.HTMLAttributes<HTMLDivElement> {
>>>>>>> 0d91de6a0a15de3bdde6819751eff3cdca870ec0
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
    const { overflowButtonProps, personaSize } = this.props;

    if (!personasOverflow || personasOverflow.length < 1) {
      return null;
    }

    const personaNames: string = personasOverflow.map((p: IFacepilePersona) => p.personaName).join(', ');
    const numPersonasNotPictured: number = Math.max(personasOverflow.length, 0);

    const { _classNames } = this;

    return (
      <FacepileButton
<<<<<<< HEAD
        { ...overflowButtonProps }
        ariaDescription={ personaNames }
        className={ _classNames.descriptiveOverflowButton }
=======
        {...overflowButtonProps}
        ariaDescription={personaNames}
        className={css(
          'ms-Facepile-descriptiveOverflowButton',
          'ms-Facepile-itemButton',
          styles.descriptiveOverflowButton,
          styles.itemButton
        )}
>>>>>>> 0d91de6a0a15de3bdde6819751eff3cdca870ec0
      >
        <PersonaCoin
          title={personaNames}
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
      <FacepileButton
<<<<<<< HEAD
        { ...overflowButtonProps }
        className={ _classNames.overflowButton }
=======
        {...overflowButtonProps}
        className={css(
          'ms-Facepile-overflowButton',
          'ms-Facepile-itemButton',
          styles.overflowButton,
          styles.itemButton
        )}
>>>>>>> 0d91de6a0a15de3bdde6819751eff3cdca870ec0
      >
        <PersonaCoin
          size={personaSize}
          onRenderInitials={this._renderInitials(icon, overflowInitialsIcon)}
          initialsColor={PersonaInitialsColor.transparent}
        />
      </FacepileButton>
    );
  }
  private _getAddNewElement(): JSX.Element {
    const {
      addButtonProps,
      personaSize
    } = this.props;

    const { _classNames } = this;

    return (
      <FacepileButton
<<<<<<< HEAD
        { ...addButtonProps }
        className={ _classNames.addButton }
=======
        {...addButtonProps}
        className={css('ms-Facepile-addButton', 'ms-Facepile-itemButton', styles.itemButton, styles.addButton)}
>>>>>>> 0d91de6a0a15de3bdde6819751eff3cdca870ec0
      >
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
<<<<<<< HEAD
      return (
        <Icon
          iconName={ iconName }
          className={ overflowButton ? _classNames.overflowInitialsIcon : '' }
        />
      );
=======
      return <Icon iconName={iconName} className={overflowButton ? styles.overflowInitialsIcon : ''} />;
>>>>>>> 0d91de6a0a15de3bdde6819751eff3cdca870ec0
    };
  }

  private _renderInitialsNotPictured(numPersonasNotPictured: number): () => JSX.Element {
    const { _classNames } = this;

    return (): JSX.Element => {
<<<<<<< HEAD
      return (
        <span
          className={ _classNames.overflowInitialsIcon }
        >
          { '+' + numPersonasNotPictured }
        </span>
      );
=======
      return <span className={styles.overflowInitialsIcon}>{'+' + numPersonasNotPictured}</span>;
>>>>>>> 0d91de6a0a15de3bdde6819751eff3cdca870ec0
    };
  }
}

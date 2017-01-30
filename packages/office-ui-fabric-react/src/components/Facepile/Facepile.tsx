import * as React from 'react';
import {
  BaseComponent,
  buttonProperties,
  css,
  divProperties,
  getNativeProps
} from '../../Utilities';
import {
  IFacepileProps,
  IFacepilePersona,
  OverflowButtonType
} from './Facepile.Props';
import {
  Persona,
  PersonaSize
} from '../../Persona';
import './Facepile.scss';

export interface IFacepileState {
  maxDisplayablePersonas: number;
}

export class Facepile extends BaseComponent<IFacepileProps, IFacepileState> {
  public static defaultProps: IFacepileProps = {
    availableWidth: 0,
    maxDisplayablePersonas: 5,
    personas: []
  };

  private _lastPersonaRefKey: string;

  public constructor(props: IFacepileProps) {
    super(props);

    this.state = {
      maxDisplayablePersonas: props.maxDisplayablePersonas
    };
  }

  public componentDidMount() {
    this._rerenderDownToSize();
  }

  public componentDidUpdate() {
    this._rerenderDownToSize();
  }

  public componentWillReceiveProps(nextProps: IFacepileProps) {
    if (nextProps.availableWidth) {
      this.setState({
        maxDisplayablePersonas: nextProps.maxDisplayablePersonas
      });
    }
  }

  public render(): JSX.Element {
    let { chevronButtonProps, overflowButtonProps, overflowButtonType, personas, showAddButton } = this.props;

    let maxShownPersonas: number = this.state.maxDisplayablePersonas;
    if (this.props.availableWidth) {
      maxShownPersonas = Math.floor(this.props.availableWidth / this._calculatePersonaWidth());
      maxShownPersonas = Math.min(this.state.maxDisplayablePersonas, maxShownPersonas);
    }
    let numPersonasToShow: number = Math.min(personas.length, maxShownPersonas);

    // Added for deprecating chevronButtonProps.  Can remove after v1.0
    if (chevronButtonProps && !overflowButtonProps) {
      overflowButtonProps = chevronButtonProps;
      overflowButtonType = OverflowButtonType.downArrow;
    }

    return (
      <div className='ms-Facepile'>
        <div
          className='ms-Facepile-members'
          >
          { showAddButton ? this._getAddNewElement() : null }
          {
            personas.slice(0, numPersonasToShow).map((persona: IFacepilePersona, index: number) => {
              const personaControl: JSX.Element = this._getPersonaControl(persona);
              return persona.onClick ?
                this._getElementWithOnClickEvent(personaControl, persona, index) :
                this._getElementWithoutOnClickEvent(personaControl, persona, index);
            })
          }
          { overflowButtonProps ? this._getOverflowElement(numPersonasToShow) : null }
        </div>
        <div className='ms-Facepile-clear'></div>
      </div>
    );
  }

  private _calculatePersonaWidth(): number {
    let padding: number = 10;
    return 32 + padding;
  }

  private _calculateUsedWidth(): number {
    let control = (this.refs[this._lastPersonaRefKey] as HTMLElement);
    if (control) {
      let offsetLeft: number = control.offsetLeft;
      let offsetWidth: number = control.offsetWidth;
      return offsetLeft + offsetWidth;
    }
    return 0;
  }

  private _getPersonaControl(persona: IFacepilePersona): JSX.Element {
    let { getPersonaProps } = this.props;
    return <Persona
      imageInitials={ persona.imageInitials }
      imageUrl={ persona.imageUrl }
      initialsColor={ persona.initialsColor }
      primaryText={ persona.personaName }
      size={ PersonaSize.extraSmall }
      hidePersonaDetails={ true }
      {...(getPersonaProps ? getPersonaProps(persona) : null) }
      />;
  }

  private _getElementWithOnClickEvent(personaControl: JSX.Element, persona: IFacepilePersona, index: number): JSX.Element {
    this._lastPersonaRefKey = (!!persona.imageUrl ? 'i' : '') + index;
    return <button
      { ...getNativeProps(persona, buttonProperties) }
      className='ms-Facepile-itemButton'
      title={ persona.personaName }
      key={ (!!persona.imageUrl ? 'i' : '') + index }
      onClick={ this._onPersonaClick.bind(this, persona) }
      onMouseMove={ this._onPersonaMouseMove.bind(this, persona) }
      onMouseOut={ this._onPersonaMouseOut.bind(this, persona) }
      >
      { personaControl }
    </button>;
  }

  private _getElementWithoutOnClickEvent(personaControl: JSX.Element, persona: IFacepilePersona, index: number): JSX.Element {
    this._lastPersonaRefKey = (!!persona.imageUrl ? 'i' : '') + index;
    return <div
      { ...getNativeProps(persona, divProperties) }
      className='ms-Facepile-itemButton'
      title={ persona.personaName }
      key={ (!!persona.imageUrl ? 'i' : '') + index }
      onMouseMove={ this._onPersonaMouseMove.bind(this, persona) }
      onMouseOut={ this._onPersonaMouseOut.bind(this, persona) }
      >
      { personaControl }
    </div>;
  }

  private _getOverflowElement(numPersonasToShow: number): JSX.Element {
    switch (this.props.overflowButtonType) {
      case OverflowButtonType.descriptive:
        return this._getDescriptiveOverflowElement(numPersonasToShow);
      case OverflowButtonType.downArrow:
        return this._getIconElement('ChevronDown');
      case OverflowButtonType.more:
        return this._getIconElement('More');
      default:
        return null;
    }
  }

  private _getDescriptiveOverflowElement(numPersonasToShow: number): JSX.Element {
    let numPersonasNotPictured: number = this.props.personas.length - numPersonasToShow;

    if (!this.props.overflowButtonProps || numPersonasNotPictured < 1) { return null; }

    let personaNames: string = this.props.personas.slice(numPersonasToShow).map((p: IFacepilePersona) => p.personaName).join(', ');

    return <button { ...getNativeProps(this.props.overflowButtonProps, buttonProperties) }
      className={ css('ms-Facepile-descriptiveOverflowButton', 'ms-Facepile-itemButton') }
      title={ personaNames }>
      { '+' + numPersonasNotPictured }
    </button>;
  }

  private _getIconElement(icon: string): JSX.Element {
    return <button { ...getNativeProps(this.props.overflowButtonProps, buttonProperties) }
      className={ css('ms-Facepile-overflowButton', 'ms-Facepile-itemButton') }>
      <i className={ css('ms-Icon', 'msIcon', `ms-Icon ms-Icon--${icon}`) } aria-hidden='true'></i>
    </button>;
  }

  private _getAddNewElement(): JSX.Element {
    return <button { ...getNativeProps(this.props.addButtonProps, buttonProperties) }
      className={ css('ms-Facepile-addButton', 'ms-Facepile-itemButton') }>
      <i className='ms-Icon msIcon ms-Icon--AddFriend' aria-hidden='true'></i>
    </button>;
  }

  private _rerenderDownToSize(): void {
    if (!this.props.availableWidth) { return; }
    // Grab all personas and calculate width usage
    let usedWidth: number = this._calculateUsedWidth();
    let maxPersonasAvailable: number = this.props.personas.length;

    if (usedWidth > this.props.availableWidth) {
      if (this.state.maxDisplayablePersonas > 1) {
        if (maxPersonasAvailable < this.state.maxDisplayablePersonas) {
          this.setState({
            maxDisplayablePersonas: maxPersonasAvailable - 1
          });
        } else {
          this.setState({
            maxDisplayablePersonas: this.state.maxDisplayablePersonas - 1
          });
        }
      }
    }
  }

  private _onPersonaClick(persona: IFacepilePersona, ev?: React.MouseEvent<HTMLElement>): void {
    persona.onClick(ev, persona);
    ev.preventDefault();
    ev.stopPropagation();
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
}
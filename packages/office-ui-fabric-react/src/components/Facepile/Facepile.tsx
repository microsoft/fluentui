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
  FocusZone,
  FocusZoneDirection
} from '../../FocusZone';
import {
  BaseButton
} from '../../Button';
import {
  Persona,
  PersonaSize
} from '../../Persona';
import styles from './Facepile.scss';

export interface IFacepileState {
  renderedItems: IFacepilePersona[];
}

const OVERFLOW_KEY = 'overflow';
const MAX_OVERFLOW = 99;

export class Facepile extends BaseComponent<IFacepileProps, IFacepileState> {
  public static defaultProps: IFacepileProps = {
    useOnlyAvailableWidth: false,
    maxDisplayablePersonas: 5,
    personas: [],
    personaSize: PersonaSize.extraSmall
  };

  private _members: HTMLElement;

  private _calculated: boolean;
  private _elementWidth: number;

  constructor(props: IFacepileProps) {
    super(props);

    this.state = {
      renderedItems: null
    };
  }

  public componentDidMount() {
    const { useOnlyAvailableWidth } = this.props;
    if (useOnlyAvailableWidth) {
      this._updateMeasurements();
      this._events.on(window, 'resize', this._updateRenderedItems);
    }
    this._updateRenderedItems();
  }

  public componentWillReceiveProps(nextProps: IFacepileProps) {
    this.setState((prevState: IFacepileState) => {
      prevState.renderedItems = nextProps.personas;
      return prevState;
    });
    this._calculated = null;
  }

  public componentDidUpdate(prevProps: IFacepileProps, prevStates: IFacepileState) {
    const { useOnlyAvailableWidth } = this.props;
    if (!this._calculated) {
      if (useOnlyAvailableWidth) {
        this._updateMeasurements();
      }
      this._updateRenderedItems();
    }
  }

public render(): JSX.Element {
    let { chevronButtonProps, overflowButtonProps, overflowButtonType, showAddButton } = this.props;
    const { renderedItems } = this.state;

    let numPersonasToShow: number = this._calculateDisplayablePersonas();

    // Added for deprecating chevronButtonProps.  Can remove after v1.0
    if (chevronButtonProps && !overflowButtonProps) {
      overflowButtonProps = chevronButtonProps;
      overflowButtonType = OverflowButtonType.downArrow;
    }

    return (
      <div className={ css('ms-Facepile', styles.root) }>
        <div
          className={ css('ms-Facepile-members') }
          ref={ this._resolveRef('_members') }
          >
          { showAddButton && this._getAddNewElement() }
          <FocusZone
            key={ 'FocusZone' }
            direction={ FocusZoneDirection.horizontal }>
            {
              !!numPersonasToShow &&
          renderedItems.map((persona: IFacepilePersona, index: number) => {
            const personaControl: JSX.Element = this._getPersonaControl(persona);
            return persona.onClick ?
              this._getElementWithOnClickEvent(personaControl, persona, index) :
              this._getElementWithoutOnClickEvent(personaControl, persona, index);
          })
            }
        { overflowButtonType !== OverflowButtonType.none &&
          this._getOverflowElement(numPersonasToShow) }
          </FocusZone>
        </div>
        <div className={ css('ms-Facepile-clear', styles.clear) }></div>
      </div>
    );
  }



  private _updateMeasurements(): void {
    const { useOnlyAvailableWidth } = this.props;
    if (useOnlyAvailableWidth) {
      this._elementWidth = this._calculateElementWidth();
    }
  }

  private _updateRenderedItems() {
    const { personas } = this.props;
    let numPersonasToShow: number = this._calculateDisplayablePersonas();

    this.setState((prevState: IFacepileState) => {
      prevState.renderedItems = numPersonasToShow ? personas.slice(0, numPersonasToShow) : [];
      return prevState;
    });

    this._calculated = true;
  }

  private _calculateDisplayablePersonas(): number {
    const { personas, useOnlyAvailableWidth } = this.props;
    let maxPersonasToShow: number =
      useOnlyAvailableWidth ?
        this._calculatePersonasBasedOnWidthAvailable() :
        this._calculatePersonasBasedOnMaxAllowed();

    return Math.max(Math.min(maxPersonasToShow - this._calculateExtraSpaceNeeds(maxPersonasToShow), personas.length), 0);
  }

  private _calculateExtraSpaceNeeds(maxPersonasToShow: number): number {
    const { overflowButtonType, showAddButton} = this.props;
    let extraSpace: number = 0;
    if (showAddButton) { extraSpace++; }
    if (overflowButtonType === OverflowButtonType.more ||
      overflowButtonType === OverflowButtonType.downArrow ||
      this._willDisplayDescriptiveOverflowButton(overflowButtonType, maxPersonasToShow)) { extraSpace++; }
    return extraSpace;
  }

  private _willDisplayDescriptiveOverflowButton(overflowButtonType: OverflowButtonType, numPersonasToShow: number): boolean {
    const { personas } = this.props;
    if (overflowButtonType !== OverflowButtonType.descriptive) { return false; }
    let numPersonasNotPictured: number = personas.length - numPersonasToShow;
    return numPersonasNotPictured > 0;
  }

  private _calculatePersonasBasedOnMaxAllowed(): number {
    const { maxDisplayablePersonas } = this.props;
    let numPersonasToShow: number = maxDisplayablePersonas;
    return Math.max(numPersonasToShow, 1);
  }

  private _calculatePersonasBasedOnWidthAvailable(): number {
    const { maxDisplayablePersonas, width } = this.props;

    let numPersonasToShow: number = 0;
    let boundingBoxWidth: number = width ? width : this._members ? this._members.getBoundingClientRect().width : 0;

    if (this._elementWidth && boundingBoxWidth) {
      numPersonasToShow = Math.floor(boundingBoxWidth / this._elementWidth);
    }

    numPersonasToShow = Math.min(maxDisplayablePersonas, numPersonasToShow);
    return Math.max(numPersonasToShow, 1);
  }

  private _calculateElementWidth(): number {
    if (this._elementWidth) {
      return this._elementWidth;
    }

    let elementWidth: number = 0;

    if (this._members) {
      let node: Element = this._members.querySelector(".ms-Facepile-itemButton");
      if (node) {
        let style = window.getComputedStyle(node);
        elementWidth = node.getBoundingClientRect().width + (parseInt(style.marginLeft, 10) || 0) + (parseInt(style.marginRight, 10) || 0);
      }
    }

    return elementWidth;
  }

  private _getPersonaControl(persona: IFacepilePersona): JSX.Element {
    let { getPersonaProps, personaSize } = this.props;
    return <Persona
      imageInitials={ persona.imageInitials }
      imageUrl={ persona.imageUrl }
      initialsColor={ persona.initialsColor }
      primaryText={ persona.personaName }
      size={ personaSize }
      hidePersonaDetails={ true }
      {...(getPersonaProps ? getPersonaProps(persona) : null) }
    />;
  }

  private _getElementWithOnClickEvent(personaControl: JSX.Element, persona: IFacepilePersona, index: number): JSX.Element {
    return <BaseButton
      { ...getNativeProps(persona, buttonProperties) }
      className={ css('ms-Facepile-itemButton ms-Facepile-person', styles.itemButton) }
      title={ persona.personaName }
            key={ this._getItemKey(persona, index) }
      onClick={ this._onPersonaClick.bind(this, persona) }
      onMouseMove={ this._onPersonaMouseMove.bind(this, persona) }
      onMouseOut={ this._onPersonaMouseOut.bind(this, persona) }
    >
      { personaControl }
    </BaseButton>;
  }

  private _getElementWithoutOnClickEvent(personaControl: JSX.Element, persona: IFacepilePersona, index: number): JSX.Element {
    return <div
      { ...getNativeProps(persona, divProperties) }
      className={ css('ms-Facepile-itemButton ms-Facepile-person', styles.itemButton) }
      title={ persona.personaName }
            key={ this._getItemKey(persona, index) }
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
    const { overflowButtonProps, personas, personaSize } = this.props;
    let numPersonasNotPictured: number = personas.length - numPersonasToShow;

    if (numPersonasNotPictured < 1) { return null; }

    let personaNames: string = personas.slice(numPersonasToShow).map((p: IFacepilePersona) => p.personaName).join(', ');

    return <BaseButton
      { ...getNativeProps(overflowButtonProps, buttonProperties) }
            key={ OVERFLOW_KEY }
className={ css('ms-Facepile-descriptiveOverflowButton', 'ms-Facepile-itemButton', styles.descriptiveOverflowButton, styles.itemButton) }
    >
      <Persona
        title={ personaNames }
        size={ personaSize }
        hidePersonaDetails={ true }
        onRenderInitials={ () => {
          return (
            <span>
      { numPersonasNotPictured > MAX_OVERFLOW ?
        numPersonasNotPictured + '+' :
        '+' + numPersonasNotPictured }</span>
          );
        } }
      >

      </Persona>

    </BaseButton>;
  }

  private _getIconElement(icon: string): JSX.Element {
    const { overflowButtonProps, personaSize } = this.props;

    return <BaseButton
      { ...getNativeProps(overflowButtonProps, buttonProperties) }
      key={ OVERFLOW_KEY }
      className={ css('ms-Facepile-overflowButton', 'ms-Facepile-itemButton', styles.overflowButton, styles.itemButton) }
    >
      <Persona
        size={ personaSize }
        hidePersonaDetails={ true }
        onRenderInitials={ () => (
          <i className={ css('ms-Icon', 'msIcon', `ms-Icon ms-Icon--${icon}`) } aria-hidden='true' />
        ) }
      />
    </BaseButton>;
  }

  private _getAddNewElement(): JSX.Element {
    const { addButtonProps, personaSize } = this.props;

    return <BaseButton
      { ...getNativeProps(addButtonProps, buttonProperties) }
      className={ css('ms-Facepile-addButton', 'ms-Facepile-itemButton', styles.itemButton, styles.addButton) }
    >
      <Persona
        size={ personaSize }
        hidePersonaDetails={ true }
        onRenderInitials={ () => (
          <i className='ms-Icon msIcon ms-Icon--AddFriend' aria-hidden='true' />
        ) }
      />
    </BaseButton>;
  }

  private _getItemKey(persona: IFacepilePersona, index: number): string {
    return (!!persona.imageUrl ? 'i' : '') + index;
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

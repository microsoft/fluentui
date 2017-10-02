import * as React from 'react';
import {
  autobind,
  BaseComponent,
  buttonProperties,
  css,
  divProperties,
  getId,
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
  BaseButton,
  DefaultButton
} from '../../Button';
import {
  Icon
} from '../../Icon';
import {
  Persona,
  PersonaSize
} from '../../Persona';
import {
  ResizeGroup
} from '../../ResizeGroup';
import {
  OverflowSet
} from '../../OverflowSet';
import * as stylesImport from './Facepile.scss';
const styles: any = stylesImport;

interface IOverflowData {
  props: IFacepileProps;
  primary: IFacepilePersona[];
  overflow: IFacepilePersona[];
  cacheKey?: string;
}

export class Facepile extends BaseComponent<IFacepileProps, {}> {
  public static defaultProps: IFacepileProps = {
    useOnlyAvailableWidth: false,
    maxDisplayablePersonas: 5,
    personas: [],
    personaSize: PersonaSize.extraSmall
  };

  private _ariaDescriptionId: string;

  constructor(props: IFacepileProps) {
    super(props);

    this._ariaDescriptionId = getId();
  }

  public render(): JSX.Element {
    let {
      ariaDescription,
      chevronButtonProps,
      maxDisplayablePersonas,
      overflowButtonProps,
      overflowButtonType,
      personas,
      showAddButton,
      useOnlyAvailableWidth,
      width
    } = this.props;

    let numPersonasToShow: number = Math.min(personas.length, maxDisplayablePersonas as number);

    // Added for deprecating chevronButtonProps.  Can remove after v1.0
    if (chevronButtonProps && !overflowButtonProps) {
      overflowButtonProps = chevronButtonProps;
      overflowButtonType = OverflowButtonType.downArrow;
    }

    let facepileData: IOverflowData = {
      props: this.props,
      primary: personas.slice(0, numPersonasToShow),
      overflow: personas.slice(numPersonasToShow)
    };

    let facepileWrapperProps = {
      width: useOnlyAvailableWidth ? `${width}px` : 'auto'
    };

    return (
      <div style={ { ...facepileWrapperProps } }>
        { useOnlyAvailableWidth ?
          <ResizeGroup
            data={ facepileData }
            onReduceData={ this._showLess }
            onRenderData={ this._renderFacepile }
          /> :
          this._renderFacepile(facepileData) }
      </div>
    );
  }

  @autobind
  private _renderFacepile(data: IOverflowData): JSX.Element {
    let {
      className,
      overflowButtonProps,
      showAddButton
    } = this.props;

    return (
      <div className={ css('ms-Facepile', styles.root, className) }>
        <div className={ css('ms-Facepile-itemContainer', styles.itemContainer) }>
          { this._onRenderAriaDescription() }
          { showAddButton ? this._getAddNewElement() : null }
          <FocusZone
            ariaDescribedBy={ this._ariaDescriptionId }
            role='listbox'
            className={ css('ms-Facepile-members', styles.members) }
            direction={ FocusZoneDirection.horizontal }
          >
            { this._onRenderVisiblePersonas(data.primary) }
          </FocusZone>
          { overflowButtonProps ? this._getOverflowElement(data.overflow) : null }
        </div>
      </div>
    );
  }

  private _onRenderVisiblePersonas(personas: IFacepilePersona[]) {
    return personas.map((persona: IFacepilePersona, index: number) => {
      const personaControl: JSX.Element = this._getPersonaControl(persona);
      return persona.onClick ?
        this._getElementWithOnClickEvent(personaControl, persona, index) :
        this._getElementWithoutOnClickEvent(personaControl, persona, index);
    });
  }

  @autobind
  private _showLess(currentData: any): any {
    if (currentData.primary.length === 0) {
      return undefined;
    }

    let overflow = [...currentData.primary.slice(-1), ...currentData.overflow];
    let primary = currentData.primary.slice(0, -1);

    let cacheKey = undefined;
    // cacheKey = this._computeCacheKey(primary);

    return { primary, overflow, cacheKey };
  }

  @autobind
  private _showMore(currentData: any): any {
    if (currentData.overflow.length === 0) {
      return undefined;
    }

    let overflow = currentData.overflow.slice(1);
    let primary = [...currentData.primary, ...currentData.overflow.slice(0, 1)];

    let cacheKey = undefined;
    // cacheKey = this._computeCacheKey(primary);
    return { primary, overflow, cacheKey };
  }

  private _computeCacheKey(primaryControls: IFacepilePersona[]): string {
    return primaryControls
      .reduce((acc, current) => acc + current.personaName, '|')
      + `|${this.props.overflowButtonType}`;
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
      {...this._getElementProps(persona, index) }
      onClick={ this._onPersonaClick.bind(this, persona) }
    >
      { personaControl }
    </BaseButton>;
  }

  private _getElementWithoutOnClickEvent(personaControl: JSX.Element, persona: IFacepilePersona, index: number): JSX.Element {
    return <div
      { ...getNativeProps(persona, buttonProperties) }
      {...this._getElementProps(persona, index) }
    >
      { personaControl }
    </div>;
  }

  private _getElementProps(persona: IFacepilePersona, index: number) {
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

  private _getOverflowElement(overflowPersonas: IFacepilePersona[]): JSX.Element | null {
    switch (this.props.overflowButtonType) {
      case OverflowButtonType.descriptive:
        return this._getDescriptiveOverflowElement(overflowPersonas);
      case OverflowButtonType.downArrow:
        return this._getIconElement('ChevronDown');
      case OverflowButtonType.more:
        return this._getIconElement('More');
      default:
        return null;
    }
  }

  private _getDescriptiveOverflowElement(overflowPersonas: IFacepilePersona[]): JSX.Element | null {
    let { overflowButtonProps, personaSize } = this.props;
    let numPersonasNotPictured: number = overflowPersonas.length;

    let personaNames: string = overflowPersonas.map((p: IFacepilePersona) => p.personaName).join(', ');

    if (numPersonasNotPictured <= 0) { return null; }

    return (
      <BaseButton
        { ...overflowButtonProps}
        ariaDescription={ personaNames }
        className={ css('ms-Facepile-descriptiveOverflowButton', 'ms-Facepile-itemButton', styles.descriptiveOverflowButton, styles.itemButton) }
      >
        <Persona
          title={ personaNames }
          size={ personaSize }
          hidePersonaDetails={ true }
          onRenderInitials={ () => {
            return (
              <span>{ '+' + numPersonasNotPictured }</span>
            );
          } }
        />
      </BaseButton>
    );
  }

  private _getIconElement(icon: string): JSX.Element {
    let { overflowButtonProps, personaSize } = this.props;

    return <BaseButton
      {...overflowButtonProps}
      className={ css('ms-Facepile-overflowButton', 'ms-Facepile-itemButton', styles.overflowButton, styles.itemButton) }
    >
      <Persona
        size={ personaSize }
        hidePersonaDetails={ true }
        onRenderInitials={ () => (
          <Icon iconName={ icon } />
        ) }
      />
    </BaseButton>;
  }

  private _getAddNewElement(): JSX.Element {
    let { addButtonProps, personaSize } = this.props;
    return <BaseButton
      {...addButtonProps}
      className={ css('ms-Facepile-addButton', 'ms-Facepile-itemButton', styles.itemButton, styles.addButton) }
    >
      <Persona
        size={ personaSize }
        hidePersonaDetails={ true }
        onRenderInitials={ () => (
          <Icon iconName='AddFriend' />
        ) }
      />
    </BaseButton>;
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

  private _onRenderAriaDescription() {
    const { ariaDescription } = this.props;

    // If ariaDescription is given, descriptionId will be assigned to ariaDescriptionSpan,
    // otherwise it will be assigned to descriptionSpan.
    return ariaDescription && (
      <span className={ styles.screenReaderOnly } id={ this._ariaDescriptionId }>{ ariaDescription }</span>
    );
  }
}

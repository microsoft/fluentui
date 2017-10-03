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
  PersonaCoin,
  PersonaSize
} from '../../PersonaCoin';
import {
  ResizeGroup
} from '../../ResizeGroup';
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
      className,
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
        { this.onRenderAriaDescription() }
        { useOnlyAvailableWidth ?
          <ResizeGroup
            data={ facepileData }
            onReduceData={ this._showLess }
            onGrowData={ this._showMore }
            onRenderData={ this._renderFacepile }
          /> :
          this._renderFacepile(facepileData) }
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
          { showAddButton ? this._getAddNewElement() : null }
          <FocusZone
            ariaDescribedBy={ this._ariaDescriptionId }
            role='listbox'
            className={ css('ms-Facepile-members', styles.members) }
            direction={ FocusZoneDirection.horizontal }
          >
            { this._onRenderVisiblePersonas(data.primary) }
          </FocusZone>
          { overflowButtonProps ? this._getOverflowElement(data.overflow.length) : null }
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

    let cacheKey: string = this._computeCacheKey(primary);

    return { primary, overflow, cacheKey };
  }

  @autobind
  private _showMore(currentData: any): any {
    if (currentData.overflow.length === 0) {
      return undefined;
    }

    let overflow = currentData.overflow.slice(1);
    let primary = [...currentData.primary, ...currentData.overflow.slice(0, 1)];

    let cacheKey: string = this._computeCacheKey(primary);

    return { primary, overflow, cacheKey };
  }

  private _computeCacheKey(primaryControls: IFacepilePersona[]): string {
    return primaryControls
      .reduce((acc, current) => acc + current.personaName, '|')
      + `|${this.props.overflowButtonType}`;
  }

  private _getPersonaControl(persona: IFacepilePersona): JSX.Element {
    let { getPersonaProps, personaSize } = this.props;
    return (
      <PersonaCoin
        imageInitials={ persona.imageInitials }
        imageUrl={ persona.imageUrl }
        initialsColor={ persona.initialsColor }
        primaryText={ persona.personaName }
        size={ personaSize }
        {...(getPersonaProps ? getPersonaProps(persona) : null) }
      />
    );
  }

  private _getElementWithOnClickEvent(personaControl: JSX.Element, persona: IFacepilePersona, index: number): JSX.Element {
    return (
      <BaseButton
        { ...getNativeProps(persona, buttonProperties) }
        {...this._getElementProps(persona, index) }
        onClick={ this._onPersonaClick.bind(this, persona) }
      >
        { personaControl }
      </BaseButton>
    );
  }

  private _getElementWithoutOnClickEvent(personaControl: JSX.Element, persona: IFacepilePersona, index: number): JSX.Element {
    return (
      <div
        { ...getNativeProps(persona, buttonProperties) }
        {...this._getElementProps(persona, index) }
      >
        { personaControl }
      </div>
    );
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

  private _getOverflowElement(numPersonasToShow: number): JSX.Element | null {
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

  private _getDescriptiveOverflowElement(numPersonasToShow: number): JSX.Element | null {
    let { overflowButtonProps, personas, personaSize } = this.props;
    let numPersonasNotPictured: number = personas.length - numPersonasToShow;

    if (!overflowButtonProps || numPersonasNotPictured < 1) { return null; }

    let personaNames: string = personas.slice(numPersonasToShow).map((p: IFacepilePersona) => p.personaName).join(', ');

    return (
      <BaseButton
        { ...overflowButtonProps}
        className={ css('ms-Facepile-descriptiveOverflowButton', 'ms-Facepile-itemButton', styles.descriptiveOverflowButton, styles.itemButton) }
      >
        <PersonaCoin
          title={ personaNames }
          size={ personaSize }
          onRenderInitials={ this._renderInitialsNotPictured(numPersonasNotPictured) }
        />
      </BaseButton >
    );
  }

  private _getIconElement(icon: string): JSX.Element {
    let { overflowButtonProps, personaSize } = this.props;

    return (
      <BaseButton
        {...overflowButtonProps}
        className={ css('ms-Facepile-overflowButton', 'ms-Facepile-itemButton', styles.overflowButton, styles.itemButton) }
      >
        <PersonaCoin
          size={ personaSize }
          onRenderInitials={ this._renderInitials(icon) }
        />
      </BaseButton>
    );
  }

  private _getAddNewElement(): JSX.Element {
    let { addButtonProps, personaSize } = this.props;

    return (
      <BaseButton
        {...addButtonProps}
        className={ css('ms-Facepile-addButton', 'ms-Facepile-itemButton', styles.itemButton, styles.addButton) }
      >
        <PersonaCoin
          size={ personaSize }
          onRenderInitials={ this._renderInitials('AddFriend') }
        />
      </BaseButton>
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

  private _renderInitials(iconName: string): () => JSX.Element {
    return (): JSX.Element => {
      return (
        <Icon iconName={ iconName } />
      );
    };
  }

  private _renderInitialsNotPictured(numPersonasNotPictured: number): () => JSX.Element {
    return (): JSX.Element => {
      return (
        <span>{ '+' + numPersonasNotPictured }</span>
      );
    };
  }
}

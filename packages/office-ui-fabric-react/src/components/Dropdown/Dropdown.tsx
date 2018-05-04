import * as React from 'react';
import { IDropdownProps, IDropdownOption, DropdownMenuItemType } from './Dropdown.types';
import { Checkbox } from '../../Checkbox';
import { DirectionalHint } from '../../common/DirectionalHint';
import { Callout } from '../../Callout';
import { Label } from '../../Label';
import { CommandButton } from '../../Button';
import { Panel } from '../../Panel';
import { Icon } from '../../Icon';
import { IFocusZone, FocusZone, FocusZoneDirection } from '../../FocusZone';
import { withResponsiveMode, ResponsiveMode } from '../../utilities/decorators/withResponsiveMode';
import { IWithResponsiveModeState } from '../../utilities/decorators/withResponsiveMode';
import {
  BaseComponent,
  KeyCodes,
  css,
  findIndex,
  getId,
  getNativeProps,
  divProperties,
  getFirstFocusable,
  getLastFocusable,
  createRef
} from '../../Utilities';
import { SelectableOptionMenuItemType } from '../../utilities/selectableOption/SelectableOption.types';
import * as stylesImport from './Dropdown.scss';
const styles: any = stylesImport;
import { getStyles as getCheckboxStyles } from '../Checkbox/Checkbox.styles';
import { getTheme } from '../../Styling';
import { KeytipData } from '../../KeytipData';

// Internal only props interface to support mixing in responsive mode
export interface IDropdownInternalProps extends IDropdownProps, IWithResponsiveModeState {

}

export interface IDropdownState {
  isOpen?: boolean;
  selectedIndices?: number[];
}

@withResponsiveMode
export class Dropdown extends BaseComponent<IDropdownInternalProps, IDropdownState> {

  public static defaultProps = {
    options: [] as any[]
  };

  private static Option = 'option';

  private _host = createRef<HTMLDivElement>();
  private _focusZone = createRef<IFocusZone>();
  private _dropDown = createRef<HTMLDivElement>();
  private _id: string;
  private _isScrollIdle: boolean;
  private readonly _scrollIdleDelay: number = 250 /* ms */;
  private _scrollIdleTimeoutId: number | undefined;

  constructor(props: IDropdownProps) {
    super(props);
    props.options.forEach((option: any) => {
      if (!option.itemType) {
        option.itemType = DropdownMenuItemType.Normal;
      }
    });
    super(props);

    this._warnDeprecations({
      'isDisabled': 'disabled'
    });

    this._warnMutuallyExclusive({
      'defaultSelectedKey': 'selectedKey',
      'defaultSelectedKeys': 'selectedKeys',
      'selectedKeys': 'selectedKey',
      'multiSelect': 'defaultSelectedKey',
      'selectedKey': 'multiSelect'
    });

    this._id = props.id || getId('Dropdown');
    this._isScrollIdle = true;

    this.state = {
      isOpen: false
    };
    if (this.props.multiSelect) {
      const selectedKeys = props.defaultSelectedKeys !== undefined ? props.defaultSelectedKeys : props.selectedKeys;
      this.state = {
        selectedIndices: this._getSelectedIndexes(props.options, selectedKeys)
      };
    } else {
      const selectedKey = props.defaultSelectedKey !== undefined ? props.defaultSelectedKey : props.selectedKey;
      this.state = {
        selectedIndices: this._getSelectedIndexes(props.options, selectedKey!)
      };
    }

  }

  public componentWillReceiveProps(newProps: IDropdownProps): void {
    // In controlled component usage where selectedKey is provided, update the selectedIndex
    // state if the key or options change.
    const selectedKeyProp: keyof IDropdownProps = this.props.multiSelect ? 'selectedKeys' : 'selectedKey';
    if (newProps[selectedKeyProp] !== undefined &&
      (newProps[selectedKeyProp] !== this.props[selectedKeyProp] || newProps.options !== this.props.options)) {
      this.setState({
        selectedIndices: this._getSelectedIndexes(newProps.options, newProps[selectedKeyProp])
      });
    }
  }

  public componentDidUpdate(prevProps: IDropdownProps, prevState: IDropdownState) {
    if (prevState.isOpen === true && this.state.isOpen === false) {
      if (this._dropDown.current) {
        this._dropDown.current.focus();
      }

      if (this.props.onDismiss) {
        this.props.onDismiss();
      }
    }
  }

  // Primary Render
  public render(): JSX.Element {
    const id = this._id;
    let {
      disabled
    } = this.props;
    const {
      className,
      label,
      options,
      isDisabled,
      ariaLabel,
      required,
      errorMessage,
      keytipProps,
      onRenderTitle = this._onRenderTitle,
      onRenderContainer = this._onRenderContainer,
      onRenderPlaceHolder = this._onRenderPlaceHolder,
      onRenderCaretDown = this._onRenderCaretDown
    } = this.props;
    const { isOpen, selectedIndices = [] } = this.state;
    const selectedOptions = this._getAllSelectedOptions(options, selectedIndices);
    const divProps = getNativeProps(this.props, divProperties);

    // Remove this deprecation workaround at 1.0.0
    if (isDisabled !== undefined) {
      disabled = isDisabled;
    }
    const describedBy = id + '-option';

    return (
      <div className={ css('ms-Dropdown-container') }>
        { label && (
          <Label className={ css('ms-Dropdown-label') } id={ id + '-label' } htmlFor={ id } required={ required }>{ label }</Label>
        ) }
        <KeytipData keytipProps={ keytipProps } disabled={ disabled }>
          { (keytipAttributes: any): JSX.Element => (
            <div
              { ...keytipAttributes }
              data-is-focusable={ !disabled }
              ref={ this._dropDown }
              id={ id }
              tabIndex={ disabled ? -1 : 0 }
              aria-expanded={ isOpen ? 'true' : 'false' }
              role='listbox'
              aria-autocomplete='none'
              aria-live={ disabled || isOpen ? 'off' : 'assertive' }
              aria-label={ ariaLabel }
              aria-describedby={ describedBy + (keytipAttributes['aria-describedby'] || '') }
              aria-activedescendant={ isOpen && selectedIndices.length === 1 && selectedIndices[0] >= 0 ? (this._id + '-list' + selectedIndices[0]) : undefined }
              aria-disabled={ disabled }
              aria-owns={ isOpen ? id + '-list' : undefined }
              { ...divProps }
              className={ css(
                'ms-Dropdown',
                styles.root,
                className,
                isOpen! && 'is-open',
                disabled! && ('is-disabled ' + styles.rootIsDisabled),
                required! && 'is-required',
              ) }
              onBlur={ this._onDropdownBlur }
              onKeyDown={ this._onDropdownKeyDown }
              onKeyUp={ this._onDropdownKeyUp }
              onClick={ this._onDropdownClick }
            >
              <span
                id={ id + '-option' }
                className={ css(
                  'ms-Dropdown-title', styles.title,
                  !selectedOptions.length && 'ms-Dropdown-titleIsPlaceHolder',
                  !selectedOptions.length && styles.titleIsPlaceHolder,
                  (errorMessage && errorMessage.length > 0 ? styles.titleIsError : null))
                }
                aria-atomic={ true }
                role='listbox'
                aria-readonly='true'
              >
                { // If option is selected render title, otherwise render the placeholder text
                  selectedOptions.length ? (
                    onRenderTitle(selectedOptions, this._onRenderTitle)
                  ) :
                    onRenderPlaceHolder(this.props, this._onRenderPlaceHolder)
                }
              </span>
              <span className={ css('ms-Dropdown-caretDownWrapper', styles.caretDownWrapper) }>
                { onRenderCaretDown(this.props, this._onRenderCaretDown) }
              </span>
            </div>
          ) }
        </KeytipData>
        {
          isOpen && (
            onRenderContainer(this.props, this._onRenderContainer)
          )
        }
        {
          errorMessage &&
          <div
            className={ css(styles.errorMessage) }
          >
            { errorMessage }
          </div>
        }
      </div>
    );
  }

  public focus(shouldOpenOnFocus?: boolean): void {
    if (this._dropDown.current && this._dropDown.current.tabIndex !== -1) {
      this._dropDown.current.focus();

      if (shouldOpenOnFocus) {
        this.setState({
          isOpen: true
        });
      }
    }
  }

  public setSelectedIndex(index: number): void {
    const { onChanged, options, selectedKey, selectedKeys, multiSelect } = this.props;
    const { selectedIndices = [] } = this.state;
    const checked: boolean = selectedIndices ? selectedIndices.indexOf(index) > -1 : false;

    index = Math.max(0, Math.min(options.length - 1, index));

    if (!multiSelect && index === selectedIndices[0]) {
      return;
    } else if (!multiSelect && selectedKey === undefined) {
      // Set the selected option if this is an uncontrolled component
      this.setState({
        selectedIndices: [index]
      });
    } else if (multiSelect && selectedKeys === undefined) {
      const newIndexes = selectedIndices ? this._copyArray(selectedIndices) : [];
      if (checked) {
        const position = newIndexes.indexOf(index);
        if (position > -1) {
          // unchecked the current one
          newIndexes.splice(position, 1);
        }
      } else {
        // add the new selected index into the existing one
        newIndexes.push(index);
      }
      this.setState({
        selectedIndices: newIndexes
      });
    }

    if (onChanged) {
      // for single-select, option passed in will always be selected.
      // for multi-select, flip the checked value
      const changedOpt = multiSelect ? { ...options[index], selected: !checked } : options[index];
      onChanged(changedOpt, index);
    }
  }

  private _copyArray(array: any[]): any[] {
    const newArray = [];
    for (const element of array) {
      newArray.push(element);
    }
    return newArray;
  }

  /**
   * Finds the next valid Dropdown option and sets the selected index to it.
   * @param stepValue Value of how many items the function should traverse.  Should be -1 or 1.
   * @param index Index of where the search should start
   * @param selectedIndex The selectedIndex Dropdown's state
   * @returns The next valid dropdown option's index
   */
  private _moveIndex(stepValue: number, index: number, selectedIndex: number): number {
    const { options } = this.props;
    // Return selectedIndex if nothing has changed or options is empty
    if (selectedIndex === index || options.length === 0) {
      return selectedIndex;
    }

    // Set starting index to 0 if index is < 0
    if (index < 0) {
      index = 0;
    }
    // Set starting index to last option index if greater than options.length
    if (index >= options.length) {
      index = options.length - 1;
    }
    let stepCounter = 0;
    // If current index is a header or divider, or disabled, increment by step
    while (options[index].itemType === DropdownMenuItemType.Header ||
      options[index].itemType === DropdownMenuItemType.Divider ||
      options[index].disabled) {
      // If stepCounter exceeds length of options, then return selectedIndex (-1)
      if (stepCounter >= options.length) {
        return selectedIndex;
      }
      // If index + stepValue is out of bounds, wrap around
      if (index + stepValue < 0) {
        index = options.length;
      } else if (index + stepValue >= options.length) {
        index = -1;
      }

      index = index + stepValue;
      stepCounter++;
    }

    this.setSelectedIndex(index);
    return index;
  }

  // Render text in dropdown input
  private _onRenderTitle = (item: IDropdownOption[]): JSX.Element => {
    const { multiSelectDelimiter = ', ' } = this.props;

    const displayTxt = item.map(i => i.text).join(multiSelectDelimiter);
    return <span>{ displayTxt }</span>;
  }

  // Render placeHolder text in dropdown input
  private _onRenderPlaceHolder = (props: IDropdownProps): JSX.Element | null => {
    if (!props.placeHolder) {
      return null;
    }
    return <span>{ props.placeHolder }</span>;
  }

  // Render Callout or Panel container and pass in list
  private _onRenderContainer = (props: IDropdownProps): JSX.Element => {
    const {
      onRenderList = this._onRenderList,
      responsiveMode,
      calloutProps,
      panelProps,
      dropdownWidth
    } = this.props;

    const isSmall = responsiveMode! <= ResponsiveMode.medium;

    return (
      isSmall ?
        (
          <Panel
            className={ css('ms-Dropdown-panel', styles.panel, !!panelProps && panelProps.className) }
            isOpen={ true }
            isLightDismiss={ true }
            onDismissed={ this._onDismiss }
            hasCloseButton={ false }
            { ...panelProps }
          >
            { onRenderList(props, this._onRenderList) }
          </Panel>
        )
        :
        (
          <Callout
            isBeakVisible={ false }
            gapSpace={ 0 }
            doNotLayer={ false }
            directionalHintFixed={ true }
            directionalHint={ DirectionalHint.bottomLeftEdge }
            { ...calloutProps }
            className={ css('ms-Dropdown-callout', styles.callout, !!calloutProps && calloutProps.className) }
            target={ this._dropDown.current }
            onDismiss={ this._onDismiss }
            onScroll={ this._onScroll }
            onPositioned={ this._onPositioned }
            calloutWidth={ dropdownWidth || (this._dropDown.current ? this._dropDown.current.clientWidth : 0) }
          >
            { onRenderList(props, this._onRenderList) }
          </Callout>
        )
    );
  }

  // Render Caret Down Icon
  private _onRenderCaretDown = (props: IDropdownProps): JSX.Element => {
    return (
      <Icon className={ css('ms-Dropdown-caretDown', styles.caretDown) } iconName='ChevronDown' />
    );
  }

  // Render List of items
  private _onRenderList = (props: IDropdownProps): JSX.Element => {
    const {
      onRenderItem = this._onRenderItem
    } = this.props;

    const id = this._id;
    const { selectedIndices = [] } = this.state;

    return (
      <div
        className={ styles.listWrapper }
        onKeyDown={ this._onZoneKeyDown }
        ref={ this._host }
        tabIndex={ 0 }
      >
        <FocusZone
          ref={ this._focusZone }
          direction={ FocusZoneDirection.vertical }
          defaultActiveElement={ selectedIndices[0] !== undefined ? `#${id}-list${selectedIndices[0]}` : undefined }
          id={ id + '-list' }
          className={ css('ms-Dropdown-items', styles.items) }
          aria-labelledby={ id + '-label' }
          role='listbox'
        >
          { this.props.options.map((item: any, index: number) => onRenderItem({ ...item, index }, this._onRenderItem)) }
        </FocusZone>
      </div>
    );
  }

  // Render items
  private _onRenderItem = (item: IDropdownOption): JSX.Element | null => {
    switch (item.itemType) {
      case SelectableOptionMenuItemType.Divider:
        return this._renderSeparator(item);
      case SelectableOptionMenuItemType.Header:
        return this._renderHeader(item);
      default:
        return this._renderOption(item);
    }
  }

  // Render separator
  private _renderSeparator(item: IDropdownOption): JSX.Element | null {
    const { index, key } = item;
    if (index! > 0) {
      return (
        <div
          role='separator'
          key={ key }
          className={ css('ms-Dropdown-divider', styles.divider) }
        />
      );
    }
    return null;
  }

  private _renderHeader(item: IDropdownOption): JSX.Element {
    const { onRenderOption = this._onRenderOption } = this.props;
    const { key } = item;
    return (
      <div
        key={ key }
        className={ css('ms-Dropdown-header', styles.header) }
      >
        { onRenderOption(item, this._onRenderOption) }
      </div>);
  }

  // Render menu item
  private _renderOption = (item: IDropdownOption): JSX.Element => {
    const { onRenderOption = this._onRenderOption } = this.props;
    const { selectedIndices = [] } = this.state;
    const id = this._id;
    const isItemSelected = item.index !== undefined && selectedIndices ? selectedIndices.indexOf(item.index) > -1 : false;
    const checkboxStyles = getCheckboxStyles(getTheme());

    return (
      !this.props.multiSelect ?
        (
          <CommandButton
            id={ id + '-list' + item.index }
            ref={ Dropdown.Option + item.index }
            key={ item.key }
            data-index={ item.index }
            data-is-focusable={ !item.disabled }
            disabled={ item.disabled }
            className={ css(
              'ms-Dropdown-item', styles.item, {
                ['is-selected ' + styles.itemIsSelected]: isItemSelected,
                ['is-disabled ' + styles.itemIsDisabled]: item.disabled === true
              }
            ) }
            onClick={ this._onItemClick(item) }
            onMouseEnter={ this._onItemMouseEnter.bind(this, item) }
            onMouseLeave={ this._onMouseItemLeave.bind(this, item) }
            onMouseMove={ this._onItemMouseMove.bind(this, item) }
            role='option'
            aria-selected={ isItemSelected ? 'true' : 'false' }
            ariaLabel={ item.ariaLabel || item.text }
          >
            { onRenderOption(item, this._onRenderOption) }
          </CommandButton>
        ) : (
          <Checkbox
            id={ id + '-list' + item.index }
            ref={ Dropdown.Option + item.index }
            key={ item.key }
            data-index={ item.index }
            data-is-focusable={ !item.disabled }
            disabled={ item.disabled }
            onChange={ this._onItemClick(item) }
            inputProps={ {
              onMouseEnter: this._onItemMouseEnter.bind(this, item),
              onMouseLeave: this._onMouseItemLeave.bind(this, item),
              onMouseMove: this._onItemMouseMove.bind(this, item)
            } }
            label={ item.text }
            onRenderLabel={ this._onRenderLabel.bind(this, item) }
            className={ css(
              'ms-ColumnManagementPanel-checkbox',
              styles.dropdownCheckbox,
              'ms-Dropdown-item', styles.item, {
                ['is-selected ' + styles.itemIsSelected]: isItemSelected,
                ['is-disabled ' + styles.itemIsDisabled]: item.disabled
              }
            ) }
            role='option'
            aria-selected={ isItemSelected ? 'true' : 'false' }
            checked={ isItemSelected }
            // Hover is being handled by focus styles
            // so clear out the explicit hover styles
            styles={ {
              checkboxHovered: checkboxStyles.checkbox,
              checkboxCheckedHovered: checkboxStyles.checkboxChecked,
              textHovered: checkboxStyles.text
            } }
          />
        )
    );
  }

  // Render content of item (i.e. text/icon inside of button)
  private _onRenderOption = (item: IDropdownOption): JSX.Element => {
    return <span className={ css('ms-Dropdown-optionText', styles.optionText) }>{ item.text }</span>;
  }

  // Render custom label for drop down item
  private _onRenderLabel = (item: IDropdownOption): JSX.Element | null => {
    const { onRenderOption = this._onRenderOption } = this.props;
    return onRenderOption(item, this._onRenderOption);
  }

  private _onPositioned = (): void => {
    if (this._focusZone.current) {
      // Focusing an element can trigger a reflow. Making this wait until there is an animation
      // frame can improve perf significantly.
      this._async.requestAnimationFrame(() => this._focusZone.current!.focus());
    }
  }

  private _onItemClick = (item: IDropdownOption): () => void => {
    return (): void => {
      if (!item.disabled) {
        this.setSelectedIndex(item.index!);
        if (!this.props.multiSelect) {
          // only close the callout when it's in single-select mode
          this.setState({
            isOpen: false
          });
        }
      }
    };
  }

  /**
   * Scroll handler for the callout to make sure the mouse events
   * for updating focus are not interacting during scroll
   */
  private _onScroll = (): void => {
    if (!this._isScrollIdle && this._scrollIdleTimeoutId !== undefined) {
      this._async.clearTimeout(this._scrollIdleTimeoutId);
      this._scrollIdleTimeoutId = undefined;
    } else {
      this._isScrollIdle = false;
    }

    this._scrollIdleTimeoutId = this._async.setTimeout(() => { this._isScrollIdle = true; }, this._scrollIdleDelay);
  }

  private _onItemMouseEnter(item: any, ev: React.MouseEvent<HTMLElement>): void {
    if (!this._isScrollIdle) {
      return;
    }

    const targetElement = ev.currentTarget as HTMLElement;
    targetElement.focus();
  }

  private _onItemMouseMove(item: any, ev: React.MouseEvent<HTMLElement>): void {
    const targetElement = ev.currentTarget as HTMLElement;

    if (!this._isScrollIdle || document.activeElement === targetElement) {
      return;
    }

    targetElement.focus();
  }

  private _onMouseItemLeave = (item: any, ev: React.MouseEvent<HTMLElement>): void => {
    if (!this._isScrollIdle) {
      return;
    }

    /**
     * IE11 focus() method forces parents to scroll to top of element.
     * Edge and IE expose a setActive() function for focusable divs that
     * sets the page focus but does not scroll the parent element.
     */
    if (this._host.current) {
      if ((this._host.current as any).setActive) {
        (this._host.current as any).setActive();
      } else {
        this._host.current.focus();
      }
    }
  }

  private _onDismiss = (): void => {
    this.setState({ isOpen: false });

    if (this._dropDown.current) {
      this._dropDown.current.focus();
    }
  }

  // Get all selected indexes for multi-select mode
  private _getSelectedIndexes(
    options: IDropdownOption[],
    selectedKey: string | number | string[] | number[] | undefined
  ): number[] {
    if (selectedKey === undefined) {
      if (this.props.multiSelect) {
        return this._getAllSelectedIndices(options);
      }
      const selectedIndex = this._getSelectedIndex(options, null);
      return selectedIndex !== -1 ? [selectedIndex] : [];
    } else if (!Array.isArray(selectedKey)) {
      return [this._getSelectedIndex(options, selectedKey)];
    }

    const selectedIndices: number[] = [];
    for (const key of selectedKey) {
      selectedIndices.push(this._getSelectedIndex(options, key));
    }
    return selectedIndices;
  }

  // Get all selected options for multi-select mode
  private _getAllSelectedOptions(options: IDropdownOption[], selectedIndices: number[]): IDropdownOption[] {
    const selectedOptions: IDropdownOption[] = [];
    for (const index of selectedIndices) {
      const option = options[index];

      if (option) {
        selectedOptions.push(option);
      }
    }

    return selectedOptions;
  }

  private _getAllSelectedIndices(options: IDropdownOption[]): number[] {
    return options
      .map((option: IDropdownOption, index: number) => option.selected ? index : -1)
      .filter(index => index !== -1);

  }

  private _getSelectedIndex(options: IDropdownOption[], selectedKey: string | number | null): number {
    return findIndex(options, (option => {
      // tslint:disable-next-line:triple-equals
      if (selectedKey != null) {
        return option.key === selectedKey;
      } else {
        return !!option.isSelected || !!option.selected;
      }
    }));
  }

  private _onDropdownBlur = (ev: React.FocusEvent<HTMLDivElement>): void => {
    if (this.state.isOpen) {
      // Do not onBlur when the callout is opened
      return;
    }
    if (this.props.onBlur) {
      this.props.onBlur(ev);
    }
  }

  private _onDropdownKeyDown = (ev: React.KeyboardEvent<HTMLDivElement>): void => {
    if (this.props.onKeyDown) {
      this.props.onKeyDown(ev);
      if (ev.defaultPrevented) {
        return;
      }
    }
    let newIndex: number | undefined;
    const selectedIndex = this.state.selectedIndices!.length ? this.state.selectedIndices![0] : -1;

    switch (ev.which) {
      case KeyCodes.enter:
        this.setState({
          isOpen: !this.state.isOpen
        });
        break;

      case KeyCodes.escape:
        if (!this.state.isOpen) {
          return;
        }

        this.setState({
          isOpen: false
        });
        break;

      case KeyCodes.up:
        if (this.props.multiSelect) {
          this.setState({ isOpen: true });
        } else {
          newIndex = this._moveIndex(-1, selectedIndex - 1, selectedIndex);
        }
        break;

      case KeyCodes.down:
        if (ev.altKey || ev.metaKey || this.props.multiSelect) {
          this.setState({ isOpen: true });
        } else {
          newIndex = this._moveIndex(1, selectedIndex + 1, selectedIndex);
        }
        break;

      case KeyCodes.home:
        if (!this.props.multiSelect) {
          newIndex = this._moveIndex(1, 0, selectedIndex);
        }
        break;

      case KeyCodes.end:
        if (!this.props.multiSelect) {
          newIndex = this._moveIndex(-1, this.props.options.length - 1, selectedIndex);
        }
        break;

      case KeyCodes.space:
        // event handled in _onDropdownKeyUp
        break;

      default:
        if (ev.altKey || ev.metaKey) {
          this.setState({
            isOpen: false
          });
          ev.stopPropagation();
          ev.preventDefault();
        }
        return;
    }

    if (newIndex !== selectedIndex) {
      ev.stopPropagation();
      ev.preventDefault();
    }
  }

  private _onDropdownKeyUp = (ev: React.KeyboardEvent<HTMLDivElement>): void => {
    if (this.props.onKeyUp) {
      this.props.onKeyUp(ev);
      if (ev.preventDefault) {
        return;
      }
    }
    switch (ev.which) {
      case KeyCodes.space:
        this.setState({
          isOpen: !this.state.isOpen
        });
        break;

      default:
        return;
    }

    ev.stopPropagation();
    ev.preventDefault();
  }

  private _onZoneKeyDown = (ev: React.KeyboardEvent<HTMLElement>): void => {
    let elementToFocus;

    switch (ev.which) {

      case KeyCodes.up:
        if (ev.altKey || ev.metaKey) {
          this.setState({ isOpen: false });
        } else {
          if (this._host.current) {
            elementToFocus = getLastFocusable(this._host.current, (this._host.current.lastChild as HTMLElement), true);
          }
        }
        break;

      // All directional keystrokes should be canceled when the zone is rendered.
      // This avoids the body scroll from reacting and thus dismissing the dropdown.
      case KeyCodes.home:
      case KeyCodes.end:
      case KeyCodes.pageUp:
      case KeyCodes.pageDown:
        break;

      case KeyCodes.down:
        if (this._host.current) {
          elementToFocus = getFirstFocusable(this._host.current, (this._host.current.firstChild as HTMLElement), true);
        }
        break;

      case KeyCodes.escape:
        this.setState({ isOpen: false });
        break;

      case KeyCodes.tab:
        this.setState({ isOpen: false });
        return;

      default:
        if (ev.altKey || ev.metaKey) {
          this.setState({
            isOpen: false
          });
          break;
        }
        return;
    }

    if (elementToFocus) {
      elementToFocus.focus();
    }

    ev.stopPropagation();
    ev.preventDefault();
  }

  private _onDropdownClick = (ev: React.MouseEvent<HTMLDivElement>): void => {
    if (this.props.onClick) {
      this.props.onClick(ev);
      if (ev.preventDefault) {
        return;
      }
    }
    let { disabled } = this.props;
    const { isDisabled } = this.props;
    const { isOpen } = this.state;

    // Remove this deprecation workaround at 1.0.0
    if (isDisabled !== undefined) {
      disabled = isDisabled;
    }

    if (!disabled) {
      this.setState({
        isOpen: !isOpen
      });
    }
  }
}

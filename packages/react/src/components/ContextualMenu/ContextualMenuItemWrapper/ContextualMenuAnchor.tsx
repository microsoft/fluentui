import * as React from 'react';
import {
  anchorProperties,
  getNativeProps,
  memoizeFunction,
  getId,
  mergeAriaAttributeValues,
  IComponentAs,
  composeComponentAs,
} from '../../../Utilities';
import { ContextualMenuItemWrapper } from './ContextualMenuItemWrapper';
import { KeytipData } from '../../../KeytipData';
import { isItemDisabled, hasSubmenu } from '../../../utilities/contextualMenu/index';
import { ContextualMenuItem } from '../ContextualMenuItem';
import type { IKeytipDataProps } from '../../../KeytipData';
import type { IKeytipProps } from '../../../Keytip';
import { IContextualMenuItemProps } from '../ContextualMenuItem.types';

export class ContextualMenuAnchor extends ContextualMenuItemWrapper {
  private _anchor = React.createRef<HTMLAnchorElement>();
  private _ariaDescriptionId: string;

  private _getMemoizedMenuButtonKeytipProps = memoizeFunction((keytipProps: IKeytipProps) => {
    return {
      ...keytipProps,
      hasMenu: true,
    };
  });

  public render() {
    const {
      item,
      classNames,
      index,
      focusableElementIndex,
      totalItemCount,
      hasCheckmarks,
      hasIcons,
      expandedMenuItemKey,
      onItemClick,
      openSubMenu,
      dismissSubMenu,
      dismissMenu,
    } = this.props;

    let ChildrenRenderer: IComponentAs<IContextualMenuItemProps> = ContextualMenuItem;

    if (this.props.item.contextualMenuItemAs) {
      ChildrenRenderer = composeComponentAs(this.props.item.contextualMenuItemAs, ChildrenRenderer);
    }

    if (this.props.contextualMenuItemAs) {
      ChildrenRenderer = composeComponentAs(this.props.contextualMenuItemAs, ChildrenRenderer);
    }

    let anchorRel = item.rel;
    if (item.target && item.target.toLowerCase() === '_blank') {
      anchorRel = anchorRel ? anchorRel : 'nofollow noopener noreferrer'; // Safe default to prevent tabjacking
    }

    const itemHasSubmenu = hasSubmenu(item);
    const nativeProps = getNativeProps<React.HTMLAttributes<HTMLAnchorElement>>(item, anchorProperties);
    const disabled = isItemDisabled(item);
    const { itemProps, ariaDescription } = item;

    let { keytipProps } = item;
    if (keytipProps && itemHasSubmenu) {
      keytipProps = this._getMemoizedMenuButtonKeytipProps(keytipProps);
    }

    // Check for ariaDescription to set the _ariaDescriptionId and render a hidden span with
    // the description in it to be added to ariaDescribedBy
    if (ariaDescription) {
      this._ariaDescriptionId = getId();
    }
    const ariaDescribedByIds = mergeAriaAttributeValues(
      item.ariaDescribedBy,
      ariaDescription ? this._ariaDescriptionId : undefined,
      nativeProps['aria-describedby'],
    );

    const additionalItemProperties = {
      'aria-describedby': ariaDescribedByIds,
    };

    return (
      <div>
        <KeytipData keytipProps={item.keytipProps} ariaDescribedBy={ariaDescribedByIds} disabled={disabled}>
          {(keytipAttributes: IKeytipDataProps): JSX.Element => (
            <a
              {...additionalItemProperties}
              {...nativeProps}
              {...keytipAttributes}
              ref={this._anchor}
              href={item.href}
              target={item.target}
              rel={anchorRel}
              className={classNames.root}
              role="menuitem"
              aria-haspopup={itemHasSubmenu || undefined}
              aria-expanded={itemHasSubmenu ? item.key === expandedMenuItemKey : undefined}
              aria-posinset={focusableElementIndex + 1}
              aria-setsize={totalItemCount}
              aria-disabled={isItemDisabled(item)}
              // eslint-disable-next-line deprecation/deprecation
              style={item.style}
              onClick={this._onItemClick}
              onMouseEnter={this._onItemMouseEnter}
              onMouseLeave={this._onItemMouseLeave}
              onMouseMove={this._onItemMouseMove}
              onKeyDown={itemHasSubmenu ? this._onItemKeyDown : undefined}
            >
              <ChildrenRenderer
                componentRef={item.componentRef}
                item={item}
                classNames={classNames}
                index={index}
                onCheckmarkClick={hasCheckmarks && onItemClick ? onItemClick : undefined}
                hasIcons={hasIcons}
                openSubMenu={openSubMenu}
                dismissSubMenu={dismissSubMenu}
                dismissMenu={dismissMenu}
                getSubmenuTarget={this._getSubmenuTarget}
                {...itemProps}
              />
              {this._renderAriaDescription(ariaDescription, classNames.screenReaderText)}
            </a>
          )}
        </KeytipData>
      </div>
    );
  }

  protected _getSubmenuTarget = (): HTMLElement | undefined => {
    return this._anchor.current ? this._anchor.current : undefined;
  };

  protected _onItemClick = (ev: React.MouseEvent<HTMLElement>): void => {
    const { item, onItemClick } = this.props;
    if (onItemClick) {
      onItemClick(item, ev);
    }
  };

  protected _renderAriaDescription = (ariaDescription?: string, className?: string) => {
    // If ariaDescription is given, descriptionId will be assigned to ariaDescriptionSpan
    return ariaDescription ? (
      <span id={this._ariaDescriptionId} className={className}>
        {ariaDescription}
      </span>
    ) : null;
  };
}

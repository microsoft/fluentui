import * as React from 'react';
import {
  BaseComponent,
  autobind,
  customizable,
  getRTL
} from '../../Utilities';
import { FocusZone, FocusZoneDirection } from '../../FocusZone';
import { Link } from '../../Link';
import { Icon } from '../../Icon';
import { CommandButton } from '../../Button';
import { IBreadcrumbProps, IBreadcrumbItem, IBreadcrumbClassNames } from './Breadcrumb.Props';
import { DirectionalHint } from '../../common/DirectionalHint';
import { ResizeGroup } from '../../ResizeGroup';
import { TooltipHost, TooltipOverflowMode } from '../../Tooltip';
import { Crumb } from './Crumb';
import { getClassNames as _getClassNames } from './Breadcrumb.classNames';
// import * as stylesImport from './Breadcrumb.scss';
// const styles: any = stylesImport;

export interface IBreadCrumbData {
  props: IBreadcrumbProps;
  renderedItems: IBreadcrumbItem[];
  renderedOverflowItems: IBreadcrumbItem[];
}

const OVERFLOW_KEY = 'overflow';
const nullFunction = (): null => null;

@customizable('Breadcrumb', ['theme'])
export class Breadcrumb extends BaseComponent<IBreadcrumbProps, any> {
  public static defaultProps: IBreadcrumbProps = {
    items: [],
    maxDisplayedItems: 999
  };

  private _classNames: IBreadcrumbClassNames;
  constructor(props: IBreadcrumbProps) {
    super(props);
  }

  public render() {
    const {
      onReduceData = this._onReduceData,
      getClassNames = _getClassNames,
      maxDisplayedItems,
      className,
      theme,
      items
    } = this.props;

    const breadCrumbData: IBreadCrumbData = {
      props: this.props,
      renderedItems: items.slice(-maxDisplayedItems!),
      renderedOverflowItems: items.slice(0, -maxDisplayedItems!)
    };

    this._classNames = getClassNames(theme!, className);

    return (
      <ResizeGroup
        className={ this._classNames.root }
        onRenderData={ this._onRenderBreadcrumb }
        onReduceData={ onReduceData }
        data={ breadCrumbData }
      />
    );
  }

  @autobind
  private _onReduceData(data: IBreadCrumbData): IBreadCrumbData | undefined {
    let { renderedItems, renderedOverflowItems } = data;
    let movedItem = renderedItems[0];
    renderedItems = renderedItems.slice(1);

    renderedOverflowItems = [...renderedOverflowItems, movedItem];

    if (movedItem !== undefined) {
      return { ...data, renderedItems, renderedOverflowItems };
    }
  }

  @autobind
  private _onRenderBreadcrumb(data: IBreadCrumbData) {
    let {
      ariaLabel
      // onRenderItem = this._onRenderItem
    } = data.props;
    let classNames = this._classNames;
    let { renderedOverflowItems, renderedItems } = data;

    let contextualItems = renderedOverflowItems.map(
      (item, index) => ({
        name: item.text,
        key: item.key,
        // onClick: item.onClick ? this._onBreadcrumbClicked.bind(this, item) : null,
        href: item.href
      })
    );

    return (
      <FocusZone
        className={ classNames.root }
        direction={ FocusZoneDirection.horizontal }
        elementType='ol'
        ref='renderingArea'
        role='navigation'
        aria-label={ ariaLabel }
      >
        { renderedOverflowItems && renderedOverflowItems.length !== 0 && (
          <Crumb
            key='overflow'
            iconProps={ { iconName: 'More' } }
            classNames={ this._classNames }
            menuProps={ {
              items: contextualItems,
              directionalHint: DirectionalHint.bottomLeftEdge
            } }
            withChevron={ renderedItems.length > 0 }
          />
        ) }
        { renderedItems.map(
          (item, index) => (
            <Crumb
              key={ item.key }
              item={ item }
              classNames={ this._classNames }
              withChevron={ index !== (renderedItems.length - 1) }
            />
          )) }
      </FocusZone>
    );
  }
}

import * as React from 'react';
import {
  BaseComponent,
  autobind,
  customizable,
  getRTL
} from '../../Utilities';
import { IFocusZone, FocusZone, FocusZoneDirection } from '../../FocusZone';
import {
  IBreadcrumb,
  IBreadcrumbProps,
  IBreadcrumbItem,
  IBreadcrumbStyles,
  IBreadcrumbStyleProps
} from './Breadcrumb.props';
import { DirectionalHint } from '../../common/DirectionalHint';
import { ResizeGroup } from '../../ResizeGroup';
import { TooltipHost, TooltipOverflowMode } from '../../Tooltip';
import { CrumbBase } from './Crumb.base';
import {
  classNamesFunction
} from '../../Styling';

export interface IBreadCrumbData {
  props: IBreadcrumbProps;
  renderedItems: IBreadcrumbItem[];
  renderedOverflowItems: IBreadcrumbItem[];
}

const OVERFLOW_KEY = 'overflow';
const nullFunction = (): null => null;
const getClassNames = classNamesFunction<IBreadcrumbStyleProps, IBreadcrumbStyles>();

@customizable('Breadcrumb', ['theme'])
export class BreadcrumbBase extends BaseComponent<IBreadcrumbProps, any> implements IBreadcrumb {
  public static defaultProps: IBreadcrumbProps = {
    items: [],
    maxDisplayedItems: 999
  };

  private _classNames: {[key in keyof IBreadcrumbStyles]: string };
  private _focusZone: IFocusZone;

  constructor(props: IBreadcrumbProps) {
    super(props);
  }

  public render() {
    const {
      onReduceData = this._onReduceData,
      maxDisplayedItems,
      className,
      theme,
      items,
      onRenderItem = this._onRenderItem,
      getStyles
    } = this.props;

    const breadCrumbData: IBreadCrumbData = {
      props: this.props,
      renderedItems: items.slice(-maxDisplayedItems!),
      renderedOverflowItems: items.slice(0, -maxDisplayedItems!)
    };

    this._classNames = getClassNames(getStyles!, { theme: theme!, className });

    return (
      <ResizeGroup
        className={ this._classNames.root }
        onRenderData={ onRenderItem as any }
        onReduceData={ onReduceData }
        data={ breadCrumbData }
      />
    );
  }

  public focus(): void {
    if (this._focusZone) {
      this._focusZone.focus();
    }
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
  private _onRenderItem(data: IBreadCrumbData): JSX.Element {
    let {
      ariaLabel
        } = data.props;
    let classNames = this._classNames;
    let { renderedOverflowItems, renderedItems } = data;

    let contextualItems = renderedOverflowItems.map(
      (item, index) => ({
        name: item.text,
        key: item.key,
        onClick: item.onClick && ((ev: React.MouseEvent<any>) => item.onClick!(ev, item)),
        href: item.href
      })
    );

    return (
      <FocusZone
        className={ classNames.root }
        direction={ FocusZoneDirection.horizontal }
        elementType='ol'
        componentRef={ this._resolveRef('_focusZone') }
        role='navigation'
        aria-label={ ariaLabel }
      >
        { renderedOverflowItems && renderedOverflowItems.length !== 0 && (
          < CrumbBase
            key='overflow'
            iconProps={ { iconName: 'More' } }
            menuProps={ {
              items: contextualItems,
              directionalHint: DirectionalHint.bottomLeftEdge
            } }
            withChevron={ renderedItems.length > 0 }
          />
        ) }
        { renderedItems.map(
          (item, index) => (
            <CrumbBase
              key={ item.key }
              item={ item }
              withChevron={ index !== (renderedItems.length - 1) }
            />
          )) }
      </FocusZone>
    );
  }
}

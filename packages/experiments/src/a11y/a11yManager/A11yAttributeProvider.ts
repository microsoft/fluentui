import A11yAttribute, { A11yAttributeType } from './A11yAttribute';

export interface INavigateOnKeyAttribute {
  keyCode: number;
  target: string;
  alt?: boolean;
  ctrl?: boolean;
  shift?: boolean;
}

/**
 * This class is a wrapper around HTML Element that makes it easy to access A11y attributes used by A11yManager. A11y attributes
 * are data attributes that declare behaviors for A11yManager.
 */
export default class A11yAttributeProvider {
  private _element: HTMLElement;
  private _managerPrefix: string;

  constructor(element: HTMLElement, managerPrefix: string) {
    this._element = element;
    this._managerPrefix = managerPrefix;
  }

  public get id(): string | undefined {
    const attr: A11yAttribute = A11yAttribute.getFromElementByType(this._managerPrefix, this._element, A11yAttributeType.Id)[0];
    return attr ? attr.value : undefined;
  }

  public get classList(): string[] {
    const attrs: A11yAttribute[] = A11yAttribute.getFromElementByType(this._managerPrefix, this._element, A11yAttributeType.Class);
    return attrs.map((a: A11yAttribute) => a.value!).filter((s: string) => !!s);
  }

  public get skipKeys(): number[] | 'all' {
    const attr: A11yAttribute = A11yAttribute.getFromElementByType(this._managerPrefix, this._element, A11yAttributeType.SkipKeys)[0];
    if (attr && attr.value) {
      return attr.value === 'all' ? 'all' :
        attr.value.split(',').map((keyCodeStr: string) => parseInt(keyCodeStr, 10));
    } else {
      return [];
    }
  }

  public get stopKeys(): number[] | 'all' {
    const attr: A11yAttribute = A11yAttribute.getFromElementByType(this._managerPrefix, this._element, A11yAttributeType.StopKeys)[0];
    if (attr && attr.value) {
      return attr.value === 'all' ? 'all' :
        attr.value.split(',').map((keyCodeStr: string) => parseInt(keyCodeStr, 10));
    } else {
      return [];
    }
  }

  public get navigateOnKeyList(): INavigateOnKeyAttribute[] {
    const attrs: A11yAttribute[] = A11yAttribute.getFromElementByType(this._managerPrefix, this._element, A11yAttributeType.NavigateOnKey);
    return attrs.map((navAttr: A11yAttribute) => {
      return {
        keyCode: parseInt(navAttr.params[0], 10),
        target: navAttr.value ? navAttr.value.trim() : '',
        alt: navAttr.params.indexOf('a') > 0,
        ctrl: navAttr.params.indexOf('c') > 0,
        shift: navAttr.params.indexOf('s') > 0
      };
    });
  }

  public get navigationMode(): string | undefined {
    const attr: A11yAttribute = A11yAttribute.getFromElementByType(this._managerPrefix, this._element, A11yAttributeType.NavigationMode)[0];
    return attr ? attr.value : undefined;
  }
}

export type Alignment = 'start' | 'end';
export type Side = 'top' | 'right' | 'bottom' | 'left';
export type AlignedPlacement = `${Side}-${Alignment}`;
export type Placement = Side | AlignedPlacement;
export type Strategy = 'absolute' | 'fixed';
export type Axis = 'x' | 'y';
export type Coords = { [key in Axis]: number };
export type Length = 'width' | 'height';
export type Dimensions = { [key in Length]: number };
export type SideObject = { [key in Side]: number };
export type Rect = Coords & Dimensions;
export type Padding = number | Partial<SideObject>;
export type ClientRectObject = Rect & SideObject;

export interface ElementRects {
  reference: Rect;
  floating: Rect;
}

export interface VirtualElement {
  getBoundingClientRect(): ClientRectObject;
  contextElement?: Element;
}

export type ReferenceElement = Element | VirtualElement;

export interface Elements {
  reference: ReferenceElement;
  floating: HTMLElement;
}

/**
 * `clippingAncestors` resolves to all the scrollable/clipping ancestors of the evaluated element.
 */
export type Boundary = 'clippingAncestors' | Element | Element[] | Rect;

export type ElementContext = 'reference' | 'floating';

export interface MiddlewareData {
  // Custom middleware store arbitrary data under their own name
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
  arrow?: Partial<Coords> & {
    centerOffset: number;
    alignmentOffset?: number;
  };
  flip?: {
    index?: number;
    overflows: Array<{ placement: Placement; overflows: number[] }>;
  };
  hide?: {
    referenceHidden?: boolean;
    escaped?: boolean;
    referenceHiddenOffsets?: SideObject;
    escapedOffsets?: SideObject;
  };
  offset?: Coords & { placement: Placement };
  shift?: Coords & { enabled: { [key in Axis]: boolean } };
}

export interface MiddlewareState extends Coords {
  initialPlacement: Placement;
  placement: Placement;
  strategy: Strategy;
  middlewareData: MiddlewareData;
  elements: Elements;
  rects: ElementRects;
  rtl: boolean;
  /**
   * Clipping ancestors of an element, shared between `detectOverflow` calls of a single `computePosition` run.
   */
  clippingCache: Map<ReferenceElement, Element[]>;
}

export interface MiddlewareReturn extends Partial<Coords> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data?: { [key: string]: any };
  reset?:
    | boolean
    | {
        placement?: Placement;
        rects?: boolean | ElementRects;
      };
}

export type Middleware = {
  name: string;
  fn: (state: MiddlewareState) => MiddlewareReturn;
};

export interface ComputePositionConfig {
  placement?: Placement;
  strategy?: Strategy;
  middleware?: Array<Middleware | null | undefined | false>;
}

export interface ComputePositionReturn extends Coords {
  placement: Placement;
  strategy: Strategy;
  middlewareData: MiddlewareData;
}

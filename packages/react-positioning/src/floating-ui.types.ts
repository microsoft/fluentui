/**
 * These types are directly copied from floating-ui and modified to support our TS minbar.
 */
/* eslint-disable @typescript-eslint/no-explicit-any */

export declare type Alignment = 'start' | 'end';
export declare type Side = 'top' | 'right' | 'bottom' | 'left';
export declare type AlignedPlacement =
  | 'top-start'
  | 'top-end'
  | 'right-start'
  | 'right-end'
  | 'bottom-start'
  | 'bottom-end'
  | 'left-start'
  | 'left-end';
export declare type Placement = Side | AlignedPlacement;
export declare type Strategy = 'absolute' | 'fixed';
export declare type Axis = 'x' | 'y';
export declare type Length = 'width' | 'height';
declare type Promisable<T> = T | Promise<T>;
/**
 * Platform interface methods to work with the current platform.
 * @see https://floating-ui.com/docs/platform
 */
export interface Platform {
  getElementRects: (args: {
    reference: ReferenceElement;
    floating: FloatingElement;
    strategy: Strategy;
  }) => Promisable<ElementRects>;
  getClippingRect: (args: { element: any; boundary: Boundary; rootBoundary: RootBoundary }) => Promisable<Rect>;
  getDimensions: (element: any) => Promisable<Dimensions>;
  convertOffsetParentRelativeRectToViewportRelativeRect?: (args: {
    rect: Rect;
    offsetParent: any;
    strategy: Strategy;
  }) => Promisable<Rect>;
  getOffsetParent?: (element: any) => Promisable<any>;
  isElement?: (value: any) => Promisable<boolean>;
  getDocumentElement?: (element: any) => Promisable<any>;
  getClientRects?: (element: any) => Promisable<Array<ClientRectObject>>;
  isRTL?: (element: any) => Promisable<boolean>;
}
export declare type Coords = {
  [key in Axis]: number;
};
export declare type SideObject = {
  [key in Side]: number;
};
export interface MiddlewareData {
  [key: string]: any;
  arrow?: Partial<Coords> & {
    centerOffset: number;
  };
  autoPlacement?: {
    index?: number;
    overflows: Array<{
      placement: Placement;
      overflows: Array<number>;
    }>;
  };
  flip?: {
    index?: number;
    overflows: Array<{
      placement: Placement;
      overflows: Array<number>;
    }>;
  };
  hide?: {
    referenceHidden?: boolean;
    escaped?: boolean;
    referenceHiddenOffsets?: SideObject;
    escapedOffsets?: SideObject;
  };
  offset?: Coords;
  shift?: Coords;
}
export interface ComputePositionConfig {
  platform: Platform;
  placement?: Placement;
  strategy?: Strategy;
  middleware?: Array<Middleware>;
}
export interface ComputePositionReturn extends Coords {
  placement: Placement;
  strategy: Strategy;
  middlewareData: MiddlewareData;
}
export declare type ComputePosition = (
  reference: unknown,
  floating: unknown,
  config: ComputePositionConfig,
) => Promise<ComputePositionReturn>;
export interface MiddlewareReturn extends Partial<Coords> {
  data?: {
    [key: string]: any;
  };
  reset?:
    | true
    | {
        placement?: Placement;
        rects?: true | ElementRects;
      };
}
export declare type Middleware = {
  name: string;
  options?: any;
  fn: (middlewareArguments: MiddlewareArguments) => Promisable<MiddlewareReturn>;
};
export declare type Dimensions = {
  [key in Length]: number;
};
export declare type Rect = Coords & Dimensions;
export interface ElementRects {
  reference: Rect;
  floating: Rect;
}
/**
 * Custom positioning reference element.
 * @see https://floating-ui.com/docs/virtual-elements
 */
export declare type VirtualElement = {
  getBoundingClientRect(): ClientRectObject;
  contextElement?: any;
};
export declare type ReferenceElement = any;
export declare type FloatingElement = any;
export interface Elements {
  reference: ReferenceElement;
  floating: FloatingElement;
}
export interface MiddlewareArguments extends Coords {
  initialPlacement: Placement;
  placement: Placement;
  strategy: Strategy;
  middlewareData: MiddlewareData;
  elements: Elements;
  rects: ElementRects;
  platform: Platform;
}
export declare type ClientRectObject = Rect & SideObject;
export declare type Padding = number | SideObject;
export declare type Boundary = any;
export declare type RootBoundary = 'viewport' | 'document';
export declare type ElementContext = 'reference' | 'floating';

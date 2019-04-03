// Type definitions for react-transition-group 2.0
// Project: https://github.com/reactjs/react-transition-group
// Definitions by: Karol Janyst <https://github.com/LKay>
//                 Epskampie <https://github.com/Epskampie>
//                 Masafumi Koba <https://github.com/ybiquitous>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped
// TypeScript Version: 2.8

declare module 'react-transition-group' {
  import { Component, ReactType, HTMLProps, ReactElement } from 'react';

  /* Transition.d.ts */
  export type EndHandler = (node: HTMLElement, done: () => void) => void;
  export type EnterHandler = (node: HTMLElement, isAppearing: boolean) => void;
  export type ExitHandler = (node: HTMLElement) => void;

  export const UNMOUNTED = 'unmounted';
  export const EXITED = 'exited';
  export const ENTERING = 'entering';
  export const ENTERED = 'entered';
  export const EXITING = 'exiting';

  export interface ITransitionActions {
      appear?: boolean;
      enter?: boolean;
      exit?: boolean;
  }

  export type TransitionStatus =
  'entering'|
  'entered'|
  'exiting'|
  'exited';
  export type TransitionChildren = React.ReactNode | ((status: TransitionStatus) => React.ReactNode);
  export interface ITransitionProps extends ITransitionActions {
      in?: boolean;
      mountOnEnter?: boolean;
      unmountOnExit?: boolean;
      timeout: number | { enter?: number, exit?: number };
      addEndListener?: EndHandler;
      onEnter?: EnterHandler;
      onEntering?: EnterHandler;
      onEntered?: EnterHandler;
      onExit?: ExitHandler;
      onExiting?: ExitHandler;
      onExited?: ExitHandler;
      // tslint:disable:no-any
      [prop: string]: any;
      children?: TransitionChildren;
  }

  /**
   * The Transition component lets you describe a transition from one component
   * state to another _over time_ with a simple declarative API. Most commonly
   * It's used to animate the mounting and unmounting of Component, but can also
   * be used to describe in-place transition states as well.
   *
   * By default the `Transition` component does not alter the behavior of the
   * component it renders, it only tracks "enter" and "exit" states for the components.
   * It's up to you to give meaning and effect to those states.
   */
  class Transition extends Component<ITransitionProps> {}

  /* CSSTransition.d.ts */

  namespace CSSTransition {
    interface ICSSTransitionClassNames {
        appear?: string;
        appearActive?: string;
        enter?: string;
        enterActive?: string;
        enterDone?: string;
        exit?: string;
        exitActive?: string;
        exitDone?: string;
    }

    /**
     * The animation classNames applied to the component as it enters or exits.
     * A single name can be provided and it will be suffixed for each stage: e.g.
     *
     * `classNames="fade"` applies `fade-enter`, `fade-enter-active`,
     * `fade-exit`, `fade-exit-active`, `fade-appear`, and `fade-appear-active`.
     * Each individual classNames can also be specified independently like:
     *
     * ```js
     * classNames={{
     *  appear: 'my-appear',
     *  appearActive: 'my-active-appear',
     *  enter: 'my-enter',
     *  enterActive: 'my-active-enter',
     *  exit: 'my-exit',
     *  exitActive: 'my-active-exit',
     * }}
     * ```
     */
    interface ICSSTransitionProps extends ITransitionProps {
        classNames: string | ICSSTransitionClassNames;
    }
  }

  class CSSTransition extends Component<CSSTransition.ICSSTransitionProps> {}

  /* TransitionGroup.d.ts */
  namespace TransitionGroup {
    interface IntrinsicTransitionGroupProps<T extends keyof JSX.IntrinsicElements = 'div'> extends ITransitionActions {
        component?: T|null;
    }

    interface IComponentTransitionGroupProps<T extends ReactType> extends ITransitionActions {
        component: T;
    }

    // tslint:disable:no-any
    type TransitionGroupProps<T extends keyof JSX.IntrinsicElements = 'div', V extends ReactType = any> =
        (IntrinsicTransitionGroupProps<T> & JSX.IntrinsicElements[T]) | (IComponentTransitionGroupProps<V>) & {
        children?: ReactElement<ITransitionProps> | Array<ReactElement<ITransitionProps>>;
        // tslint:disable:no-any
        childFactory?(child: any): any;
        // tslint:disable:no-any
        [prop: string]: any;
    };
  }

  /**
  * The `<TransitionGroup>` component manages a set of `<Transition>` components
  * in a list. Like with the `<Transition>` component, `<TransitionGroup>`, is a
  * state machine for managing the mounting and unmounting of components over
  * time.
  */
  class TransitionGroup extends Component<TransitionGroup.TransitionGroupProps> {}

}
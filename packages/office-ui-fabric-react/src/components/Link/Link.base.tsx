import * as React from 'react';
import {
  BaseComponent,
  classNamesFunction,
  customizable,
  createRef
} from '../../Utilities';
import {
  ILink,
  ILinkProps,
  ILinkStyleProps,
  ILinkStyles,
} from './Link.types';

const getClassNames = classNamesFunction<ILinkStyleProps, ILinkStyles>();

@customizable('Link', ['theme', 'getStyles'])
export class LinkBase extends BaseComponent<ILinkProps, any> implements ILink {
  private _link = createRef<HTMLAnchorElement | HTMLButtonElement | null>();

  public render(): JSX.Element {
    const {
      disabled,
      children,
      className,
      href,
      theme,
      getStyles,
    } = this.props;

    const classNames = getClassNames(getStyles!, {
      className,
      isButton: !href,
      isDisabled: disabled,
      theme: theme!
    });

    const RootType = this._getRootType(this.props);

    return (
      <RootType
        { ...this._removeInvalidPropsForRootType(RootType, this.props) }
        className={ classNames.root }
        onClick={ this._onClick }
        ref={ this._link }
        aria-disabled={ disabled }
      >
        { children }
      </RootType>
    );
  }

  public focus() {
    if (this._link.current) {
      this._link.current.focus();
    }
  }

  private _onClick = (ev: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>) => {
    const { onClick, disabled } = this.props;

    if (disabled) {
      ev.preventDefault();
    } else if (onClick) {
      onClick(ev);
    }
  }

  private _removeInvalidPropsForRootType(RootType: string | React.ComponentClass | React.StatelessComponent, props: ILinkProps): Partial<ILinkProps> {
    // Deconstruct the props so we remove props like `renderAs`, `theme` and `getStyles`
    // as those will always be removed. We also take some props that are optional
    // based on the RootType.
    const {
      children,
      renderAs,
      disabled,
      target,
      href,
      theme,
      getStyles,
      ...restProps
    } = this.props;

    // RootType will be a string if we're dealing with an html component
    if (typeof RootType === 'string') {
      // Remove the disabled prop for anchor elements
      if (RootType === 'a') {
        return {
          target,
          href,
          ...restProps,
        };
      }

      // Remove the target and href props for non anchor elements
      return { ...restProps, disabled };
    }

    // Retain all props except 'as' for ReactComponents
    return { target, href, disabled, ...restProps };
  }

  private _getRootType(props: ILinkProps): string | React.ComponentClass | React.StatelessComponent {
    if (props.renderAs) {
      return props.renderAs;
    }

    if (props.href) {
      return 'a';
    }

    return 'button';
  }
}

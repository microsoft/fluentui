import * as React from 'react';
import {
  anchorProperties,
  BaseComponent,
  buttonProperties,
  divProperties,
  htmlElementProperties,
  classNamesFunction,
  customizable,
  getNativeProps,
  createRef
} from '../../Utilities';
import {
  ILink,
  ILinkProps,
  ILinkStyleProps,
  ILinkStyles,
  LinkTagNames
} from './Link.types';

const getClassNames = classNamesFunction<ILinkStyleProps, ILinkStyles>();

const tagToPropertiesMap = {
  'div': divProperties,
  'a': anchorProperties,
  'button': buttonProperties,
  'span': htmlElementProperties,
}

@customizable('Link', ['theme', 'getStyles'])
export class LinkBase extends BaseComponent<ILinkProps, any> implements ILink {
  private _link = createRef<HTMLAnchorElement | HTMLButtonElement | null>();

  public render(): JSX.Element {
    const { disabled, children, className, href, theme, getStyles, as } = this.props;

    const classNames = getClassNames(getStyles!, {
      className,
      isButton: !href,
      isDisabled: disabled,
      theme: theme!
    });

    const RootType = getRootType(this.props);

    return (
      <RootType
        { ...getNativeProps(this.props, tagToPropertiesMap[RootType]) }
        className={ classNames.root }
        onClick={ this._onClick }
        ref={ this._link }
        aria-disabled={ disabled }
        { ...this.additionalPropsForRootType(RootType) }
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

  private additionalPropsForRootType(RootType: LinkTagNames): { [attribute: string]: string | undefined } {
    if (this.props.as === 'a') {
      return {
        target: this.props.target,
        href: this.props.href,
      };
    }

    return {};
  }
}

function getRootType(props: ILinkProps): LinkTagNames {
  if (props.as) {
    return props.as;
  }

  if (props.href) {
    return 'a';
  }

  return 'button';
}
import * as React from 'react';
import {
  DefaultButton,
  getDocument,
  getFirstFocusable,
  getId,
  getWindow,
  isElementVisible,
  ScreenWidthMinUhfMobile,
} from '@fluentui/react';
import * as styles from './Site.module.scss';

export interface ISiteNavProps {
  children: (isSmallScreen: boolean) => React.ReactNode;
  pagePath?: string;
  onNavigate: (hash: string) => void;
}

interface ISiteNavState {
  isSmallScreen: boolean;
  isOpen: boolean;
}

export class SiteNav extends React.Component<ISiteNavProps, ISiteNavState> {
  public state: ISiteNavState = { isSmallScreen: false, isOpen: false };

  private _root = React.createRef<HTMLDivElement>();
  private _content = React.createRef<HTMLDivElement>();
  private _button = React.createRef<HTMLButtonElement>();
  private _contentId = getId('section-navigation-');
  private _mediaQuery?: MediaQueryList;

  public componentDidMount(): void {
    this._mediaQuery = getWindow(this._root.current)?.matchMedia(`(min-width: ${ScreenWidthMinUhfMobile}px)`);
    this._mediaQuery?.addListener(this._onBreakpointChanged);
    this._onBreakpointChanged();
  }

  public componentWillUnmount(): void {
    this._mediaQuery?.removeListener(this._onBreakpointChanged);
  }

  public getSnapshotBeforeUpdate(): boolean {
    return !!this._content.current?.contains(getDocument(this._root.current)?.activeElement || null);
  }

  public componentDidUpdate(prevProps: ISiteNavProps, _prevState: ISiteNavState, hadContentFocus: boolean): void {
    if (prevProps.pagePath !== this.props.pagePath && this.state.isSmallScreen && this.state.isOpen) {
      this.setState({ isOpen: false }, () => {
        if (hadContentFocus) {
          this.props.onNavigate(getWindow(this._root.current)?.location.hash || '');
        }
      });
    }
  }

  public render(): React.ReactElement {
    const { isSmallScreen, isOpen } = this.state;

    return (
      <div ref={this._root} className={styles.siteNavScrollWrapper} onKeyDown={this._onKeyDown}>
        <div className={styles.siteNavToggle} hidden={!isSmallScreen}>
          <DefaultButton
            elementRef={this._button}
            aria-expanded={!isSmallScreen || isOpen}
            aria-controls={this._contentId}
            onClick={this._toggle}
          >
            Section navigation
          </DefaultButton>
        </div>
        <div ref={this._content} id={this._contentId} hidden={isSmallScreen && !isOpen} onClick={this._onClick}>
          {this.props.children(isSmallScreen)}
        </div>
      </div>
    );
  }

  private _onBreakpointChanged = (): void => {
    const isSmallScreen = this._mediaQuery?.matches === false;
    const activeElement = getDocument(this._root.current)?.activeElement;
    const hadContentFocus = !!this._content.current?.contains(activeElement || null);
    const hadButtonFocus = activeElement === this._button.current;

    this.setState(
      state => ({ isSmallScreen, isOpen: state.isOpen || (isSmallScreen && hadContentFocus) }),
      () => {
        // The mobile trigger disappears on desktop; keep its focus in the visible navigation.
        if (!isSmallScreen && hadButtonFocus && this._content.current) {
          getFirstFocusable(this._content.current, this._content.current, true)?.focus();
        } else if (hadContentFocus && activeElement && !activeElement.isConnected && this._content.current) {
          // Switching out of FocusZone replaces its descendants; preserve the user's place.
          const replacement = Array.from(this._content.current.querySelectorAll<HTMLElement>('a, button, input')).find(
            element =>
              element.tagName === activeElement.tagName &&
              element.getAttribute('href') === activeElement.getAttribute('href') &&
              element.textContent === activeElement.textContent &&
              isElementVisible(element),
          );
          (replacement || getFirstFocusable(this._content.current, this._content.current, true))?.focus();
        }
      },
    );
  };

  private _toggle = (): void => {
    this.setState(
      state => ({ isOpen: !state.isOpen }),
      () => this._button.current?.focus(),
    );
  };

  private _onKeyDown = (ev: React.KeyboardEvent<HTMLElement>): void => {
    if (ev.key === 'Escape' && !ev.defaultPrevented && this.state.isSmallScreen && this.state.isOpen) {
      ev.preventDefault();
      ev.stopPropagation();
      this.setState({ isOpen: false }, () => this._button.current?.focus());
    }
  };

  private _onClick = (ev: React.MouseEvent<HTMLElement>): void => {
    if (
      !this.state.isSmallScreen ||
      !this.state.isOpen ||
      ev.defaultPrevented ||
      ev.button !== 0 ||
      ev.ctrlKey ||
      ev.metaKey ||
      ev.shiftKey ||
      ev.altKey
    ) {
      return;
    }

    const link = (ev.target as Element).closest<HTMLAnchorElement>('a[href]');
    const location = getWindow(this._root.current)?.location;
    if (
      !link ||
      !ev.currentTarget.contains(link) ||
      (link.target && link.target !== '_self') ||
      link.hasAttribute('download') ||
      !location ||
      link.origin !== location.origin ||
      link.pathname !== location.pathname ||
      link.search !== location.search ||
      !link.hash
    ) {
      return;
    }

    this.setState({ isOpen: false }, () => this.props.onNavigate(link.hash));
  };
}

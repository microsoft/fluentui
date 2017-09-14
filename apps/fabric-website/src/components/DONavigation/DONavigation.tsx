import * as React from 'react';
import { DOSearchBox } from '../DOSearchBox/DOSearchBox';
import { DONavigationLink } from './DONavigationLink';
import './DONavigation.scss';
const links = require('../../data/DONavigationLinkData.json');

export interface IDONavigationProps {
}

export interface IDONavigationState {
}

export class DONavigation extends React.Component<IDONavigationProps, IDONavigationState> {
  private _links = [];
  private _containers = [];
  private HEADER_CLASS = '.od-Header';
  private LINKS_CLASS = '.od-Navigation-link';
  private LINKS_CONTAINER_CLASS = '.od-Header-navigationContainer';
  private LINKS_BANNER_CLASS = '.od-Header-banner';
  private LINKS_CONTAINER_ANIM_IN_CLASS = 'ms-slideDownIn10';
  private LINKS_CONTAINER_ANIM_OUT_CLASS = 'ms-slideUpOut10';
  private CONTAINER_CLASS = '.od-Navigation-linkContainer';
  private SUBMENU_CLASS = '.od-Navigation-subMenu';
  private HAMBURGER_MENU_CLASS = '.od-Header-hamburgerButton';
  private LINK_OPEN_STATE = 'is-open';
  private LINKS_MOBILE_OPEN_STATE = 'is-open';
  private HAMBURGER_OPEN_STATE = 'is-open';
  private OPEN_LINK_CONTAINER = this.CONTAINER_CLASS + '.' + this.LINK_OPEN_STATE;
  private XLSIZE = 1024;
  private hbuttonel;
  private linksel;
  private headerel;
  private navcontainerel;

  public componentDidMount() {
    let currentButton;
    let submenu;
    let currentContainer;

    this.headerel = document.querySelector(this.HEADER_CLASS);
    // Find navigation buttons
    this._links = this.headerel.querySelectorAll(this.LINKS_CLASS);
    this._containers = this.headerel.querySelectorAll(this.CONTAINER_CLASS);

    // Settup Hamburger button
    this.hbuttonel = document.querySelector(this.HAMBURGER_MENU_CLASS);
    this.linksel = document.querySelector(this.LINKS_CONTAINER_CLASS);

    this.navcontainerel = document.querySelector(this.LINKS_CONTAINER_CLASS);

    this._hamburgerHandler = this._hamburgerHandler.bind(this);
    this.hbuttonel.addEventListener('click', this._hamburgerHandler, true);
    this.hbuttonel.addEventListener('keydown', this._hamburgerHandler, true);

    // Mouse move binding
    this._mouseMoveHandler = this._mouseMoveHandler.bind(this);
    document.addEventListener('mousemove', this._mouseMoveHandler, true);

    this._windowsResizeHandler = this._windowsResizeHandler.bind(this);
    window.addEventListener('resize', this._windowsResizeHandler, false);

    this._closeDropdownHandler = this._closeDropdownHandler.bind(this);
    document.addEventListener('keyup', this._closeDropdownHandler, true);

    for (let i = 0; i < this._containers.length; i++) {
      currentContainer = this._containers[i];
      currentButton = this._containers[i].querySelector(this.LINKS_CLASS);
      submenu = currentContainer.querySelector(this.SUBMENU_CLASS);

      this._toggleMenuHandler = this._toggleMenuHandler.bind(this);

      if (submenu) {
        currentButton.addEventListener('click', this._toggleMenuHandler, true);
        currentButton.addEventListener('keydown', this._toggleMenuHandler, true);
      }
    }

    this._processResize();
  }

  public render() {
    return (
      <div className='od-Navigation'>
        <div className='od-Navigation-searchContainer'>
          <DOSearchBox />
        </div>
        <div className='od-Navigation-links' role='menu'>
          <div className='od-Navigation-linkContainer'>
            <a className='od-Navigation-link is-selected' role='menuitem' aria-label='Explore menu item, hit enter to open sub-menu and tab to navigate to first sub menu item' href='/' aria-expanded='false'>
              Explore
                <i className='ms-Icon ms-Icon--ChevronDown' aria-hidden='true' />
            </a>
            <div className='od-Navigation-subMenu'>
              <div className='od-Navigation-subMenuItems'>
                <div className='ms-Grid'>
                  <div className='ms-Grid-row'>
                    <div className='ms-Grid-col ms-xl3 ms-sm12 od-Navigation-menuFirstColumn'>
                      { this._getLinks(links.exploreLinks.firstMenuColumn) }
                    </div>
                    <div className='ms-Grid-col ms-xl3 ms-sm12  od-Navigation-menuSecondColumn'>
                      { this._getLinks(links.exploreLinks.secondMenuColumn) }
                    </div>
                    <div className='ms-Grid-col ms-xl3 ms-sm12  od-Navigation-menuThirdColumn'>
                      { this._getLinks(links.exploreLinks.thirdMenuColumn) }
                      <div className='od-Navigation-subMenuOverflowColor' />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className='od-Navigation-linkContainer'>
            <a className='od-Navigation-link' role='menuitem' aria-label='Getting started menu item' href='http://dev.office.com/getting-started'>
              Getting Started
              </a>
          </div>
          <div className='od-Navigation-linkContainer'>
            <a className='od-Navigation-link' role='menuitem' aria-label='Code Samples menu item' href='http://dev.office.com/code-samples'>
              Code Samples
              </a>
          </div>
          <div className='od-Navigation-linkContainer'>
            <a className='od-Navigation-link' role='menuitem' aria-label='Resources menu item, hit enter to open sub-menu' href='/' aria-expanded='false'>
              Resources
                <i className='ms-Icon ms-Icon--ChevronDown' aria-hidden='true' />
            </a>
            <div className='od-Navigation-subMenu'>
              <div className='od-Navigation-subMenuItems od-Navigation-menuFirstColumn'>
                { this._getLinks(links.resourcesLinks) }
              </div>
            </div>
          </div>
          <div className='od-Navigation-linkContainer'>
            <a className='od-Navigation-link' role='menuitem' aria-label='Documentation menu item, hit enter to open sub-menu and tab to navigate to first sub menu item' href='/' aria-expanded='false'>
              Documentation
                <i className='ms-Icon ms-Icon--ChevronDown' aria-hidden='true' />
            </a>
            <div className='od-Navigation-subMenu'>
              <div className='od-Navigation-subMenuItems od-Navigation-menuFirstColumn'>
                { this._getLinks(links.documentationLinks) }
              </div>
            </div>
          </div>
        </div>
        <div className='od-Navigation-socialButtons'>
          <div className='od-Navigation-socialButton' />
          <div className='od-Navigation-socialButton' />
          <div className='od-Navigation-socialButton' />
          <div className='od-Navigation-socialButton' />
          <div className='od-Navigation-socialButton' />
        </div>
      </div>
    );
  }

  private _windowsResizeHandler() {
    if (window.innerWidth > this.XLSIZE) {
      this.linksel.classList.remove(this.LINKS_CONTAINER_ANIM_IN_CLASS);
      this.linksel.classList.remove(this.LINKS_CONTAINER_ANIM_OUT_CLASS);
      this.hbuttonel.classList.remove(this.HAMBURGER_OPEN_STATE);
      this.linksel.classList.remove(this.LINKS_MOBILE_OPEN_STATE);
    }

    this._processResize();
  }

  private _getLinks(linkArray: Array<any>): Array<JSX.Element> {
    let linkElements: Array<JSX.Element> = [];

    for (let i = 0; i < linkArray.length; i++) {
      linkElements.push(
        <DONavigationLink label={ linkArray[i].label } href={ linkArray[i].href } icon={ linkArray[i].icon } key={ i } />
      );
    }

    return linkElements;
  }

  private _mouseMoveHandler(e) {
    let linkContainer = document.querySelector(this.OPEN_LINK_CONTAINER);
    let subMenuContainer;
    let targetHeight;
    let targetRect;
    let navcontainerRect;
    let bannerContainer = document.querySelector(this.LINKS_BANNER_CLASS);

    // Check if dropdown is open and if so base the mouse position calculations on that.
    if (linkContainer) {
      subMenuContainer = linkContainer.querySelector(this.SUBMENU_CLASS);
      targetRect = subMenuContainer.getBoundingClientRect();
      targetHeight = targetRect.top + targetRect.height;
    } else {
      navcontainerRect = this.navcontainerel.getBoundingClientRect();
      targetHeight = bannerContainer.getBoundingClientRect().top
        + bannerContainer.getBoundingClientRect().height;
      if (this.navcontainerel.classList.contains('docs-showNavigation')) {
        targetHeight += navcontainerRect.height;
        // console.log(targetHeight);
      }
    }

    let mouseY = e.pageY;

    if (mouseY <= targetHeight) {
      this._addNavigation();
    } else {
      this._removeNavigation();
      this._removeDropdown();
    }
  }

  private _processResize() {
    if (window.innerWidth > this.XLSIZE) {
      this._removeNavigation();
      document.removeEventListener('mousemove', this._mouseMoveHandler, true);
      document.addEventListener('mousemove', this._mouseMoveHandler, true);
      this.navcontainerel.classList.remove('docs-officeDevShowNav');
    } else {
      this._addNavigationBack();
      document.removeEventListener('mousemove', this._mouseMoveHandler, true);
      this.navcontainerel.classList.add('docs-officeDevShowNav');
    }
  }

  // Removes Office Dev Navigation
  private _removeNavigation() {
    this.navcontainerel.classList.remove('ms-slideDownIn20');
    this.navcontainerel.classList.add('ms-slideUpOut20');
    this.navcontainerel.classList.remove('docs-showNavigation');
  }

  private _addNavigationBack() {
    this.navcontainerel.classList.remove('ms-slideUpOut20');
    this.navcontainerel.classList.remove('docs-hideNavigation');
  }

  private _addNavigation() {
    if (!this.navcontainerel.classList.contains('ms-slideDownIn20')) {
      this.navcontainerel.classList.add('docs-showNavigation');
      this.navcontainerel.classList.remove('ms-slideUpOut20');
      this.navcontainerel.classList.add('ms-slideDownIn20');
    }
  }

  private _processHamburger(e, isKeyEvent?: boolean) {
    let linkEL: HTMLElement;
    if (!this.hbuttonel.classList.contains(this.HAMBURGER_OPEN_STATE)) {
      this.hbuttonel.classList.add(this.HAMBURGER_OPEN_STATE);
      this.linksel.classList.add(this.LINKS_MOBILE_OPEN_STATE);
      this.linksel.classList.remove(this.LINKS_CONTAINER_ANIM_OUT_CLASS);
      this.linksel.classList.add(this.LINKS_CONTAINER_ANIM_IN_CLASS);

      linkEL = document.querySelector(this.LINKS_CLASS) as HTMLElement;
      linkEL.focus();

    } else {
      this._removeDropdown();
    }
  }

  private _closeDropdownHandler(e) {
    if (!this._isDescendant(this.headerel, document.activeElement)) {
      this._removeDropdown();
    }
  }

  private _removeDropdown() {
    this.hbuttonel.classList.remove(this.HAMBURGER_OPEN_STATE);
    this.linksel.classList.remove(this.LINKS_CONTAINER_ANIM_IN_CLASS);

    if (window.innerWidth < this.XLSIZE) {
      if (this.linksel) {
        this.linksel.classList.add(this.LINKS_CONTAINER_ANIM_OUT_CLASS);
        setTimeout(function () {
          this.linksel.classList.remove(this.LINKS_MOBILE_OPEN_STATE);
        }, 200);
      }
    } else {
      this._removeAllActiveClasses();
    }
  }

  private _hamburgerHandler(e: any) {
    if (e.keyCode) {
      if (e.keyCode === 13) {
        this._processHamburger(e, true);
        e.preventDefault();
      }
    } else {
      this._processHamburger(e);
      e.preventDefault();
    }
  }

  private _processMenuToggle(e) {
    let ancestor;
    if (e.target.classList.contains(this.CONTAINER_CLASS)) {

      if (!e.target.classList.contains(this.LINK_OPEN_STATE)) {
        this._removeAllActiveClasses();
        e.target.classList.add(this.LINK_OPEN_STATE);
        e.target.setAttribute('aria-expanded', true);
      } else {
        this._removeAllActiveClasses();
        e.target.setAttribute('aria-expanded', false);
      }
    } else {
      ancestor = this._findAncestor(e.target, this.CONTAINER_CLASS);

      if (!ancestor.classList.contains(this.LINK_OPEN_STATE)) {
        this._removeAllActiveClasses();
        ancestor.classList.add(this.LINK_OPEN_STATE);
        ancestor.setAttribute('aria-expanded', true);
      } else {
        this._removeAllActiveClasses();
        ancestor.setAttribute('aria-expanded', false);
      }
    }
  }

  private _toggleMenuHandler(e) {
    if (e.keyCode) {
      if (e.keyCode === 13) {
        this._processMenuToggle(e);
        e.preventDefault();
      }
    } else {
      this._processMenuToggle(e);
      e.preventDefault();
    }
  }

  private _isDescendant(parent, child) {
    let node = child.parentNode;
    while (node) {
      if (node === parent) {
        return true;
      }
      node = node.parentNode;
    }
    return false;
  }

  private _removeAllActiveClasses() {
    for (let i = 0; i < this._containers.length; i++) {
      this._containers[i].classList.remove(this.LINK_OPEN_STATE);
    }
  }

  private _findAncestor(el, cls) {
    let newCLS = cls.replace('.', '');
    let that;
    let newEL = el;
    while ((newEL = newEL.parentElement) && !newEL.classList.contains(newCLS)) {
      that = this;
    }
    return newEL;
  }
}
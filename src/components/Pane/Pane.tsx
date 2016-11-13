/* tslint:disable:no-unused-variable */
import * as React from 'react';
/* tslint:enable:no-unused-variable */

import { BaseComponent } from '../../common/BaseComponent';
import { IPaneProps, PaneMode, PaneType } from './Pane.Props';
import { Popup } from '../Popup/index';
import { css } from '../../utilities/css';
import { getId } from '../../utilities/object';
import { getRTL } from '../../utilities/rtl';
import { PaneContent } from './PaneContent';
import { WrappedContent } from './WrappedContent';
import './Pane.scss';

export interface IPaneState {
    hidden?: boolean;
    isAnimatingOpen?: boolean;
    isAnimatingClose?: boolean;
}

export class Pane extends BaseComponent<IPaneProps, IPaneState> {

    public static defaultProps: IPaneProps = {
        hidden: true,
        closeButtonHidden: false,
        type: PaneType.small
    };

    private _id: string;
    private _contentContainer: HTMLElement;
    private _mainContent: HTMLElement;
    private _initialContentWidth: number;

    constructor(props: IPaneProps) {
        super(props);

        this._onClose = this._onClose.bind(this);
        this._onPaneRef = this._onPaneRef.bind(this);

        this._id = getId('Pane');

        this.state = {
            hidden: props.hidden,
            isAnimatingOpen: !!props.hidden,
            isAnimatingClose: false
        };
    }

    public componentDidMount() {
        if (this.props.paneMode === PaneMode.overlay) {
            // Set original content width for overlay mode
            this._initialContentWidth = this._contentContainer.clientWidth;
        }

        if (!this.state.hidden) {
            this._async.setTimeout(() => {
                this.setState({
                    isAnimatingOpen: false
                });
            }, 2000);
        }
    }

    public componentWillReceiveProps(newProps: IPaneProps) {
        if (newProps.hidden !== this.state.hidden) {
            this.setState({
                hidden: newProps.hidden,
                isAnimatingOpen: newProps.hidden ? false : true,
                isAnimatingClose: newProps.hidden ? true : false
            });
        }
    }

    public componentDidUpdate() {
        if (this.props.paneMode === PaneMode.overlay) {
            // Use original content width for overlay mode
            this._contentContainer.style.width = this._initialContentWidth + 'px';
        } else if (this.props.paneMode === PaneMode.push) {
            // Viewport content width for push mode
            this._contentContainer.style.width = this._getContainerWidth() + 'px';
        }
    }

    public render() {
        let { className = '', type, closeButtonHidden, headerText, closeButtonAriaLabel, headerClassName = ''  } = this.props;
        let { hidden, isAnimatingOpen, isAnimatingClose } = this.state;
        let isRTL = getRTL();
        let isOnRightSide = !isRTL;
        const headerTextId = this._id + '-headerText';
        let pendingCommandBarContent = '';

        let header = headerText ? (
            <p className={ css('ms-Pane-headerText', headerClassName) } id={ headerTextId }>{ headerText }</p>
        ) : null;

        let closeButton = !closeButtonHidden ?
            (
                <button className='ms-Pane-closeButton ms-PaneAction-close' onClick={ this._onClose } aria-label={ closeButtonAriaLabel } data-is-visible={ true }>
                    <i className='ms-Pane-closeIcon ms-Icon ms-Icon--Cancel'></i>
                </button>
            ) : null;

        let groupings = this._groupChildren();

        return (
            <div className={
                css('ms-Pane', {
                    'ms-Pane--left': !isOnRightSide,
                    'ms-Pane--right': isOnRightSide
                })
            }
                >
                <div
                    className={ 'main-content' }
                    ref={ this._resolveRef('_mainContent') }
                    >
                    <div
                        className={ 'content-container' }
                        ref={ this._resolveRef('_contentContainer') }
                        >
                        { groupings.wrappedContents }
                    </div>
                </div>
                <Popup
                    className='ms-Pane-popup'
                    role='dialog'
                    ariaLabelledBy={ headerText ? headerTextId : undefined }
                    onDismiss={ this.props.onDismiss }>
                    <div
                        ref={ this._onPaneRef }
                        className={
                            css('ms-Pane', className, {
                                'ms-Pane--openLeft': !isOnRightSide,  // because the RTL animations are not being used, we need to set a class
                                'ms-Pane--openRight': isOnRightSide,  // because the RTL animations are not being used, we need to set a class
                                'open': !hidden,
                                'ms-Pane-animateIn': isAnimatingOpen,
                                'ms-Pane-animateOut': isAnimatingClose,
                                'ms-Pane--sm': type === PaneType.small,
                                'ms-Pane--md': type === PaneType.medium
                            })
                        }
                        >
                        <div className='ms-Pane-main'>
                            <div className='ms-Pane-commands' data-is-visible={ true } >
                                { pendingCommandBarContent }
                                { closeButton }
                            </div>
                            <div className='ms-Pane-contentInner'>
                                { header }
                                <div className='ms-Pane-content'>
                                    { groupings.paneContents }
                                </div>
                            </div>
                        </div>
                    </div>
                </Popup>
            </div>
        );
    }

    public dismiss() {
        if (!this.state.hidden) {
            this.setState({
                isAnimatingOpen: false,
                isAnimatingClose: true
            });
        }
    }

    private _getContainerWidth(): number {
        return this._mainContent.clientWidth - 1;
    }

    private _groupChildren(): { wrappedContents: any[]; paneContents: any[]; } {

        let groupings: { wrappedContents: any[]; paneContents: any[]; } = {
            wrappedContents: [],
            paneContents: []
        };

        React.Children.map(this.props.children, child => {
            if (typeof child === 'object' && child !== null) {
                if (child.type === PaneContent) {
                    groupings.paneContents.push(child);
                } else if (child.type === WrappedContent) {
                    groupings.wrappedContents.push(child);
                }
            }
        });

        return groupings;
    }

    private _onAnimationEnd(ev: AnimationEvent) {
        if (ev.animationName.indexOf('In') > -1) {
            this.setState({
                hidden: false,
                isAnimatingOpen: false
            });
        }
        if (ev.animationName.indexOf('Out') > -1) {
            this.setState({
                hidden: true,
                isAnimatingClose: false
            });

            if (this.props.onDismiss) {
                this.props.onDismiss();
            }
        }
    }

    private _onClose() {
        this.dismiss();
    }

    private _onPaneRef(ref: HTMLDivElement) {
        if (ref) {
            this._events.on(ref, 'animationend', this._onAnimationEnd);
        } else {
            this._events.off();
        }
    }
}
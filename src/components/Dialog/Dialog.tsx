import * as React from 'react';
import './Dialog.scss';
import { css } from '../../utilities/css';

// @TODO - need to add animations, pending Fabric Team + Coulton work

// @TODO - we should just reuse Button?
export interface IActionOption {
    key: string;
    text: string;
    isPrimary?: boolean;
}

export enum DialogType {
    normal,
    largeHeader,
    close
}

export interface IDialogProps {
    type?: DialogType;
    onCloseAction?: (ev?: React.MouseEvent) => any;
    title?: string;
    subText?: string;
    blocking?: boolean;

    children?: any;

    // @TODO this should use the existing Button components
    actions?: Array<IActionOption>;   // for buttons
}

export default class Dialog extends React.Component<IDialogProps, any> {
    public static defaultProps: IDialogProps = {
        type: DialogType.normal,
        blocking: false
    };

    public render() {
        let { type, onCloseAction, title, subText, blocking, children, actions } = this.props;

        console.log('type: ' + type);
        console.log('blocking: ' + blocking);

        const dialogClassName = css('ms-Dialog', {
            'ms-Dialog--lgHeader': type === DialogType.largeHeader,
            'ms-Dialog--close': type === DialogType.close
        });

        const overlayClassName = css('ms-Overlay', {
            'ms-Overlay--dark': !blocking,
        });

        // if there is a subText or choices, then we need ms-Dialog-content div
        let contentData;
        if (subText || children) {
            let subTextContent;
            if (subText) {
                subTextContent = <p className='ms-Dialog-subText'>{ subText }</p>;
            }

            contentData = (
                <div className='ms-Dialog-content'>
                    { subTextContent }
                    { children }
                </div>
            );
        }

        let actionsContent;
        if (actions) {
            actionsContent = (
                <div className='ms-Dialog-actions'>
                    <div className='ms-Dialog-actionsRight'>
                        { actions.map( (action, i) => { return (
                            <button key={ action.key } className={css({
                                'ms-Dialog-action ms-Button': true,
                                'ms-Button--primary': action.isPrimary
                            })}>
                              <span className='ms-Button-label'>{ action.text }</span>
                            </button>
                        ); })}
                    </div>
                </div>
            );
        }

        return (
            <div className={ dialogClassName }>
                <div className={ overlayClassName } onClick={ blocking ? null : onCloseAction}></div>
                <div className='ms-Dialog-main'>
                    <button className='ms-Dialog-button ms-Dialog-button--close' onClick={ onCloseAction }>
                        <i className='ms-Icon ms-Icon--x'></i>
                    </button>
                    <div className='ms-Dialog-header'>
                        <p className='ms-Dialog-title'>{ title }</p>
                    </div>
                    <div className='ms-Dialog-inner'>
                        { contentData }
                        { actionsContent }
                    </div>
                </div>
            </div>
        );
    }
};

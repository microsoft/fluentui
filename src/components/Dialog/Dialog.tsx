import * as React from 'react';
import './Dialog.scss';
import Overlay from '../Overlay/Overlay';
import Layer from '../Layer/Layer';
import { DialogFooter } from './DialogFooter';
import { IDialogProps, DialogType } from './Dialog.Props';
import { css } from '../../utilities/css';
import { withResponsiveMode, ResponsiveMode } from '../../utilities/decorators/withResponsiveMode';

// @TODO - need to add animations, pending Fabric Team + Coulton work
// @TODO - need to change this to a panel whenever the breakpoint is under medium (verify the spec)

@withResponsiveMode
export default class Dialog extends React.Component<IDialogProps, any> {
    public static defaultProps: IDialogProps = {
        isOpen: false,
        type: DialogType.normal,
        isDarkOverlay: true,
        isBlocking: false,
        className: ''
    };

    public render() {
        let { isOpen, type, isDarkOverlay, onDismiss, title, subText, isBlocking, responsiveMode } = this.props;

        // @TODO - the discussion on whether the Dialog contain a property for rendering itself is still being discussed
        if (!isOpen) {
            return null;
        }

        let subTextContent;
        const dialogClassName = css('ms-Dialog', {
            'ms-Dialog--lgHeader': type === DialogType.largeHeader,
            'ms-Dialog--close': type === DialogType.close
        });

        let groupings = this._groupChildren();
        if (subText) {
            subTextContent = <p className='ms-Dialog-subText'>{ subText }</p>;
        }

        // @temp tuatology - Will adjust this to be a panel at certain breakpoints
        if (responsiveMode >= ResponsiveMode.small) {
            return (
                <Layer>
                    <div className={ dialogClassName }>
                        <Overlay isDarkThemed={ isDarkOverlay } onClick={ isBlocking ? null : onDismiss}/>
                        <div className ={ css('ms-Dialog-main', this.props.className)}>
                            <button className='ms-Dialog-button ms-Dialog-button--close' onClick={ onDismiss }>
                                <i className='ms-Icon ms-Icon--x'></i>
                            </button>
                            <div className='ms-Dialog-header'>
                                <p className='ms-Dialog-title'>{ title }</p>
                            </div>
                            <div className='ms-Dialog-inner'>
                                <div className='ms-Dialog-content'>
                                    { subTextContent }
                                    { groupings.contents }
                                </div>
                                { groupings.footers }
                            </div>
                        </div>
                    </div>
                </Layer>
            );
        }
    }

    // @TODO - typing the footers as an array of DialogFooter is difficult because
    // casing "child as DialogFooter" causes a problem because
    // "Neither type 'ReactElement<any>' nor type 'DialogFooter' is assignable to the other."
    private _groupChildren(): { footers: any[]; contents: any[]; } {

        let groupings: { footers: any[]; contents: any[]; } = {
            footers: [],
            contents: []
        };

        React.Children.map(this.props.children, child => {
            console.log('checking child: ');
            console.log(child);
            let tom = DialogFooter;
            console.log(tom);
            if (typeof child === 'object' && child.type === DialogFooter) {
                groupings.footers.push(child);
            } else {
                groupings.contents.push(child);
            }
        });

        return groupings;
    }
}

import * as React from 'react';
import { DetailPanel } from '../DetailPanel';
import { PrimaryButton } from 'office-ui-fabric-react/lib/Button';
import { IDetailPanelHeaderProps, IDetailPanelErrorResult, IDetailPanelActionBarProps } from '../DetailPanel.types';
import { Link } from 'office-ui-fabric-react/lib/Link';

interface IDetailPanelL2ContentExampleStates {
    show: boolean;
    currentL2Id?: string;
}

export class DetailPanelL2ContentExample extends React.PureComponent<{}, IDetailPanelL2ContentExampleStates>{
    constructor(props: {}) {
        super(props);
        this.state = { show: false, currentL2Id: undefined };
    }

    public render() {
        const { show, currentL2Id } = this.state;
        if (show) {
            const header: IDetailPanelHeaderProps = {
                title: " I am the main header"
            };

            return (
                <DetailPanel
                    mainHeader={header}
                    mainContent={this.getMainContent()}
                    currentL2Id={currentL2Id}
                    onGetL2Header={this._onGetL2Header}
                    onGetL2Content={this._onGetL2Content}
                    onGetL2ActionBar={this._onGetL2ActionBar}
                />
            )
        } else {
            return <PrimaryButton onClick={() => { this.setState({ show: true }) }}>Open</PrimaryButton>
        }
    }

    private getMainContent() {
        return (
            <div>
                <div>Main content</div>
                <ul>
                    <li >
                        <Link onClick={() => { this.setState({ currentL2Id: 'cat' }) }}>
                            CAT
                    </Link>
                    </li>
                    <li >
                        <Link onClick={() => { this.setState({ currentL2Id: 'dog' }) }}>
                            DOG
                    </Link>
                    </li>
                    <li>
                        <Link onClick={() => { this.setState({ currentL2Id: 'bird' }) }}>
                            Bird
                    </Link>
                    </li>
                </ul>
            </div>
        )
    }

    private _onGetL2Header(l2Id: string) {
        return {
            title: `I am the header of ${l2Id}`
        } as IDetailPanelHeaderProps;
    }

    private _onGetL2Content(l2Id: string) {
        return new Promise((resolve: (element: JSX.Element) => void, reject: (reason: IDetailPanelErrorResult) => void) => {
            setTimeout(() => {
                if (l2Id === 'bird') {
                    const err: IDetailPanelErrorResult = {
                        pageTitle: `Title of ${l2Id}`,
                        messageBannerSetting: {
                            message: `Error message of ${l2Id}`
                        }
                    }
                    reject(err)
                }

                resolve(<div>Content of {l2Id}</div>)
            }, 1000);
        })
    }

    private _onGetL2ActionBar(l2Id: string) {
        const actionBar: IDetailPanelActionBarProps = {
            primaryButtonText: `Primary ${l2Id}`,
            onPrimaryAction: () => { alert(l2Id) }
        }

        return actionBar;
    }
}

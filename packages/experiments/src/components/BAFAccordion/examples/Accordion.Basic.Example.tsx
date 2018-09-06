/*!
 * Copyright (C) Microsoft Corporation. All rights reserved.
 */

import { DefaultButton } from 'office-ui-fabric-react/lib/Button';
import * as React from 'react';
import { Accordion } from '..';

export class AccordionBasicExample extends React.Component {
    public render(): JSX.Element {
        const exampleStyles = {
            divStyle: {
                width: 220
            },
            buttonStyle: {
                root: {
                    width: '100%',
                    minWidth: 0,
                    background: 'transparent',
                    padding: '12px 0',
                    textAlign: 'left'
                },
                icon: { fontSize: 22, padding: '0' },
                menuIcon: { fontSize: 20, padding: '0 8px' }
            }
        };

        return (
            <div style={exampleStyles.divStyle}>
                <Accordion
                    text="Stuff here"
                    iconProps={{ iconName: 'CollapseMenu' }}
                    onRenderContent={() => {
                        return (
                            <div>
                                <DefaultButton
                                    key="item1"
                                    text="Link 1"
                                    iconProps={{ iconName: 'CompassNW' }}
                                    ariaLabel="New. Use left and right arrow keys to navigate"
                                    // tslint:disable-next-line:jsx-no-lambda
                                    onClick={() => {
                                        return;
                                    }}
                                    styles={exampleStyles.buttonStyle}
                                />
                                <DefaultButton
                                    key="item2"
                                    text="Link 2"
                                    iconProps={{ iconName: 'BuildQueue' }}
                                    // tslint:disable-next-line:jsx-no-lambda
                                    onClick={() => {
                                        return;
                                    }}
                                    styles={exampleStyles.buttonStyle}
                                />
                                <DefaultButton
                                    key="item3"
                                    text="Link 3"
                                    iconProps={{ iconName: 'AutoRacing' }}
                                    // tslint:disable-next-line:jsx-no-lambda
                                    onClick={() => {
                                        return;
                                    }}
                                    styles={exampleStyles.buttonStyle}
                                />
                            </div>
                        );
                    }}
                />
            </div>
        );
    }
}

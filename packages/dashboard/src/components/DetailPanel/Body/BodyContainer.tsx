import * as React from 'react';
import { IDetailPanelBaseSetStatesAction, IBodyContainerProps } from '../DetailPanel.types';
import { MessageBanner } from './MessageBanner';
import { ActionBar } from '../Footer/ActionBar';
import { IconButton } from 'office-ui-fabric-react/lib/Button';
import { Header } from '../Header';

type BodyContainerType = IBodyContainerProps & IDetailPanelBaseSetStatesAction;

const bodyContainer: React.SFC<BodyContainerType> = (props: BodyContainerType) => {
    const _renderElement = () => {
        const {
            header,
            messageBanner,
            mainContent,
            actionBar,
            onSetMessageBanner,
            onSetLoadingAnimation,
            onBack,
            onDismiss } = props;
        return (
            <div>
                <div>
                    {onBack &&
                        <div>
                            <IconButton iconProps={{ iconName: '' }} onClick={onBack} />
                        </div>}
                    <div>
                        <IconButton iconProps={{ iconName: 'ChromeClose' }} onClick={onDismiss} />
                    </div>
                </div>
                <div>
                    <Header {...header} />
                </div>
                {messageBanner &&
                    <div>
                        <MessageBanner {...messageBanner} />
                    </div>
                }
                {mainContent &&
                    <div>
                        {mainContent}
                    </div>
                }
                {actionBar &&
                    <ActionBar
                        {...actionBar}
                        onSetLoadingAnimation={onSetLoadingAnimation}
                        onSetMessageBanner={onSetMessageBanner}
                    />}
            </div>
        );
    }

    return _renderElement();
}

export {
    bodyContainer as BodyContainer
};

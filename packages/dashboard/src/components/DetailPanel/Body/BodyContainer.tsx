import * as React from 'react';
import { Panel, PanelType } from 'office-ui-fabric-react/lib/Panel';
import { IDetailPanelBaseSetStatesAction, IBodyContainerProps } from '../DetailPanel.types';
import { MessageBanner } from './MessageBanner';
import { ActionBar } from '../Footer/ActionBar';
import { IconButton } from 'office-ui-fabric-react/lib/Button';
import { Header } from '../Header';

type BodyContainerType = IBodyContainerProps & IDetailPanelBaseSetStatesAction;

const bodyContainer: React.SFC<BodyContainerType> = (props: BodyContainerType) => {

    const _shouldHideOnLoading = () => {
        const { loadingElement, inlineLoading } = props;
        return loadingElement && !inlineLoading;
    }

    const _renderNav = () => {
        const { onBack, onDismiss } = props;
        return (
            <div>
                {onBack && (
                    <div>
                        <IconButton iconProps={{ iconName: 'Back' }} onClick={onBack} />
                    </div>
                )}
                <div>
                    <IconButton iconProps={{ iconName: 'ChromeClose' }} onClick={onDismiss} />
                </div>
            </div>);
    }

    const _renderHeader = () => {
        if (_shouldHideOnLoading()) {
            return null;
        }
        const { header } = props;
        return (
            <div>
                <Header {...header} />
            </div>);
    }

    const _renderMessageBanner = () => {
        const { messageBanner } = props;
        if (messageBanner) {
            return (
                <div>
                    <MessageBanner {...messageBanner} />
                </div>
            );
        }
        return null;
    }

    const _renderFooter = () => {
        if (_shouldHideOnLoading()) {
            return null;
        }

        const { actionBar, onSetMessageBanner, onSetLoadingAnimation } = props;

        if (actionBar) {
            return (
                <ActionBar
                    {...actionBar}
                    onSetLoadingAnimation={onSetLoadingAnimation}
                    onSetMessageBanner={onSetMessageBanner}
                />);
        }
        return null;
    }
    const _renderElement = () => {
        const { mainContent, loadingElement, inlineLoading } = props;
        return (
            <Panel
                isOpen={true}
                type={PanelType.medium}
                onRenderNavigation={_renderNav}
                onRenderHeader={_renderHeader}
                isFooterAtBottom={true}
                onRenderFooterContent={_renderFooter}
            >
                {loadingElement}
                {(!loadingElement || (loadingElement && inlineLoading)) &&
                    <>
                        {_renderMessageBanner()}
                        {mainContent}
                    </>
                }
            </Panel>
        );
    };

    return _renderElement();
};

export { bodyContainer as BodyContainer };

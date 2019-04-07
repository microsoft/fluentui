/* tslint:disable */
import * as React from 'react';
import { DetailPanel } from '../DetailPanel';
import { PrimaryButton } from 'office-ui-fabric-react/lib/Button';

export interface IDetailPanelBasicExampleStates {
  show: boolean;
}

export class DetailPanelBasicExample extends React.PureComponent<{}, IDetailPanelBasicExampleStates> {
  constructor(props: {}) {
    super(props);
    this.state = { show: false };
  }

  public render(): JSX.Element {
    const { show } = this.state;
    if (show) {
      const header: JSX.Element = <div>I am a custom JSX.ELement</div>;

      return (
        <DetailPanel
          panelSetting={{
            isLightDismiss: true,
            onLightDismiss: () => {
              console.log('light dismiss triggered');
              this.setState({ show: false });
            }
          }}
          mainHeader={header}
          mainContent={<div>Main content!</div>}
          onDetailPanelDismiss={() => {
            this.setState({ show: false });
          }}
        />
      );
    } else {
      return (
        <PrimaryButton
          onClick={() => {
            this.setState({ show: true });
          }}
        >
          Open
        </PrimaryButton>
      );
    }
  }
}
/* tslint:enable */

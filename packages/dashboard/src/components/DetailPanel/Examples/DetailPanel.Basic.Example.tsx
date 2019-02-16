/* tslint:disable */
import * as React from 'react';
import { DetailPanel } from '../DetailPanel';
import { PrimaryButton } from 'office-ui-fabric-react/lib/Button';
import { IDetailPanelHeaderProps } from '../DetailPanel.types';

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
      const header: IDetailPanelHeaderProps = {
        title: ' I am a basic detail panel'
      };

      return (
        <DetailPanel
          mainHeader={header}
          mainContent={<div>Main content!</div>}
          onDetailPanelDimiss={() => {
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

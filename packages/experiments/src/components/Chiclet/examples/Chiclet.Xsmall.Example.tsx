import * as React from 'react';
import { Chiclet, ChicletSize } from '@uifabric/experiments';
import { IButtonProps, IconButton, Stack } from 'office-ui-fabric-react';
import * as exampleStyles from './Chiclet.Xsmall.Example.scss';

const TEST_URL = 'http://fabricweb.z5.web.core.windows.net/pr-deploy-site/refs/heads/master/chiclet-test.html';

export class FooterComponent extends React.Component<IFooterComponent, {}> {
  constructor(props: IFooterComponent) {
    super(props);
  }
}

export interface IChicletXsmallExampleState {
  textFieldValue: string;
}

export class ChicletXsmallExample extends React.Component<{}, IChicletXsmallExampleState> {
  constructor(props: {}) {
    super(props);

    this.state = {
      textFieldValue: 'http://localhost:4322'
    };
  }

  public render(): JSX.Element {
    return (
      <Stack tokens={{ childrenGap: 16 }}>
        <Chiclet url={TEST_URL} size={ChicletSize.xSmall} />
      </Stack>
    );
  }
}

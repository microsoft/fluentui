import * as React from 'react';
import { Chiclet, ChicletSize } from '@uifabric/experiments';
import { IButtonProps, IconButton, Stack } from 'office-ui-fabric-react';
import * as exampleStyles from './Chiclet.Basic.Example.scss';

const TEST_URL = 'http://fabricweb.z5.web.core.windows.net/pr-deploy-site/refs/heads/master/chiclet-test.html';

export class FooterComponent extends React.Component<IFooterComponent, {}> {
  constructor(props: IFooterComponent) {
    super(props);
  }

  public render(): JSX.Element {
    const { buttonProps, activities } = this.props;

    return _renderFooter(buttonProps, activities);
  }
}

export interface IChicletFooterExampleState {
  textFieldValue: string;
}

export class ChicletFooterExample extends React.Component<{}, IChicletFooterExampleState> {
  constructor(props: {}) {
    super(props);

    this.state = {
      textFieldValue: 'http://localhost:4322'
    };
  }

  public render(): JSX.Element {
    const footerButtonProps: IButtonProps[] = [
      { iconProps: { iconName: 'More' } },
      { iconProps: { iconName: 'Save' } },
      { iconProps: { iconName: 'Share' } }
    ];
    const footer = <FooterComponent buttonProps={footerButtonProps} activities="10 Comments  16 Shares  87 Views" />;

    return (
      <Stack tokens={{ childrenGap: 16 }}>
        <Chiclet url={TEST_URL} size={ChicletSize.xSmall} footer={footer} />
      </Stack>
    );
  }
}

export interface IFooterComponent extends React.Props<FooterComponent> {
  buttonProps: IButtonProps[];
  activities: string;
}

function _renderFooter(buttonProps: IButtonProps[], activities: string): React.ReactElement<HTMLDivElement> {
  return (
    <div className={exampleStyles.footer}>
      <div className={exampleStyles.activities}>{activities ? activities : null}</div>
      <div className={exampleStyles.actions}>
        {buttonProps &&
          buttonProps.map((buttonProp: IButtonProps, index: number) => {
            return (
              <div className={exampleStyles.action} key={index}>
                <IconButton {...buttonProp} />
              </div>
            );
          })}
      </div>
    </div>
  );
}

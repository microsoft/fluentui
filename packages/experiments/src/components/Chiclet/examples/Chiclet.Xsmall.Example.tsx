import * as React from 'react';
import { Chiclet, ChicletSize } from '@uifabric/experiments';
import { IButtonProps, IconButton, Stack } from 'office-ui-fabric-react';
import * as exampleStyles from './Chiclet.Xsmall.Example.scss';

const TEST_URL = 'http://fabricweb.z5.web.core.windows.net/pr-deploy-site/refs/heads/master/chiclet-test.html';

export class FooterComponent extends React.Component<IFooterComponent, {}> {
  constructor(props: IFooterComponent) {
    super(props);
  }

  public render(): JSX.Element {
    const { buttonProps, attachProp } = this.props;

    return _renderFooter(buttonProps, attachProp);
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
    const footerButtonProps: IButtonProps[] = [{ iconProps: { iconName: 'More' } }, { iconProps: { iconName: 'CloudUpload' } }];

    const attachButtonProp: IButtonProps = { iconProps: { iconName: 'Attach' } };

    const footer = <FooterComponent buttonProps={footerButtonProps} attachProp={attachButtonProp} />;

    return (
      <Stack tokens={{ childrenGap: 16 }}>
        <Chiclet url={TEST_URL} size={ChicletSize.xSmall} footer={footer} />
      </Stack>
    );
  }
}

export interface IFooterComponent extends React.Props<FooterComponent> {
  buttonProps: IButtonProps[];
  attachProp: IButtonProps;
}

function _renderFooter(buttonProps: IButtonProps[], attachProp: IButtonProps): React.ReactElement<HTMLDivElement> {
  return (
    <div className={exampleStyles.footer}>
      <div className={exampleStyles.actions}>
        <div className={exampleStyles.attach}>
          <IconButton {...attachProp} />
        </div>
      </div>
      <div className={exampleStyles.size}>{'samp'}</div>
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

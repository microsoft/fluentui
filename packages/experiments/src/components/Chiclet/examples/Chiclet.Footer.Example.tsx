import * as React from 'react';
import { Chiclet, ChicletSize } from '@uifabric/experiments';
import { IButtonProps, IconButton, Stack } from 'office-ui-fabric-react';
import { mergeStyles } from '@uifabric/merge-styles/lib/mergeStyles';

const TEST_URL = 'http://fabricweb.z5.web.core.windows.net/pr-deploy-site/refs/heads/master/chiclet-test.html';

export class FooterComponent extends React.Component<IFooterComponent, {}> {
  public render(): JSX.Element {
    const { buttonProps, activities } = this.props;

    return _renderFooter(buttonProps, activities);
  }
}

const footerStyle = mergeStyles({
  height: 36,
  paddingLeft: 11
});

const activitiesStyle = mergeStyles({
  width: 184,
  height: 16,
  fontSize: 12,
  fontWeight: 'normal',
  fontStyle: 'normal',
  fontStretch: 'normal',
  lineHeight: 1.83,
  letterSpacing: 'normal',
  float: 'left',
  paddingTop: 18,
  paddingBottom: 12,
  marginTop: 0
});

const actionsStyle = mergeStyles({
  paddingRight: 6,
  position: 'relative'
});

const actionStyle = mergeStyles({
  float: 'right',
  cursor: 'pointer',
  width: 32,
  height: 36,
  backgroundColor: 'white',
  color: '#0078d7'
});

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
        <Chiclet url={TEST_URL} title="Quarterly Results.docx" size={ChicletSize.medium} footer={footer} />
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
    <div className={footerStyle}>
      <div className={activitiesStyle}>{activities ? activities : null}</div>
      <div className={actionsStyle}>
        {buttonProps &&
          buttonProps.map((buttonProp: IButtonProps, index: number) => {
            return (
              <div className={actionStyle} key={index}>
                <IconButton {...buttonProp} />
              </div>
            );
          })}
      </div>
    </div>
  );
}

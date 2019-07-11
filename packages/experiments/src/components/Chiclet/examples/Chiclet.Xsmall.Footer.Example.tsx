import * as React from 'react';
import { Chiclet, ChicletSize } from '@uifabric/experiments';
import { IButtonProps, IconButton } from 'office-ui-fabric-react/lib/Button';
import { Icon, IIconProps } from 'office-ui-fabric-react/lib/Icon';
import { Stack } from 'office-ui-fabric-react/lib/Stack';
import { mergeStyles } from '@uifabric/merge-styles/lib/mergeStyles';

const SAMPLE_URL = 'https://contoso.sharepoint.com';

const footerStyle = mergeStyles({
  display: 'flex'
});

const activitiesStyle = mergeStyles({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  width: 190,
  fontSize: 12,
  lineHeight: 1.83,
  letterSpacing: 'normal'
});

const attachStyle = mergeStyles({
  height: '24px',
  width: '24px',
  fontSize: '16px',
  textAlign: 'center',
  marginTop: '6px',
  backgroundColor: 'white',
  color: '#0078d7'
});

const sizeStyle = mergeStyles({
  width: 25,
  fontSize: 12,
  alignSelf: 'center',
  lineHeight: 1.83,
  letterSpacing: 'normal'
});

export class ChicletXsmallFooterExample extends React.Component<{}, {}> {
  constructor(props: {}) {
    super(props);
  }

  public render(): JSX.Element {
    const footerButtonProps: IButtonProps[] = [{ iconProps: { iconName: 'More' } }, { iconProps: { iconName: 'CloudUpload' } }];

    const attachIconProp: IIconProps = { iconName: 'Attach' };

    const footer = <FooterComponent buttonProps={footerButtonProps} attachProps={attachIconProp} />;

    return (
      <Stack tokens={{ childrenGap: 16 }}>
        <Chiclet url={SAMPLE_URL} title="Quarterly Results.docx" itemType="docx" size={ChicletSize.xSmall} footer={footer} />
      </Stack>
    );
  }
}

export class FooterComponent extends React.Component<IFooterComponent, {}> {
  public render(): JSX.Element {
    const { buttonProps, attachProps } = this.props;

    return _renderFooter(buttonProps, attachProps);
  }
}

export interface IFooterComponent extends React.Props<FooterComponent> {
  buttonProps: IButtonProps[];
  attachProps: IIconProps;
}

function _renderFooter(buttonProps: IButtonProps[], attachProps: IIconProps): React.ReactElement<HTMLDivElement> {
  return (
    <div className={footerStyle}>
      <div className={attachStyle}>
        <Icon {...attachProps} />
      </div>
      <div className={sizeStyle}>{'4MB'}</div>
      <div className={activitiesStyle}>
        {buttonProps &&
          buttonProps.map((buttonProp: IButtonProps, index: number) => {
            return (
              <div key={index}>
                <IconButton {...buttonProp} />
              </div>
            );
          })}
      </div>
    </div>
  );
}

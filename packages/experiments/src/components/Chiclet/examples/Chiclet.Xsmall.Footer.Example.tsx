import * as React from 'react';
import { Chiclet, ChicletSize } from '@uifabric/experiments';
import { IButtonProps, IconButton, Stack } from 'office-ui-fabric-react';
import { mergeStyles } from '@uifabric/merge-styles/lib/mergeStyles';

export class FooterComponent extends React.Component<IFooterComponent, {}> {
  public render(): JSX.Element {
    const { buttonProps, attachProp } = this.props;

    return _renderFooter(buttonProps, attachProp);
  }
}

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
  width: 25,
  alignSelf: 'center',
  cursor: 'pointer',
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

    const attachButtonProp: IButtonProps = { iconProps: { iconName: 'Attach' } };

    const footer = <FooterComponent buttonProps={footerButtonProps} attachProp={attachButtonProp} />;

    return (
      <Stack tokens={{ childrenGap: 16 }}>
        <Chiclet
          url={'https://microsoft.sharepoint.com'}
          title="Quarterly Results"
          image="https://static2.sharepointonline.com/files/fabric/assets/brand-icons/document/svg/docx_48x1.svg"
          size={ChicletSize.xSmall}
          footer={footer}
        />
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
    <div className={footerStyle}>
      <div className={attachStyle}>
        <IconButton {...attachProp} />
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

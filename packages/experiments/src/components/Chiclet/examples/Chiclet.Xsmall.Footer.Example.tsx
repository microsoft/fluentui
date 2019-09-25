import * as React from 'react';
import { Chiclet, ChicletSize } from '@uifabric/experiments/lib/Chiclet';
import { IButtonProps, IconButton } from 'office-ui-fabric-react/lib/Button';
import { Icon, IIconProps } from 'office-ui-fabric-react/lib/Icon';
import { Text } from 'office-ui-fabric-react/lib/Text';
import { mergeStyles } from 'office-ui-fabric-react/lib/Styling';

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
  width: '16px',
  fontSize: '16px',
  marginTop: '6px',
  marginLeft: '6px',
  backgroundColor: 'white',
  color: '#0078d7'
});

const sizeStyle = mergeStyles({
  width: 34,
  alignSelf: 'center',
  lineHeight: 1.83,
  letterSpacing: 'normal'
});

export const ChicletXsmallFooterExample: React.FunctionComponent<{}> = () => {
  const footerButtonProps: IButtonProps[] = [{ iconProps: { iconName: 'More' } }, { iconProps: { iconName: 'CloudUpload' } }];
  const attachIconProp: IIconProps = { iconName: 'Attach' };
  const footer = <FooterComponent buttonProps={footerButtonProps} attachProps={attachIconProp} />;

  return (
    <Chiclet
      url={SAMPLE_URL}
      title="Quarterly Results.docx"
      image="https://static2.sharepointonline.com/files/fabric/assets/brand-icons/product/svg/word_16x1_5.svg"
      itemType="docx"
      size={ChicletSize.xSmall}
      footer={footer}
    />
  );
};

class FooterComponent extends React.Component<IFooterComponent, {}> {
  public render(): JSX.Element {
    const { buttonProps, attachProps } = this.props;
    return _renderFooter(buttonProps, attachProps);
  }
}

interface IFooterComponent extends React.Props<FooterComponent> {
  buttonProps: IButtonProps[];
  attachProps: IIconProps;
}

function _renderFooter(buttonProps: IButtonProps[], attachProps: IIconProps): React.ReactElement<HTMLDivElement> {
  return (
    <div className={footerStyle}>
      <Icon {...attachProps} className={attachStyle} />
      <Text variant="small" className={sizeStyle}>
        {'4MB'}
      </Text>
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

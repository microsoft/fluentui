import * as React from 'react';
import { Chiclet, ChicletSize } from '@uifabric/experiments';
import { IButtonProps, IconButton } from 'office-ui-fabric-react/lib/Button';
import { Text } from 'office-ui-fabric-react/lib/Text';
import { mergeStyles } from '@uifabric/merge-styles/lib/mergeStyles';

const SAMPLE_URL = 'https://contoso.sharepoint.com';

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
  lineHeight: 1.83,
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

export const ChicletFooterExample: React.FunctionComponent<{}> = () => {
  const footerButtonProps: IButtonProps[] = [
    { iconProps: { iconName: 'More' } },
    { iconProps: { iconName: 'Save' } },
    { iconProps: { iconName: 'Share' } }
  ];
  const footer = <FooterComponent buttonProps={footerButtonProps} activities="10 Comments  16 Shares  87 Views" />;

  return <Chiclet url={SAMPLE_URL} title="Quarterly Results.docx" size={ChicletSize.medium} footer={footer} />;
};

export interface IFooterComponent extends React.Props<FooterComponent> {
  buttonProps: IButtonProps[];
  activities: string;
}

function _renderFooter(buttonProps: IButtonProps[], activities: string): React.ReactElement<HTMLDivElement> {
  return (
    <div className={footerStyle}>
      <Text variant="small" className={activitiesStyle}>
        {activities}
      </Text>
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

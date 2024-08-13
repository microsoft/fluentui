import * as React from 'react';
import { Chiclet, ChicletSize } from '@fluentui/react-experiments';
import { IButtonProps, IconButton } from '@fluentui/react/lib/Button';
import { Text } from '@fluentui/react/lib/Text';
import { mergeStyles, FontWeights } from '@fluentui/react/lib/Styling';

const SAMPLE_URL = 'https://contoso.sharepoint.com';

class FooterComponent extends React.Component<IFooterComponent, {}> {
  public render(): JSX.Element {
    const { buttonProps, activities } = this.props;

    return _renderFooter(buttonProps, activities);
  }
}

const footerStyle = mergeStyles({
  display: 'flex',
  position: 'absolute',
  alignItems: 'flex-end',
  justifyContent: 'flex-start',
  height: 36,
  width: '100%',
  bottom: 0,
});

const activitiesStyle = mergeStyles({
  paddingLeft: 16,
  paddingBottom: 8,
  fontWeight: FontWeights.semibold,
});

const actionsStyle = mergeStyles({
  display: 'flex',
  fontSize: 16,
  marginLeft: 'auto',
});

const actionStyle = mergeStyles({
  cursor: 'pointer',
  width: 32,
  height: 36,
  backgroundColor: 'white',
  color: '#0078d7',
});

export const ChicletFooterExample: React.FunctionComponent<{}> = () => {
  const footerButtonProps: IButtonProps[] = [
    { iconProps: { iconName: 'More' } },
    { iconProps: { iconName: 'Save' } },
    { iconProps: { iconName: 'Share' } },
  ];
  const footer = <FooterComponent buttonProps={footerButtonProps} activities="10 Comments  16 Shares  87 Views" />;

  return (
    <Chiclet
      url={SAMPLE_URL}
      image="https://res-1.cdn.office.net/files/fabric-cdn-prod_20230815.002/assets/item-types/96/docx.svg"
      title="Quarterly Results.docx"
      size={ChicletSize.medium}
      footer={footer}
    />
  );
};

// eslint-disable-next-line deprecation/deprecation
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

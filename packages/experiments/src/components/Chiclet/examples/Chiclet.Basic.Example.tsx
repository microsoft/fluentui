import * as React from 'react';
import {
  Chiclet
} from '../Chiclet';
import { ChicletSize } from '../Chiclet.types';
import { IButtonProps } from 'office-ui-fabric-react/lib/Button';
import * as exampleStyles from './Chiclet.Basic.Example.scss';
import { IconButton } from 'office-ui-fabric-react/lib/Button';

export class ChicletBasicExample extends React.Component<any, any> {
  constructor(props: {}) {
    super(props);
  }

  public render() {
    var footerButtonProps: IButtonProps[] = [{ iconProps: { iconName: 'More' } }, { iconProps: { iconName: 'Save' } }, { iconProps: { iconName: 'Share' } }];
    var footer = <FooterComponent buttonProps={ footerButtonProps } activities="10 Comments  16 Shares  87 Views" />;

    return (
      <Chiclet url="http://localhost:4322" size={ ChicletSize.medium } footer={ footer }
      />
    );
  }
}

export class FooterComponent extends React.Component<any, any> {
  constructor(props: {}) {
    super(props);
  }

  public render() {
    const { buttonProps, activities } = this.props;

    return _renderFooter(buttonProps, activities);
  }
}

export interface IFooterComponent extends React.Props<FooterComponent> {
  buttonProps: IButtonProps[];
  activities: string;
}

function _renderFooter(buttonProps: IButtonProps[], activities: string): React.ReactElement<any> {
  return (<div className={ exampleStyles.footer }>
    <div className={ exampleStyles.activities }>
      { activities ? activities : (null) }
    </div>
    <div className={ exampleStyles.actions }>
      { buttonProps && buttonProps.map((buttonProp, index) => {
        return (
          <div className={ exampleStyles.action } key={ index }>
            <IconButton { ...buttonProp } />
          </div>
        );
      }) }
    </div>
  </div>);
}
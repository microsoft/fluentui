import * as React from 'react';
import {
  BaseChiclet
} from '../BaseChiclet';
import { ChicletSize } from '../Chiclet.types';
import { IButtonProps } from 'office-ui-fabric-react/lib/Button';
import * as exampleStyles from './Chiclet.Basic.Example.scss';
import { IconButton } from 'office-ui-fabric-react/lib/Button';

export class ChicletBasicExample extends React.Component<any, any> {
  constructor(props: {}) {
    super(props);
  }

  public render() {
    var footerButtonProps: IButtonProps[] = [{ iconProps: { iconName: 'Breadcrumb' } }, { iconProps: { iconName: 'Save' } }, { iconProps: { iconName: 'Share' } }];
    var footer = <FooterComponent buttonProps={ footerButtonProps } />
    return (
      <BaseChiclet url="http://localhost:4322" size={ ChicletSize.Medium } footer={ footer }
      />
    );
  }

}

export class FooterComponent extends React.Component<any, any> {
  constructor(props: {}) {
    super(props);
  }

  public render() {
    const { buttonProps } = this.props;

    return _renderFooter(buttonProps);
  }
}

export interface IFooterComponent extends React.Props<FooterComponent> {
  buttonProps: IButtonProps[];
}

function _renderFooter(buttonProps: IButtonProps[]): React.ReactElement<any> {
  return (<div className={ exampleStyles.footer }>
    { buttonProps && buttonProps.map((buttonProp, index) => {
      return (
        <div className={ exampleStyles.action } key={ index }>
          <IconButton { ...buttonProp } />
        </div>
      );
    }) }
  </div>);
}

import * as React from 'react';
import { IProperty, PropertyType, PropertiesTable } from './PropertiesTable';
import { IPropertiesTableSetProps } from './PropertiesTableSet.Props';
import { parse } from '../../utilities/parser/index';

export interface IPropertiesTableSetState {
  properties: Array<IProperty>;
};

export class PropertiesTableSet extends React.Component<IPropertiesTableSetProps, IPropertiesTableSetState> {
  public static defaultProps = {
    title: 'Properties'
  };

  constructor(props: IPropertiesTableSetProps) {
    super(props);
    let component = props.componentName;
    let src = require('../../../components/' + component + '/' + component + '.Props.ts');
    let properties: IProperty[] = [];

    if (props.renderOnly) {
      props.renderOnly.forEach((item: string) => {
        properties.concat(parse(src, item));
      });
    } else {
      properties = parse(src);
    }

    this.state = {
      properties: properties
    };
  }

  public renderEach() {
    return this.state.properties.map((item: IProperty) =>
      (<PropertiesTable
        key={ item.propertyName }
        title={ item.propertyName }
        properties={ item.property }
        renderAsEnum={ item.propertyType === PropertyType.enum } />));
  }

  public render() {
    return (
      <div>
        { this.renderEach() }
      </div>
    );
  }
}

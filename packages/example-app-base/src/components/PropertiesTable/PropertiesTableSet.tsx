import * as React from 'react';
import { IProperty, PropertyType } from '../../utilities/parser/index';
import { PropertiesTable } from './PropertiesTable';
import { IPropertiesTableSetProps } from './PropertiesTableSet.Props';
import { parse } from '../../utilities/parser/index';

export interface IPropertiesTableSetState {
  properties: Array<IProperty>;
}

export class PropertiesTableSet extends React.Component<IPropertiesTableSetProps, IPropertiesTableSetState> {
  public static defaultProps = {
    title: 'Properties'
  };

  constructor(props: IPropertiesTableSetProps) {
    super(props);
    let { componentName, componentPath, sources } = props;
    let src: any;
    let properties: IProperty[] = [];

    if (sources) {
      src = '';
      sources.forEach(source => src += source);
    } else if (componentPath && componentName) {
      src = require(componentPath + componentName + '.Props.ts');
    } else {
      throw new Error('PropertiesTableSet was used without source or a componentPath/name');
    }

    if (props.renderOnly) {
      props.renderOnly.forEach((item: string) => {
        properties = properties.concat(parse(src, item));
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
        title={ item.name === ('I' + this.props.componentName) ? (this.props.componentName + ' class') : item.propertyName }
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

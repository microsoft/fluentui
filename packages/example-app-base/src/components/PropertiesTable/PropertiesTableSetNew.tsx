import * as React from 'react';
import { autobind } from 'office-ui-fabric-react/lib/Utilities';
import { IEnumProperty, IInterfaceProperty } from '../../utilities/parser/interfaces';
import { IProperty, PropertyType } from '../../utilities/parser/index';
import { PropertiesTable } from './PropertiesTable';
import { ChoiceGroup, IChoiceGroupOption } from 'office-ui-fabric-react/lib/ChoiceGroup';
import { IPropertiesTableSetProps } from './PropertiesTableSet.Props';
import { TextField } from 'office-ui-fabric-react/lib/TextField';
// import { parse } from '../../utilities/parser/index';

// tslint:disable-next-line:no-unused-variable
const DOCS = require('../../../docs.json') as JSON;

export interface IPropertiesTableSetStateNew {
  properties: Array<IProperty>;
  propsFormat: string;
  propsFilter: string | null;
}

export enum PropsFormat {
  Alphabetical = '1',
  Grouped = '2'
}

export class PropertiesTableSetNew extends React.Component<IPropertiesTableSetProps, IPropertiesTableSetStateNew> {
  constructor(props: IPropertiesTableSetProps) {
    super(props);
    let {
      sources
    } = props;

    let properties: IProperty[] = [];

    if (sources) {
      sources.forEach((source: string) => {
        getProperties(source);
      });
    }

    function getProperties(src: string): void {
      if (DOCS[src] && !isAlreadyInProperties(src)) {
        properties.push(DOCS[src]);

        if (DOCS[src].extends.length > 0) {
          DOCS[src].extends.forEach((prop: string) => getProperties(prop));
        }
      }
    }

    function isAlreadyInProperties(source: string): boolean {
      return properties.filter((prop: IProperty) => prop.name === source).length > 0;
    }

    this.state = {
      properties: properties,
      propsFormat: PropsFormat.Grouped,
      propsFilter: null
    };
  }

  public renderEach(): JSX.Element | JSX.Element[] {
    let { propsFormat, propsFilter } = this.state;

    if (propsFormat === PropsFormat.Alphabetical) {
      let combinedProps: (IInterfaceProperty | IEnumProperty)[] = [];

      // Flatten into single array (not grouped by interface)
      this.state.properties.forEach((item: IProperty) => {
        combinedProps = combinedProps.concat(item.property);
      });

      let filteredProps: (IInterfaceProperty | IEnumProperty)[] = combinedProps;

      // Filter by search text
      if (propsFilter) {
        filteredProps = combinedProps.filter((prop: IInterfaceProperty | IEnumProperty) => {
          return this._containsFilterText(prop);
        });
      }

      return (
        <PropertiesTable
          key={ filteredProps.length.toString() }
          title={ this.props.componentName }
          properties={ filteredProps }
          renderAsEnum={ false } // TODO: Handle Enum
        />
      );
    }
    return this.state.properties.map((item: IProperty) => {
      let filteredProps = (item.property as (IInterfaceProperty | IEnumProperty)[]).filter((prop: (IInterfaceProperty | IEnumProperty)) => {
        return this._containsFilterText(prop);
      });
      return {
        ...item,
        property: filteredProps
      };
    }).map((item: IProperty) => (
      <PropertiesTable
        key={ item.propertyName + item.property.length }
        title={ item.name === ('I' + this.props.componentName) ? (this.props.componentName + ' class') : item.propertyName }
        properties={ item.property }
        renderAsEnum={ item.propertyType === PropertyType.enum }
      />
    ));
  }

  public render(): JSX.Element {
    return (
      <div>
        <TextField
          label='Filter props by name or description'
          onChanged={ this._onChangeFilter }
        />
        <ChoiceGroup
          defaultSelectedKey='2'
          selectedKey={ this.state.propsFormat }
          options={ [
            {
              key: '2',
              text: 'Group props by interface'
            },
            {
              key: '1',
              text: 'Combine props alphabetically',
            }
          ] }
          onChange={ this._onChangePropsFormat }
          required={ false }
        />
        { this.renderEach() }
      </div>
    );
  }

  private _containsFilterText(prop: IInterfaceProperty | IEnumProperty): boolean {
    let filter = this.state.propsFilter ? this.state.propsFilter : '';

    return prop.name.toLowerCase().indexOf(filter.toLowerCase()) > -1 ||
      prop.description.toLowerCase().indexOf(filter.toLowerCase()) > -1;
  }

  @autobind
  private _onChangePropsFormat(ev: React.FormEvent<HTMLInputElement>, option: IChoiceGroupOption): void {
    this.setState(() => ({
      propsFormat: option.key
    }));
  }

  @autobind
  private _onChangeFilter(propsFilter: string): void {
    this.setState(() => ({ propsFilter }));
  }
}

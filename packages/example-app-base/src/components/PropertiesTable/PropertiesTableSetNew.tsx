import * as React from 'react';
import { autobind, BaseComponent } from 'office-ui-fabric-react/lib/Utilities';
import { IEnumProperty, IInterfaceProperty } from '../../utilities/parser/interfaces';
import { IProperty, PropertyType } from '../../utilities/parser/index';
import { PropertiesTable } from './PropertiesTable';
import { ChoiceGroup, IChoiceGroupOption } from 'office-ui-fabric-react/lib/ChoiceGroup';
import { IPropertiesTableSetProps } from './PropertiesTableSet.Props';
import { TextField } from 'office-ui-fabric-react/lib/TextField';
// import { parse } from '../../utilities/parser/index';

// tslint:disable-next-line:no-unused-variable
const DOCS = require('../../../docs.json') as JSON;
const DEBOUNCE_DELAY = 200;

export interface IPropertiesTableSetStateNew {
  properties: Array<IProperty>;
  propsFormat: PropsFormat;
  propsFilter: string | null;
}

export enum PropsFormat {
  Alphabetical = '1',
  Grouped = '2'
}

export class PropertiesTableSetNew extends BaseComponent<IPropertiesTableSetProps, IPropertiesTableSetStateNew> {
  constructor(props: IPropertiesTableSetProps) {
    super(props);
    let {
      sources
    } = props;

    this._onChangeFilter = this._async.debounce(this._onChangeFilter, DEBOUNCE_DELAY);

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

  @autobind
  public render(): JSX.Element {
    return (
      <div>
        <TextField
          iconProps={ { iconName: 'Search' } }
          label='Filter props by name or description'
          onChanged={ this._onChangeFilter }
          placeholder='Search'
        />
        <ChoiceGroup
          defaultSelectedKey={ PropsFormat.Grouped }
          selectedKey={ this.state.propsFormat }
          options={ [
            {
              key: PropsFormat.Grouped,
              text: 'Group props by interface'
            },
            {
              key: PropsFormat.Alphabetical,
              text: 'Combine props alphabetically',
            }
          ] }
          onChange={ this._onChangePropsFormat }
          required={ false }
        />
        {
          this.state.propsFormat === PropsFormat.Alphabetical ?
            this._renderAlphabetical() :
            this._renderGrouped()
        }
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

  @autobind
  private _renderAlphabetical(): JSX.Element {
    let { propsFilter } = this.state;
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
        // key={ Math.random().toString() } // Why does this need a unique key to re-render?
        title={ this.props.componentName }
        properties={ filteredProps }
        renderAsEnum={ false } // TODO: Handle Enum
      />
    );
  }

  @autobind
  private _renderGrouped(): JSX.Element[] {
    let { propsFilter } = this.state;
    let filteredProps: IProperty[] = this.state.properties;

    if (propsFilter) {
      filteredProps = this.state.properties.map((item: IProperty): IProperty => {
        let property = (item.property as (IInterfaceProperty | IEnumProperty)[]).filter((prop: (IInterfaceProperty | IEnumProperty)) => {
          return this._containsFilterText(prop);
        });
        return {
          ...item,
          property
        } as IProperty;
      });
    }

    return filteredProps.map((item: IProperty): JSX.Element => (
      <PropertiesTable
        key={ Math.random().toString() } // Why does this need a unique key to re-render?
        title={ item.name === ('I' + this.props.componentName) ? (this.props.componentName + ' class') : item.propertyName }
        properties={ item.property }
        renderAsEnum={ item.propertyType === PropertyType.enum }
      />
    ));
  }
}

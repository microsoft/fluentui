import * as React from 'react';
import { autobind, BaseComponent } from 'office-ui-fabric-react/lib/Utilities';
import { IEnumProperty, IInterfaceProperty } from '../../utilities/parser/interfaces';
import { IProperty, PropertyType } from '../../utilities/parser/index';
import { PropertiesTable } from './PropertiesTable';
import { ChoiceGroup, IChoiceGroupOption } from 'office-ui-fabric-react/lib/ChoiceGroup';
import { IPropertiesTableSetProps } from './PropertiesTableSet.Props';
import { TextField } from 'office-ui-fabric-react/lib/TextField';

// const DOCS = require('../../../docs.json') as JSON;
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
      json
    } = props;

    this._onChangeFilter = this._async.debounce(this._onChangeFilter, DEBOUNCE_DELAY);

    let properties: IProperty[] = [];

    // let regex2 = new RegExp('\\S*!(\\S*)\'', 'g');
    // let sourceFile = regex2.exec(sources![0]); // sourceFile, i.e. *.Props.ts
    // let lastSlashIndex = sourceFile![1].lastIndexOf('/');
    // let path = sourceFile![1].substring(0, lastSlashIndex);

    // properties = require('../../../../office-ui-fabric-react/src/components/Checkbox/docs.json');

    json!.forEach((source: IProperty) => properties = properties.concat(source));
    // properties = sources![0];
    // if (sources) {
    //   sources.forEach((source: string) => {
    //     getProperties(source);
    //   });
    // }

    // function getProperties(src: string): void {
    //   if (DOCS[src] && !isAlreadyInProperties(src)) {
    //     properties.push(DOCS[src]);

    //     if (DOCS[src].extends.length > 0) {
    //       DOCS[src].extends.forEach((prop: string) => getProperties(prop));
    //     }
    //   }
    // }

    // function isAlreadyInProperties(source: string): boolean {
    //   return properties.filter((prop: IProperty) => prop.name === source).length > 0;
    // }

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
          // defaultSelectedKey={ PropsFormat.Grouped }
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
            this._renderGrouped(this._filterProps())
        }
      </div>
    );
  }

  @autobind
  private _filterProps(): IProperty[] {
    let filteredProps: IProperty[] = [];

    filteredProps = this.state.properties.map((item: IProperty): IProperty => {
      let property = (item.property as (IInterfaceProperty | IEnumProperty)[]).filter((prop: (IInterfaceProperty | IEnumProperty)) => {
        let filter = this.state.propsFilter ? this.state.propsFilter : '';

        if (!filter) {
          return true;
        }
        return prop.name.toLowerCase().indexOf(filter.toLowerCase()) > -1 ||
          prop.description.toLowerCase().indexOf(filter.toLowerCase()) > -1;
      });

      return {
        ...item,
        property
      } as IProperty;
    });

    return filteredProps;
  }

  @autobind
  private _onChangePropsFormat(ev: React.FormEvent<HTMLInputElement>, option: IChoiceGroupOption): void {
    this.setState(() => ({ propsFormat: option.key }));
  }

  @autobind
  private _onChangeFilter(propsFilter: string): void {
    this.setState(() => ({ propsFilter }));
  }

  @autobind
  private _renderAlphabetical(): (JSX.Element | null)[] {
    let combinedInterfaceProps: IInterfaceProperty[] = [];
    let combinedEnumProps: IProperty[] = [];

    let filteredProps: IProperty[] = this._filterProps();

    filteredProps.forEach((item: IProperty) => {
      if (item.propertyType === PropertyType.interface) {
        combinedInterfaceProps = combinedInterfaceProps.concat(item.property as IInterfaceProperty[]);
      } else {
        combinedEnumProps = combinedEnumProps.concat(item);
      }
    });

    return [
      (
        <PropertiesTable
          // key={ Math.random().toString() } // Why does this need a unique key to re-render?
          key='Alphabetical'
          title={ this.props.componentName }
          properties={ combinedInterfaceProps }
          renderAsEnum={ false }
        />
      )
    ].concat(this._renderGrouped(combinedEnumProps)); // Enums should always render grouped
  }

  @autobind
  private _renderGrouped(props: IProperty[]): JSX.Element[] {
    return props.map((item: IProperty): JSX.Element => (
      <PropertiesTable
        // key={ Math.random().toString() } // Why does this need a unique key to re-render?
        key={ item.name }
        title={ item.name === ('I' + this.props.componentName) ? (this.props.componentName + ' class') : item.propertyName }
        properties={ item.property }
        renderAsEnum={ item.propertyType === PropertyType.enum }
      />
    ));
  }
}

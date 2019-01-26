import * as React from 'react';
import { IProperty, PropertyType, IInterfaceProperty, IEnumProperty } from '../../utilities/parser/index';
// import { CollapsibleSection } from '@uifabric/experiments';
import { PropertiesTable } from './PropertiesTable';
import { IPropertiesTableSetProps, IEnumTableRowJson, ITableRowJson } from './PropertiesTableSet.types';
import { InterfacePropertyType } from '../../utilities/parser/index';

export interface IPropertiesTableSetState {
  properties: Array<IProperty>;
}

export class PropertiesTableSet extends React.Component<IPropertiesTableSetProps, IPropertiesTableSetState> {
  constructor(props: IPropertiesTableSetProps) {
    super(props);

    this.state = {
      properties: this._generatePropertyArray()
    };
  }

  public renderFirst(): JSX.Element | undefined {
    if (this.state.properties.length >= 1) {
      let item = this.state.properties[0];
      return (
        <PropertiesTable
          key={item.propertyName}
          name={item.propertyName}
          title={item.title}
          description={item.description}
          extendsTokens={item.extendsTokens}
          properties={item.property}
          renderAsEnum={item.propertyType === PropertyType.enum}
        />
      );
    }
    return undefined;
  }

  public renderEach(): JSX.Element | undefined {
    if (this.state.properties.length >= 1) {
      return (
        <div>
          {/* <CollapsibleSection key={1} defaultCollapsed={true} title={'See More'} styles={{ root: { fontSize: '21px' } }}> */}
          {this.state.properties.map((item: IProperty, index: number) =>
            index !== 0 ? (
              <PropertiesTable
                key={item.propertyName}
                name={item.propertyName}
                title={item.title}
                description={item.description}
                extendsTokens={item.extendsTokens}
                properties={item.property}
                renderAsEnum={item.propertyType === PropertyType.enum}
              />
            ) : (
              <div key={'table-' + index} />
            )
          )}
          {/* </CollapsibleSection> */}
        </div>
      );
    }
    return undefined;
  }

  public render(): JSX.Element {
    return (
      <div>
        {this.renderFirst()}
        {this.renderEach()}
      </div>
    );
  }

  private _generatePropertyArray(): Array<IProperty> {
    let results: Array<IProperty> = [];
    const { jsonDocs } = this.props;

    if (jsonDocs) {
      for (let j = 0; j < jsonDocs.tables.length; j++) {
        switch (jsonDocs.tables[j].kind) {
          case 'enum': {
            let enumMembers: IEnumProperty[] = [];

            const members: IEnumTableRowJson[] = jsonDocs.tables[j].members as IEnumTableRowJson[];
            for (let k = 0; k < members.length; k++) {
              // each member within the enum
              enumMembers.push({
                description: members[k].descriptionHtml,
                name: members[k].name,
                value: members[k].value
              });
            }

            // the enum
            results.push({
              propertyName: jsonDocs.tables[j].name,
              description: jsonDocs.tables[j].descriptionHtml,
              title: jsonDocs.tables[j].kind ? jsonDocs.tables[j].name + ' ' + jsonDocs.tables[j].kind : jsonDocs.tables[j].name,
              propertyType: PropertyType.enum,
              property: enumMembers
            });

            break;
          }
          case 'interface': {
            let interfaceMembers: IInterfaceProperty[] = [];

            const members: ITableRowJson[] = jsonDocs.tables[j].members as ITableRowJson[];
            for (let k = 0; k < members.length; k++) {
              // each member within the interface
              interfaceMembers.push({
                description: members[k].descriptionHtml,
                name: members[k].name,
                typeTokens: members[k].typeTokens,
                deprecated: members[k].deprecated
              });
            }

            // the interface
            results.push({
              propertyName: jsonDocs.tables[j].name,
              description: jsonDocs.tables[j].descriptionHtml,
              extendsTokens: jsonDocs.tables[j].extendsTokens,
              title: jsonDocs.tables[j].kind ? jsonDocs.tables[j].name + ' ' + jsonDocs.tables[j].kind : jsonDocs.tables[j].name,
              propertyType: PropertyType.interface,
              property: interfaceMembers
            });

            break;
          }
        }
      }
    }

    return results;
  }
}

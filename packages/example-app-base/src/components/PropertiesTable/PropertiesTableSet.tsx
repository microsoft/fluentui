import * as React from 'react';
import { IProperty, PropertyType, IInterfaceProperty, IEnumProperty } from '../../utilities/parser/index';
import {
  CollapsibleSection,
  ICollapsibleSectionTitleComponent,
  ICollapsibleSectionTitleStylesReturnType,
  ICollapsibleSectionTitleProps
} from '@uifabric/experiments';
import { PropertiesTable } from './PropertiesTable';
import { IPropertiesTableSetProps, IEnumTableRowJson, ITableRowJson } from './PropertiesTableSet.types';
import { InterfacePropertyType } from '../../utilities/parser/index';
import { ITheme } from 'office-ui-fabric-react/lib/Styling';

export interface IPropertiesTableSetState {
  properties: Array<IProperty>;
}

const getPropTitleStyles: ICollapsibleSectionTitleComponent['styles'] = (
  props: ICollapsibleSectionTitleProps,
  theme: ITheme
): ICollapsibleSectionTitleStylesReturnType => ({
  text: [theme.fonts.large]
});

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
    if (this.state.properties.length > 1) {
      return (
        <div>
          <CollapsibleSection key={1} defaultCollapsed={true} title={{ text: 'See More', styles: getPropTitleStyles }}>
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
          </CollapsibleSection>
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
    let iComponentProps: Array<IProperty> = [];
    let preResults: Array<IProperty> = [];
    const pattern: RegExp = /(I.*?Props)/;

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
            preResults.push({
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
            if (pattern.test(jsonDocs.tables[j].name)) {
              iComponentProps.push({
                propertyName: jsonDocs.tables[j].name,
                description: jsonDocs.tables[j].descriptionHtml,
                extendsTokens: jsonDocs.tables[j].extendsTokens,
                title: jsonDocs.tables[j].kind ? jsonDocs.tables[j].name + ' ' + jsonDocs.tables[j].kind : jsonDocs.tables[j].name,
                propertyType: PropertyType.interface,
                property: interfaceMembers
              });
            } else {
              preResults.push({
                propertyName: jsonDocs.tables[j].name,
                description: jsonDocs.tables[j].descriptionHtml,
                extendsTokens: jsonDocs.tables[j].extendsTokens,
                title: jsonDocs.tables[j].kind ? jsonDocs.tables[j].name + ' ' + jsonDocs.tables[j].kind : jsonDocs.tables[j].name,
                propertyType: PropertyType.interface,
                property: interfaceMembers
              });
            }

            break;
          }
        }
      }
    }

    results = iComponentProps;
    for (let result of preResults) {
      results.push(result);
    }

    return results;
  }
}

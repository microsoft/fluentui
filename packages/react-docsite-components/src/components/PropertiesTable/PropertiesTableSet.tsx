import * as React from 'react';
import { IProperty, PropertyType, parse } from '../../utilities/parser/index';
import { PropertiesTable } from './PropertiesTable';
import {
  IPropertiesTableSetProps,
  IPropertiesTableSetStyleProps,
  IPropertiesTableSetStyles,
} from './PropertiesTableSet.types';
import { getStyles } from './PropertiesTableSet.styles';
import { styled } from '@fluentui/react/lib/Utilities';

const PropertiesTableSetBase: React.FunctionComponent<IPropertiesTableSetProps> = props => {
  const { componentName, componentPath, sources } = props;
  let src: string;
  let properties: IProperty[] = [];

  if (sources) {
    src = sources.join('');
  } else if (componentPath && componentName) {
    src = require(componentPath + componentName + '.types.ts');
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

  return (
    <div>
      {properties.map(item => (
        <PropertiesTable
          key={item.propertyName}
          title={item.name === 'I' + props.componentName ? props.componentName + ' class' : item.propertyName}
          properties={item.property}
          renderAsEnum={item.propertyType === PropertyType.enum}
        />
      ))}
    </div>
  );
};

export const PropertiesTableSet: React.FunctionComponent<IPropertiesTableSetProps> = styled<
  IPropertiesTableSetProps,
  IPropertiesTableSetStyleProps,
  IPropertiesTableSetStyles
>(PropertiesTableSetBase, getStyles, undefined, {
  scope: 'PropertiesTableSet',
});

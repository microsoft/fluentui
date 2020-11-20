import {
  callable,
  Grid,
  Header,
  Segment,
  useFluentContext,
  ThemeComponentVariablesPrepared,
} from '@fluentui/react-northstar';
import * as _ from 'lodash';
import * as React from 'react';

import ComponentExampleVariable, { ComponentExampleVariableProps } from './ComponentExampleVariable';
import { mergeThemeVariables } from '@fluentui/styles';

type ComponentExampleVariablesProps = {
  onChange: ComponentExampleVariableProps['onChange'];
  overriddenVariables: ThemeComponentVariablesPrepared;
  usedVariables: Record<string, string[]>;
};

const getGroupName = (variableName: string): string => {
  if (/^(font|letter|line)/i.test(variableName)) return 'Typography';
  if (/color/i.test(variableName)) return 'Colors';
  if (/border/i.test(variableName)) return 'Border';
  if (/position|display|margin|padding|width|height|radius/i.test(variableName)) {
    return 'Box Model';
  }
  return 'Other';
};

const ComponentExampleVariables: React.FunctionComponent<ComponentExampleVariablesProps> = props => {
  const { onChange, overriddenVariables, usedVariables } = props;

  const { theme } = useFluentContext();
  const [hideUnused] = React.useState(true);

  const componentVariables: ThemeComponentVariablesPrepared = _.pickBy(
    mergeThemeVariables(theme.componentVariables, overriddenVariables),
    (componentVariables, componentName) => {
      return usedVariables[componentName];
    },
  );
  const filteredVariables = _.omitBy(
    _.mapValues(componentVariables, (variables, componentName) =>
      _.reduce(
        callable(variables)(theme.siteVariables),
        (acc, variableValue, variableName) => {
          const visible =
            typeof variableValue === 'string' && // TODO: remove after variables will be flatten
            (hideUnused || usedVariables[componentName].indexOf(variableName) !== -1);

          if (visible) {
            acc[variableName] = variableValue;
          }

          return acc;
        },
        {},
      ),
    ),
    _.isEmpty,
  );

  return (
    <div>
      {/* Temporarily disabled as the functionality in useEnhancedRenderer is broken */}
      {/* <Checkbox */}
      {/*  checked={!hideUnused} */}
      {/*  label="Hide unused variables" */}
      {/*  onChange={(e, data) => setHideUnused(!data.checked)} */}
      {/*  styles={{ float: 'right', top: '1.25rem', right: '1.25rem' }} */}
      {/* /> */}

      {_.map(filteredVariables, (componentVariables, componentName) => {
        const groupedVariables: Record<string, string[]> = _.groupBy(
          Object.keys(componentVariables).sort(),
          getGroupName,
        );

        return (
          <Segment key={componentName}>
            <Header as="h2" styles={{ marginTop: 0 }}>
              {componentName}
            </Header>

            {_.map(groupedVariables, (variableNames, groupName) => (
              <>
                <Header as="h3" styles={{ marginTop: '4px', marginBottom: '4px' }}>
                  {groupName}
                </Header>
                <Grid columns={4}>
                  {_.map(variableNames, variableName => (
                    <ComponentExampleVariable
                      componentName={componentName}
                      key={variableName}
                      onChange={onChange}
                      variableName={variableName}
                      variableType={/color/i.test(variableName) ? 'color' : 'string'}
                      variableValue={componentVariables[variableName]}
                    />
                  ))}
                </Grid>
              </>
            ))}
          </Segment>
        );
      })}
    </div>
  );
};

export default ComponentExampleVariables;

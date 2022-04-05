import { mergeThemes, callable, ComponentStyleFunctionParam, teamsTheme } from '@fluentui/react-northstar';
import * as React from 'react';
import * as _ from 'lodash';

/**
 * Not a real performance test, just a temporary POC
 */
const providerMergeThemesPerf = () => {
  const merged = _.times(100).reduce(acc => {
    return mergeThemes(acc, teamsTheme);
  }, teamsTheme);
  const resolvedStyles = _.mapValues(merged.componentStyles, (componentStyle, componentName) => {
    const compVariables = _.get(merged.componentVariables, componentName, callable({}))(merged.siteVariables);
    const styleParam: ComponentStyleFunctionParam = {
      props: {},
      variables: compVariables,
      theme: merged,
      rtl: false,
      disableAnimations: false,
    };
    return _.mapValues(componentStyle, (partStyle, partName) => {
      if (partName === '_debug') {
        // TODO: fix in code, happens only with mergeThemes(singleTheme)
        return undefined;
      }
      if (typeof partStyle !== 'function') {
        // eslint-disable-next-line no-console
        console.log(componentName, partStyle, partName);
      }
      return partStyle(styleParam);
    });
  });

  return resolvedStyles;
};

const ProviderMergeThemesPerf = () => {
  const resolvedStyles = providerMergeThemesPerf();
  delete (resolvedStyles.Button.root as any)._debug;
  return <pre>{JSON.stringify(resolvedStyles.Button.root, null, 2)}</pre>;
};

ProviderMergeThemesPerf.iterations = 1;
ProviderMergeThemesPerf.filename = 'ProviderMergeThemes.perf.tsx';

export default ProviderMergeThemesPerf;

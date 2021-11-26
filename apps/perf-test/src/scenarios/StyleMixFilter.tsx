import { makeStyles, createDOMRenderer, MakeStylesStyleRule } from '@fluentui/make-styles';
import * as React from 'react';
import { forcedColorsFilter, RULE_COUNT } from '../utils';

const ruleCount = RULE_COUNT / 4;
const maxWidthAndForcedColorsAndNormal = () => {
  const styleRules: Record<string, MakeStylesStyleRule<{}>> = {};
  for (let i = 1; i <= ruleCount; i++) {
    const rule: MakeStylesStyleRule<{}> = {
      width: '20px',
      height: '20px',
      backgroundColor: 'red',
      padding: `${i}px`,
      margin: `${i}px`,
      '@media (max-width: 1000px)': {
        padding: `${i}px`,
      },
      '@media (forced-colors: active)': {
        padding: `${i}px`,
      },
    };

    styleRules[`media-${i}`] = rule;
  }
  return styleRules;
};

const renderer = createDOMRenderer(document, { filterRule: forcedColorsFilter });

const useStyles = makeStyles(maxWidthAndForcedColorsAndNormal());
const View: React.FunctionComponent = () => {
  const styles = useStyles({ dir: 'ltr', renderer });
  const elements: React.ReactNode[] = [];
  for (let i = 1; i <= ruleCount; i++) {
    elements.push(<div className={styles[`media-${i}`]} />);
  }

  return <div>{elements}</div>;
};

const Scenario = () => <View />;

export default Scenario;

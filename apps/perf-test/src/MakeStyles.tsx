import { makeStyles, createDOMRenderer, MakeStylesStyleRule } from '@fluentui/make-styles';
import * as React from 'react';

const renderer = createDOMRenderer(document);

const noMediaQueriesCount = 10000;
const noMediaQueries = () => {
  const styleRules: Record<string, MakeStylesStyleRule<{}>> = {};
  const ruleCount = noMediaQueriesCount;
  for (let i = 1; i <= ruleCount; i++) {
    const rule: MakeStylesStyleRule<{}> = {
      width: '20px',
      height: '20px',
      backgroundColor: 'red',
      padding: `${i}px`,
    };

    styleRules[`media-${i}`] = rule;
  }
  return styleRules;
};

const maxWidthOnlyCount = 10000;
const maxWidthOnly = () => {
  const styleRules: Record<string, MakeStylesStyleRule<{}>> = {};
  const ruleCount = maxWidthOnlyCount;
  for (let i = 1; i <= ruleCount; i++) {
    const rule: MakeStylesStyleRule<{}> = {
      width: '20px',
      height: '20px',
      backgroundColor: 'red',
      '@media (max-width: 1000px)': {
        padding: `${i}px`,
      },
    };

    styleRules[`media-${i}`] = rule;
  }
  return styleRules;
};

const maxWidthAndForcedColorsCount = 10;
const maxWidthAndForcedColors = () => {
  const styleRules: Record<string, MakeStylesStyleRule<{}>> = {};
  const ruleCount = maxWidthAndForcedColorsCount;

  for (let i = 1; i <= ruleCount; i++) {
    const rule: MakeStylesStyleRule<{}> = {
      width: '20px',
      height: '20px',
      backgroundColor: 'red',
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

const maxWidthAndForcedColorsAndNormalCount = 2500;
const maxWidthAndForcedColorsAndNormal = () => {
  const styleRules: Record<string, MakeStylesStyleRule<{}>> = {};
  const ruleCount = maxWidthAndForcedColorsAndNormalCount;
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

const mediaStyles: Record<string, MakeStylesStyleRule<{}>> = {};

const useStyles = makeStyles(maxWidthAndForcedColors());
const View: React.FunctionComponent = () => {
  const styles = useStyles({ dir: 'ltr', renderer });
  const elements: React.ReactNode[] = [];
  const renderCount = maxWidthAndForcedColorsCount;
  for (let i = 1; i <= renderCount; i++) {
    elements.push(<div className={styles[`media-${i}`]} />);
  }

  return <div>{elements}</div>;
};

const Scenario = () => <View />;

export default Scenario;

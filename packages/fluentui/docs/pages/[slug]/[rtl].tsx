// @ts-ignore
import glob from 'glob';
import * as _ from 'lodash';
import * as React from 'react';

import parseExamplePath from '../../src/utils/parseExamplePath';

const ShimmedPage: React.FC<{ slug: string }> = props => {
  return <ul>{props.slug}</ul>;
};

const examplePathToHash = (examplePath: string) => {
  const { displayName, exampleName } = parseExamplePath(examplePath);

  // ButtonExample => Button
  // ButtonExampleButton => Button
  // ButtonExampleActive => Active
  const shortExampleName = exampleName
    .replace(`${displayName}Example`, '')
    .replace('.shorthand', '')
    .replace('.tsx', '');

  return _.kebabCase(
    `${shortExampleName || displayName}-example${exampleName.includes('.shorthand') ? '-shorthand' : ''}`,
  );
};

export async function getStaticPaths() {
  const files = glob.sync('src/examples/*/*/*/[A-Z]*.tsx');

  return {
    paths: files.reduce((acc, filename) => {
      acc.push(`/${examplePathToHash(filename)}/false`);
      acc.push(`/${examplePathToHash(filename)}/true`);

      return acc;
    }, []),
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  return {
    props: {
      slug: params.slug,
    },
  };
}

export default ShimmedPage;

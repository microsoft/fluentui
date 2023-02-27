import * as PropTypes from 'prop-types';
import * as React from 'react';

import { Flex } from '@fluentui/react-northstar';

import config from '../../config';
import { GitHubIcon } from '../Icons/GitHubIcon';

export default class ComponentDocLinks extends React.PureComponent<any, any> {
  static propTypes = {
    repoPath: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
  };

  render() {
    const { repoPath } = this.props;
    return (
      <Flex
        vAlign="center"
        gap="gap.smaller"
        styles={{
          boxShadow: '0 0 1em 0.5em #f7f7f7',
          margin: '0.5em',
          padding: '0.5em',
          color: 'rgba(0,0,0,.4)',
        }}
      >
        <GitHubIcon size="small" />
        <code>
          <a
            style={{ color: 'rgba(0,0,0,.4)' }}
            href={`${config.repoURL}/blob/master/${repoPath}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            {repoPath}
          </a>
        </code>
      </Flex>
    );
  }
}

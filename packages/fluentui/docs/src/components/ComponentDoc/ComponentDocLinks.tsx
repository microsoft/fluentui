import * as PropTypes from 'prop-types';
import * as React from 'react';
import { Flex, Image } from '@fluentui/react-northstar';

import config from '../../config';

export default class ComponentDocLinks extends React.PureComponent<any, any> {
  static propTypes = {
    repoPath: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
  };

  render() {
    const { repoPath } = this.props;
    return (
      <Flex
        styles={{
          boxShadow: '0 0 1em 0.5em #f7f7f7',
          margin: '0.5em',
          padding: '0.5em',
          right: '0',
          top: '0',
          display: 'flex',
          flexDirection: 'row',
          height: '0%',
          verticalAlign: 'middle',
        }}
      >
        <>
          <Image
            src="https://fabricweb.azureedge.net/fabric-website/assets/images/github.png"
            width="16px"
            height="16px"
          />
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
        </>
      </Flex>
    );
  }
}

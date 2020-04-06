import * as PropTypes from 'prop-types';
import * as React from 'react';

import { Segment, Text, ICSSInJSStyle, constants } from '@fluentui/react-northstar';
import { OpenOutsideIcon } from '@fluentui/react-icons-northstar';
import MegaphoneIcon from './MegaphoneIcon';

const wrapStyle: ICSSInJSStyle = { wordBreak: 'break-word' };

const ContributionPrompt: any = ({ children }) => (
  <Segment inverted styles={wrapStyle}>
    <MegaphoneIcon />
    <Text>
      {children && <div>{children}</div>}
      <p>
        If there's no{' '}
        <a href={`${constants.repoURL}/pulls`}>
          pull request <OpenOutsideIcon size="small" />
        </a>{' '}
        open for this, you should{' '}
        <a href={`${constants.repoURL}/blob/master/.github/CONTRIBUTING.md`}>
          contribute <OpenOutsideIcon size="small" />
        </a>{' '}
        one!
      </p>
    </Text>
  </Segment>
);

ContributionPrompt.propTypes = {
  children: PropTypes.node,
};

export default ContributionPrompt;

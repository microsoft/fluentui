import * as PropTypes from 'prop-types';
import * as React from 'react';

import { Segment, Text, ICSSInJSStyle, constants } from '@fluentui/react-northstar';
// TODO: find replacement
import { BullhornIcon, ExternalIcon } from '@fluentui/react-icons-northstar';

const wrapStyle: ICSSInJSStyle = { wordBreak: 'break-word' };

const ContributionPrompt: any = ({ children }) => (
  <Segment inverted styles={wrapStyle}>
    <BullhornIcon />
    <Text>
      {children && <div>{children}</div>}
      <p>
        If there's no{' '}
        <a href={`${constants.repoURL}/pulls`}>
          pull request <ExternalIcon size="small" />
        </a>{' '}
        open for this, you should{' '}
        <a href={`${constants.repoURL}/blob/master/.github/CONTRIBUTING.md`}>
          contribute <ExternalIcon size="small" />
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

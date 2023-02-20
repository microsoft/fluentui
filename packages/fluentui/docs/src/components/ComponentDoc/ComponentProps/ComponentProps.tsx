import * as _ from 'lodash';
import * as PropTypes from 'prop-types';
import * as React from 'react';

import { getComponentGroup, scrollToAnchor } from '../../../utils';
import ComponentPropsOutline from './ComponentPropsOutline';
import { Flex, Header } from '@fluentui/react-northstar';
import ComponentPropCard from './ComponentPropCard';

export default class ComponentProps extends React.Component<any, any> {
  static propTypes = {
    displayName: PropTypes.string.isRequired,
    props: PropTypes.arrayOf(PropTypes.object).isRequired,
  };

  UNSAFE_componentWillMount() {
    const { displayName } = this.props;

    this.setState({
      componentGroup: getComponentGroup(displayName),
    });
    scrollToAnchor();
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    const { displayName } = nextProps;

    this.setState({
      componentGroup: getComponentGroup(displayName),
    });
    scrollToAnchor();
  }

  render() {
    const { componentGroup } = this.state;
    const displayNames = _.keys(componentGroup);

    return (
      <Flex column gap="gap.small">
        <Flex.Item styles={{ display: 'block', verticalAlign: 'middle' }}>
          <Flex gap="gap.medium">
            <ComponentPropsOutline displayNames={displayNames} />
          </Flex>
        </Flex.Item>
        {_.map(displayNames, displayName => {
          const description = _.get(componentGroup, [displayName, 'docblock', 'description'], '');
          const showHeader = displayNames.length > 1;
          return (
            <>
              {showHeader && <Header content={displayName} id={_.kebabCase(displayName)} as="h2" />}
              <ComponentPropCard name={displayName} description={description} />
            </>
          );
        })}
      </Flex>
    );
  }
}

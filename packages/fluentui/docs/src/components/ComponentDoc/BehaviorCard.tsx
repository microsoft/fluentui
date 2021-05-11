import * as React from 'react';
import { Divider, ICSSInJSStyle, Segment, Text } from '@fluentui/react-northstar';
import * as _ from 'lodash';
import ComponentExampleTitle from './ComponentExample/ComponentExampleTitle';
import BehaviorDescription from './BehaviorDescription';
import { BehaviorVariantionInfo } from '../../types';

export const behaviorVariantDisplayName = (fileName: string) => {
  const divided = _.startCase(fileName.replace(/Behavior\.ts$/, ''));
  return _.upperFirst(_.lowerCase(divided));
};

export const exampleStyle: ICSSInJSStyle = {
  boxShadow: '0 1px 2px rgba(0, 0, 0, 0.2)',
};

type BehaviorCardProps = {
  variation: BehaviorVariantionInfo;
};

export class BehaviorCard extends React.Component<BehaviorCardProps> {
  render() {
    const { variation } = this.props;
    return (
      <>
        <Segment className="docs-example" id={_.kebabCase(variation.name)} styles={exampleStyle}>
          <ComponentExampleTitle
            title={behaviorVariantDisplayName(variation.name)}
            description={`Name: ${variation.name.replace('.ts', '')}`}
          />
          <Divider />
          <div style={{ paddingTop: '1em' }}>
            {variation.description && (
              <>
                <Text weight="bold">Description:</Text>
                <br />
                <BehaviorDescription value={variation.description} />
              </>
            )}
            {variation.specification && (
              <>
                {variation.description && <br />}
                <Text weight="bold">Specification:</Text>
                <br />
                <BehaviorDescription value={variation.specification} />
              </>
            )}
          </div>
        </Segment>
        <br />
      </>
    );
  }
}

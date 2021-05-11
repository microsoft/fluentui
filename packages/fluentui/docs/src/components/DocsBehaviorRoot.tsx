import * as _ from 'lodash';
import * as PropTypes from 'prop-types';
import * as React from 'react';
import { Header, Segment, Divider, ICSSInJSStyle } from '@fluentui/react-northstar';
import DocumentTitle from 'react-document-title';
import ComponentExampleTitle from './ComponentDoc/ComponentExample/ComponentExampleTitle';
import BehaviorDescription from './ComponentDoc/BehaviorDescription';

const behaviorMenuItems = require('../behaviorMenu');

class DocsBehaviorRoot extends React.Component<any, any> {
  static propTypes = {
    children: PropTypes.node,
    match: PropTypes.shape({
      params: PropTypes.shape({
        name: PropTypes.string.isRequired,
      }),
    }),
  };

  baseName(fileName: string) {
    const divided = _.startCase(fileName.replace(/Behavior\.ts$/, ''));
    return _.upperFirst(_.lowerCase(divided));
  }

  render() {
    const exampleStyle: ICSSInJSStyle = {
      boxShadow: '0 1px 2px rgba(0, 0, 0, 0.2)',
    };

    const { match } = this.props;
    const componentName = _.upperFirst(_.camelCase(match.params.name));
    const pageTitle = `${componentName} accessibility behaviors`;
    return (
      <DocumentTitle title={pageTitle}>
        <Segment styles={{ backgroundColor: 'transparent' }}>
          <Header as="h1" aria-level={2} content={pageTitle} />

          {behaviorMenuItems
            .find(behavior => behavior.displayName === componentName)
            .variations.map((variation, keyValue) => (
              <React.Fragment key={keyValue}>
                <Segment className="docs-example" id={_.kebabCase(variation.name)} styles={exampleStyle}>
                  <ComponentExampleTitle
                    title={this.baseName(variation.name)}
                    description={`Name: ${variation.name.replace('.ts', '')}`}
                  />

                  <Divider />

                  <div style={{ paddingTop: '1em' }}>
                    {variation.description && (
                      <>
                        <strong>Description:</strong>
                        <br />
                        <BehaviorDescription value={variation.description} />
                      </>
                    )}
                    {variation.specification && (
                      <>
                        {variation.description && <br />}
                        <strong>Specification:</strong>
                        <br />
                        <BehaviorDescription value={variation.specification} />
                      </>
                    )}
                  </div>
                </Segment>
                <br />
              </React.Fragment>
            ))}
        </Segment>
      </DocumentTitle>
    );
  }
}

export default DocsBehaviorRoot;

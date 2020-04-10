import * as React from 'react';
import { SvgIconProps, Input, Flex, Card, Box } from '@fluentui/react-northstar';
import * as exports from '@fluentui/react-icons-northstar';
import * as _ from 'lodash';
import { CopyToClipboard } from '../../../docs-components/src';
import GuidesNavigationFooter from '../components/GuidesNavigationFooter';

const iconFlexStyles = {
  '> *:nth-child(5n)': {
    marginRight: '0px',
  },
};

const icons = Object.keys(exports).reduce((acc: React.FC<SvgIconProps>[], exportName) => {
  if (!!exports[exportName].displayName) {
    acc.push(exports[exportName]);
  }

  return acc;
}, []);

const IconViewer = () => {
  const [query, setQuery] = React.useState('');

  const escapedQuery = _.escapeRegExp(query);
  const regexQuery = new RegExp(`.*${escapedQuery}`, 'i');

  const handleQueryChange = (e, data) => {
    setQuery(data.value);
  };

  const filteredIcons = icons.filter(IconComponent => regexQuery.test(IconComponent.displayName));

  return (
    <Flex column gap="gap.medium">
      <Flex column gap="gap.medium" padding="padding.medium">
        <Input
          inverted
          fluid
          clearable
          placeholder={`Search ${icons.length} icons`}
          iconPosition="end"
          role="search"
          onChange={handleQueryChange}
          value={query}
        />
        <Flex wrap gap="gap.medium" styles={iconFlexStyles}>
          {filteredIcons.map(Icon => (
            <Flex.Item align="center" key={Icon.displayName}>
              <Card
                centered
                variables={{ borderColor: '#f2f2f2', width: 'calc(20% - 12px)' }}
                styles={{ marginTop: '10px', background: 'white' }}
              >
                <Card.Header>
                  <Flex gap="gap.small" column hAlign="center">
                    <Icon size="largest" />
                    <br />
                    <CopyToClipboard value={`<${Icon.displayName} />`} timeout={3000}>
                      {(active, onClick) => (
                        <Box
                          as="code"
                          onClick={onClick}
                          styles={{
                            fontSize: '10px !improtant',
                            opacity: active ? 1 : 0.6,
                            color: active ? 'green' : 'inherit',
                            cursor: 'pointer',
                            ...(!active && {
                              ':hover': {
                                opacity: 0.75,
                              },
                            }),
                          }}
                        >
                          {active ? 'Copied! Happy coding :)' : `<${Icon.displayName} />`}
                        </Box>
                      )}
                    </CopyToClipboard>
                  </Flex>
                </Card.Header>
              </Card>
            </Flex.Item>
          ))}
        </Flex>
      </Flex>
      <Flex padding="padding.medium">
        <GuidesNavigationFooter
          previous={{ name: 'Shorthand Props', url: 'shorthand-props' }}
          next={{ name: 'Component Architecture', url: 'component-architecture' }}
        />
      </Flex>
    </Flex>
  );
};

export default IconViewer;

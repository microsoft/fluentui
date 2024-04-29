import * as React from 'react';
import * as _ from 'lodash';
import { Flex, Loader, Text, Segment, Header } from '@fluentui/react-northstar';
import { link } from '../../utils/helpers';
import { BehaviorInfo, ComponentInfo, BehaviorVariantionInfo } from '../../types';
import { BehaviorCard, exampleStyle, behaviorVariantDisplayName } from './BehaviorCard';

const InlineMarkdown = React.lazy(() => import('./InlineMarkdown'));

const behaviorMenu = require('../../behaviorMenu');

const knownIssuesId = 'known-issues';

type ComponentDocAccessibility = {
  info: ComponentInfo;
};

export function containsAccessibility(info) {
  const defaultBehaviorName = getDefaultBehaviorName(info);
  return (
    !!getDescription(info) ||
    !!getBehaviorName(defaultBehaviorName) ||
    (info.behaviors && info.behaviors.length > 0) ||
    !!getAccIssues(info)
  );
}

function getDescription(info) {
  return _.get(_.find(info.docblock.tags, { title: 'accessibility' }), 'description');
}

function getDefaultBehaviorName(info) {
  const defaultValue = _.get(_.find(info.props, { name: 'accessibility' }), 'defaultValue');
  return defaultValue && defaultValue.split('.').pop();
}

function getBehaviorName(defaultBehaviorName) {
  const filename = defaultBehaviorName && `${_.camelCase(defaultBehaviorName)}.ts`;
  for (const category of behaviorMenu) {
    const behavior = category.variations.find(variation => variation.name === filename);
    if (behavior) {
      return category.displayName;
    }
  }
}

function getAvailableVariantsFromJson(availableBehaviors: BehaviorInfo[]): BehaviorVariantionInfo[] {
  const availableBehaviorsFromJson = [];
  availableBehaviors.forEach(availableBehavior => {
    const fileName = `${availableBehavior.name}.ts`;
    behaviorMenu.forEach(category => {
      const result = category.variations.find(variation => variation.name === fileName);
      if (result) {
        availableBehaviorsFromJson.push(result);
      }
    });
  });
  return availableBehaviorsFromJson;
}

function getAccIssues(info) {
  return _.get(_.find(info.docblock.tags, { title: 'accessibilityIssues' }), 'description');
}

function getAllAvailableBehaviors(
  behaviorName: string,
  defaultBehaviorFileName: string,
  availableBehaviors: BehaviorInfo[],
): BehaviorVariantionInfo[] {
  let behaviorVariantsWithoutDefault = [];
  if (defaultBehaviorFileName && behaviorName) {
    behaviorVariantsWithoutDefault = behaviorMenu
      .find(behavior => behavior.displayName === behaviorName)
      .variations.filter(behavior => behavior.name !== defaultBehaviorFileName);
  }

  let otherAvailableVariants = [];
  if (availableBehaviors) {
    otherAvailableVariants = getAvailableVariantsFromJson(availableBehaviors);
  }
  return _.union(behaviorVariantsWithoutDefault, otherAvailableVariants);
}

export const ComponentDocAccessibility: React.FC<ComponentDocAccessibility> = ({ info }) => {
  const defaultBehaviorName = getDefaultBehaviorName(info);
  const defaultBehaviorFileName = `${_.camelCase(defaultBehaviorName)}.ts`;
  const description = getDescription(info);
  const behaviorName = getBehaviorName(defaultBehaviorName);
  const accIssues = getAccIssues(info);
  const allAvailableBehaviors = getAllAvailableBehaviors(behaviorName, defaultBehaviorFileName, info.behaviors);

  if (!behaviorName && !description && info.behaviors && info.behaviors.length === 0) {
    return null;
  }

  const accessibilityDetails = (
    <>
      {description && (
        <Text style={{ whiteSpace: 'pre-line' }}>
          <InlineMarkdown value={description} />
        </Text>
      )}

      {((behaviorName && allAvailableBehaviors.length > 0) ||
        (behaviorName && accIssues) ||
        (allAvailableBehaviors.length > 0 && accIssues)) && (
        <ul>
          <li>
            Behaviors
            <ul>
              {behaviorName && <li>{link(`Default: ${behaviorName}`, '#default-behavior')} </li>}
              {(info.behaviors || allAvailableBehaviors.length > 0) &&
                allAvailableBehaviors.map(variant => {
                  return (
                    <li>{link(`${behaviorVariantDisplayName(variant.name)}`, `#${_.kebabCase(variant.name)}`)}</li>
                  );
                })}
            </ul>
          </li>
          {accIssues && <li>{link('Known issues', `#${knownIssuesId}`)} </li>}
        </ul>
      )}

      {behaviorName && (
        <>
          <Header content="Default behavior" id="default-behavior" as="h2" />
          {behaviorMenu
            .find(behavior => behavior.displayName === behaviorName)
            .variations.filter(behavior => behavior.name === defaultBehaviorFileName)
            .map(variation => (
              <BehaviorCard variation={variation} />
            ))}
        </>
      )}

      {(info.behaviors || allAvailableBehaviors.length > 0) && (
        <>
          <Text>
            <Header content="Available behaviors" id="available-behaviors" as="h2" />
            {allAvailableBehaviors.map(variation => {
              return <BehaviorCard variation={variation} />;
            })}
          </Text>
        </>
      )}

      {accIssues && (
        <>
          <Header content="Known issues" id={knownIssuesId} as="h2" />
          <Segment className="docs-example" styles={exampleStyle}>
            <Text style={{ whiteSpace: 'pre-line' }}>
              <InlineMarkdown value={accIssues} />
            </Text>
          </Segment>
        </>
      )}
    </>
  );

  return (
    <Flex column>
      <React.Suspense fallback={<Loader />}>{accessibilityDetails}</React.Suspense>
    </Flex>
  );
};

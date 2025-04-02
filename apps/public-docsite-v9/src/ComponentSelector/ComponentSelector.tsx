import * as React from 'react';
import { Button, Input, Tag, TagGroup, Text } from '@fluentui/react-components';
import type { InputProps, TagGroupProps } from '@fluentui/react-components';
import { SearchRegular, Link20Regular, ArrowRightRegular } from '@fluentui/react-icons';

import { useStyles } from './ComponentSelector.styles';
import { removeFromArray, getAllQuestions, hasQuestions } from './utils';
import { SelectionCard } from './SelectionCard';
import { Question } from './Question';
import { MatchingComponents } from './MatchingComponents';

export interface NamedComponent {
  name: string;
  displayName?: string;
}

export interface ComponentDefinition extends NamedComponent {
  component: string;
  story?: string;
  folder?: string;
  link?: string;
  attributes?: string[];
  note?: string;
}

interface ComponentDefinitionWithDisplayName extends ComponentDefinition {
  displayName: string;
}

export interface ComponentGroup {
  id: string;
  title: string;
  tags: string[];
  questions: string[];
  cards?: React.ReactNode[];
}

export interface GroupQuestion {
  id: string;
  question: string;
  answers: { value: string; text: string }[];
}

interface ComponentAttributesMapping {
  id: string;
  components: string[];
}

export type ComponentsImages = Record<string, string>;

interface ComponentSelectorProps {
  componentsDefinitions: ComponentDefinition[];
  groups: ComponentGroup[];
  questions: GroupQuestion[];
  attributesMapping: ComponentAttributesMapping[];
  componentsImages: ComponentsImages;
}

export const ComponentSelector: React.FC<ComponentSelectorProps> = ({
  componentsDefinitions,
  groups,
  questions,
  attributesMapping,
  componentsImages,
}) => {
  const classes = useStyles();

  const [filterText, setFilterText] = React.useState('');
  const [selectedComponents, setSelectedComponents] = React.useState<ComponentDefinitionWithDisplayName[]>([]);
  const [selectedBehaviours, setSelectedBehaviours] = React.useState<string[]>([]);
  const [filteredComponentsDefinitions, setFilteredComponentsDefinitions] = React.useState<ComponentDefinition[]>([]);

  const categoryHeadingsRefs = React.useRef<HTMLElement[]>([]);
  const firstCategoryHeadingRef = React.useRef<HTMLElement | null>(null);
  const questionsHeadingRef = React.useRef<HTMLDivElement | null>(null);

  const scrollAndFocusQuestionsHeading = () => {
    if (questionsHeadingRef.current) {
      questionsHeadingRef.current.focus({ preventScroll: true });
      questionsHeadingRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const setSectionRef = (el: HTMLDivElement | null, index: number) => {
    if (el) {
      categoryHeadingsRefs.current[index] = el;
      if (index === 0) {
        firstCategoryHeadingRef.current = el;
      }
    }
  };

  const onFilterChange: InputProps['onChange'] = (_, data) => {
    setFilterText(data.value);
  };

  const onSelectedComponentDismiss: TagGroupProps['onDismiss'] = (_, data) => {
    if (selectedComponents.length === 1) {
      firstCategoryHeadingRef.current?.focus();
    }
    updateComponentSelection(data.value, false);
  };

  const onRemoveAllComponentsClick = () => {
    firstCategoryHeadingRef.current?.focus();
    setSelectedComponents([]);
  };

  React.useEffect(() => {
    attributesMapping.forEach(mapping => {
      mapping.components.forEach(componentName => {
        const foundDefinition = componentsDefinitions.find(definition => {
          return definition.name === componentName;
        });
        if (foundDefinition) {
          foundDefinition.attributes ??= [];
          foundDefinition.attributes.push(mapping.id);
        }
      });
    });
  }, []);

  React.useEffect(() => {
    setFilteredComponentsDefinitions(
      componentsDefinitions.filter(definition => {
        const isMatchInName = definition.component.toLowerCase().includes(filterText.toLowerCase());
        const componentGroup = groups.find(group => group.tags.find(tag => tag.includes(definition.component)));
        const isMatchInStory = definition.story
          ? definition.story.toLowerCase().includes(filterText.toLowerCase())
          : false;
        const isMatchInGroupTitle = componentGroup
          ? componentGroup.title.toLowerCase().includes(filterText.toLowerCase())
          : false;
        return isMatchInName || isMatchInStory || isMatchInGroupTitle;
      }),
    );
  }, [setFilteredComponentsDefinitions, filterText]);

  const getComponentDefinitionByName = (name: string) => {
    return componentsDefinitions.find(definition => definition.name === name);
  };

  const matchingComponents = React.useMemo(() => {
    const suitableComponents: ComponentDefinition[] = [];
    selectedComponents.forEach(component => {
      const definition = getComponentDefinitionByName(component.name);
      if (definition) {
        suitableComponents.push(definition);
      }
    });

    if (selectedBehaviours.length > 0) {
      componentsDefinitions.forEach(definition => {
        let matchedCount = 0;
        selectedBehaviours.forEach(decision => {
          definition.attributes?.includes(decision) && matchedCount++;
        });
        if (selectedBehaviours.length === matchedCount) {
          // if suitableComponents does not include definition, push it
          !suitableComponents.includes(definition) && suitableComponents.push(definition);
        } else {
          removeFromArray(suitableComponents, definition);
        }
      });
    }
    return suitableComponents;
  }, [selectedComponents, selectedBehaviours]);

  const updateComponentSelection = React.useCallback(
    (name, selected) => {
      setSelectedBehaviours([]);
      if (selected) {
        // Find the definition and add the component based on the definition
        const definition = componentsDefinitions.find(definition => definition.name === name);
        if (!definition) {
          return;
        }
        const displayName = definition.story ? `${definition.component} : ${definition.story}` : definition.name;
        const newSelectedComponent = {
          ...definition,
          displayName,
        };
        setSelectedComponents(prevSelectedComponents => {
          const exists = prevSelectedComponents.find(component => component.name === name);
          if (exists) {
            return prevSelectedComponents;
          }
          const result = [...prevSelectedComponents, newSelectedComponent];
          result.sort((a, b) => (a.name > b.name ? 1 : -1));
          return result;
        });
      } else {
        // Find and remove the component
        setSelectedComponents(prevSelectedComponents => {
          const newSelectedComponents = [...prevSelectedComponents];
          const index = newSelectedComponents.findIndex(component => component.name === name);
          newSelectedComponents.splice(index, 1);
          return newSelectedComponents;
        });
      }
    },
    [selectedComponents],
  );

  const categorizedComponents = React.useMemo(() => {
    const definitionsWithDisplayName = filteredComponentsDefinitions.map(definition => {
      const displayName = definition.story ? `${definition.component} : ${definition.story}` : definition.name;
      const newDefinition = {
        ...definition,
        displayName,
      };
      return newDefinition;
    }) as ComponentDefinitionWithDisplayName[];
    definitionsWithDisplayName.sort((a, b) => (a.displayName > b.displayName ? 1 : -1));

    const result = groups.map(group => {
      group.cards = [];
      definitionsWithDisplayName.forEach(definition => {
        if (hasQuestions(definition.name, groups, questions) && group.tags.includes(definition.component)) {
          const selected = !!selectedComponents.find(component => definition.name === component.name);
          const card = (
            <>
              <SelectionCard
                componentsImages={componentsImages}
                key={definition.name}
                name={definition.name}
                displayName={definition.displayName}
                selected={selected}
                updateComponentSelection={updateComponentSelection}
              />
            </>
          );
          group.cards?.push(card);
        }
      });
      return group;
    });
    return result;
  }, [filteredComponentsDefinitions, updateComponentSelection]);

  const updateDecisionForQuestion = (currentName: string, previousName: string) => {
    if (currentName === previousName) {
      return;
    }
    if (currentName === 'none') {
      // remove previously added radio value as now "no" option is selected
      setSelectedBehaviours(previousItems => previousItems.filter(item => item !== previousName));
      return;
    }
    setSelectedBehaviours(previousBehaviors => {
      // remove previous radio item value and add new one
      const behaviorsWithoutPreviousItem = previousBehaviors.filter(item => item !== previousName);
      return [...behaviorsWithoutPreviousItem, currentName];
    });
  };

  const allQuestions = React.useMemo(
    () => getAllQuestions(selectedComponents, groups, questions),
    [selectedComponents, groups, questions],
  );

  const componentsCount = React.useMemo(
    () => categorizedComponents.reduce((total, category) => total + (category.cards?.length || 0), 0),
    [categorizedComponents],
  );

  return (
    <div className={classes.componentWrapper}>
      <div id="#header" className={classes.headerWrapper}>
        <Input
          contentBefore={<SearchRegular />}
          // size="small"
          placeholder="Search for component or category"
          aria-label="Search for component or category"
          value={filterText}
          onChange={onFilterChange}
          className={classes.searchComponentInput}
        />

        {/* {mode === 'byComponents' && (
            <div className={classes.jumpToCategoryButtons}>
            {categorizedComponents.length && <h2 className={classes.jumpToCategoryHeader}>Jump to category</h2>}
              <TagGroup aria-label="Jump to questions" className={classes.jumpToCategoryTags}>
                {categorizedComponents.map((category, index) => (
                  <>
                    {category.cards && category.cards.length > 0 && (
                      <Tag
                        className={classes.jumpToCategoryTag}
                        appearance="brand"
                        shape="circular"
                        key={category.id}
                        value={category.title}
                        onClick={() => onJumpToCategoryClick(index)}
                      >
                        {category.title}
                      </Tag>
                    )}
                  </>
                ))}
              </TagGroup>
              <Button className={classes.moreButton} shape="circular">
                More
              </Button>
            </div>
          )} */}
        {/* </div> */}
      </div>
      <div id="#body" className={classes.bodyWrapper}>
        <div className={classes.visuallyHidden}>
          <Text role="status">{componentsCount} components available.</Text>
        </div>
        <div>
          {categorizedComponents.map((category, index) => (
            <>
              {category.cards && category.cards.length > 0 && (
                <>
                  <div className={classes.actionsHeaderWrapper}>
                    <h3 className={classes.actionsHeader} ref={el => setSectionRef(el, index)} tabIndex={-1}>
                      {category.title}
                    </h3>
                    {<Link20Regular className={classes.actionsHeaderIcon} />}
                  </div>
                  <div className={classes.root}>{category.cards}</div>
                </>
              )}
            </>
          ))}
        </div>

        {allQuestions.length > 0 && (
          <h2 className={classes.heading} ref={questionsHeadingRef} tabIndex={-1}>
            Questions
          </h2>
        )}
        <div id="questions-and-results" className={classes.QuestionsAndResults}>
          <div id="all-questions" className="{classes.allQuestions}">
            {allQuestions.map((question, index) => (
              <Question
                key={question.id}
                question={question}
                number={index + 1}
                updateDecisionForQuestion={updateDecisionForQuestion}
              />
            ))}
          </div>
          <div id="results-wrapper" className={classes.resultsWrapper}>
            <div id="results" className={classes.results}>
              {(matchingComponents.length > 0 ||
                (matchingComponents.length === 0 && selectedBehaviours.length > 0)) && (
                <h2 id="matching-heading" className={classes.heading}>
                  Matching Components {matchingComponents.length}
                </h2>
              )}
              {matchingComponents.length === 0 && selectedBehaviours.length > 0 && (
                <Text>No components match the given answers.</Text>
              )}
              {matchingComponents.length > 0 && <MatchingComponents components={matchingComponents} />}
            </div>
          </div>
        </div>
      </div>
      {selectedComponents.length > 0 && (
        <div id="#footer" className={classes.footerWrapper}>
          <div id="selectionPart">
            <Button className={classes.clearSelection} shape="circular" onClick={onRemoveAllComponentsClick}>
              Clear selection
            </Button>
            <TagGroup
              onDismiss={onSelectedComponentDismiss}
              aria-label="Selected components"
              className={classes.selectedItemsContainer}
            >
              {selectedComponents.map(component => (
                <Tag
                  className={classes.selectedItemTag}
                  key={component.name}
                  value={component.name}
                  shape="circular"
                  dismissible
                  dismissIcon={{ 'aria-label': 'Remove' }}
                >
                  {component.displayName}
                </Tag>
              ))}
            </TagGroup>
          </div>
          {allQuestions.length > 0 && (
            <div className={classes.fillOutSection}>
              <Button
                shape="circular"
                appearance="primary"
                onClick={scrollAndFocusQuestionsHeading}
                icon={<ArrowRightRegular />}
                iconPosition="after"
              >
                Continue answer questions
              </Button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

import * as React from 'react';
import { Button, Input, Tag, TagGroup, Text, makeStyles, tokens } from '@fluentui/react-components';
import type { InputProps, TagGroupProps } from '@fluentui/react-components';
import { SearchRegular, Link20Regular, ArrowRightRegular } from '@fluentui/react-icons';

import { removeFromArray, getAllQuestions, hasQuestions } from './utils';
import { SelectionCard } from './SelectionCard';
import { Question } from './Question';
import { MatchingComponents } from './MatchingComponents';

const useStyles = makeStyles({
  visuallyHidden: {
    clip: 'rect(0px, 0px, 0px, 0px)',
    height: '1px',
    width: '1px',
    margin: '-1px',
    padding: '0px',
    overflow: 'hidden',
    position: 'absolute',
  },
  secondLevel: { 'margin-left': '30px' },
  thirdLevel: { 'margin-left': '60px' },
  forthLevel: { 'margin-left': '90px' },
  heading: { margin: '30px 0 10px 0' },
  root: {
    // Stack the label above the field with a gap
    display: 'flex',
    flexWrap: 'wrap',
    gap: '2px',
    maxWidth: '1600px',
  },
  tagsList: {
    listStyleType: 'none',
    marginBottom: tokens.spacingVerticalXXS,
    marginTop: 0,
    paddingLeft: 0,
    display: 'flex',
    gridGap: tokens.spacingHorizontalXXS,
  },
  tooltip: { maxWidth: '500px important!', backgroundColor: 'red' },
  componentWrapper: {
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
    overflow: 'hidden',
  },
  bodyWrapper: {
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
    padding: '20px',
    overflowY: 'auto',
    maxHeight: 'calc(100vh - 490px)',
  },
  footerWrapper: {
    display: 'flex',
    justifyContent: 'space-between',
    position: 'sticky',
    bottom: '0',
    width: '100%',
    padding: '30px 0 0 0',
    overflowX: 'auto',
  },
  headerWrapper: {
    display: 'flex',
    flexDirection: 'column',
  },
  questionsWrapper: {
    padding: '20px',
    margin: '20px 0',
    backgroundColor: 'white',
    borderRadius: '16px',
    border: '1px solid var(--colorNeutralStroke1, #e1dfdd)',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
  },
  questionsLabel: {
    color: '#ff00ff',
    fontWeight: tokens.fontWeightBold,
    marginRight: '8px',
  },
  questionsText: {
    fontWeight: tokens.fontWeightBold,
    fontSize: tokens.fontSizeBase400,
  },
  questionContainer: {
    display: 'flex',
  },
  questionRightSide: {
    borderLeft: '1px solid #ff00ff',
    padding: '0 10px',
  },
  radioItem: {
    display: 'flex',
  },
  selectedItemTag: {
    color: 'white',
    backgroundColor: '#5b5fc7',
  },
  selectedItemsContainer: {
    marginLeft: '10px',
  },
  selectedComponentTitle: {
    marginBottom: '10px',
  },
  actionsHeaderWrapper: {
    display: 'flex',
    margin: '15px 0',
  },
  searchComponentInput: {
    alignSelf: 'flex-start',
    width: '300px',
    marginLeft: '20px',
  },
  jumpToCategoryHeader: {
    alignSelf: 'flex-start',
    paddingLeft: '10px',
    fontSize: 'medium',
  },
  jumpToCategoryButtons: {
    display: 'flex',
    flexDirection: 'row',
    marginBottom: '20px',
  },
  jumpToCategoryTags: {
    overflowX: 'hidden',
    width: '800px',
  },
  jumpToCategoryTag: {
    cursor: 'pointer',
    color: 'white',
    backgroundColor: '#5b5fc7',
  },
  actionsHeader: {
    margin: 0,
  },
  actionsHeaderIcon: {
    marginLeft: '5px',
  },
  clearSelection: {
    flexShrink: 0,
    marginLeft: '10px',
  },
  moreButton: {
    color: 'white',
    backgroundColor: '#5b5fc7',
    maxHeight: '32px',
    margin: '0 10px',
    fontWeight: '400',
  },
  fillOutSection: {
    display: 'flex',
    justifyContent: 'end',
  },
  headerHeadingAndInput: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  QuestionsAndResults: {
    display: 'flex',
  },
  allQuestions: {
    width: '50%',
  },
  resultsWrapper: {
    width: '50%',
    paddingLeft: '50px',
  },
  results: {
    position: 'sticky',
    top: '5%',
  },
});

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

  const firstGroupItemRef = React.useRef<HTMLElement | null>(null);
  const questionsSectionRef = React.useRef<HTMLDivElement | null>(null);

  const scrollToQuestionsSection = () => {
    if (questionsSectionRef.current) {
      questionsSectionRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const groupSectionRefs = React.useRef<HTMLDivElement[]>([]);

  const setSectionRef = (el: HTMLDivElement | null, index: number) => {
    if (el) {
      groupSectionRefs.current[index] = el;
      if (index === 0) {
        firstGroupItemRef.current = el;
      }
    }
  };

  const onFilterChange: InputProps['onChange'] = (_, data) => {
    setFilterText(data.value);
  };

  const onSelectedComponentDismiss: TagGroupProps['onDismiss'] = (_, data) => {
    if (selectedComponents.length === 1) {
      firstGroupItemRef.current?.focus();
    }
    updateComponentSelection(data.value, false);
  };

  const onRemoveAllComponentsClick = () => {
    firstGroupItemRef.current?.focus();
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
          <h2 className={classes.heading} ref={questionsSectionRef}>
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
                onClick={scrollToQuestionsSection}
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

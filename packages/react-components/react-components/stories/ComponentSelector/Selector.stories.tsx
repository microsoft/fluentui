import * as React from 'react';
import {
  Button,
  Field,
  Input,
  Link,
  Tab,
  TabList,
  Tag,
  shorthands,
  Menu,
  MenuItem,
  MenuList,
  MenuPopover,
  MenuTrigger,
  TagGroup,
  OverflowItem,
  useIsOverflowItemVisible,
  InteractionTag,
  InteractionTagPrimary,
  InteractionTagPrimaryProps,
  TagProps,
  Text,
  makeStyles,
  tokens,
  useId,
  Subtitle2,
  useOverflowMenu,
} from '@fluentui/react-components';
import {
  ArrowDownRegular,
  ArrowUpRegular,
  SearchRegular,
  Link12Regular,
  Link20Regular,
  Link16Regular,
} from '@fluentui/react-icons';

import { removeFromArray, getComponentStoryUrl, getAllQuestions } from './utils';
import questions from './selection-logic/Questions.json';
import importedGroups from './selection-logic/Groups.json';
import attributesMapping from './selection-logic/AttributesMapping.json';
import * as importedComponentsDefinitions from './components-definitions/index';
import { add, create, filter, get, pad, set } from 'lodash';
import { SelectionCard } from './SelectionCard';
import { Question } from './Question';
import { BehaviorSelection } from './BehaviorSelection';
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
    justifyContent: 'flex-start',
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
    alignSelf: 'flex-end',
  },
  jumpToCategoryHeader: {
    alignSelf: 'flex-start',
    paddingLeft: '10px',
  },
  jumpToCategoryButtons: {
    display: 'flex',
    flexDirection: 'row',
    marginBottom: '20px',
  },
  jumpToCategoryTags: {
    overflowX: 'hidden',
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
});

interface ComponentGroup {
  id: string;
  title: string;
  tags: string[];
  questions: string[];
  cards?: React.ReactNode[];
}
const groups: ComponentGroup[] = importedGroups;

interface SelectedComponent {
  name: string;
  displayName: string;
}

export const Selector = () => {
  const classes = useStyles();

  const [mode, setMode] = React.useState('byComponents');
  const [filterText, setFilterText] = React.useState('');
  const [selectedComponents, setSelectedComponents] = React.useState<SelectedComponent[]>([]);
  const [selectedBehaviours, setSelectedBehaviours] = React.useState<string[]>([]);
  const [filteredComponentsDefinitions, setFilteredComponentsDefinitions] = React.useState<Record<string, any>[]>([]);

  const firstGroupItemRef = React.useRef<Button>(null);
  const componentsDefinitions = React.useRef<Record<string, any>[]>([]);

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

  const onJumpToCategoryClick = (index: number) => {
    groupSectionRefs.current[index]?.scrollIntoView({ behavior: 'smooth' });
  };

  const onModeTabSelect = (_, data) => {
    const newMode = data.value;

    // Reset filter, selected components and selected behaviors on mode change
    if (newMode === 'byComponents') {
      setFilterText('');
      setSelectedComponents([]);
    }
    setSelectedBehaviours([]);
    setMode(newMode);
  };

  const onFilterChange = (_, data) => {
    setFilterText(data.value);
  };

  const onSelectedComponentDismiss = (_, data) => {
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
    if (componentsDefinitions.current.length === 0) {
      Object.entries(importedComponentsDefinitions).forEach(([key, value]) => {
        componentsDefinitions.current.push(value);
      });
      mapAttributes();
      // TODO: Remove this function after Base JSON files ar removed
      cleanUpBaseObjects();
    }
  }, []);

  React.useEffect(() => {
    setFilteredComponentsDefinitions(
      componentsDefinitions.current.filter(definition => {
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

  const mapAttributes = () => {
    componentsDefinitions.current.forEach(definition => {
      definition.attributes = [];
    });
    attributesMapping.forEach(mapping => {
      mapping.components.forEach(componentName => {
        const foundDefinition = componentsDefinitions.current.find(definition => {
          return definition.name === componentName;
        });
        if (foundDefinition) {
          foundDefinition.attributes.push(mapping.id);
        }
      });
    });
  };

  const cleanUpBaseObjects = () => {
    componentsDefinitions.current.forEach((definition, index) => {
      // just check the name if includes "Base",
      // in future would be better detection based on prop, like: "abstract": "true"
      if (definition.name && definition.name.includes('Base')) {
        componentsDefinitions.current.splice(index, 1);
      }
    });
  };

  const updateBehaviorDecision = (name, selected) => {
    if (selected) {
      setSelectedBehaviours([...selectedBehaviours, name]);
    } else {
      const newSelectedBehaviors = selectedBehaviours.filter(behavior => behavior !== name);
      setSelectedBehaviours(newSelectedBehaviors);
    }
  };

  const getComponentDefinitionByName = name => {
    return componentsDefinitions.current.find(definition => definition.name === name);
  };

  const matchingComponents = React.useMemo(() => {
    console.log(`--------- get matching components called`);
    const suitableComponents: any[] = [];

    console.log(`selectedComponents: ${selectedComponents}`);

    if (mode === 'byComponents') {
      selectedComponents.forEach(component => {
        const definition = getComponentDefinitionByName(component.name);
        if (definition) {
          suitableComponents.push(definition);
        }
      });
    }

    if (selectedBehaviours.length > 0) {
      console.log(`GET COMPONENT: selectedBehaviours: ${selectedBehaviours}`);
      componentsDefinitions.current.forEach(definition => {
        let matchedCount = 0;
        selectedBehaviours.forEach(decision => {
          definition.attributes.includes(decision) ? matchedCount++ : null;
        });
        if (selectedBehaviours.length === matchedCount) {
          console.log('fully matched');
          // if suitableComponents does not include definition, push it
          suitableComponents.includes(definition) ? null : suitableComponents.push(definition);
        } else {
          // console.log(`suitableComponents: ${suitableComponents}`);
          // console.log('GOING TO REMOVE');
          removeFromArray(suitableComponents, definition);
          // console.log(`suitableComponents: ${suitableComponents}`);
        }
      });
    }
    return suitableComponents;
  }, [mode, selectedComponents, selectedBehaviours]);

  const updateComponentSelection = React.useCallback(
    (name, selected) => {
      setSelectedBehaviours([]);
      if (selected) {
        // Find the definition and add the component based on the definition
        const definition = componentsDefinitions.current.find(definition => definition.name === name);
        if (!definition) {
          return;
        }
        const displayName = definition.story ? `${definition.component} : ${definition.story}` : definition.name;
        const newSelectedComponent = {
          name,
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
      definition.displayName = displayName;
      return definition;
    });
    definitionsWithDisplayName.sort((a, b) => (a.displayName > b.displayName ? 1 : -1));

    const result = groups.map(group => {
      group.cards = [];
      definitionsWithDisplayName.forEach(definition => {
        if (group.tags.includes(definition.component)) {
          const selected = !!selectedComponents.find(component => definition.name === component.name);
          const card = (
            <>
              <SelectionCard
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

  const updateDecisionForQuestion = (currentName, previousName) => {
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

  const allQuestions = React.useMemo(() => getAllQuestions(selectedComponents, questions), [selectedComponents]);

  return (
    <div className={classes.componentWrapper}>
      <div id="#header" className={classes.headerWrapper}>
        <Input
          contentBefore={<SearchRegular />}
          size="small"
          placeholder="Filter"
          aria-label="Filter"
          value={filterText}
          onChange={onFilterChange}
          className={classes.searchComponentInput}
        />
        {categorizedComponents.length && <h4 className={classes.jumpToCategoryHeader}>Jump to category</h4>}
        {mode === 'byComponents' && (
          <div className={classes.jumpToCategoryButtons}>
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
        )}
      </div>
      <div id="#body" className={classes.bodyWrapper}>
        {mode === 'byComponents' && (
          <>
            <div className={classes.visuallyHidden}>
              <Text role="status">{filteredComponentsDefinitions.length} components available.</Text>
            </div>
            {/* <h2>Choose Component ({filteredComponentsDefinitions.length})</h2> */}
            <div>
              {categorizedComponents.map((category, index) => (
                <>
                  {category.cards && category.cards.length > 0 && (
                    <>
                      <div className={classes.actionsHeaderWrapper}>
                        <h3
                          className={classes.actionsHeader}
                          // ref={index === 0 ? firstGroupItemRef : undefined}
                          ref={el => setSectionRef(el, index)}
                          tabIndex={-1}
                        >
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
            {allQuestions.map((question, index) => (
              <Question
                key={question.id}
                question={question}
                number={index + 1}
                updateDecisionForQuestion={updateDecisionForQuestion}
              />
            ))}
          </>
        )}
        {mode === 'byBehaviors' && (
          <>
            <BehaviorSelection updateBehaviorDecision={updateBehaviorDecision} />
          </>
        )}
        {(matchingComponents.length > 0 || (matchingComponents.length === 0 && selectedBehaviours.length > 0)) && (
          <h2 id="matching-heading" className={classes.heading}>
            Matching Components {matchingComponents.length}
          </h2>
        )}
        {matchingComponents.length === 0 && selectedBehaviours.length > 0 && (
          <Text>No components match the given answers.</Text>
        )}
        {matchingComponents.length > 0 && <MatchingComponents components={matchingComponents} />}
      </div>

      {/* <div className={classes.selectedComponentTitle}>
                <Subtitle2>Selected components</Subtitle2>
              </div> */}

      {selectedComponents.length > 0 && (
        <div id="#footer" className={classes.footerWrapper}>
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
      )}
      {allQuestions.length > 0 && (
        <div className={classes.fillOutSection}>
          <ArrowUpRegular />
          <Link onClick={scrollToQuestionsSection}>Fill out the checklist below</Link>
        </div>
      )}
    </div>
  );
};

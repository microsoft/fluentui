import * as React from 'react';
import {
  Accordion,
  AccordionHeader,
  AccordionItem,
  AccordionPanel,
  Button,
  Field,
  Input,
  Link,
  Tab,
  TabList,
  Tag,
  TagGroup,
  Text,
  makeStyles,
  tokens,
  useId,
} from '@fluentui/react-components';

import { removeFromArray, getComponentStoryUrl, getAllQuestions } from './utils';
import questions from './selection-logic/Questions.json';
import importedCategories from './selection-logic/Categories.json';
import * as importedComponentsDefinitions from './components-definitions/index';
import { add, create, get, set } from 'lodash';
import { SelectionCard } from './SelectionCard';
import { Question } from './Question';
import { BehaviorSelection } from './BehaviorSelection';
import { MatchingComponents } from './MatchingComponents';

const useStyles = makeStyles({
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
    margin: '10px',
    padding: '10px',
    border: '1px solid #ccc',
    borderRadius: '5px',
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
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
});

interface ComponentCategory {
  id: string;
  title: string;
  components: string[];
  cards?: React.ReactNode[];
}
const categories: ComponentCategory[] = importedCategories;

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

  const firstAccordionItemRef = React.useRef<Button>(null);
  const componentsDefinitions = React.useRef<Record<string, any>[]>([]);

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
      firstAccordionItemRef.current?.focus();
    }
    updateComponentSelection(data.value, false);
  };

  const onRemoveAllComponentsClick = () => {
    firstAccordionItemRef.current?.focus();
    setSelectedComponents([]);
  };

  React.useEffect(() => {
    if (componentsDefinitions.current.length === 0) {
      Object.entries(importedComponentsDefinitions).forEach(([key, value]) => {
        componentsDefinitions.current.push(value);
      });
      mergeBaseObjects();
      cleanUpBaseObjects();
    }
  }, []);

  React.useEffect(() => {
    setFilteredComponentsDefinitions(
      componentsDefinitions.current.filter(definition => {
        const isMatchInName = definition.component.toLowerCase().includes(filterText.toLowerCase());
        const isMatchInStory = definition.story
          ? definition.story.toLowerCase().includes(filterText.toLowerCase())
          : false;
        return isMatchInName || isMatchInStory;
      }),
    );
  }, [setFilteredComponentsDefinitions, filterText]);

  const mergeBaseObjects = () => {
    componentsDefinitions.current.forEach(definition => {
      for (const key in definition) {
        if (key === 'extends') {
          const value = definition[key];
          const attributesOfCurrentDefinition = definition.attributes;
          // find the definition which the current definition is based on
          const baseDefinition = componentsDefinitions.current.find(def => def.name === value);
          const attributesOfBaseDefinition = baseDefinition?.attributes;

          // create a definition copy with the name deleted
          const tempDefinition = JSON.parse(JSON.stringify(baseDefinition));
          delete tempDefinition.name;

          // merge attributes of current JSON with Base JSON
          if (attributesOfCurrentDefinition) {
            tempDefinition.attributes = [...attributesOfBaseDefinition, ...attributesOfCurrentDefinition];
          }
          Object.assign(definition, tempDefinition);
        }
      }
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

  const getMatchingComponents = () => {
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
  };

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

    const result = categories.map(category => {
      category.cards = [];
      definitionsWithDisplayName.forEach(definition => {
        if (category.components.includes(definition.component)) {
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
          category.cards?.push(card);
        }
      });
      return category;
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
    <>
      <Text id="selectorMode-text">Selector mode:</Text>
      <TabList selectedValue={mode} onTabSelect={onModeTabSelect} aria-labelledby="selectorMode-text">
        <Tab value="byComponents">By components</Tab>
        <Tab value="byBehaviors">By behaviors</Tab>
      </TabList>
      {mode === 'byComponents' && (
        <>
          <Field label="Filter components">
            <Input value={filterText} onChange={onFilterChange} />
          </Field>
          <h2>Choose Component</h2>
          {selectedComponents.length > 0 && (
            <>
              <Text>Selected components:</Text>
              <TagGroup onDismiss={onSelectedComponentDismiss} aria-label="Selected components">
                {selectedComponents.map(component => (
                  <Tag key={component.name} value={component.name} dismissible dismissIcon={{ 'aria-label': 'Remove' }}>
                    {component.displayName}
                  </Tag>
                ))}
              </TagGroup>
              <Button onClick={onRemoveAllComponentsClick}>Clear components selection</Button>
            </>
          )}
          {allQuestions.length > 0 && <Link href="#questions">Next: Component choice checklist</Link>}
          <Text role="status">{filteredComponentsDefinitions.length} components available.</Text>
          <Accordion collapsible multiple>
            {categorizedComponents.map((category, index) => (
              <AccordionItem key={category.id} value={category.id}>
                <AccordionHeader as="h3" button={{ ref: index === 0 ? firstAccordionItemRef : undefined }}>
                  {category.title}
                </AccordionHeader>
                <AccordionPanel>
                  <div className={classes.root}>{category.cards}</div>
                </AccordionPanel>
              </AccordionItem>
            ))}
          </Accordion>
          {allQuestions.length > 0 && (
            <h2 className={classes.heading} id="questions">
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
      <MatchingComponents components={getMatchingComponents()} />
    </>
  );
};

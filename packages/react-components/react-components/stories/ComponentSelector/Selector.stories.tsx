import * as React from 'react';

import { Accordion, AccordionHeader, AccordionItem, AccordionPanel } from '@fluentui/react-components';
import { Checkbox, RadioGroup, Radio, Label, makeStyles } from '@fluentui/react-components';
import { Scenario } from './utils';

import {
  AccordionDef,
  CheckboxDef,
  DataGridDef,
  DataGridBaseDef,
  DataGridTabbableDef,
  MenuBaseDef,
  MenuCheckboxDef,
} from './components-definitions/index';

const useStyles = makeStyles({
  secondLevel: { 'margin-left': '30px' },
  thirdLevel: { 'margin-left': '60px' },
  forthLevel: { 'margin-left': '90px' },
});

export const Selector: React.FC = () => {
  const classes = useStyles();

  const [decisionState, setDecisionState] = React.useState<Record<string, boolean | string | undefined>>({
    // UI behavior
    interactive: undefined,
    composition: undefined,
    toggle: false,
    navigableToPage: false,

    // Keyboard navigation
    navigationByArrowKeys: false,
    navigationByTabKey: false,
    innerNavigationAfterEnter: false,
    nestedNavigation: false,

    // Screen reader
    narratePosition: false,
  });

  const selectedDecisions = React.useRef<string[]>([]);
  const componentsDefinitions = React.useRef<Record<string, any>[]>([]);
  componentsDefinitions.current.push(
    AccordionDef,
    CheckboxDef,
    DataGridDef,
    DataGridBaseDef,
    DataGridTabbableDef,
    MenuBaseDef,
    MenuCheckboxDef,
  );

  const mergeBaseObjects = () => {
    componentsDefinitions.current.forEach(definition => {
      for (const key in definition) {
        if (key === 'extends') {
          const value = definition[key];
          // find definition which is based one
          const baseDefinition = componentsDefinitions.current.find(def => def.name === value);
          // create new object not delete name of base definition for others usage
          const temporaryObject = JSON.parse(JSON.stringify(baseDefinition));
          delete temporaryObject.name;
          Object.assign(definition, temporaryObject);
        }
      }
    });
  };

  const cleanUpBaseObjects = () => {
    componentsDefinitions.current.forEach((definition, index) => {
      // just check the name if includes "Base",
      // in future would be better detection based on prop, like: "abstract": "true"
      if (definition.name.includes('Base')) {
        componentsDefinitions.current.splice(index, 1);
      }
    });
  };

  const updateDecisions = (name: string, value: boolean | string) => {
    decisionState[name] = value;
    setDecisionState({ ...decisionState });

    if (value) {
      selectedDecisions.current.push(name);
    } else {
      const index = selectedDecisions.current.indexOf(name);
      selectedDecisions.current.splice(index, 1);
    }
  };

  return (
    <Scenario pageTitle="Component Selector">
      <h1>Component Selector</h1>

      <Accordion multiple>
        <AccordionItem value="uiBehavior">
          <AccordionHeader as="h2">How the desired UI behaves?</AccordionHeader>
          <AccordionPanel>
            <Label id="interactivity"> Interactivity </Label>
            <RadioGroup
              value={decisionState.interactive as string}
              onChange={(event, data) => {
                updateDecisions('interactive', data.value);
              }}
              aria-labelledby="interactivity"
            >
              <Radio value="interactive" label="Is interactive?" />
              <Radio value="static" label="Is static?" />
            </RadioGroup>
            {decisionState.interactive === 'interactive' && (
              <>
                <Label className={classes.secondLevel} id="Composition">
                  Composition
                </Label>
                <RadioGroup
                  className={classes.secondLevel}
                  value={decisionState.composition as string}
                  onChange={(event, data) => {
                    updateDecisions('composition', data.value);
                  }}
                  aria-labelledby="Composition"
                >
                  <Radio value="single" label="Single element" />
                  <Radio value="group" label="Group of elements" />
                </RadioGroup>

                {decisionState.composition === 'single' && (
                  <div className={classes.thirdLevel}>
                    <Checkbox
                      label="Navigate to page on activation?"
                      onChange={(event, data) => {
                        updateDecisions('navigableToPage', data.checked);
                      }}
                    />
                    <Checkbox
                      label="Can be toggled?"
                      onChange={(event, data) => {
                        updateDecisions('toggle', data.checked);
                      }}
                    />
                    <Checkbox
                      label="Has multiple actions?"
                      onChange={(event, data) => {
                        updateDecisions('multipleActions', data.checked);
                      }}
                    />
                    <Checkbox
                      label="Opens menu?"
                      onChange={(event, data) => {
                        updateDecisions('opensMenu', data.checked);
                      }}
                    />
                  </div>
                )}
              </>
            )}
          </AccordionPanel>
        </AccordionItem>
        <AccordionItem value="keyboardNavigation">
          <AccordionHeader as="h2">What do you expect from keyboard navigation?</AccordionHeader>
          <AccordionPanel></AccordionPanel>
        </AccordionItem>
        <AccordionItem value="screenReader">
          <AccordionHeader as="h2">What do you expect from screen reader behavior?</AccordionHeader>
          <AccordionPanel></AccordionPanel>
        </AccordionItem>
      </Accordion>

      <h2>Matching components</h2>
      {selectedDecisions.current.length > 0 && (
        <div className={classes.forthLevel} tabIndex={0}>
          Available component(s): {JSON.stringify(selectedDecisions.current)}
        </div>
      )}
    </Scenario>
  );
};

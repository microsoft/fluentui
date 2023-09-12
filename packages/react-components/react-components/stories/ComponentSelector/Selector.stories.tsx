import * as React from 'react';

import { Accordion, AccordionHeader, AccordionItem, AccordionPanel } from '@fluentui/react-components';
import { Checkbox, RadioGroup, Radio } from '@fluentui/react-components';
import type { CheckboxProps } from '@fluentui/react-components';
import { Scenario } from './utils';

export const Selector: React.FC = () => {
  const [interactive, setInteractive] = React.useState<CheckboxProps['checked']>(false);
  const [composition, setComposition] = React.useState<string | undefined>(undefined);
  const [toggle, setToggle] = React.useState<CheckboxProps['checked']>(false);
  const [navigableToPage, setNavigableToPage] = React.useState<CheckboxProps['checked']>(false);
  const decisionProps = React.useRef<string[]>([]);

  const updateDecisionProps = (isChecked, valueOfCheckbox) => {
    if (isChecked) {
      decisionProps.current.push(valueOfCheckbox);
    } else {
      const index = decisionProps.current.indexOf(valueOfCheckbox);
      decisionProps.current.splice(index, 1);
    }
  };

  return (
    <Scenario pageTitle="Component Selector">
      <h1>Component Selector</h1>

      <Accordion multiple>
        <AccordionItem value="faq1">
          <AccordionHeader as="h2">How the desired UI looks like?</AccordionHeader>
          <AccordionPanel>
            <Checkbox label="Is interactive?" onChange={(ev, data) => setInteractive(data.checked)} />
            {interactive && (
              <>
                <RadioGroup
                  value={composition}
                  onChange={(_, data) => setComposition(data.value)}
                  aria-label="Single or group element"
                >
                  <Radio value="single" label="Single element" />
                  <Radio value="group" label="Group of elements" />
                </RadioGroup>

                {composition === 'single' && (
                  <>
                    <Checkbox
                      label="Navigate to page on activation?"
                      onChange={(ev, data) => {
                        setNavigableToPage(data.checked);
                        // when uncheck take away from array
                        updateDecisionProps(data.checked, 'navigableToPage');
                      }}
                    />
                    <Checkbox
                      label="Can be toggled?"
                      onChange={(ev, data) => {
                        setToggle(data.checked);
                        updateDecisionProps(data.checked, 'toggle');
                        console.log('test');
                      }}
                    />
                  </>
                )}
              </>
            )}
            {decisionProps.current.length > 0 && JSON.stringify(decisionProps.current)}
            {/* <Checkbox label="Group of elements" /> */}
          </AccordionPanel>
        </AccordionItem>
        <AccordionItem value="faq2">
          <AccordionHeader as="h2">What do you expect from keyboard navigation?</AccordionHeader>
          <AccordionPanel>
            <p>If you have a Windows operating system installed, open File Explorer or This PC.</p>
            <ol>
              <li>Right click on This PC or Computer in the navigation pane and select Properties.</li>
              <li>
                In the System information screen, find the System type entry. This will indicate what type of processor
                your device has.
              </li>
            </ol>
            <p>
              If you do not have an operating system installed, you should refer to the documentation that came with the
              device. Most device and processor manufacturers also provide information regarding processor capabilities
              on their websites.
            </p>
          </AccordionPanel>
        </AccordionItem>
        <AccordionItem value="faq3">
          <AccordionHeader as="h2">What do you expect from screen reader behavior?</AccordionHeader>
          <AccordionPanel>
            <p>
              The product key is located inside the product packaging, on the receipt or confirmation page for a digital
              purchase or in a confirmation e-mail that shows you purchased Windows. If you purchased a digital copy
              from Microsoft Store, you can locate your product key in your Account under Digital Content.
            </p>
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
    </Scenario>
  );
};

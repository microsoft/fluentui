import * as React from 'react';

import { Accordion, AccordionItem, AccordionHeader, AccordionPanel } from '@fluentui/react-accordion';

import { Scenario } from './utils';

export const FAQAccordionAccessibilityScenario: React.FunctionComponent = () => {
  return (
    <Scenario pageTitle="FAQ accordion">
      <h1>Frequently asked questions about Windows</h1>
      <Accordion multiple>
        <AccordionItem value="faq1">
          <AccordionHeader as="h2">
            What's the difference between 32-bit and 64-bit versions of Windows?
          </AccordionHeader>
          <AccordionPanel>
            <p>
              The terms 32-bit and 64-bit refer to the way a computer's processor (also called a CPU) handles
              information. The 64-bit version of Windows handles large amounts of random access memory (RAM) more
              effectively than a 32-bit system. Not all devices can run the 64-bit versions of Windows.
            </p>
          </AccordionPanel>
        </AccordionItem>
        <AccordionItem value="faq2">
          <AccordionHeader as="h2">How do I tell if my computer can run a 64-bit version of Windows?</AccordionHeader>
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
          <AccordionHeader as="h2">How do I find my Windows product key?</AccordionHeader>
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

export default {
  title: 'Accessibility Scenarios / FAQ accordion',
  id: 'accordion-faq-accessibility-scenario',
};

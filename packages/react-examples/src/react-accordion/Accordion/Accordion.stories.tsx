import * as React from 'react';
import { Accordion, AccordionProps } from '@fluentui/react-accordion';
import * as classes from '../react-accordion.stories.scss';

const AccordionExamples = (props: AccordionProps) => <Accordion {...props}>Hello World!</Accordion>;

export const AccordionExample = () => <AccordionExamples />;

import * as React from 'react';
import { RatingBasicExample } from './examples/Rating.Basic.Example';
import { DemoPage } from "../../demo/components/DemoPage";
import { IDemoPageProps } from "../../demo/components/DemoPage.types";
import { RatingButtonControlledExample } from './examples/Rating.ButtonControlled.Example';
import { RatingStatus } from './Rating.checklist';

const RatingBasicExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/Rating/examples/Rating.Basic.Example.tsx') as string;
const RatingButtonControlledExampleCode = require('!raw-loader!office-ui-fabric-react/src/components/Rating/examples/Rating.ButtonControlled.Example.tsx') as string;

export const RatingPageProps: IDemoPageProps = {
  title: 'Rating',
  componentName: 'Rating',
  componentUrl: 'https://github.com/OfficeDev/office-ui-fabric-react/tree/master/packages/office-ui-fabric-react/src/components/Rating',
  componentStatus: RatingStatus,
  examples: [{
    "title": "Rating",
    "code": RatingBasicExampleCode,
    "view": <RatingBasicExample />
}, {
    "title": "Button Controlled Rating",
    "code": RatingButtonControlledExampleCode,
    "view": <RatingButtonControlledExample />
}],
  propertiesTablesSources: [
  require<string>('!raw-loader!office-ui-fabric-react/src/components/Rating/Rating.types.ts')
],
  overview: require<string>('!raw-loader!office-ui-fabric-react/src/components/Rating/docs/RatingOverview.md'),
  bestPractices: "",
  dos: require<string>('!raw-loader!office-ui-fabric-react/src/components/Rating/docs/RatingDos.md'),
  donts: require<string>('!raw-loader!office-ui-fabric-react/src/components/Rating/docs/RatingDonts.md'),
  isHeaderVisible: true,
};

export const RatingPage = (props: { isHeaderVisible: boolean }) => (<DemoPage { ...{ ...RatingPageProps, ...props } } />);
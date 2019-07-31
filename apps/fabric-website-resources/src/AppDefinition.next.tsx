import { IAppLink, IAppDefinition } from '@uifabric/example-app-base';
import { AppDefinition } from './AppDefinition';

export const nextExamplePages: IAppLink[] = [
  {
    component: require<any>('./components/pages/next/ButtonPage').ButtonPage,
    key: 'Button',
    name: 'Button',
    url: '#/examples/button'
  }
];

export const AppDefinitionNext: IAppDefinition = AppDefinition;

for (const sectionPage in AppDefinition.examplePages) {
  for (const examplePage in AppDefinition.examplePages[sectionPage].links) {
    AppDefinition.examplePages[sectionPage].links[examplePage] = replaceNextPages(
      AppDefinition.examplePages[sectionPage].links[examplePage]
    );
  }
}

function replaceNextPages(examplePage: IAppLink): IAppLink {
  for (const page of nextExamplePages) {
    if (page.key === examplePage.key) {
      return page;
    }
  }

  return examplePage;
}

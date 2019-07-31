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

export const AppDefinitionNext: IAppDefinition = JSON.parse(JSON.stringify(AppDefinition));

const sectionsNumber = AppDefinitionNext.examplePages.length;
for (let sectionPage = 0; sectionPage < sectionsNumber; sectionPage++) {
  const examplesNumber = AppDefinitionNext.examplePages[sectionPage].links.length;
  for (let examplePage = 0; examplePage < examplesNumber; examplePage++) {
    AppDefinitionNext.examplePages[sectionPage].links[examplePage] = replaceNextPages(
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

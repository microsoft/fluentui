declare namespace Cypress {
  interface Chainable {
    /**
     * Navigates to storybook story URL based on component name and story name in Pascal case
     */
    visitStory(componentName: string, storyName: string): Chainable;
  }
}

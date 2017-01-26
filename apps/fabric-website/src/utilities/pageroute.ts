import { IAppState } from '../components/app/AppState';

/*
  Retreive the route URL for a page in a group from the the AppState
*/
export function getPageRouteFromState(appstate: IAppState, pageName: string): string {
  let route: string = '';
  appstate.pages.map((page) => {
    if (page.title === pageName) {
      route = page.url;
    } else if (page.pages) {
      page.pages.map((subPage) => {
        if (subPage.title === pageName) {
          route = subPage.url;
        }
      });
    }
  });

  return route;
}
import { IAppState } from '../components/app/AppState';
/*
  Retreive the route URL for a page in a group from the the AppState
*/
export function getPageRouteFromState(appstate: IAppState, groupName: string, pageName: string): string {
  let route: string = '';
  appstate.examplePages.map((pageValue) => {
    if (groupName === pageValue.name) {
      pageValue.links.map((linkValue) => {
        if (linkValue.name === pageName) {
          route = linkValue.url;
        }
      });
    }
  });

  return route;
}
import { searchServer } from '../search.server';

export function loader(): Promise<Response> {
  return searchServer.staticGET();
}

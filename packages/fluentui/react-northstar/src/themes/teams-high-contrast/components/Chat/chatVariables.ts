import { ChatVariables } from '../../../teams/components/Chat/chatVariables';

export default (siteVars: any): Partial<ChatVariables> => {
  return {
    backgroundColor: siteVars.colors.black,
  };
};

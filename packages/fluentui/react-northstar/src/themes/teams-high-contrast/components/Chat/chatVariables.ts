import { ChatVariables } from '../../../teams/components/Chat/chatVariables';

export const chatVariables = (siteVars: any): Partial<ChatVariables> => {
  return {
    backgroundColor: siteVars.colors.black,
  };
};

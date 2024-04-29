import * as React from 'react';

export type FormFieldBaseValue = {
  labelId: string;
};

export const FormFieldBaseContext = React.createContext<FormFieldBaseValue>({
  labelId: null,
});

export const FormFieldBaseProvider = FormFieldBaseContext.Provider;

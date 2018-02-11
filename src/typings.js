/* @flow */

export type ActionTypesSet = [string, string, string];

export type ActionConfig = { [key: string]: ActionTypesSet };

export type ApiAction = {
  type: string,
  types: ActionTypesSet,
  params?: Object,
  data?: Object,
  [key: string]: mixed
};

export type ApiActionSet = {
  [key: string]: (params: Object) => ApiAction
};

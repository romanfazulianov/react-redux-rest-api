/*@flow*/

import type { ActionTypesSet, ActionConfig, ApiActionSet } from '../typings';

export const actionGenerator = (REST_API_TYPE: string, types: ActionTypesSet) =>
  (params: ?Object) => ({
    type: REST_API_TYPE,
    types,
    ...params
  });


const actionSetGenerator = (REST_API_TYPE: string, config: ActionConfig): ApiActionSet => {

  const _config = { ...config };

  Object.keys(_config).forEach((key) => {

    _config[key] = actionGenerator(REST_API_TYPE, _config[key])

  });

  return _config;
};



/*
  @example usage

  export const apiActionsConfig: ActionConfig = {
    getAction: [GET_ACTION_START, GET_ACTION_SUCCESS, GET_ACTION_FAIL],
    deleteAction: [DELETE_ACTION_START, DELETE_ACTION_SUCCESS, DELETE_ACTION_FAIL],
    postAction: [POST_ACTION_START, POST_ACTION_SUCCESS, POST_ACTION_FAIL],
    putAction: [PUT_ACTION_START, PUT_ACTION_SUCCESS, PUT_ACTION_FAIL]
  };

  export const REST_API_TYPE: string = 'REST_API';

  export const apiActions = actionSetGenerator(REST_API_TYPE, apiActionsConfig); // result
*/
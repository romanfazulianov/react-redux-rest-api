/* @flow */
import { generateArrayStrategy } from "../strategies/generateStrategy";
import { POST, PUT, requestDefaults } from '../constants';
import type { ActionTypesSet } from '../typings';

const serviceTriadeGenerator = ({ types, url, method } : { types: ActionTypesSet, url: Function, method: string}) => {
  const layer = {};
  const [START, SUCCESS, ERROR] = types;

  layer[START] = (action, dispatch) => fetch => {
    dispatch({ type: START, action });
    return fetch(
      url(action),
      Object.assign(
        {
          method,
          ...requestDefaults
        },
        method === POST || method === PUT
          ? {
              headers: new Headers({
                'Content-Type': 'application/json'
              }),
              body: JSON.stringify(action.data)
            }
          : {}
      )
    );
  };
  layer[SUCCESS] = (action, dispatch) => (res: Response) => {
    return Promise.resolve((res.bodyUsed && res.json()) || true).then(response => {
      return dispatch({ type: SUCCESS, response, action });
    });
  };
  layer[ERROR] = (action, dispatch) => error => {
    return dispatch({ type: ERROR, error, action });
  };

  return layer;
};

export const serviceLayerGenerator: (layerConfig: Array<Object>) => ({ [key: string]: Function }) =
  generateArrayStrategy((config) => Object.assign(this, serviceTriadeGenerator(config)));

/* @example usage
  const result = {};
  Object.assign(
    result,
    serviceTriadeGenerator({
      types: [GET_ACTION_START, GET_ACTION_SUCCESS, GET_ACTION_FAIL],
      url: action => `/path/to/${action.id}`,
      method: GET
    })
  );

  // or

  const result = serviceLayerGenerator([
    {
      types: [GET_ACTION_START, GET_ACTION_SUCCESS, GET_ACTION_FAIL],
      url: action => `/path/to/${action.id}`,
      method: GET
    }
  ])
);*/
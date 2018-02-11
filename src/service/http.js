/* @flow */
import type { ApiAction } from '../typings';

export default (httpHandlers: { [key: string]: Function }) => (action: ApiAction, dispatch: Function): Promise<Object> => {
  const [ startType, successType, failType ] = action && action.types || [];

  try {

    const request: Function = httpHandlers[startType](action, dispatch)(fetch);
    const response: Function = httpHandlers[successType](action, dispatch);
    const error: Function = httpHandlers[failType](action, dispatch);

    return new Promise((resolve: Function, reject: Function): Promise<Response> =>
      request.then((res: Response) => {
        return res.ok ? resolve(response(res)) : reject(error(res));
      })
    );

  } catch (error) {

    return Promise.reject(dispatch({ type: failType, action, error }));
  }
};

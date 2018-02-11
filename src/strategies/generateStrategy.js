/* @flow */

export const generateObjectStrategy = (applyFn: Function) => (config: Object): Object => {
  const _config = {...config};
  
  Object.keys(_config).forEach(applyFn.bind(_config));

  return _config;
}

export const generateArrayStrategy = (applyFn: Function) => (config: Array<Object>): Object => {
  const _config = [...config];
  const _result = {}

  _config.forEach(applyFn.bind(_result));

  return _result;
}

import co from 'co';

const mergeResults = (...args) => (result, fn) => ({ ...result, ...fn(...args) });

export default (...injectors) => ({ dispatch, getState }) => next => action => {
  if (typeof action === 'function') {
    const defaultProps = { dispatch, getState };
    return co(action, injectors.reduce(mergeResults(defaultProps), defaultProps));
  }
  return next(action);
};

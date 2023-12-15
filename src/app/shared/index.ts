export const deprecate = (fn: Function, message: string) => {
  console.warn(`DeprecationWarning: ${fn.name} is deprecated. ${message}`);
};

export const mergeClassNames = (classNamesArr = []) => {
  const classes = classNamesArr.map(item => item);
  return classes.join(' ');
}
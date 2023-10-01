export const mergeClassNames = (classNamesArr = [], customClasses = {}) => {
  const classes = classNamesArr.map(item => item);

  if (Object.keys(customClasses).length) {
    Object.entries(customClasses).forEach(([name, value]) => {
      if (value) {
        classes.push(name);
      }
    });
  }

  return classes.join(' ');
}

export const createDTO = (data, message = 'Success') => {
  return {
    data,
    message,
  }
}

export const validateEmail = (email) => {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};
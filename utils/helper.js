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

export const toastConfig = (status, title, description = null) => {
  return {
    title,
    description,
    status,
    duration: 5000,
    isClosable: true,
    position: 'bottom-right',
    variant: 'left-accent',
  }
}

export const TOAST_TYPES = {
  SUCCESS: 'success',
  ERROR: 'error'
}

export const BUTTON_TYPES = {
  OUTLINE: 'outline'
}
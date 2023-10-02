//
//  Util Fns
//

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

const ascendingSort = (a, b, key) => {
  if (a[key] < b[key]){
    return -1;
  }
  if (a[key] > b[key]){
    return 1;
  }
  return 0;
}

export const formatBoardResponse = (categories, tasks) => {
  const formattedBoardData = {};
  categories.forEach(category => {
    formattedBoardData[category.id] = {
      ...category,
      tasks: []
    }
  })
  const tasksObj = {}
  tasks.forEach(task => {
    tasksObj[task.id] = task;
  })
  Object.entries(formattedBoardData).forEach(([key, value]) => {
    const completedTasks = []
    const pendingTasks = []
    formattedBoardData[key].tasksList.forEach(item => {
      const { is_completed } = tasksObj[item];
      if (!is_completed) {
        pendingTasks.push(tasksObj[item])
      } else {
        completedTasks.push(tasksObj[item])
      }
    })
    formattedBoardData[key].tasks = pendingTasks
    formattedBoardData[key].completedTasks = completedTasks;
    formattedBoardData[key].totalTasksCount = formattedBoardData[key].tasks?.length;
    formattedBoardData[key].completedTasksCount = completedTasks?.length;
  })
  return { categories: formattedBoardData };
}

export const getHighestOrder = (categories) => {
  let highestOrder = 0;
  categories.forEach(category => {
    highestOrder = Math.max(category.order, highestOrder)
  })
  return highestOrder;
}

// 
//  Enums 
//

export const TOAST_TYPES = {
  SUCCESS: 'success',
  ERROR: 'error'
}

export const BUTTON_TYPES = {
  OUTLINE: 'outline'
}

export const DB_ENUMS = {
  CATEGORIES: 'categories',
  TASKS: 'tasks',
}

export const DB_COLUMNS = {
  IS_COMPLETED: 'is_completed',
  ID: 'id',
  NAME: 'name',
  TASKS_LIST: 'tasksList',
  CATEGORY: 'category',
  ORDER: 'order',
  TITLE: 'title'
}
'use client';

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { DB_COLUMNS, DB_ENUMS, formatBoardResponse, getHighestOrder, TOAST_TYPES } from '@/utils/helper';
import { useAuth } from '../AuthContext';
import { useToast } from '@chakra-ui/toast';

export const DataContext = createContext();
export const useData = () => useContext(DataContext);

const DataProvider = ({ children }) => {
  const { supabase, user } = useAuth()
  const toast = useToast();
  const [categories, setCategories] = useState({})
  const [fetchDBInProgress, setFetchDBInProgress] = useState(false);

  const fetchCategories = useCallback(() => {
    return new Promise(async (resolve, reject) => {
      if (user) {
        const { error, data } = await supabase
          .from(DB_ENUMS.CATEGORIES)
          .select()
        if (error) {
          reject()
        }
        resolve(data);
      }
    })
  }, [supabase, user]);

  const fetchTasks = useCallback(() => {
    return new Promise(async (resolve, reject) => {
      if (user) {
        const { error, data } = await supabase
          .from(DB_ENUMS.TASKS)
          .select()
        if (error) {
          reject()
        }
        resolve(data);
      }
    })
  }, [supabase, user]);

  const fetchBoard = useCallback(() => {
    return new Promise(async (resolve, reject) => {
      if (user) {
        const { error: errorCtg, data: dataCtg } = await supabase
          .from(DB_ENUMS.CATEGORIES)
          .select()
          .order(DB_COLUMNS.ID, { ascending: true })
        const { error: errorTasks, data: dataTasks } = await supabase
          .from(DB_ENUMS.TASKS)
          .select();
        resolve(formatBoardResponse(dataCtg, dataTasks))
        if (errorCtg || errorTasks) {
          reject()
        }
      }
    })
  }, [supabase, user]);

  const updateTask = useCallback((column, value, taskId) => {
    return new Promise(async (resolve, reject) => {
      const { error } = await supabase
        .from(DB_ENUMS.TASKS)
        .update({ [column]: value })
        .eq(DB_COLUMNS.ID, taskId)
        .select()

        if (error) {
          reject(error)
        }
        resolve()
      })
  }, [supabase]);

  const createTask = useCallback((category, title) => {
    return new Promise(async (resolve, reject) => {
      const { data, error } = await supabase
        .from(DB_ENUMS.TASKS)
        .insert([
          { [DB_COLUMNS.NAME]: title, [DB_COLUMNS.CATEGORY]: category.id },
        ])
        .select()
      const { id } = data?.[0];
      const newTasksList = [...category.tasksList, id]
      const { error: errorCat } = await supabase
        .from(DB_ENUMS.CATEGORIES)
        .update({ [DB_COLUMNS.TASKS_LIST]: newTasksList })
        .eq(DB_COLUMNS.ID, category.id)
        .select()
      if (error || errorCat) {
        reject(error || errorCat)
      }
      resolve();
    })
  }, [supabase]);

  const deleteTask = useCallback((category, columnId) => {
    return new Promise(async (resolve, reject) => {
      const { error } = await supabase
        .from(DB_ENUMS.TASKS)
        .delete()
        .eq(DB_COLUMNS.ID, columnId)

      if (error) {
        reject(error)
      }

      const newTasksList = category?.tasksList?.filter(item => item !== columnId)
      const { error: errorCat } = await supabase
        .from(DB_ENUMS.CATEGORIES)
        .update({ [DB_COLUMNS.TASKS_LIST]: newTasksList })
        .eq(DB_COLUMNS.ID, category.id)
        .select()
      if (errorCat) {
        reject(errorCat)
      }
      resolve();
    })
  }, [supabase])

  const createCategory = useCallback((title) => {
    return new Promise(async (resolve, reject) => {
      setFetchDBInProgress(true)
      const categories = await fetchCategories();
      const highestOrder = getHighestOrder(categories);
      const { error } = await supabase
        .from(DB_ENUMS.CATEGORIES)
        .insert([
          {
            [DB_COLUMNS.ORDER]: highestOrder + 1,
            [DB_COLUMNS.TITLE]: title,
            [DB_COLUMNS.TASKS_LIST]: []
          },
        ])
        .select()
      setFetchDBInProgress(false)
      if (error) {
        reject(error)
      }
      resolve()
    })
  }, [supabase, fetchCategories]);

  const getBoardData = useCallback(async () => {
    try {
      setFetchDBInProgress(true)
      const { categories } = await fetchBoard();
      setCategories(categories);
      setFetchDBInProgress(false)
    } catch (err) {
      toast(toastConfig(TOAST_TYPES.ERROR, 'Oops!', 'Something went wrong, please try again!'))
    }
  }, [fetchBoard, toast])

  useEffect(() => {
    getBoardData();
  }, [getBoardData])
  
  const ctxProps = useMemo(() => ({
    categories,
    fetchCategories,
    fetchTasks,
    fetchBoard,
    updateTask,
    createTask,
    deleteTask,
    createCategory,
    getBoardData,
    loading: fetchDBInProgress,
  }), [categories, fetchCategories, fetchTasks, fetchBoard, updateTask, createTask, deleteTask, createCategory, getBoardData, fetchDBInProgress]);

  return (
    <DataContext.Provider value={ctxProps}>
      {children}
    </DataContext.Provider>
  )
};

export default DataProvider;

'use client';

import { createContext, useCallback, useContext, useMemo } from 'react';
import { DB_ENUMS, formatBoardResponse } from '@/utils/helper';
import { useAuth } from '../AuthContext';

export const DataContext = createContext();
export const useData = () => useContext(DataContext);

const DataProvider = ({ children }) => {
  const { supabase, user } = useAuth()

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
          .order('id', { ascending: true })
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
  
  const ctxProps = useMemo(() => ({
    fetchCategories,
    fetchTasks,
    fetchBoard
  }), [fetchCategories, fetchTasks, fetchBoard]);

  return (
    <DataContext.Provider value={ctxProps}>
      {children}
    </DataContext.Provider>
  )
};

export default DataProvider;

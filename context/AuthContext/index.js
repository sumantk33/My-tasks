'use client';

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { useUser, useSupabaseClient } from '@supabase/auth-helpers-react'
import { DB_ENUMS } from '@/utils/helper';

export const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

const AuthProvider = ({ children }) => {
  const supabase = useSupabaseClient();
  const user = useUser();
  const [reqInProgress, setReqInProgress] = useState(true);

  const fetchSession = useCallback(async () => {
    await supabase.auth.getSession();
    setReqInProgress(false);
  }, [supabase]);

  const login = useCallback((email, password) => {
    return new Promise(async (resolve, reject) => {
      const { error, data } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (!error) {
        resolve();
      } else {
        reject(error);
      }
    })
  }, [supabase.auth]);

  const logout = useCallback(async () => {
    return new Promise(async (resolve, reject) => {
      const { error } =  supabase.auth.signOut();
      if (!error) {
        resolve();
      } else {
        reject(error);
      }
    })
  }, [supabase.auth]);

  useEffect(() => {
    fetchSession();
  }, [fetchSession]);
  
  const ctxProps = useMemo(() => ({
    user,
    supabase,
    login,
    logout,
    reqInProgress,
  }), [login, supabase, user, logout, reqInProgress]);

  return (
    <AuthContext.Provider value={ctxProps}>
      {children}
    </AuthContext.Provider>
  )
};

export default AuthProvider;

'use client';

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { useUser, useSupabaseClient } from '@supabase/auth-helpers-react'
import { useRouter } from 'next/navigation';

export const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

const AuthProvider = ({ children }) => {
  const supabase = useSupabaseClient();
  const router = useRouter();
  const user = useUser();
  const [accessToken, setAccessToken] = useState(null);
  const [reqInProgress, setReqInProgress] = useState(true);

  const fetchSession = useCallback(async () => {
    const {
      data: { session },
    } = await supabase.auth.getSession();
    setReqInProgress(false);
    setAccessToken(session?.access_token || null);
  }, [supabase]);

  const login = useCallback((email, password) => {
    return new Promise(async (resolve, reject) => {
      const { error, data } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      setAccessToken(data.access_token);
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

    const {
      data: { subscription: authListener },
    } = supabase.auth.onAuthStateChange((event, session) => {
      if (session?.access_token !== accessToken && accessToken) {
        router.refresh();
      }
    });

    return () => {
      authListener?.unsubscribe();
    };

  }, [accessToken, fetchSession, router, supabase.auth]);
  
  const ctxProps = useMemo(() => ({
    user,
    supabase,
    login,
    logout,
    reqInProgress
  }), [login, supabase, user, logout, reqInProgress]);

  return (
    <AuthContext.Provider value={ctxProps}>
      {children}
    </AuthContext.Provider>
  )
};

export default AuthProvider;

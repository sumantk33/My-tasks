import { useAuth } from '@/context/AuthContext'
import { useData } from '@/context/DataContext';
import { toastConfig, TOAST_TYPES } from '@/utils/helper';
import { useToast } from '@chakra-ui/toast';
import { useCallback, useEffect } from 'react';
import If from '../common/If';
import styles from './dashboard.module.scss'
import NonLoggedInDashboard from './partials/NonLoggedInDashboard';

export default function Dashboard() {
  const { user, reqInProgress } = useAuth();
  const { fetchBoard } = useData();
  const toast = useToast();

  const getBoardData = useCallback(async () => {
    try {
      const data = await fetchBoard();
      console.log('first', data);
    } catch (err) {
      toast(toastConfig(TOAST_TYPES.ERROR, 'Oops!', 'Something went wrong, please try again!'))
    }
  }, [fetchBoard, toast])

  useEffect(() => {
    getBoardData();
  }, [getBoardData])

  return (
    <main className={styles.app}>
      <div className={styles.description}>
        <If test={!reqInProgress}>
          <If test={user}>Auth done</If>
          <If test={!user}><NonLoggedInDashboard /></If>
        </If>
      </div>
    </main>
  )
}

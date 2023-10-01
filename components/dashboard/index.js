import { useAuth } from '@/context/AuthContext'
import If from '../common/If';
import styles from './dashboard.module.scss'
import NonLoggedInDashboard from './partials/NonLoggedInDashboard';

export default function Dashboard() {
  const { user, reqInProgress } = useAuth();
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

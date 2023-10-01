import Button from '@/components/common/Button';
import { useRouter } from 'next/router';
import React from 'react'
import styles from './nonlogged.module.scss';

const NonLoggedInDashboard = () => {
  const router = useRouter();
  return (
    <div className={styles.container}>
      <div className={styles.title}>
        Create your tasks board within minutes with My-Tasks.
      </div>
      <div className={styles.description}>
        You can now maintain and visually analyze your tasks.
      </div>
      <Button onClick={() => router.push('/login')} className={styles.getStartedButton}>Get started</Button>
    </div>
  )
}

export default NonLoggedInDashboard
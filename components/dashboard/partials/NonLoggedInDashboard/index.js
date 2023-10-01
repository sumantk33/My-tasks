import { useRouter } from 'next/router';
import React from 'react'
import styles from './nonlogged.module.scss';
import { Button } from '@chakra-ui/button';

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
      <Button
        onClick={() => router.push('/login')}
      >
        Get Started!
      </Button>
    </div>
  )
}

export default NonLoggedInDashboard
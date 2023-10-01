import { useRouter } from 'next/router';
import React from 'react'
import Button, { BTN_VARIANTS } from '../common/Button';
import Icon from '../common/Icon';
import { ICON_NAME } from '../common/Icon/enums';
import styles from './notfound.module.scss';

const NotFound = () => {
  const router = useRouter();
  return (
    <div className={styles.container}>
      <Icon name={ICON_NAME.ERROR_404} size={15} />
      <div className={styles.title}>OOOPS!</div>
      <div className={styles.description}>Looks like you&apos;ve landed on a page that dosen&apos;t exist</div>
      <Button variant={BTN_VARIANTS.OUTLINE} onClick={() => router.push('/')}>Take me back!</Button>
    </div>
  )
}

export default NotFound
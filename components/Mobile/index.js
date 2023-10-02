import { Center, Heading } from '@chakra-ui/layout';
import React from 'react'
import styles from './mobile.module.scss';

const MobilePage = () => {
  return (
    <div className={styles.mobileContainer}>
      <Heading>Sorry! We don&apos;t support mobile devices yet.</Heading>
    </div>
  )
}

export default MobilePage
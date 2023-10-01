import Image from 'next/image'
import Button from '../common/Button'
import styles from './dashboard.module.scss'

export default function Dashboard() {
  return (
    <main className={styles.app}>
      <div className={styles.description}>
      <Button onClick={() => {}}>Click me!</Button>
      </div>
    </main>
  )
}

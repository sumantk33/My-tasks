import Image from 'next/image'
import styles from './dashboard.module.scss'

export default function Dashboard() {
  return (
    <main className={styles.app}>
      <div className={styles.description}>
        Hello
      </div>
    </main>
  )
}

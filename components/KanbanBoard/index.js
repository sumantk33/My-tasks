import { useData } from '@/context/DataContext';
import { Grid } from '@chakra-ui/layout';
import { Skeleton } from '@chakra-ui/skeleton';
import React from 'react'
import styles from './kanban.module.scss';
import Category from './partials/Category';
import CreateCategory from './partials/CreateCategory';

const KanbanBoard = () => {
  const { categories, loading } = useData();

  return (
    <section className={styles.wrapper}>
      {!loading ? (
        <Grid templateColumns={`repeat(${Object.entries(categories).length + 1}, 1fr)`} gap={6} mt={8}>
          {Object.entries(categories).map(([key, category]) => (
            <Category key={key} category={category} />
          ))}
          <CreateCategory />
        </Grid>
      ) : (
        <Grid templateColumns='repeat(3, 1fr)' gap={6} mt={8}>
          <Skeleton height='200px' w={250} />
          <Skeleton height='200px' w={250} />
          <Skeleton height='200px' w={250} />
        </Grid>
      )}
    </section>
  )
}

export default KanbanBoard
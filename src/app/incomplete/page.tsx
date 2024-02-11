'use client';

import { Paper } from '@mantine/core';
import classes from './incomplete.module.css';
import Tasks from '@/components/tasks/Tasks';
import { useGlobalState } from '@/context/globalProvider';

function page() {
  const { incompleteTasks } = useGlobalState();
  return (
    // Make styling the same as contentContainer
    <Paper shadow="xs" className={classes.contentContainer}>
      <Tasks title="Completed Tasks" tasks={incompleteTasks} />
    </Paper>
  );
}

export default page;

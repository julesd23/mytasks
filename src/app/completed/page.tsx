'use client';

import { Paper } from '@mantine/core';
import classes from './completed.module.css';
import { useGlobalState } from '@/context/globalProvider';
import Tasks from '@/components/tasks/Tasks';

function page() {
  const { completedTasks } = useGlobalState();
  return (
    <Paper shadow="xs" className={classes.contentContainer}>
      <Tasks title="Completed Tasks" tasks={completedTasks} />
    </Paper>
  );
}

export default page;

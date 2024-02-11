'use client';

import { Paper } from '@mantine/core';
import classes from './important.module.css';
import { useGlobalState } from '@/context/globalProvider';
import Tasks from '@/components/tasks/Tasks';

function page() {
  const { importantTasks } = useGlobalState();
  return (
    <Paper shadow="xs" className={classes.contentContainer}>
      <Tasks title="Important Tasks" tasks={importantTasks} />
    </Paper>
  );
}

export default page;

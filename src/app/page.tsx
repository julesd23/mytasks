'use client';

// import { Welcome } from '../components/Welcome/Welcome';
// import { ColorSchemeToggle } from '../components/ColorSchemeToggle/ColorSchemeToggle';
import { Paper } from '@mantine/core';
import classes from './layout.module.css';
import Tasks from '@/components/tasks/Tasks';
import { useGlobalState } from '@/context/globalProvider';
// import { ColorSchemeToggle } from '@/components/ColorSchemeToggle/ColorSchemeToggle';

export default function HomePage() {
  const { tasks } = useGlobalState();
  return (
    <Paper shadow="xs" className={classes.contentContainer}>
      {/* <ColorSchemeToggle /> */}
      <Tasks tasks={tasks} title="All Tasks" />
    </Paper>
  );
}

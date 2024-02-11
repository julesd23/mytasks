'use client';

import { Box, Button, Divider, Modal, SimpleGrid, Text } from '@mantine/core';
import React from 'react';
import { IoMdAdd } from 'react-icons/io';
import { useDisclosure } from '@mantine/hooks';
import { motion } from 'framer-motion';
import TaskItem from '../taskItem/TaskItem';
// import CreateContent from '../Modals/CreateContent';
// import classes from '@/app/layout.module.css';
import CreateContent from '../modals/CreateContent';

interface Props {
  title: string;
  tasks: any[];
}

function Tasks({ title, tasks }: Props) {
  // const { isLoading, openModal } = useGlobalState();
  // const [opened, { toggle, close }] = useDisclosure(false);
  const [opened, { open, close }] = useDisclosure(false);
  return (
    <Box
      style={{
        display: 'flex',
        flexDirection: 'column',
        padding: 20,
        gap: 1,
        height: '100%',
        width: '100%',
      }}
    >
      {/* THIS IS FOR CREATING TASKS */}
      {/* <Text variant="gradient" style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>
        Tasks
      </Text> */}
      <Box>
        <Box
          style={{
            display: 'flex',
            width: '100%',
            justifyContent: 'space-between',
          }}
        >
          <Text
            variant="gradient"
            style={{
              fontSize: '1.2rem',
              fontWeight: 'bold',
              fontStyle: 'italic',
              paddingBottom: 8,
            }}
          >
            {title}
          </Text>
          <Button onClick={open} variant="subtle" style={{ borderRadius: '10px' }}>
            <IoMdAdd /> Add New Task
          </Button>
        </Box>
        <Divider size="sm" pb={18} />
      </Box>

      <Box style={{ height: 'auto', display: 'flex', width: '100%' }}>
        <SimpleGrid
          style={{ width: '100%' }}
          cols={{ base: 1, sm: 2, md: 3, lg: 4, xl: 5 }}
          spacing={{ base: '1rem' }}
          verticalSpacing="1rem"
        >
          {/* {tasks.map((task, i) => (
            <motion.div
              initial={{ opacity: 0, translateY: 50 }}
              animate={{ opacity: 1, translateY: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <TaskItem
                key={task.id}
                title={task.title}
                description={task.description}
                date={task.date}
                isCompleted={task.isCompleted}
                id={task.id}
                isImportant={task.isImportant}
              />
            </motion.div>
          ))} */}
          {tasks.map((task, i) => (
            <motion.div
              initial={{ opacity: 0, translateY: 50 }}
              animate={{ opacity: 1, translateY: 0 }}
              transition={{ duration: 0.5, delay: (tasks.length - 1 - i) * 0.1 }}
              key={task.id}
            >
              <TaskItem
                title={task.title}
                description={task.description}
                date={task.date}
                isCompleted={task.isCompleted}
                id={task.id}
                isImportant={task.isImportant}
              />
            </motion.div>
          ))}
        </SimpleGrid>
      </Box>

      {/* CREATE A DIALOG FOR THIS */}
      <Modal opened={opened} onClose={close}>
        <CreateContent close={close} />
      </Modal>
    </Box>
  );
}

export default Tasks;

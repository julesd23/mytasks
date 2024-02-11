'use client';

import { ActionIcon, Box, Card, Chip, Modal, Text } from '@mantine/core';
import React from 'react';
import { FaEdit } from 'react-icons/fa';
import { RiDeleteBinFill } from 'react-icons/ri';
import { useDisclosure } from '@mantine/hooks';
import classes from './TaskItem.module.css';
import formatDate from '@/utils/formatDate';
import { useGlobalState } from '@/context/globalProvider';
import CreateContent from '../modals/CreateContent';

interface Props {
  title: string;
  description: string;
  date: string;
  isCompleted: boolean;
  isImportant: boolean;
  id: string;
}

function TaskItem({ title, description, date, isCompleted, isImportant, id }: Props) {
  const { deleteTask, updateTask } = useGlobalState();
  const [opened, { open: openEditDialog, close }] = useDisclosure(false);

  const modalDefaults = {
    title,
    description,
    date,
    isCompleted,
    isImportant,
    id,
  };

  return (
    <Card className={classes.taskItemCard}>
      <Text variant="gradient" style={{ fontSize: '1rem', fontWeight: 'bold' }}>
        {title}
      </Text>
      <Box
        style={{
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          justifyContent: 'space-between',
        }}
      >
        <Text style={{ fontSize: '0.8rem' }}>{description}</Text>
        <Text style={{ fontSize: '0.6rem' }}>{formatDate(date)}</Text>
      </Box>

      <Box className={classes.taskFooter}>
        {isCompleted ? (
          <Chip
            onClick={() => {
              const task = {
                id,
                isCompleted: !isCompleted,
              };
              updateTask(task);
            }}
            checked
            className={classes.completedButton}
          >
            Completed
          </Chip>
        ) : (
          <Chip
            onClick={() => {
              const task = {
                id,
                isCompleted: !isCompleted,
              };
              updateTask(task);
            }}
            checked={false}
            className={classes.completedButton}
          >
            Incomplete
          </Chip>
        )}

        <ActionIcon onClick={openEditDialog} variant="gradient">
          <FaEdit />
        </ActionIcon>
        <ActionIcon
          variant="gradient"
          gradient={{ from: 'red', to: 'pink', deg: 90 }}
          onClick={() => {
            deleteTask(id);
          }}
        >
          <RiDeleteBinFill />
        </ActionIcon>
      </Box>
      <Modal opened={opened} onClose={close}>
        <CreateContent close={close} defaultVals={modalDefaults} />
      </Modal>
    </Card>
  );
}

export default TaskItem;

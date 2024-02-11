'use client';

import { Box, Button, Checkbox, Group, TextInput, Textarea, Text } from '@mantine/core';
import { useForm } from '@mantine/form';
import React, { useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useGlobalState } from '@/context/globalProvider';

function CreateContent({
  close,
  defaultVals,
}: {
  close: () => void;
  defaultVals?: {
    title: string;
    description: string;
    date: string;
    isCompleted: boolean;
    isImportant: boolean;
    id: string;
  };
}) {
  const [date, setDate] = useState(defaultVals?.date ?? '');
  const { allTasks, updateTask } = useGlobalState();

  const form = useForm({
    initialValues: {
      id: defaultVals?.id,
      title: defaultVals?.title ?? '',
      description: defaultVals?.description ?? '',
      date: defaultVals?.date ?? date,
      completed: defaultVals?.isCompleted ?? false,
      important: defaultVals?.isImportant ?? false,
    },
  });

  const handleSubmit = async (vals: any) => {
    const newTask = {
      title: vals.title,
      description: vals.description,
      date,
      completed: vals.completed,
      important: vals.important,
    };

    const changedTask = {
      id: defaultVals?.id,
      title: vals.title,
      description: vals.description,
      date,
      completed: vals.completed,
      important: vals.important,
    };

    if (!defaultVals) {
      try {
        const res = await axios.post('/api/tasks', newTask);

        if (res.data.error) {
          toast.error(res.data.error);
        }
        if (!res.data.error) {
          toast.success('Task created successfully.');
          allTasks();
          form.reset();
          close();
        }
      } catch (error) {
        toast.error('Something went wrong.');
        console.error(error);
      }
    } else {
      updateTask(changedTask);
    }
  };

  return (
    <Box
      maw={340}
      mx="auto"
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 15,
        paddingBottom: 10,
      }}
    >
      <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
        <Text
          variant="gradient"
          style={{ fontSize: '15px', fontWeight: 'bold', fontStyle: 'italic' }}
        >
          New Task
        </Text>
        <TextInput label="Title" placeholder="title" {...form.getInputProps('title')} />
        <Textarea minRows={8} label="Description" {...form.getInputProps('description')} />
        <input
          style={{ border: '2px, #f1f3f5', marginTop: '8px', marginLeft: '2px' }}
          onChange={(val) => setDate(val.target.value)}
          type="date"
          name="date"
          id="date"
          defaultValue={defaultVals?.date}
        />
        <Box
          maw={340}
          mx="auto"
          style={{ display: 'flex', flexDirection: 'column', width: '100%' }}
        >
          {' '}
          <Checkbox
            mt="md"
            label="completed"
            {...form.getInputProps('completed', { type: 'checkbox' })}
          />
          <Checkbox
            mt="md"
            label="important"
            {...form.getInputProps('important', { type: 'checkbox' })}
          />
        </Box>
        <Group justify="flex-end" mt="md">
          <Button type="submit">Submit</Button>
        </Group>
      </form>
    </Box>
  );
}

export default CreateContent;

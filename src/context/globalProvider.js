'use client';

import axios from 'axios';
import React, { createContext, useState, useContext, useEffect } from 'react';
import toast from 'react-hot-toast';
import { useUser } from "@clerk/nextjs"

export const GlobalContext = createContext()

export const GlobalUpdateContext = createContext()

export const GlobalProvider = ({ children }) => {

    const { user } = useUser()
    const [selectedState, setSelectedState] = useState('test')
    const [isLoading, setIsLoading] = useState(false)
    const [modal, setModal] = useState(false);


    const [tasks, setTasks] = useState([])

    const openModal = () => {
        setModal(true);
    };

    const closeModal = () => {
        setModal(false);
    };

    const allTasks = async () => {
        setIsLoading(true);
        try {
          const res = await axios.get("/api/tasks");
    
          const sorted = res.data.sort((a, b) => {
            return (
              new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
            );
          });
    
          setTasks(sorted);
    
          setIsLoading(false);
        } catch (error) {
          console.error(error);
        }
      };

    const deleteTask = async (id) => {
        try {
            const res = await axios.delete(`/api/tasks/${id}`);
            toast.success("Task deleted");

            allTasks();
        } catch (error) {
            console.error(error);
            toast.error("Something went wrong");
        }
    };

    const updateTask = async (task) => {
        try {
            const res = await axios.put(`/api/tasks`, task);

            toast.success("Task updated");

            allTasks();
        } catch (error) {
            console.error(error);
            toast.error("Something went wrong");
        }
    };

    const completedTasks = tasks.filter((task) => task.isCompleted === true);
    const importantTasks = tasks.filter((task) => task.isImportant === true);
    const incompleteTasks = tasks.filter((task) => task.isCompleted === false);

    useEffect(() => {
        if (user) allTasks()
    }, [user])


    return (
        <GlobalContext.Provider value={{
            selectedState,
            tasks,
            deleteTask,
            isLoading,
            completedTasks,
            importantTasks,
            incompleteTasks,
            updateTask,
            modal,
            openModal,
            closeModal,
            allTasks
        }}>
            <GlobalUpdateContext.Provider value={{}}>
                {children}
            </GlobalUpdateContext.Provider>
        </GlobalContext.Provider>
    )
}

export const useGlobalState = () => useContext(GlobalContext)
export const useGlobalUpdate = () => useContext(GlobalUpdateContext)
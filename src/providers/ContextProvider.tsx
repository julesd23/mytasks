'use client';

import React, { useEffect, useState } from 'react';
import { Toaster } from 'react-hot-toast';
// import { Loader } from '@mantine/core';
import { GlobalProvider } from '../context/globalProvider';
import classes from '../app/layout.module.css';

interface Props {
  children: React.ReactNode;
}

function ContextProvider({ children }: Props) {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setIsReady(true);
    });
  }, []);

  if (!isReady) {
    return (
      <div
        style={{
          width: '100%',
          height: '92vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
        className="w-full h-full flex items-center justify-center"
      >
        <span className={classes.loader} />
      </div>
    );
  }

  return (
    <GlobalProvider>
      <Toaster />
      {children}
    </GlobalProvider>
  );
}

export default ContextProvider;

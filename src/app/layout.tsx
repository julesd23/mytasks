import '@mantine/core/styles.css';
import React from 'react';
import { MantineProvider, ColorSchemeScript, Box, Paper } from '@mantine/core';
// import { theme } from '../../theme';
import { ClerkProvider, auth } from '@clerk/nextjs';
import NextTopLoader from 'nextjs-toploader';
import ContextProvider from '../providers/ContextProvider';
import Sidebar from '@/components/sidebar/Sidebar';
// import GlobalStyleProvider from './providers/GlobalStyleProvides';
import classes from './layout.module.css';

export const metadata = {
  title: 'Mantine Next.js template',
  description: 'I am using Mantine with Next.js!',
};

export default function RootLayout({ children }: { children: any }) {
  const { userId } = auth();
  return (
    <ClerkProvider>
      <html lang="en">
        {/* <head>
          <ColorSchemeScript />
          <link rel="shortcut icon" href="/favicon.svg" />
          <meta
            name="viewport"
            content="minimum-scale=1, initial-scale=1, width=device-width, user-scalable=no"
          />
        </head> */}
        <body
          style={{
            paddingRight: '2rem',
            paddingLeft: '2rem',
            alignItems: 'center',
            paddingTop: '2rem',
          }}
        >
          <MantineProvider>
            <NextTopLoader
              height={2}
              color="#3290df"
              easing="cubic-bezier(0.53,0.21,0,1)"
              showSpinner={false}
            />
            <ContextProvider>
              <div className={classes.contentContainer}>
                {userId && <Sidebar />}
                {children}
              </div>
            </ContextProvider>
          </MantineProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}

'use client';

import { ReactNode } from 'react';
// import styled from 'styled-components'

// How to do global styling with mantine ???
interface Props {
  children: ReactNode;
}

function GlobalStyleProvider({ children }: Props) {
  return <>{children}</>;
}

export default GlobalStyleProvider;

// const GlobalStyles = styled.div``

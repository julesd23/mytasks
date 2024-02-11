'use client';

import React from 'react';
// @ts-ignore
import { Button } from '@mantine/core';

interface Props {
  icon?: React.ReactNode;
  name?: string;
  background?: string;
  padding?: string;
  borderRad?: string;
  fw?: string;
  fs?: string;
  click?: () => void;
  type?: 'submit' | 'button' | 'reset' | undefined;
  border?: string;
  color?: string;
}

function Button({
  icon,
  name,
  background,
  padding,
  borderRad,
  fw,
  fs,
  click,
  type,
  border,
  color,
}: Props) {
  return (
    // @ts-ignore
    <Button
      type={type}
      style={{
        background,
        padding: padding || '0.5rem 1rem',
        borderRadius: borderRad || '0.5rem',
        fontWeight: fw || '500',
        fontSize: fs,
        border: border || 'none',
        color,
      }}
      onClick={click}
    >
      {icon && icon}
      {name}
    </Button>
  );
}

export default Button;

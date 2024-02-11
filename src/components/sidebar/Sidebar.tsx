'use client';

import { Box, Button, Card, NavLink, Text } from '@mantine/core';
// import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { UserButton, useClerk } from '@clerk/nextjs';
import { BiLogOut } from 'react-icons/bi';
import classes from './Sidebar.module.css';

// import { useGlobalState } from '@/context/globalProvider';
// import cowboy from '../../../public/cowboy.jpeg';
import menu from '@/utils/menu';

function Sidebar() {
  // Use global context
  // const { selectedState } = useGlobalState();
  const { signOut, user } = useClerk();
  const router = useRouter();

  const pathname = usePathname();

  const handleClick = (link: string) => {
    router.push(link);
  };

  return (
    <Card shadow="xs" className={classes.sidebarContainer}>
      <Box
        className={classes.profileBox}
        style={{
          width: '100%',
          justifyContent: 'center',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          marginTop: '20px',
        }}
      >
        <UserButton />
        <Text style={{ marginTop: '10px' }} variant="gradient">
          {user?.fullName}
        </Text>
      </Box>
      <ul
        style={{
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          paddingLeft: 0,
        }}
      >
        {menu.map((item: { link: string; icon: JSX.Element; title: string }) => (
          <NavLink
            style={{ width: '100%', borderRadius: '5px' }}
            href={item.link}
            label={item.title}
            leftSection={item.icon}
            onClick={() => {
              handleClick(item.link);
            }}
            key={item.title}
            active={pathname === item.link}
          />
        ))}
      </ul>
      <Box
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-end', // Use justifyContent to move items to the bottom
        }}
      >
        <Button
          onClick={() => {
            signOut(() => router.push('/signin'));
          }}
          variant="subtle"
          style={{ width: '100%' }}
        >
          <BiLogOut style={{ width: '20px' }} /> Log Out
        </Button>
      </Box>
    </Card>
  );
}

export default Sidebar;

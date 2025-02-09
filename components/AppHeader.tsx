import React, { FC } from 'react';
import { useRouter } from 'next/router';

import pkg from '../package.json';

import Image from 'next/image';
import Link from 'next/link';
import { ArrowSmLeftIcon, CogIcon } from '@heroicons/react/solid';
import AppHeaderReleaseBanner from './AppHeaderReleaseBanner';

const AppHeader: FC = () => {
  const router = useRouter();

  return (
    <header className='relative w-full z-20 overflow-hidden bg-gray-800'>
      <AppHeaderReleaseBanner />

      <div className='w-full max-w-8xl flex items-center justify-between px-4 md:px-8 py-3 mx-auto'>
        <div className='flex justify-start items-center space-x-2'>
          <Image
            src='/logo.png'
            alt='PVPIV.app Logo'
            title='PVPIV.app'
            width={36}
            height={36}
          />

          <a
            href='https://github.com/jgmcelwain/pvpiv/blob/main/CHANGELOG.md'
            target='_blank'
            rel='noreferrer'
            className='text-gray-400 text-xs focus-visible-ring ring-offset-gray-800 rounded'
          >
            v{pkg.version}
          </a>
        </div>

        {router.pathname === '/settings' ? (
          <Link
            href={{
              pathname: '/',
            }}
            passHref
          >
            <a
              href='passHref_replaces_this'
              className='rounded-full focus-visible-ring ring-offset-gray-800 p-1'
            >
              <ArrowSmLeftIcon className='w-5 h-5 text-gray-300' aria-hidden />

              <span className='sr-only'>Home</span>
            </a>
          </Link>
        ) : (
          <Link
            href={{
              pathname: '/settings',
            }}
            passHref
          >
            <a
              href='passHref_replaces_this'
              className='rounded-full focus-visible-ring ring-offset-gray-800 p-1'
            >
              <CogIcon className='w-5 h-5 text-gray-300' aria-hidden />

              <span className='sr-only'>Settings</span>
            </a>
          </Link>
        )}
      </div>
    </header>
  );
};

export default AppHeader;

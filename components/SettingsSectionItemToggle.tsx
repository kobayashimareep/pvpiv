import React, { FC } from 'react';

import { Switch } from '@headlessui/react';

const SettingsSectionItemToggle: FC<{
  label: string;
  description?: string;
  value: boolean;
  onInput: (value: boolean) => void;
}> = ({ label, description, value, onInput }) => {
  return (
    <Switch.Group>
      <div className='flex-grow flex items-center justify-between'>
        <Switch.Label className='flex-grow pr-4 cursor-pointer select-none'>
          <p className='font-semibold leading-normal text-white'>{label}</p>

          {description && (
            <p className='text-sm text-gray-400'>{description}</p>
          )}
        </Switch.Label>

        <Switch
          checked={value}
          onChange={onInput}
          className={`${value ? 'bg-green-500' : 'bg-gray-700'}
      relative inline-flex flex-shrink-0 h-6 w-10 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus-visible-ring ring-offset-gray-800`}
        >
          <span
            aria-hidden='true'
            className={`${value ? 'translate-x-4' : 'translate-x-0'}
        pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow-lg transform ring-0 transition ease-in-out duration-200`}
          />
        </Switch>
      </div>
    </Switch.Group>
  );
};

export default SettingsSectionItemToggle;

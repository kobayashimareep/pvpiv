import React, { FC } from 'react';

import { Pokemon } from '../data/pokedex';

import { CandidateActionTypes, useCandidate } from '../hooks/useCandidate';
import { usePokedex } from '../hooks/usePokedex';

import { RadioGroup } from '@headlessui/react';
import { SwitchVerticalIcon } from '@heroicons/react/solid';

const CandidateBuilderFamilySwap: FC = () => {
  const { candidate, dispatch } = useCandidate();
  const pokedex = usePokedex();

  const iterableFamily = pokedex
    .familyMembers(candidate.species.family?.id)
    .sort((a, b) => a.family.stage - b.family.stage);

  if (iterableFamily.length === 0) return null;

  return (
    <RadioGroup
      value={candidate.species}
      onChange={(val: Pokemon) =>
        dispatch({ type: CandidateActionTypes.Species, payload: val })
      }
      as='div'
      className='flex flex-wrap items-center justify-start w-full mt-2 sm:mt-1'
    >
      <RadioGroup.Label className='sr-only'>
        Other family members
      </RadioGroup.Label>

      {iterableFamily.map((familyMember) => (
        <RadioGroup.Option
          key={familyMember.id}
          value={familyMember}
          className='mb-2 mr-2 rounded cursor-pointer last:mr-0 focus-visible-ring ring-offset-gray-800'
        >
          {({ checked }) => (
            <div
              className={`flex justify-start items-center transition-colors border py-1 px-2 hover:text-blue-300 rounded bg-gray-800 ${
                checked
                  ? 'text-blue-300 border-gray-700'
                  : 'text-gray-400 border-transparent'
              }`}
            >
              <RadioGroup.Label
                className='mr-2 text-sm font-semibold'
                as='span'
              >
                {familyMember.name}
              </RadioGroup.Label>

              <SwitchVerticalIcon className='w-4 h-4' aria-hidden />
            </div>
          )}
        </RadioGroup.Option>
      ))}
    </RadioGroup>
  );
};

export default CandidateBuilderFamilySwap;

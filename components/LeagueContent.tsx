import React, { FunctionComponent, useEffect, useRef } from 'react';

import { useLeague } from '../hooks/useLeague';
import { Provider as LeagueSubjectRankedSpreadsProvider } from '../hooks/useLeagueSubjectRankedSpreads';

import LeagueSubject from './LeagueSubject';
import LeagueTopSpreadsForLevel from './LeagueTopSpreadsForLevel';

const LeagueContent: FunctionComponent = () => {
  const { displayMode } = useLeague();
  const ref = useRef<HTMLDivElement>();

  useEffect(() => {
    ref.current.scrollTo({ left: 0, behavior: 'smooth' });
  }, [displayMode]);

  return (
    <LeagueSubjectRankedSpreadsProvider>
      <div className='w-full overflow-x-scroll bg-gray-100' ref={ref}>
        {displayMode === 'subject' ? (
          <LeagueSubject />
        ) : (
          <LeagueTopSpreadsForLevel />
        )}
      </div>
    </LeagueSubjectRankedSpreadsProvider>
  );
};

export default LeagueContent;
import React, { FunctionComponent, useContext, useMemo } from 'react';

import { Context as LeagueContext } from './LeagueContext';
import { Context as SubjectContext } from './SubjectContext';
import { Context as LeagueSubjectSpreadsContext } from './LeagueSubjectSpreadsContext';

import * as LeagueTableCells from './LeagueTableCells';
import { getRankedSpreadColors } from '../utils/getRankColors';

const LeagueTopSpreadsForLevel: FunctionComponent = () => {
  const { inspectedLevelCap } = useContext(LeagueContext);
  const { subject } = useContext(SubjectContext);
  const leagueRankedSubjectSpreads = useContext(LeagueSubjectSpreadsContext);

  const displayedSpreads = useMemo(() => {
    const spreadsForLevel = leagueRankedSubjectSpreads[inspectedLevelCap.level];

    const subjectSpread = spreadsForLevel.find(
      (rankedSpread) =>
        rankedSpread.ivs.atk === subject.ivs.atk &&
        rankedSpread.ivs.def === subject.ivs.def &&
        rankedSpread.ivs.sta === subject.ivs.sta,
    );

    return [subjectSpread, ...spreadsForLevel.slice(0, 10)].map(
      (rankedSpread) => {
        const colors = getRankedSpreadColors(rankedSpread);

        return { ...rankedSpread, colors };
      },
    );
  }, [leagueRankedSubjectSpreads[inspectedLevelCap.level], subject.ivs]);

  if (subject === null) return null;

  return (
    <table className='w-full border-collapse table-auto'>
      <thead>
        <tr>
          <LeagueTableCells.Header>Rank</LeagueTableCells.Header>

          <LeagueTableCells.Header>IVs</LeagueTableCells.Header>

          <LeagueTableCells.Header>Level</LeagueTableCells.Header>

          <LeagueTableCells.Header>CP</LeagueTableCells.Header>

          <LeagueTableCells.Header>Atk / Def / Sta</LeagueTableCells.Header>

          <LeagueTableCells.Header>Product</LeagueTableCells.Header>

          <LeagueTableCells.Header>Product%</LeagueTableCells.Header>
        </tr>
      </thead>

      <tbody>
        {displayedSpreads.map((spread, i) => (
          <tr
            key={i}
            className={
              i === 0
                ? 'bg-gray-50 text-gray-700 border-b-4'
                : `${spread.colors.background} ${spread.colors.text}`
            }
          >
            <LeagueTableCells.Body>
              <>{spread.rank}</>
            </LeagueTableCells.Body>

            <LeagueTableCells.Body>
              <>
                {spread.ivs.atk}
                <span className='transform scale-75 inline-block mx-1 font-semibold'>
                  {' '}
                  /{' '}
                </span>
                {spread.ivs.def}
                <span className='transform scale-75 inline-block mx-1 font-semibold'>
                  {' '}
                  /{' '}
                </span>
                {spread.ivs.sta}
              </>
            </LeagueTableCells.Body>

            <LeagueTableCells.Body>{spread.level}</LeagueTableCells.Body>

            <LeagueTableCells.Body>{spread.cp}</LeagueTableCells.Body>

            <LeagueTableCells.Body>
              <>
                {spread.stats.atk.toFixed(2)}
                <span className='transform scale-75 inline-block mx-1 font-semibold'>
                  {' '}
                  /{' '}
                </span>
                {spread.stats.def.toFixed(2)}
                <span className='transform scale-75 inline-block mx-1 font-semibold'>
                  {' '}
                  /{' '}
                </span>
                {spread.stats.sta}
              </>
            </LeagueTableCells.Body>

            <LeagueTableCells.Body>
              <span title={`${spread.product}`}>
                {(spread.product / 1000).toFixed(2)}
              </span>
            </LeagueTableCells.Body>

            <LeagueTableCells.Body>
              {(spread.percent * 100).toFixed(2)}%
            </LeagueTableCells.Body>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default LeagueTopSpreadsForLevel;

import { NextPageContext } from 'next';

import { parseCookies } from 'nookies';

import { Settings } from '.';

const defaultSettings: Settings = {
  leagues: { great: true, ultra: true, master: true, little: false },
  leagueOrder: ['great', 'ultra', 'master', 'little'],
  levelCaps: { 40: false, 41: false, 50: true, 51: true },
  outputData: {
    level: true,
    rank: true,
    cp: true,
    stats: true,
    statProduct: true,
    bulkProduct: true,
    percent: true,
  },
  showSpeculative: false,
  showMinimumLevel: false,
  showRankingMetric: false,
  allowImpossibleFloors: true,
};

export function getInitialSettings(ctx: NextPageContext) {
  try {
    const cookies = parseCookies(ctx);

    if (!cookies.settings) {
      throw new Error('No settings cookie');
    }

    const parsed = JSON.parse(cookies.settings) as Settings;

    return { ...defaultSettings, ...parsed };
  } catch (err) {
    return defaultSettings;
  }
}

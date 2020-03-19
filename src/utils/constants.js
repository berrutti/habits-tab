export const TIMEFRAMES = {
  Daily: 'daily',
  Weekly: 'weekly',
  Monthly: 'monthly'
}

// We don't need much precision here, so please don't be anal about this math
export const UPPERBOUNDS = {
  'daily': 86400000, // 1000 * 60 * 60 * 24;
  'weekly': 604800000, // 86400000 * 7
  'monthly': 2419200000 // 86400000 * 4
}
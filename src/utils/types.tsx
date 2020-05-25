export interface Card {
  name: string;
  lastClicked: number;
  isRegular: boolean;
  timeframe: number;
}

export enum Timeframe {
  Daily = 1,
  EveryTwo = 2,
  EveryThree = 3,
  EveryFour = 4,
  EveryFive = 5,
  EverySix = 6,
  Weekly = 7,
  Biweekly = 14,
  Threeweekly = 21,
  Monthly = 28,
}
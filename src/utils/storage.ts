import AsyncStorage from '@react-native-async-storage/async-storage';
import {SCORE_TABLE_KEY} from './constants';

export type ScoreEntry = {
  name: string;
  score: number;
};

export const updateScoreTable = async (
  name: string,
  score: number,
): Promise<void> => {
  try {
    const existingScoreTableString = await AsyncStorage.getItem(
      SCORE_TABLE_KEY,
    );
    const existingScoreTable: ScoreEntry[] = existingScoreTableString
      ? JSON.parse(existingScoreTableString)
      : [];

    existingScoreTable.push({name, score});
    existingScoreTable.sort((a, b) => b.score - a.score);
    const limitedScoreTable = existingScoreTable.slice(0, 10);
    const obj = await AsyncStorage.setItem(
      SCORE_TABLE_KEY,
      JSON.stringify(limitedScoreTable),
    );
    return obj;
  } catch (error) {
    console.error('Error updating score table:', error);
  }
};

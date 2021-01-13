import {SAVE_USER, USER_CATEGORIES, START_TUTORIAL} from './types.js';

export const saveUser = (data) => ({
  type: SAVE_USER,
  payload: data,
});

export const userCategories = (data) => ({
  type: USER_CATEGORIES,
  payload: data,
});

export const startTutorial = (data) => ({
  type: START_TUTORIAL,
  payload: data,
});

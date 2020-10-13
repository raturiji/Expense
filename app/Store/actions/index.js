import { SAVE_USER } from './types.js';

export const saveUser = (data) => ({
    type: SAVE_USER,
    payload: data
});
// src/actions/formTypeActions.ts
import axios from 'axios';
import { Dispatch } from 'redux';
import { api } from '../../hooks/storage';

export const FETCH_FORM_TYPES_SUCCESS = 'FETCH_FORM_TYPES_SUCCESS';

// export const fetchFormTypes = () => async (dispatch: Dispatch) => {
//   try {
//     const response = await api().get('/formtypes/');
//     dispatch({ type: FETCH_FORM_TYPES_SUCCESS, payload: response.data });
//   } catch (error) {
//     console.error('Error fetching Form Types:', error);
//   }
// };

import React, { useReducer, useCallback } from 'react';
import { RateTable } from './RateTable';
import { ActionRate } from './ActionRate';

interface IState {
  dataSource: { id: number; name: string }[];
}

const initialState: IState = { dataSource: [] };

function reducer(state: IState, action: { type: string; payload: any }) {
  switch (action.type) {
    case 'LOAD_LIST':
      return { dataSource: action.payload };
    case 'NEW_RATE':
      return { dataSource: [...state.dataSource, action.payload] };
    default:
      throw new Error();
  }
}

export const RateContainer = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <>
      <ActionRate dispatch={dispatch} />
      <RateTable dataSource={state.dataSource} dispatch={dispatch} />
    </>
  );
};

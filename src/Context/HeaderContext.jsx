import React, { createContext, useReducer } from "react";
import HeaderReducer from "../Reducer/HeaderReducer";

const initialState = {
  transactions: [],
};

export const HeaderContext = createContext(initialState);

// provider  component

export const HeaderProvider = ({ children }) => {
  const [state, dispatch] = useReducer(HeaderReducer, initialState);
  const deleteTransaction = (id) => {
    dispatch({
      type: "DELETE_TRANSACTION",
      payload: id,
    });
  };

  const addTransaction = (transaction) => {
    dispatch({
      type: "ADD_TRANSACTION",
      payload: transaction,
    });
  };

  return (
    <HeaderContext.Provider
      value={{
        transactions: state.transactions,
        deleteTransaction,
        addTransaction,
      }}
    >
      {children}
    </HeaderContext.Provider>
  );
};

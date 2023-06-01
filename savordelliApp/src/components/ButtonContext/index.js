import React, { createContext, useState } from 'react';

export const ButtonContext = createContext();

export const ButtonProvider = ({ children }) => {
  const [deleteButtonVisible, setDeleteButtonVisible] = useState(false);

  const toggleDeleteButton = () => {
    setDeleteButtonVisible(!deleteButtonVisible);
  };

  return (
    <ButtonContext.Provider value={{ deleteButtonVisible, toggleDeleteButton }}>
      {children}
    </ButtonContext.Provider>
  );
};
"use client";
import React, { useContext, useState, useEffect } from "react";
const AppContext = React.createContext(null);

const AppProvider = ({ children }) => {
  const [loader, setLoader] = useState(false);
  const [id, setId] = useState(undefined);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const loaderFalse = () => {
    setLoader(false);
  };
  const loaderTrue = () => {
    setLoader(true);
  };

  return (
    <AppContext.Provider
      value={{
        loader,
        loaderFalse,
        loaderTrue,
        id,
        setId,
        isModalOpen,
        openModal,
        closeModal,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalAppContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };

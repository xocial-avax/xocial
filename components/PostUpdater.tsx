import React, { createContext, useContext, useState } from 'react';

const PostUpdateContext = createContext({
  triggerFetch: () => {},
  updateValue: 0, // A simple counter to trigger updates
});

export const usePostUpdate = () => useContext(PostUpdateContext);

export const PostUpdater = ({ children }) => {
  const [updateValue, setUpdateValue] = useState(0);

  const triggerFetch = () => {
    setUpdateValue((prevValue) => prevValue + 1); // Increment to trigger update
  };

  return (
    <PostUpdateContext.Provider value={{ triggerFetch, updateValue }}>
      {children}
    </PostUpdateContext.Provider>
  );
};

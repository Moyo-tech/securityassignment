import React, { createContext, useContext, useReducer } from 'react';

const CommentContext = createContext();

const initialState = {};

const commentReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_COMMENT':
      return {
     
        ...state,
        [action.cardId]: action.comment,
      };
    default:
      return state;
  }
};

export const CommentProvider = ({ children }) => {
  const [comments, dispatch] = useReducer(commentReducer, initialState);

  return (
    <CommentContext.Provider value={{ comments, dispatch }}>
      {children}
    </CommentContext.Provider>
  );
};

export const useCommentContext = () => {
  return useContext(CommentContext);
};

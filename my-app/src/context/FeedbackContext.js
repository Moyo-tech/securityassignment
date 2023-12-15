import React, { createContext, useContext, useReducer } from 'react';

const FeedbackContext = createContext();

const initialState = {};

const feedbackReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_FEEDBACK':
      return {
        ...state,
        [action.cardId]: action.feedback,
      };
    default:
      return state;
  }
};

export const FeedbackProvider = ({ children }) => {
  const [feedbacks, dispatch] = useReducer(feedbackReducer, initialState);

  return (
    <FeedbackContext.Provider value={{ feedbacks, dispatch }}>
      {children}
    </FeedbackContext.Provider>
  );
};

export const useFeedbackContext = () => {
  return useContext(FeedbackContext);
};

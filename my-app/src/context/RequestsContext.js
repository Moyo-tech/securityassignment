import { createContext, useReducer } from 'react'

export const RequestContext = createContext()

export const requestReducer = (state, action) => {
  switch (action.type) {
    case 'SET_REQUESTS':
      return { 
        requests: action.payload 
      }
    case 'CREATE_REQUEST':
      return { 
        requests: [action.payload, ...state.requests] 
      }

    default:
      return state
  }
}

export const RequestsContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(requestReducer, { 
    requests: null
  })
  
  return (
    <RequestContext.Provider value={{ ...state, dispatch }}>
      { children }
    </RequestContext.Provider>
  )
}
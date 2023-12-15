import { useContext } from "react"
import { RequestContext } from "../context/RequestsContext"


export const useRequestContext = () => {
  const context = useContext(RequestContext)

  if(!context) {
    throw Error('useRequestContext must be used inside a RequestContextProvider')
  }

  return context
}
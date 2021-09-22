import { useState } from "react";

export default function useVisualMode(initial) {
  //react hooks to change mode
  const [history, setHistory] = useState([initial]); 

//function to transition through different states
  function transition(mode, replace = false) {
      if (!replace) {
         setHistory(prev => {
            return [...prev, mode]
          })
       } else {
         setHistory(prev => {
            return [...prev.slice(0, prev.length - 1), mode]
         })
        }
   }
   
function back(){
  setHistory(prev => {
    if (prev.length > 1) {
      return prev.slice(0, -1)
    }
    return prev
  })
}
  return {mode: history[history.length -1], transition, back}
  
}
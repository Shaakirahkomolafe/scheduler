import { useState } from "react";

export default function useVisualMode(initial) {
  //react hooks to change mode
  const[mode, setMode] = useState(initial) ;
  const [history, setHistory] = useState([initial]); 

//function to transition through different states
  function transition(mode, replace = false) {
    setMode(mode)
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
if(history.length > 1){
  history.pop()
}
  setMode(history[history.length - 1])
} 
  return {mode, transition, back}
  
}
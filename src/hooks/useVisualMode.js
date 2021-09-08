import { useState } from "react";

export default function useVisualMode(initial) {
  
  const[mode, setMode] = useState(initial) ;
  const [history, setHistory] = useState([initial]); // This line is new!


  function transition(mode, replace = false) {
    setMode(mode)
    if (replace === true) {
      setHistory((prev) => [...prev.slice(0, prev.length-1), mode])
   }
    setHistory((prev) => [...prev, mode])
  }
function back(){
if(history.length > 1){
  history.pop()
}
  setMode(history[history.length - 1])
} 
  return {mode, transition, back}
  
}
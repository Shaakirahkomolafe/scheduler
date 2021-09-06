import { useState } from "react";

export default function useVisualMode(initial) {
  
  const[mode, setMode] = useState(initial) ;
  const [history, setHistory] = useState([initial]); // This line is new!


  function transition(mode, replace = false) {
    if (replace === true) {
      setMode(mode)
    }
    setMode(mode)
    setHistory((prev) => [...prev, mode])
  }
function back(){
console.log('history in back function', history);
if(history.length > 1){
  history.pop()
}
  setMode(history[history.length - 1])
} 
  return {mode, transition, back}
  
}
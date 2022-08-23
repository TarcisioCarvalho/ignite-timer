import { differenceInSeconds } from 'date-fns';
import React from 'react'
import { CyclesContext } from '../../../contexts/CyclesContext';

import { CountDownContainer, Separator } from './styles'

const Countdown = () => {
  const {
    activeCycle,
    activeCycleId,
    markCurrentCycleAsFinished,
    amountSecondsPassed,
    setSecondsPassed,
  } = React.useContext(CyclesContext)
  


    const totalSeconds = activeCycle ? activeCycle.minutesAmount * 60 : 0 ;

    React.useEffect(()=>{
        let interval: Number;
    
        
    
        if (activeCycle) {
          interval = setInterval(() => {
    
            const secondsDifference = differenceInSeconds( new Date(), new Date(activeCycle?.startDate));
    
            
        if (secondsDifference >= totalSeconds) {
          markCurrentCycleAsFinished();
    
          setSecondsPassed(totalSeconds);
          clearInterval(interval);
         // setActiveCycleId(null);
        }
    
        setSecondsPassed(secondsDifference)     
          }, 1000)
        }
    
    
        return ()=>{
          clearInterval(interval)
        }
      },[ activeCycle,totalSeconds,markCurrentCycleAsFinished, setSecondsPassed ])


  const currentSeconds = activeCycle ? totalSeconds - amountSecondsPassed : 0 ;
      
  const minutesAmount = Math.floor(currentSeconds / 60);
  const secondsAmount = currentSeconds % 60 ;
    
  const minutes = String(minutesAmount).padStart(2, '0');
  const seconds = String(secondsAmount).padStart(2, '0');

  React.useEffect(()=>{
    if (activeCycle) document.title = `${minutes} : ${seconds}`
  }, [minutes, seconds, activeCycle])




  return (
    <CountDownContainer>
        <span>{minutes[0]}</span>
        <span>{minutes[1]}</span>
        <Separator>:</Separator>
        <span>{seconds[0]}</span>
        <span>{seconds[1]}</span>
  </CountDownContainer>
  )
}

export default Countdown
import { differenceInSeconds } from 'date-fns';
import React from 'react'
import { CountDownContainer, Separator } from './styles'

const Countdown = () => {

    const [amountSecondsPassed, setAmountSecondsPassed] =  React.useState( 0 ) ;


    const totalSeconds = activeCycle ? activeCycle.minutesAmount * 60 : 0 ;

    React.useEffect(()=>{
        let interval: Number;
    
        
    
        if (activeCycle) {
          interval = setInterval(() => {
    
            const secondsDifference = differenceInSeconds( new Date(), activeCycle?.startDate);
    
            
        if (secondsDifference >= totalSeconds) {
          setCycles(state => state.map(cycle => {
              if (cycle.id === activeCycleId) {
                return { ...cycle, finishDate: new Date() }
            }
            return cycle ;
          }))
    
          setAmountSecondsPassed(totalSeconds);
          clearInterval(interval);
          setActiveCycleId(null);
        }
    
            setAmountSecondsPassed(secondsDifference)
          }, 1000)
        }
    
    
        return ()=>{
          clearInterval(interval)
        }
      },[ activeCycle,totalSeconds ])

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
import { HandPalm, Play } from 'phosphor-react'
import React, { useEffect } from 'react'


import {
  HomeContainer,
  StartCountDownButton,
  StopCountDownButton,
} from './styles'
import { differenceInSeconds } from 'date-fns';
import { cy } from 'date-fns/locale';
import NewCycleForm from './NewCycleForm';
import Countdown from './Countdown';



/* interface NewCycleFormData{
  task: String;
  minutesAmount: Number;
} */



const Home = () => {
  
  interface Cycle{
    id: String;
    task: String;
    minutesAmount: Number;
    startDate: Date;
    interruptedDate?: Date;
    finishDate?: Date;
  }

  const [cycles, setCycles] = React.useState<Cycle[]>([])
  const [activeCycleId, setActiveCycleId] = React.useState<String | null>(null);
 

  

  


  const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId);
  
  

  

  function handleInterruptCycle(){
      
    setCycles(state => state.map(cycle => {
      if(cycle.id === activeCycleId){
        return {...cycle, interruptedDate: new Date() }
      }
      return cycle ;
    }))

    setActiveCycleId(null);
}

  function handleNewCycle(data:NewCycleFormData){
    const newCycle : Cycle = {
      id:String(new Date().getTime()),
      task:data.task,
      minutesAmount:data.MinutesAmount,
      startDate: new Date(),
    }

    

    setCycles(state => [...state,newCycle]);
    setActiveCycleId(newCycle.id);
    setAmountSecondsPassed(0);
    reset();
  }

  console.log(formState.errors);

  console.log(cycles);


 
  
  const currentSeconds = activeCycle ? totalSeconds - amountSecondsPassed : 0 ;

  




  const minutesAmount = Math.floor(currentSeconds / 60);
  const secondsAmount = currentSeconds % 60 ;

  const minutes = String(minutesAmount).padStart(2, '0');
  const seconds = String(secondsAmount).padStart(2, '0');

 React.useEffect(()=>{
  if(activeCycle) document.title = `${minutes} : ${seconds}`
 },[minutes,seconds]);

  console.log(activeCycle);
  const task = watch('task');
  const isSubmitDisabled = !task;

  return (
    <HomeContainer>
        <form onSubmit={handleSubmit(handleNewCycle)}>
        {/* <FormContainer>
          <label htmlFor="task">Vou trabalhar em</label>
          <TaskInput type="text" id='task' 
           list='task-sugestions'
           placeholder='Dê um nome para seu projeto'
           disabled={!!activeCycle}
           {...register('task')}
           />
          <datalist id='task-sugestions'>
            <option value="Projeto 1"/>
            <option value="Projeto 2"/>
          </datalist>
          <label htmlFor="minutesAmount">durante</label>
          <MinutesAmountInput
           type="number"
           id='minutesAmount'
           placeholder='00'
            step={5}
            min={1}
            max={60}
            disabled={!!activeCycle}
            {...register('MinutesAmount', { valueAsNumber: true })}
          />
          <span>minutos</span>
        </FormContainer> */}
        
        <NewCycleForm/>
        <Countdown/>
     
        {/* <CountDownContainer>
          <span>{minutes[0]}</span>
          <span>{minutes[1]}</span>
          <Separator>:</Separator>
          <span>{seconds[0]}</span>
          <span>{seconds[1]}</span>
        </CountDownContainer> */}

        {activeCycle ?  (
          
        <StopCountDownButton onClick={handleInterruptCycle}  type='button'>
          
          <HandPalm size={24}/>
          Interromper 
        </StopCountDownButton>): 
        (<StartCountDownButton  type='submit' disabled={isSubmitDisabled}>
          <Play size={24}/>
          Começar</StartCountDownButton>)}
        </form>
    </HomeContainer>
     
  )
}

export default Home
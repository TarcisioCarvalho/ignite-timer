import { HandPalm, Play } from 'phosphor-react'
import React, { useEffect } from 'react'
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as zod from 'zod';

import {
  HomeContainer,
  StartCountDownButton,
  StopCountDownButton,
} from './styles'
import { differenceInSeconds } from 'date-fns';
import { cy } from 'date-fns/locale';
import NewCycleForm from './NewCycleForm';
import Countdown from './Countdown';
import { CyclesContext } from '../../contexts/CyclesContext';



/* interface NewCycleFormData{
  task: String;
  minutesAmount: Number;
} */

/* interface Cycle{
  id: String;
  task: String;
  minutesAmount: Number;
  startDate: Date;
  interruptedDate?: Date;
  finishDate?: Date;
} */

/* interface CyclesContextType{
  activeCycle: Cycle | undefined ;
  activeCycleId: String | null ;
  amountSecondsPassed: Number;
  markCurrentCycleAsFinished: () => void ;
  setSecondsPassed: (seconds: Number) => void
}

export const CyclesContext = React.createContext({} as CyclesContextType); */


const Home = () => {
  const { activeCycle, createNewCycle, InterruptCurrentCycle } =
    React.useContext(CyclesContext)
 



  
  /* const [cycles, setCycles] = React.useState<Cycle[]>([])
  const [activeCycleId, setActiveCycleId] = React.useState<String | null>(null);
  const [amountSecondsPassed, setAmountSecondsPassed] =  React.useState( 0 ) ; */

  const newCycleFormValidationSchema = zod.object({
    task: zod.string().min(1, 'Informe a Tarefa'),
    MinutesAmount: zod.number().min(1).max(60),
  })

  type NewCycleFormData = zod.infer<typeof newCycleFormValidationSchema>

  const newCycleForm = useForm<NewCycleFormData>({
      resolver:zodResolver(newCycleFormValidationSchema),
    defaultValues: {
      task: '',
      MinutesAmount: 0,
      }
    });

    const { handleSubmit, watch, formState  , reset } = newCycleForm ; 


    function handleCreateNewCycle(data:NewCycleFormData){
        createNewCycle(data);
        reset();
    }

  /* const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId); */


  /* function setSecondsPassed(seconds: Number){
    setAmountSecondsPassed(seconds);
  }
  
  function markCurrentCycleAsFinished(){
    setCycles((state) => state.map(cycle => {
      if (cycle.id === activeCycleId) {
        return { ...cycle, finishDate: new Date() }
    }
    return cycle ;
  }))
  } */

  

/*   function handleInterruptCycle(){
      
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
  } */

  console.log(formState.errors);

  //console.log(cycles);


 
  
  



  console.log(activeCycle);
  const task = watch('task');
  const isSubmitDisabled = !task;

  return (
    <HomeContainer>
      <form onSubmit={handleSubmit(handleCreateNewCycle)}>
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
       {/*  <CyclesContext.Provider
          value={{
            activeCycle,
            activeCycleId,
            markCurrentCycleAsFinished,
            amountSecondsPassed,
            setSecondsPassed
          }}
        > */} <FormProvider {...newCycleForm}>
          <NewCycleForm/>
        </FormProvider>
          
          <Countdown/>
       {/*  </CyclesContext.Provider> */}
     
        {/* <CountDownContainer>
          <span>{minutes[0]}</span>
          <span>{minutes[1]}</span>
          <Separator>:</Separator>
          <span>{seconds[0]}</span>
          <span>{seconds[1]}</span>
        </CountDownContainer> */}

        {activeCycle ?  (
          
        <StopCountDownButton onClick={InterruptCurrentCycle}  type='button'>
          
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
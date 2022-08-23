import React, { ReactNode } from 'react'
import { ActionTypes, addNewCycleAction, interruptCurrentCycleAsFinishedAction, markCurrentCycleAsFinishedAction } from '../reducers/cycles/actions';
import { Cycle, cyclesReducer } from '../reducers/cycles/reducer';



interface CreateCycleData{
    task: String;
    minutesAmount: Number;
}


/* interface Cycle{
    id: String;
    task: String;
    minutesAmount: Number;
    startDate: Date;
    interruptedDate?: Date;
    finishDate?: Date;
  }
 */
interface CyclesContextType{
  cycles:Cycle[] ;
  activeCycle: Cycle | undefined
    activeCycleId: String | null ;
    amountSecondsPassed: Number;
    markCurrentCycleAsFinished: () => void ;
    setSecondsPassed: (seconds: Number) => void;
  createNewCycle: (data: CreateCycleData) => void
  InterruptCurrentCycle: () => void;
  }
  
  export const CyclesContext = React.createContext({} as CyclesContextType);

  interface CyclesContextProviderProps{
    children: ReactNode;
  }

  interface CyclesState{
    cycles: Cycle[];
    activeCycleId: String | null;
  }

  export function CyclesContextProvider({children}:CyclesContextProviderProps){

    const [cyclesState, dipatch] = React.useReducer( cyclesReducer
     ,{
      cycles: [],
      activeCycleId: null,
    },()=>{
      const storedStateAsJSON = localStorage.getItem('@ignite-timer:cycles-state-1.0.0');
      if(storedStateAsJSON) return JSON.parse(storedStateAsJSON);
    }
    
    )

    
   
    const [amountSecondsPassed, setAmountSecondsPassed] =  React.useState( ()=>{

      


      return 0
    } ) ;

    React.useEffect(()=>{

      const stateJSON = JSON.stringify(cyclesState);
      localStorage.setItem('@ignite-timer:cycles-state-1.0.0',stateJSON);
    },[cyclesState])

    const {cycles, activeCycleId} = cyclesState;
    const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId);

    function setSecondsPassed(seconds: Number){
        setAmountSecondsPassed(seconds);
      }
      
      function markCurrentCycleAsFinished(){
        dipatch(markCurrentCycleAsFinishedAction()/* {
          type: ActionTypes.MARK_CURRENT_CYCLE_AS_FINISHED,
          payload:{
            activeCycleId,
          }
        } */);
        /* setCycles((state) => state.map(cycle => {
          if (cycle.id === activeCycleId) {
            return { ...cycle, finishDate: new Date() }
        }
        return cycle ;
      })) */
      }

      function InterruptCurrentCycle(){
        dipatch(interruptCurrentCycleAsFinishedAction()/* {
          type: ActionTypes.INTERRUPT_CURRENT_CYCLE,
          payload:{
            activeCycleId,
          }
        } */);
      /* 
        setCycles(state => state.map(cycle => {
          if(cycle.id === activeCycleId){
            return {...cycle, interruptedDate: new Date() }
          }
          return cycle ;
        })) */
    
        setActiveCycleId(null);
    }
    
      function createNewCycle(data:CreateCycleData){
        const newCycle : Cycle = {
          id:String(new Date().getTime()),
          task:data.task,
          minutesAmount:data.MinutesAmount,
          startDate: new Date(),
        }
        dipatch(addNewCycleAction(newCycle)/* {
          type: ActionTypes.ADD_NEW_CYCLE,
          payload:{
            newCycle,
          }
        } */);
       // setCycles(state => [...state,newCycle]);
      //  setActiveCycleId(newCycle.id);
        setAmountSecondsPassed(0);
       // reset();
      }
return(<CyclesContext.Provider
    value={{
      cycles,
      activeCycle,
      activeCycleId,
      markCurrentCycleAsFinished,
      amountSecondsPassed,
      setSecondsPassed,
      createNewCycle,
      InterruptCurrentCycle
    }}
  >
    {children}
    </CyclesContext.Provider>)
    
  }
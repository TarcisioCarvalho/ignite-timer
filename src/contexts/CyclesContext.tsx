import React, { ReactNode } from 'react'


interface CreateCycleData{
    task: String;
    minutesAmount: Number;
}


interface Cycle{
    id: String;
    task: String;
    minutesAmount: Number;
    startDate: Date;
    interruptedDate?: Date;
    finishDate?: Date;
  }

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

  export function CyclesContextProvider({children}:CyclesContextProviderProps){

    const [cycles, setCycles] = React.useState<Cycle[]>([])
    const [activeCycleId, setActiveCycleId] = React.useState<String | null>(null);
    const [amountSecondsPassed, setAmountSecondsPassed] =  React.useState( 0 ) ;


    const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId);

    function setSecondsPassed(seconds: Number){
        setAmountSecondsPassed(seconds);
      }
      
      function markCurrentCycleAsFinished(){
        setCycles((state) => state.map(cycle => {
          if (cycle.id === activeCycleId) {
            return { ...cycle, finishDate: new Date() }
        }
        return cycle ;
      }))
      }

      function InterruptCurrentCycle(){
      
        setCycles(state => state.map(cycle => {
          if(cycle.id === activeCycleId){
            return {...cycle, interruptedDate: new Date() }
          }
          return cycle ;
        }))
    
        setActiveCycleId(null);
    }
    
      function createNewCycle(data:CreateCycleData){
        const newCycle : Cycle = {
          id:String(new Date().getTime()),
          task:data.task,
          minutesAmount:data.MinutesAmount,
          startDate: new Date(),
        }
        setCycles(state => [...state,newCycle]);
        setActiveCycleId(newCycle.id);
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
import { ActionTypes } from "./actions";
import {produce} from 'immer';

export interface Cycle{
    id: String;
    task: String;
    minutesAmount: Number;
    startDate: Date;
    interruptedDate?: Date;
    finishDate?: Date;
  }


interface CyclesState{
    cycles: Cycle[];
    activeCycleId: String | null;
  }



export function cyclesReducer (state:CyclesState,action:any){

    switch(action.type){
      case ActionTypes.ADD_NEW_CYCLE :
      /*   return {
          ...state,
        cycles:[...state.cycles,action.payload.newCycle],
        activeCycleId: action.payload.newCycle.id,
        } */
        return produce(state,draft=>{
          draft.cycles.push(action.payload.newCycle);
          draft.activeCycleId = action.payload.newCycle.id;
        })
      case ActionTypes.INTERRUPT_CURRENT_CYCLE:{
      /*   return{
          ...state,
            cycles: state.cycles.map(cycle => {
            if(cycle.id === state.activeCycleId){
              return {...cycle, interruptedDate: new Date() }
            }
            return cycle ;
          }),
          activeCycleId : null,
      } */
      const currentCycleIndex = state.cycles.findIndex(cycle=>{
        return cycle.id === state.activeCycleId
      })

      if(currentCycleIndex<0) return state;

      return produce(state, draft=>{
        draft.cycles[currentCycleIndex].interruptedDate= new Date();
        draft.activeCycleId=null;
      })
    }
      case ActionTypes.MARK_CURRENT_CYCLE_AS_FINISHED:

        const currentCycleIndex = state.cycles.findIndex(cycle=>{
          return cycle.id === state.activeCycleId
        })
  
        if(currentCycleIndex<0) return state;
  
        return produce(state, draft=>{
          draft.cycles[currentCycleIndex].finishDate= new Date();
          draft.activeCycleId=null;
        })



        return{
          ...state,
            cycles: state.cycles.map(cycle => {
            if(cycle.id === state.activeCycleId){
              return {...cycle, finishDate: new Date() }
            }
            return cycle ;
          }),
          activeCycleId : null,
        }
        default :
          return state
    }
    

    if(action.type === 'ADD_NEW_CYCLE'){
      return {
        ...state,
       cycles:[...state.cycles,action.payload.newCycle],
       activeCycleId: action.payload.newCycle.id,
      }
    }


    if(action.type === 'INTERRUPT_CURRENT_CYCLE'){
      return{
        ...state,
          cycles: state.cycles.map(cycle => {
          if(cycle.id === state.activeCycleId){
            return {...cycle, interruptedDate: new Date() }
          }
          return cycle ;
        }),
        activeCycleId : null,
      }
    }


    if(action.type === 'MARK_CURRENT_CYCLE_AS_FINISHED'){
      return{
        ...state,
          cycles: state.cycles.map(cycle => {
          if(cycle.id === state.activeCycleId){
            return {...cycle, finishDate: new Date() }
          }
          return cycle ;
        }),
        activeCycleId : null,
      }
    }

    return state;
  }
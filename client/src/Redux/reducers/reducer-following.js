export default function followingState (state = [], action){
  switch(action.type){
    case 'UPDATE_FOLLOWING':
    return state = action.payload;
    default: return state;
  }
}
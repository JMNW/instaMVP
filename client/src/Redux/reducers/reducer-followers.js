export default function followersState (state = [], action){
  switch(action.type){
    case 'UPDATE_FOLLOWERS':
    return state = action.payload;
    default: return state;
  }
}
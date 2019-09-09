import {
  FETCH_TRANS_SUCCESS,
  FETCH_TRANS_FAIL,
  FETCH_TRANS_BEGIN,
  SELECT_PROPERTY
} from './actions';

const initialState = {
  items: [],
  loading: false,
  error: null,
  selectedProperty: null
}

export default function reducer(state=initialState, action) {
  switch(action.type){
    case FETCH_TRANS_FAIL:
      return{
        ...state,
        loading: false,
        error: action.payload.error,
        item: []
      };
    case FETCH_TRANS_BEGIN:
      return{
        ...state,
        loading: true,
        error: null
      };
    case FETCH_TRANS_SUCCESS:
      return{
        ...state,
        loading: false,
        items: action.payload.trans
      };
    case SELECT_PROPERTY:
  
      return{
        ...state,
        selectedProperty: action.payload.property
      };
    default:
      return state;

  }
}

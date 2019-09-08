export const FETCH_TRANS_SUCCESS = 'FETCH_TRANS_SUCCESS';
export const FETCH_TRANS_FAIL = 'FETCH_TRANS_FAIL';
export const FETCH_TRANS_BEGIN = 'FETCH_TRANS_BEGIN';
export const SELECT_PROPERTY = 'SELECT_PROPERTY';

// Actions
export function fetchTransaction(){
  console.log("transaction")
  return dispatch => {
    dispatch(fetchTransactionBegin());
    return fetch("http://127.0.0.1:8000/transactions/")
    .then(handleErrors)
    .then(res => res.json())
    .then(json =>{
      dispatch(fetchTransactionSuccess(json));
    })
    .catch(error => dispatch(fetchTransactionFailure(error)));
  }
}

//Handle HTTP errors
function handleErrors(response) {
  if(!response.ok){
    throw Error(response.statusText);
  }
  return response;
}

export const fetchTransactionBegin = () => ({
  type: FETCH_TRANS_BEGIN
});

export const fetchTransactionSuccess = (trans) => ({
  type: FETCH_TRANS_SUCCESS,
  payload: { trans }
});

export const fetchTransactionFailure = (error) => ({
  type: FETCH_TRANS_FAIL,
  payload: { error }
});

export const setSelectedProperty = (property) => ({
  type: SELECT_PROPERTY,
  payload: { property }
});

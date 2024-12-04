
  export const sendRequest = async (id) => {
    const baseURL = '/api/recruitments';
    const response = await fetch(baseURL, {
      method: 'POST',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify({ cuceID: id.trim() }),
    });
    return response;
  };
  
  export const processResponse = async (response) => {
    const resData = await response.json();
    if (response.ok) {
      return resData;
    } else {
      throw new Error('Error en la solicitud');
    }
  };


  export const handleRequest = async (action, data = {}, callbacks = {}) => {
    const { onSuccess = () => {}, onError = () => {} } = callbacks;
    try {
     const response = await  performAction(action, data);
      
      if (response.ok) {
         const result = await response.json();
         onSuccess(result);
      }else {
        onError("Error al buscar el item")
      }
    }catch (err) {
      onError(err);
    }
  }
  
  const performAction = async (action, data) => {
    switch (action) {
       case 'refresh':
          return sendRequest(data.row.original.cuce);
       case 'search':
          return sendRequest(data.values.newCuce)
       default :
         "No existe esa acción";
    }
  }
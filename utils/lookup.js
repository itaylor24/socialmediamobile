
export function backendLookup(method, endpoint, callback,data){

    let jsonData; 
    if(data){
      jsonData = JSON.stringify(data); 
    }
      
      fetch(endpoint, {
        method: method,
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    })
    .then(response =>  response.json().then(data => {callback( data, response.status)}))
    .catch((error) => {
      console.error(error);
    });
    
    
  }

  

  export function lookupWithToken(method, endpoint, callback,authtoken,data){
    console.log(`Token ${authtoken}`)
    let jsonData; 
    if(data){
      jsonData = JSON.stringify(data); 
    }

      fetch(endpoint, {
        method: method,
        mode: 'cors', 
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'Authorization' : `Token ${authtoken}`
        },
        body: JSON.stringify(data)
    })
    .then(response =>  response.json().then(data => {callback( data, response.status)}))
    .catch((error) => {
      console.error(error);
    });

     

    
  
  }
  
  

  
  
    
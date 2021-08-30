
import React, {useState, useEffect} from 'react';



export const AccContext = React.createContext();



export function AccProvider(Props){


  

   
     

    const [Acc, setAcc] = useState({
        email: null,
        username: null,
        _id: null,
        avatar: null,
        followers: [],
        following: [],
        bio: null,   
    });

  
    useEffect(()=>{
        if(Acc.email !== null){
            localStorage.setItem('Account', JSON.stringify(Acc))
        }else{
            const Logged = JSON.parse(localStorage.getItem('Account'))
            setAcc(Logged)
        }
        
    }, [])

    useEffect(()=>{
        if(Acc.email !== null){
            localStorage.setItem('Account', JSON.stringify(Acc))
        }else{
            const Logged = JSON.parse(localStorage.getItem('Account'))
            setAcc(Logged)
        }
    }, [Acc])
      
    return(
        <AccContext.Provider value={{Acc, setAcc}}>
            {Props.children}
        </AccContext.Provider>
    );
};
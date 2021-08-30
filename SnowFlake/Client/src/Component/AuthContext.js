import React, {useState, useEffect} from 'react';

export const AuthContext = React.createContext();



export function AuthProvider(Props){
    
    const [auth, setAuth] = useState({});
 

    useEffect(()=>{
        const token = localStorage.getItem('Token');
        if(token){
            setAuth({token})
        }
    }, []);

    return(
        <AuthContext.Provider value={{auth, setAuth}}>
            {Props.children}
        </AuthContext.Provider>
    );
};
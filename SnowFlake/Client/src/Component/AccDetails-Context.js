import React, {useState} from 'react';
export const AccDetailsContext = React.createContext();

export function DetailsProvider(Props){

    const [AccDetails, setAccDetails] = useState({
        _id: null,
        avatar : null,
        followers : [],
        following : [],
        cover : null,
        bio: null,
        studing : null,
        living: null,
        job : null,
        relationship: null,
        gender: null,
        verified : null,
    });
   

    return(
        <AccDetailsContext.Provider value={{AccDetails, setAccDetails}}>
            {Props.children}
        </AccDetailsContext.Provider>
    );
}
const { createContext, useState, useContext } = require("react");


const UserType = createContext();

const UserContext = ({ children }) => {
    const [userId, setUserId] = useState();
    const [defaultAddress,setDefaultAddress]=useState()

    return (
        <UserType.Provider value={{ userId, setUserId, defaultAddress, setDefaultAddress }}>
            {children}
        </UserType.Provider>)
}


export {UserContext,UserType}
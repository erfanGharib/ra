import { useAsyncEffect } from "../utils/useAsyncEffect";
import { _axios } from "../utils/_axios";
import { apiEndpoints } from "../global";
import { T_User, T_UsersActions, T_UserState, useUsersStore } from "../store/useSampleStore";

interface T_Props {
    data?: T_User;
    setSelectedUser: T_UsersActions['setSelectedUser'];
    selectedUser: T_UserState['selectedUser'];
}

const User = ({ selectedUser, setSelectedUser, data }: T_Props) => {
    return (
        <div 
            onClick={() => setSelectedUser(data)}
            className={`${data.id === selectedUser?.id ? "bg-[#333]" : ""} flex transition px-5 py-3 f-center-between cursor-pointer hover:bg-[#333] w-full border-b border-neutral-700`}
        >
            <div className="flex flex-col">
                <h3 className="">{data.name}</h3>
                <span className="opacity-50 text-xs">meta data</span>
            </div>
            <span 
                className="rounded-full w-3 h-3" 
                style={{ background: data.isOnline ? "#56c47b" : "#c45d56" }}
            ></span>
        </div>
    );
}

const UsersList = () => {
    const users = useUsersStore();
    
    useAsyncEffect(async () => {
        users.setData([
            {
                id: 1,
                name: "TOP",
                isOnline: false,
            },
            {
                id: 2,
                name: "e.gharib",
                isOnline: true,
            },
            {
                id: 3,
                name: "Public",
                isOnline: true,
            },
        ]);
        // try {
        //     const fetchedData: T_User[] = (await _axios.get(apiEndpoints.users)).data;
        //     setData(fetchedData);
        // } 
        // catch(err) {
        //     throw err;
        // }
    }, []);

    return (
        <div className={`f-start flex-col overflow-hidden`}>
            <h2 className="px-3 py-2 text-sm text-opacity-60 border-b bg-neutral-700 border-neutral-700 w-full">Users:</h2>
            {
                users.data.map((val) => 
                    <User 
                        selectedUser={users.selectedUser} 
                        setSelectedUser={users.setSelectedUser} 
                        data={val} 
                    />
                )
            }
        </div>
    );
}

export default UsersList;
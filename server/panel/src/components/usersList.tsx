import { useAsyncEffect } from "../utils/useAsyncEffect";
import { _axios } from "../utils/_axios";
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
            className={`${data.usr_id === selectedUser?.usr_id ? "bg-[#333]" : ""} flex transition px-5 py-3 f-center-between cursor-pointer hover:bg-[#333] w-full border-b border-neutral-700`}
        >
            <div className="flex flex-col">
                <h3 className="">{data.usr_name}</h3>
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
                usr_id: 1,
                usr_name: "TOP",
                isOnline: false,
            },
            {
                usr_id: 2,
                usr_name: "e.gharib",
                isOnline: true,
            },
            {
                usr_id: 3,
                usr_name: "Public",
                isOnline: true,
            },
        ]);
    }, []);

    return (
        <div className={`f-start flex-col overflow-hidden`}>
            <h2 className="px-3 py-2 text-sm text-opacity-60 border-b bg-neutral-700 border-neutral-700 w-full">Users:</h2>
            {
                users.data.map((val, index) => 
                    <User 
                        key={index}
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
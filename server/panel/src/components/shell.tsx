import { ReactTerminal } from "react-terminal";
import { useUsersStore } from "../store/useSampleStore";
import { TfiInfoAlt } from "react-icons/tfi";

const Shell = () => {
    const users = useUsersStore();
    let element = null;

    switch (users.selectedUser?.isOnline) {
        case true:
            element = (
                <ReactTerminal
                    className="w-full"
                    theme="dark"
                    prompt={`root@${users.selectedUser.name} $`}
                />
            );
            break;

        case false:
            element = (
                <div className="text-red-300 f-center flex-col gap-2">
                    <TfiInfoAlt size={30} />
                    <span className="">
                        Cannot get shell access to target. Target is Offline
                    </span>
                </div>
            );
            break;
    
        default:
            element = (
                <div className="f-center flex-col opacity-50 gap-2">
                    <TfiInfoAlt size={30} />
                    <span>
                        No User Selected.
                    </span>
                </div>
            );
            break;
    }

    return (
        <div className={`f-center`} id="terminal-container">
            {element}
        </div>
    );
}

export default Shell;
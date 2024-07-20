import { websocketUrl } from "../global/baseurl";

interface T_Props {
    className?: string
}

const UserMedia = ({ className = '' }: T_Props) => {
    const mediaSource = new MediaSource();

    mediaSource.addEventListener('sourceopen', () => {
        const socket = new WebSocket(websocketUrl);
        const sourceBuffer = mediaSource.addSourceBuffer('video/mp4; codecs="avc1.64001E, mp4a.40.2"');

        socket.binaryType = 'arraybuffer';
        socket.onmessage = event => {
            sourceBuffer.appendBuffer(new Uint8Array(event.data));
        };

        socket.onclose = () => {
            mediaSource.endOfStream();
        };
    });

    return (
        <div className={`[&>div]:w-full flex flex-col`}>
            <div className="flex gap-2 flex-col border-b border-neutral-700 p-3">
                <h3>Cam:</h3>
                <video 
                    className="w-full rounded-md aspect-video"
                    src={URL.createObjectURL(mediaSource)} 
                    autoPlay
                    controls
                ></video>
            </div>
            <div className=" p-3">
                <h3>Mic:</h3>
                <audio src="" className="w-full"></audio>
            </div>
        </div>
    );
}

export default UserMedia;
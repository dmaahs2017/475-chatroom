import { Server } from "Socket.IO";

const ConnectedUsers = (req, res) => {
    // ENDPOINT: POST /api/connected
    // BODY: {user: C1, lock: alsdbgjdls, channel: XYZ}

    // if post request then a new user is joining a channel,
    // so add them to the connected users table with channel name, lock, and user name
    //
    //

    // ENDPOINT: GET /api/connected/{channel_name}
    // if GET request, then reply with users connected to their channel, as well as their locks, and user names
};

export default ConnectedUsers;

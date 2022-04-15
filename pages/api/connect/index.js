import pg from 'pg';
const Client = pg.Client;

const credentials = {
  user: "postgres",
  host: "localhost",
  database: "chatroom",
  password: "Password1!",
  port: 5432,
};

const ConnectedUsers = async (req, res) => {
  if (req.method === "GET") {
    // ENDPOINT: GET /api/connected/{channel_name}
    // if GET request, then reply with users connected to their channel, as well as their locks, and user names
    const cli = new Client(credentials);
    await cli.connect();
    const result = await cli.query("SELECT * from connected_users");
    await cli.end();
    res.end(JSON.stringify(result.rows))
  }
};

export default ConnectedUsers;

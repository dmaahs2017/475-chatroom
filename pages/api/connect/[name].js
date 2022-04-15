import pg from 'pg';
const Client = pg.Client;

const credentials = {
  user: "postgres",
  host: "localhost",
  database: "chatroom",
  password: "Password1!",
  port: 5432,
};

const Users = async (req, res) => {
  const {name} = req.query;
  if (req.method === "DELETE") {
    const cli = new Client(credentials);
    await cli.connect();
    const result = await cli.query(`DELETE FROM connected_users where user_name = '${name}'`);

    await cli.end();
    res.end(JSON.stringify(result.rowCount))

  } else if (req.method === "POST") {
    const public_key = req.body.public_key;
    const channel = req.body.channel;
    console.log(req.body)

    const cli = new Client(credentials);
    await cli.connect();
    const result = await cli.query(`
      INSERT INTO public.connected_users
      (user_name, public_key, channel)
      VALUES('${name}', '${public_key}', '${channel}');`
    );

    await cli.end();
    res.end(JSON.stringify(result.rowCount))
  } else if (req.method === "GET") {
    const cli = new Client(credentials);
    await cli.connect();
    // name = channel in this case
    const result = await cli.query(`SELECT * from connected_users where channel = '${name}'`);
    await cli.end();
    console.log(name)
    res.end(JSON.stringify(result.rows))
  }
};

export default Users;

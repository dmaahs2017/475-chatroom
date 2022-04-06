const Channels = (req, res) => {
  res.status(200).json(["all", "public"]);
};
export default Channels;

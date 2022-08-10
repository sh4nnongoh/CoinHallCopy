import type { VercelRequest, VercelResponse } from "@vercel/node";
import axios from "axios";
import { config } from "../src/config/config";
const handler = async (req: VercelRequest, res: VercelResponse) => {
  axios.defaults.baseURL = config.axios.baseUrl;
  const { data } = await axios.get("/charts/terra/prices/latest", { ...req.query });
  if (data) {
    res.status(200).send(data);
  } else {
    res.status(400);
  }
};
export default handler;

import express from 'express';
import getUrl from '../helpers/urls';
import { getToken, sendMsg } from '../lib/sendpulse';

const router = express.Router();

const SendMsg = router.post(getUrl('api.send'), async (req, res) => {
  const { from, to, subject, msg } = req.body;

  try {
    const token = await getToken(req);
    const r = await sendMsg(token, from, to, msg, subject);
    res.status(r.result ? 200 : 400).json(r);
  } catch (error) {
    res.status(error.statusCode).json({ error: JSON.parse(error.error) });
  }
});

export default SendMsg;

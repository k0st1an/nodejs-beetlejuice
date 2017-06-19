import express from 'express';
import getUrl from '../helpers/urls';
import { getToken, sendMsg } from '../lib/sendpulse';

const router = express.Router();

const SendMsg = router.get(getUrl('api.send'), async (req, res) => {
  try {
    const token = await getToken(req);
    const r = await sendMsg(token, 'TEST msg', 'Subject');

    console.error('send msg result:', r);
  } catch (error) {
    res.status(500).json();
  }

  res.status(200).json({ status: true });
});

export default SendMsg;

import express from 'express';
import getUrl from '../helpers/urls';
import getToken from '../lib/sendpulse';

const router = express.Router();

const SendMsg = router.get(getUrl('api.send'), async (req, res) => {
  const result = await getToken();

  console.error(result);

  res.status(200).json({ status: true });
});

export default SendMsg;

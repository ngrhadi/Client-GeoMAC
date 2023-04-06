// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { API } from '@/constant';
import axios from 'axios';
import type { NextApiRequest, NextApiResponse } from 'next';

type DataNegeriName = {
  name: object;
};

type DataNegeri = {
  data: DataNegeriName[] | undefined;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<DataNegeri>
) {
  API.get('/data/negeri.json').then((response) => {
    res.status(200).json({ data: response.data.negeri_my });
  });
}

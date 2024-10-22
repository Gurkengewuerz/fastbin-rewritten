import { NextApiRequest, NextApiResponse } from 'next';

import { getStorageStrategy } from '@/lib/storageStrategies';

const storage = getStorageStrategy();

const route = async (req: NextApiRequest, res: NextApiResponse) => {
  const key = req.query.key as string;

  if (!(await storage.exists(key))) {
    return res.status(404).json({
      ok: false,
      error: 'File does not exist.',
    });
  }

  const contents = await storage.get(key);
  return res.json({
    ok: true,
    contents,
  });
};

export default route;

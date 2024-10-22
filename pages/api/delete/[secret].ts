import { NextApiRequest, NextApiResponse } from 'next';

import { decrypt } from '@/lib/secrets';
import { getStorageStrategy } from '@/lib/storageStrategies';

const storage = getStorageStrategy();

const route = async (req: NextApiRequest, res: NextApiResponse) => {
  if (!['GET', 'DELETE'].includes(req.method)) {
    return res.status(405).json({
      ok: false,
      error: 'Method not allowed.',
    });
  }

  const secret = req.query.secret as string;

  try {
    const key = decrypt('id', secret);

    if (req.method === 'GET') {
      if (!(await storage.exists(key))) {
        return res.status(404).json({
          ok: false,
          error: 'Snippet not found!',
        });
      }

      return res.json({
        ok: true,
        key,
      });
    }

    await storage.delete(key);

    return res.json({
      ok: true,
      key,
    });
  } catch (_) {
    return res.status(400).json({
      ok: false,
      error: 'Failed to decrypt secret. Snippet not deleted.',
    });
  }
};

export default route;
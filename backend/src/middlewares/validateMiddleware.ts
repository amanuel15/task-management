import { Schema } from 'zod';
import { Request, Response, NextFunction } from 'express';

export default function validate(
  schema: Schema,
  field: 'body' | 'query' | 'params' = 'body'
) {
  return async (req: Request, res: Response, next: NextFunction) => {
    const val = schema.safeParse(
      field === 'query' ? req.query : field === 'params' ? req.params : req.body
    );
    if (val.success) {
      if (field === 'body') {
        req.body = val.data;
      } else if (field === 'query') {
        req.query = val.data;
      }
      next();
    } else {
      let errorMessage = '';
      const json = JSON.parse(val.error.message);
      if (Array.isArray(json) && json.length) {
        errorMessage = `${json[0].message} for '${
          json[0].path[1] || json[0].path[0]
        }'${json[0].path[1] ? ` at index ${json[0].path[0]}.` : '.'}`;
      }
      res.status(400).json({
        msg: errorMessage
      });
    }
  };
}

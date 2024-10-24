import type { NextApiRequest, NextApiResponse } from 'next';
import { S3 } from 'aws-sdk';

const s3 = new S3({
   accessKeyId: process.env.AWS_ACCESS_KEY_ID,
   secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
   region: process.env.AWS_REGION,
});

export default async function handler(
   req: NextApiRequest,
   res: NextApiResponse,
) {
   switch (req.method) {
      case 'GET': {
         const { fileName } = req.query;

         if (!fileName || Array.isArray(fileName)) {
            return res.status(400).json({ error: 'Invalid fileName' });
         }

         const params = {
            Bucket: process.env.AWS_S3_BUCKET_NAME || '',
            Key: `uploads/${fileName}`,
         };

         try {
            const data = await s3.getObject(params).promise();

            res.setHeader(
               'Content-Type',
               data.ContentType || 'application/octet-stream',
            );
            res.setHeader(
               'Content-Disposition',
               `attachment; filename="${fileName}"`,
            );

            res.send(data.Body);
         } catch (error) {
            return res.status(500).json({ error: 'Error fetching file' });
         }

         break;
      }

      default:
         res.status(405).json({ error: 'Method not allowed' });
   }
}

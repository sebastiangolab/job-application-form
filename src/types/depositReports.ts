import { UploadFile } from 'antd';
import { WithId } from 'mongodb';

export type DepositReportData = {
   companyName: string;
   email: string;
   phone: string;
   offerDeadline: string;
   depositPrice: string;
   contractValue: string;
   consortiumStatus: string;
   warrantyPeriod: string;
   caseSign: string;
   fileUrl: string;
};

export type DepositReportFormData = {
   files?: {
      fileList: UploadFile[];
   };
} & Omit<DepositReportData, 'fileUrl'>;

export type DepositReport = WithId<DepositReportData>;

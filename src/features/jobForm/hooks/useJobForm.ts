import { useState } from 'react';
import { FormInstance, FormProps } from 'antd/lib/form';

import { getUploadsFilesAsFormData } from '@/helpers/getUploadsFilesAsFormData';
import { UploadPostResponseData } from '@/pages/api/uploads';

import { sendFormDataAction } from '../services/api/sendFormDataAction';
import { uploadFilesAction } from '../services/api/uploadFilesAction';
import { FormResultStatus, JobApplicationFormData } from '../types';

type JobFormHookResult = {
   formResultStatus: FormResultStatus | null;
   validationErrors: string[] | null;
   isButtonLoading: boolean;
   sendFormData: FormProps<JobApplicationFormData>['onFinish'];
   setFormError: FormProps<JobApplicationFormData>['onFinishFailed'];
   resetFormStatus: () => void;
};

export const useJobForm = (formRef: FormInstance): JobFormHookResult => {
   const [formResultStatus, setFormResultStatus] =
      useState<FormResultStatus | null>(null);

   const [isButtonLoading, setIsButtonLoading] = useState<boolean>(false);

   const setSuccessFormStatus = (): void => {
      setIsButtonLoading(false);

      setFormResultStatus(FormResultStatus.SUCCESSS);
   };

   const setErrorFormStatus = (): void => {
      setIsButtonLoading(false);

      setFormResultStatus(FormResultStatus.ERROR);
   };

   const resetFormStatus = (): void => {
      setFormResultStatus(null);
   };

   const setFormError: FormProps<JobApplicationFormData>['onFinishFailed'] = (
      errorInfo,
   ) => {
      console.error(errorInfo);

      setErrorFormStatus();
   };

   const sendFormData: FormProps<JobApplicationFormData>['onFinish'] = async (
      formValues: JobApplicationFormData,
   ): Promise<void> => {
      const isDemoUpload = process.env.NEXT_PUBLIC_IS_DEMO_UPLOAD;

      setIsButtonLoading(true);

      let uploadNames: string | null = null;

      const filesFieldErrors = formRef.getFieldError('files');

      if (filesFieldErrors.length > 0) {
         setErrorFormStatus();

         return;
      }

      const { files, ...restFormValues } = formValues;

      if (!isDemoUpload && files && files.fileList.length > 0) {
         const formData = getUploadsFilesAsFormData(files);

         try {
            const response = await uploadFilesAction(formData);

            if (!response.ok) {
               setErrorFormStatus();

               return;
            }

            const responseData: UploadPostResponseData = await response.json();

            uploadNames = responseData.uploadNames;
         } catch (err) {
            console.error(err);

            setErrorFormStatus();

            return;
         }
      }

      if (isDemoUpload && files && files.fileList.length > 0) {
         uploadNames = files.fileList.map((file) => file.name ?? '').join(',');
      }

      console.log(uploadNames);

      try {
         const response = await sendFormDataAction(restFormValues, uploadNames);

         if (!response.ok) {
            setErrorFormStatus();

            return;
         }

         formRef.resetFields();

         setSuccessFormStatus();
      } catch (err) {
         console.error(err);

         setErrorFormStatus();
      }
   };

   const getValidatioErrors = (): string[] | null => {
      const errors = formRef.getFieldsError();

      if (errors.length === 0) {
         return null;
      }

      let errorsMessages: string[] = [];

      errors.map((errorObject) => {
         errorObject.errors.forEach((error) => errorsMessages.push(error));
      });

      return errorsMessages;
   };

   const validationErrors =
      formResultStatus === FormResultStatus.ERROR ? getValidatioErrors() : null;

   return {
      formResultStatus,
      validationErrors,
      isButtonLoading,
      sendFormData,
      setFormError,
      resetFormStatus,
   };
};

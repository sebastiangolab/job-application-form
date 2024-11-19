import Alert from 'antd/lib/alert';
import React, { ReactElement } from 'react';
import { FormResultStatus } from '../../types';

type ResultStatusMessageProps = {
   status: FormResultStatus;
   validationErrors: string[] | null;
};

const ResultStatusMessage = ({
   status,
   validationErrors,
}: ResultStatusMessageProps): ReactElement<ResultStatusMessageProps> => {
   return (
      <>
         {status === FormResultStatus.SUCCESSS ? (
            <Alert
               className='text-base'
               message='Formularz został wysłany'
               type='success'
               showIcon
            />
         ) : null}

         {status === FormResultStatus.ERROR ? (
            <Alert
               message={
                  validationErrors === null || !validationErrors.length ? (
                     'Wystąpił problem podczas wysyłania wiadomości, skontaktuj się z administratorem'
                  ) : (
                     <>
                        {validationErrors.map((error) => (
                           <p key={error} className='mb-1'>
                              {error}
                           </p>
                        ))}
                     </>
                  )
               }
               type='error'
               showIcon={validationErrors === null}
            />
         ) : null}
      </>
   );
};

export default ResultStatusMessage;

import { ReactElement } from 'react';
import { ColumnsType, statusData, TableDataType } from '../TableReports';
import { Modal, Tag } from 'antd';
import DetailsRow from '../DetailsRow';

export type DetailsModalElementProps = {
   activeReportData: TableDataType;
   tableColumns: ColumnsType;
   isModalOpen: boolean;
   handleOnCancel: () => void;
   showNotification: (message: string, duration?: number) => void;
};

const DetailsModalElement = ({
   activeReportData,
   tableColumns,
   isModalOpen,
   handleOnCancel,
   showNotification,
}: DetailsModalElementProps): ReactElement<DetailsModalElementProps> => {
   const { key, status, ...restActiveReportData } = activeReportData;

   const detailsElement = (
      <>
         <p className='mt-3 mb-7'>
            <Tag color={statusData[status].color} className='mr-0'>
               {statusData[status].text}
            </Tag>
         </p>

         {Object.entries(restActiveReportData).map(([objectKey, value]) =>
            value ? (
               <DetailsRow
                  key={objectKey}
                  detailKey={objectKey}
                  value={value}
                  tableColumns={tableColumns}
               />
            ) : null,
         )}
      </>
   );

   const modalTitle = (
      <p className='text-2xl'>{`Raport ${activeReportData?.caseSign}`}</p>
   );

   return (
      <Modal
         title={modalTitle}
         className='table-reports-modal'
         open={isModalOpen}
         onCancel={handleOnCancel}
         footer={null}
         centered
      >
         {detailsElement}
      </Modal>
   );
};

export default DetailsModalElement;

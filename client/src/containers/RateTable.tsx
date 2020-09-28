import React, { FC, useEffect } from 'react';
import axios from 'axios';
import { Table } from 'antd';

export const RateTable: FC<{
  dataSource: { id: number; name: string }[];
  dispatch: React.Dispatch<{ type: string; payload: any }>;
}> = ({ dataSource, dispatch }) => {
  useEffect(() => {
    axios
      .get('/api/rates')
      .then((res) => {
        dispatch({ type: 'LOAD_LIST', payload: res.data });
      })
      .catch((err) => {});
  }, []);

  const columns = [
    {
      title: 'provider',
      dataIndex: 'provider',
      key: 'provider',
    },
    {
      title: 'pair',
      dataIndex: 'pair',
      key: 'pair',
    },
    {
      title: 'rate',
      dataIndex: 'rate',
      key: 'rate',
    },
    {
      title: 'fee_percent',
      dataIndex: 'fee_percent',
      key: 'fee_percent',
    },
    {
      title: 'fee_amount',
      dataIndex: 'fee_amount',
      key: 'fee_amount',
    },
    {
      title: 'fee_mark_up',
      dataIndex: 'fee_mark_up',
      key: 'fee_mark_up',
    },
  ];

  return <Table dataSource={dataSource} columns={columns} />;
};

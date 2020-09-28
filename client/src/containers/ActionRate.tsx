import React, { FC, useState } from 'react';
import { Button, Card, Form, Input, Select } from 'antd';
import axios from 'axios';
import { UpdateRosterButton } from './UpdateRosterButton';

export const ActionRate: FC<{
  dispatch: React.Dispatch<{ type: string; payload: any }>;
}> = ({ dispatch }) => {
  const [pair, setPair] = useState('');
  const [rate, setRate] = useState(0);
  const [showForm, setShowForm] = useState(false);

  const onClick = (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
    event.preventDefault();

    axios
      .get(`api/rates/fixer/${pair}`)
      .then((res) => {
        setRate(res.data.rate);
      })
      .catch((err) => {});
  };

  const onFinish = async (values: any) => {
    axios
      .post(`api/rates`, {
        pair,
        provider: 'fixer',
        fee_percent: values.fee_percent,
        rate,
      })
      .then((res) => {
        setShowForm(false);
        setRate(0);
        dispatch({ type: 'NEW_RATE', payload: res.data });
      })
      .catch((err) => {
        setShowForm(false);
      });
  };

  return (
    <>
      <Button
        type="primary"
        style={{ marginRight: 20, marginBottom: 20 }}
        onClick={(e) => setShowForm(true)}
      >
        Create Rate
      </Button>
      <UpdateRosterButton />
      {showForm && (
        <Card size="default" title="Fixer provider" style={{ width: 500 }}>
          <Select
            placeholder="Select a pair"
            style={{ width: 300 }}
            onChange={(value: string) => setPair(value)}
          >
            <Select.Option value="EURUSD">EURUSD</Select.Option>
            <Select.Option value="EURARS">EURARS</Select.Option>
            <Select.Option value="USDARS">USDARS</Select.Option>
            <Select.Option value="EURBRL">EURBRL</Select.Option>
            <Select.Option value="USDBRL">USDBRL</Select.Option>
            <Select.Option value="BRLARS">BRLARS</Select.Option>
          </Select>
          <Button onClick={onClick}>Load Rate</Button>
          <Form onFinish={onFinish} style={{ paddingTop: 10 }}>
            <span>Rate: {rate}</span>
            <Form.Item
              name="fee_percent"
              rules={[
                { required: true, message: 'Please input your fee percent!' },
              ]}
              style={{ width: 336, paddingTop: 10 }}
            >
              <Input placeholder="Fee percent" />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" disabled={rate === 0}>
                Create
              </Button>
            </Form.Item>
          </Form>
        </Card>
      )}
    </>
  );
};

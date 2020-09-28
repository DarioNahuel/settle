import React, { useState } from 'react';
import { Button } from 'antd';
import axios from 'axios';

export const UpdateRosterButton = () => {
  const [loading, setLoading] = useState(false);
  const onClick = async (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
    event.preventDefault();
    setLoading(true);

    axios
      .post('/api/rates/fixer/roster')
      .then((res) => {
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
      });
  };

  return (
    <Button
      type="primary"
      onClick={onClick}
      loading={loading}
      style={{ marginBottom: 20 }}
    >
      {loading ? 'loading' : 'Update Provider Rate'}
    </Button>
  );
};

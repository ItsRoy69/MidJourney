import { Collapse, Select } from 'antd';
import { useState } from 'react';
import { helpData } from './help_data.js'; // Import the helpData array

const { Option } = Select;

const App = () => {
  const [expandIconPosition, setExpandIconPosition] = useState('start');
  const onPositionChange = (newExpandIconPosition) => {
    setExpandIconPosition(newExpandIconPosition);
  };
  const onChange = (key) => {
    console.log(key);
  };

  return (
    <>
      <Collapse
        defaultActiveKey={['1']}
        onChange={onChange}
        expandIconPosition={expandIconPosition}
        items={helpData} // Use the imported helpData array
      />
      <br />
      <span>Expand Icon Position: </span>
      <Select
        value={expandIconPosition}
        style={{
          margin: '0 8px',
        }}
        onChange={onPositionChange}
      >
        <Option value="start">start</Option>
        <Option value="end">end</Option>
      </Select>
    </>
  );
};

export default App;

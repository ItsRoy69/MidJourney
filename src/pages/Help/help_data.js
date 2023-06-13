// help_data.js
import { SettingOutlined } from '@ant-design/icons';

const text = `
  A dog is a type of domesticated animal.
  Known for its loyalty and faithfulness,
  it can be found as a welcome guest in many households across the world.
`;

const genExtra = () => (
  SettingOutlined({
    onClick: (event) => {
      // If you don't want click extra trigger collapse, you can prevent this:
      event.stopPropagation();
    }
  })
);

export const helpData = [
  {
    key: '1',
    label: 'This is panel header 1',
    children: `<div>${text}</div>`,
    extra: genExtra(),
  },
  {
    key: '2',
    label: 'This is panel header 2',
    children: `<div>${text}</div>`,
    extra: genExtra(),
  },
  {
    key: '3',
    label: 'This is panel header 3',
    children: `<div>${text}</div>`,
    extra: genExtra(),
  },
];

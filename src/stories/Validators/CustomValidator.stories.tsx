import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { CustomValidator as CV } from './CustomValidator';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'UseForm/CustomValidator',
  component: CV,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {},
} as ComponentMeta<typeof CV>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof CV> = (args) => <CV {...args} />;

export const CustomValidator = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
CustomValidator.args = {
  validateOn: 'change',
};

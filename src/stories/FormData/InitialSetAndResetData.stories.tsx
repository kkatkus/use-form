import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { InitialSetAndResetData as SR } from './InitialSetAndResetData';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'UseForm/InitialSetAndResetData',
  component: SR,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {},
} as ComponentMeta<typeof SR>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof SR> = (args) => <SR {...args} />;

export const InitialSetAndResetData = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
InitialSetAndResetData.args = {
  validateOn: 'change',
};

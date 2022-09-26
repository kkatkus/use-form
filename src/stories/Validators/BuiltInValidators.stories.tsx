import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { BuiltInValidators as BV } from './BuiltInValidators';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'UseForm/BuiltInValidators',
  component: BV,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {},
} as ComponentMeta<typeof BV>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof BV> = (args) => <BV {...args} />;

export const BuiltInValidators = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
BuiltInValidators.args = {
  validateOn: 'change',
};

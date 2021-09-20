import React from 'react';
import { mount } from 'enzyme';
import Button from '..';

describe('Button Test', () => {
  it('mount correctly', () => {
    // 挂载组件的过程中不要抛出错误
    expect(() => mount(<Button>Follow</Button>)).not.toThrow();
  });
});

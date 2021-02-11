import React from 'react';
import renderer from 'react-test-renderer';

import MathsLearning from "./MathsLearning";

describe('<MathsLearning />', () => {
  
  it('has 5 children', async () => {
    const tree = renderer.create(<MathsLearning />).toJSON();
    expect(tree.children.length).toBe(5);
  });

  it('App renders without crashing', async () => {
    const rendered = renderer.create(<MathsLearning />).toJSON();
    expect(rendered).toBeTruthy();
  });

  it('App test against snapshot', async () => {
    const tree = renderer.create(<MathsLearning />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('View properties', async () => {
    const tree = renderer.create(<MathsLearning />).toJSON();
    expect(tree.children).toHaveLength(5);
    expect(tree.props.style).toHaveProperty('backgroundColor');
  });

});
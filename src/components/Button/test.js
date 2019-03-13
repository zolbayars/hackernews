import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Button from '.';

Enzyme.configure({ adapter: new Adapter() });


describe('Button', () => {

    it('renders without crashing', () => {
      const div = document.createElement('div');
      ReactDOM.render(<Button onClick={() => {}}>Click on me</Button>, div); 
      ReactDOM.unmountComponentAtNode(div);
    });
  
    test('has a valid snapshot', () => {
      const component = renderer.create(
        <Button onClick={() => {}}>Click on me</Button>
      );
      const tree = component.toJSON(); 
      expect(tree).toMatchSnapshot(); 
    });
  
    it('shows correct text', () => {
      const element = shallow(
        <Button onClick={() => {}}>Click on me</Button>
      );
  
      expect(element.text()).toContain('Click on me');
    });
  
  });
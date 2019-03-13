import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Search from '.';

Enzyme.configure({ adapter: new Adapter() });

describe('Search', () => {

  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(
      <Search 
        searchTerm='redux' 
        onSubmit={() => {}}
        onSearchChange={() => {}}
      >
        Search
      </Search>,
    div); 
    ReactDOM.unmountComponentAtNode(div);
  });

  test('has a valid snapshot', () => {
    const component = renderer.create(
      <Search 
        searchTerm='redux' 
        onSubmit={() => {}}
        onSearchChange={() => {}}
      >
        Search
      </Search>
    );
    const tree = component.toJSON(); 
    expect(tree).toMatchSnapshot(); 
  });

});

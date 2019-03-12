import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import App, { Search, Button, Table } from './App';

Enzyme.configure({ adapter: new Adapter() });

describe('App', () => {

  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<App />, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  test('has a valid snapshot', () => {
    const component = renderer.create(
      <App />
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

}); 

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

describe('Table', () => {

  const props = {
    list:[
      { title: '1', author: '1', num_comments: 1, points: 2, objectID: 'y' },
      { title: '2', author: '2', num_comments: 1, points: 2, objectID: 'z' },
    ],
  };
  
  it('renders without crashing', () => {
    const div = document.createElement('div');
    // ReactDOM.render(<Table { ...props } />, div); 
    ReactDOM.render(<Table result={ props.list } />, div); 
    ReactDOM.unmountComponentAtNode(div);
  });

  test('has a valid snapshot', () => {
    const component = renderer.create(
      // <Table { ...props } />
      <Table result={ props.list } />
    );
    const tree = component.toJSON(); 
    expect(tree).toMatchSnapshot(); 
  });

  it('shows 2 items in the list', () => {
    const element = shallow(
      <Table result={ props.list } /> 
    );

    expect(element.find('.table-row').length).toBe(2);
  });

});


import { mount } from 'enzyme';
import App from './App';

describe('App', () => {
  let component;
  beforeEach(() => {
    component = mount(<App />);
  });
  it('should render the app', () => {
    expect(component.exists('div')).toBe(true);
  });
});

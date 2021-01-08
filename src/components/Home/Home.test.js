import { mount } from 'enzyme';
import Home from './Home';

describe('Home', () => {
  let component;
  beforeEach(() => {
    component = mount(<Home />);
  });

  it('should render Home', () => {
    expect(component.exists('div')).toBe(true);
  });
});

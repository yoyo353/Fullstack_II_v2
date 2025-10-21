// Browser APIs mock
window.matchMedia = window.matchMedia || function() {
  return {
    matches: false,
    addListener: () => {},
    removeListener: () => {}
  };
};

window.scrollTo = window.scrollTo || function() {};

// Mock localStorage
const storageMock = {
  getItem: jasmine.createSpy('getItem').and.returnValue(null),
  setItem: jasmine.createSpy('setItem'),
  removeItem: jasmine.createSpy('removeItem'),
  clear: jasmine.createSpy('clear'),
  key: jasmine.createSpy('key'),
  length: 0
};

Object.defineProperty(window, 'localStorage', {
  value: storageMock,
  configurable: true,
  enumerable: true,
  writable: true
});

// Mock location
const locationMock = {
  href: 'http://localhost/',
  pathname: '/',
  search: '',
  hash: '',
  assign: jasmine.createSpy('assign'),
  replace: jasmine.createSpy('replace'),
  reload: jasmine.createSpy('reload')
};

try {
  delete window.location;
  window.location = locationMock;
} catch (e) {
  console.warn('Could not override window.location');
}

// Custom matchers for Jasmine
beforeEach(() => {
  jasmine.addMatchers({
    toHaveText: () => ({
      compare: (actual, expected) => ({
        pass: actual.textContent.includes(expected),
        message: () => `Expected ${actual} to have text ${expected}`
      })
    }),
    toBeInTheDocument: () => ({
      compare: (actual) => ({
        pass: document.body.contains(actual),
        message: () => `Expected element to ${document.body.contains(actual) ? 'not ' : ''}be in the document`
      })
    }),
    toHaveTextContent: () => ({
      compare: (actual, expected) => ({
        pass: actual?.textContent?.includes(expected),
        message: () => `Expected ${actual} to have text content ${expected}`
      })
    }),
    toBeVisible: () => ({
      compare: (actual) => ({
        pass: window.getComputedStyle(actual).display !== 'none',
        message: () => `Expected element to be visible`
      })
    }),
    toContainElement: () => ({
      compare: (actual, expected) => ({
        pass: actual.contains(expected),
        message: () => `Expected element to contain ${expected}`
      })
    })
  });
});

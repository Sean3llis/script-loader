import scriptLoader from '.';

test('foobar', () => {
  expect(scriptLoader()).toBeTruthy();
});

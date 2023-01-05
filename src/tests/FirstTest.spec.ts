import { User } from "@models/UsersModel"

test('It should be ok', () => {
  const user = new User();

  user.name = 'Guilherme';

  expect(user.name).toEqual('Guilherme');
})
import dotenv from 'dotenv';
dotenv.config();

export const TestData = {
  user: {
    email: process.env.USER_EMAIL ?? '',
    password: process.env.USER_PASSWORD ?? '',
  },
  invalidUser: {
    email: 'wrong@example.com',
    password: 'wrongpass',
  },
  updateAccount: {
    name: 'Ndosi Test',
    title: 'Mr',
    birth_date: '1',
    birth_month: 'January',
    birth_year: '1990',
    firstname: 'Ndosi',
    lastname: 'Test',
    company: 'TestCo',
    address1: '123 Test St',
    address2: '',
    country: 'South Africa',
    zipcode: '0001',
    state: 'Gauteng',
    city: 'Johannesburg',
    mobile_number: '0821234567',
  },
  disposableUser: {
    email: 'disposable@mailinator.com',
    password: 'Disposable@1',
  },
};

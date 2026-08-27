import dotenv from 'dotenv';
dotenv.config();

export const TestData = {
  baseUrl: process.env.BASE_URL ?? 'https://ndosisimplifiedautomation.vercel.app',
  user: {
    email: process.env.USER_EMAIL ?? '',
    password: process.env.USER_PASSWORD ?? '',
  },
  invalidUser: {
    email: 'wrong@example.com',
    password: 'wrongpass',
  },
};

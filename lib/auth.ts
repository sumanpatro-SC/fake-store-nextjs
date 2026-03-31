import NextAuth from 'next-auth';
// import { DrizzleAdapter } from '@auth/drizzle-adapter';
// import { db } from './db';
// import { accounts, sessions, users } from './db/schema';

export const { handlers, auth, signIn, signOut } = NextAuth({
  // adapter: DrizzleAdapter(db, {
  //   accountsTable: accounts,
  //   sessionsTable: sessions,
  //   usersTable: users,
  // }),
  providers: [],
  pages: {
    signIn: '/auth/signin',
    signOut: '/auth/signout',
  },
});
import {
  pgTable,
  serial,
  varchar,
  text,
  timestamp,
  integer,
  boolean,
  pgEnum,
  unique,
} from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';

export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 100 }),
  email: varchar('email', { length: 255 }).notNull().unique(),
  passwordHash: text('password_hash').notNull(),
  role: varchar('role', { length: 20 }).notNull().default('member'),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
  deletedAt: timestamp('deleted_at'),
});

export const teams = pgTable('teams', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 100 }).notNull(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
  stripeCustomerId: text('stripe_customer_id').unique(),
  stripeSubscriptionId: text('stripe_subscription_id').unique(),
  stripeProductId: text('stripe_product_id'),
  adminId: integer('admin_id').notNull().references(() => users.id),
  teamCode: varchar('team_code', { length: 5 }).unique().notNull().default('te_st'),
  startDate: timestamp('start_date').notNull().defaultNow(),
  endDate: timestamp('end_date').notNull().defaultNow(),
  planName: varchar('plan_name', { length: 50 }),
  subscriptionStatus: varchar('subscription_status', { length: 20 }),
});

export const teamMembers = pgTable("team_members", {
  id: serial("id").primaryKey(),
  adminId: integer("admin_id").references(() => users.id),
  userId: integer("user_id")
    .notNull()
    .references(() => users.id),
  teamId: varchar("team_id")
    .notNull()
    .references(() => teams.teamCode),
  role: varchar("role", { length: 50 }).notNull(),
  joinedAt: timestamp("joined_at").notNull().defaultNow(),
  isVerified: boolean("is_verified").notNull().default(false),
});

export const MealType = pgEnum("meal_type", ["breakfast", "lunch", "dinner"]);

export const teamMealDetails = pgTable(
  "team_meal_details",
  {
    id: serial("id").primaryKey(),
    teamId: varchar("team_id")
      .notNull()
      .references(() => teams.teamCode),
    userId: integer("user_id")
      .notNull()
      .references(() => users.id),
    mealType: MealType("meal_type").notNull(), // Enum to restrict to 'breakfast', 'lunch', or 'dinner'
    mealTime: timestamp("meal_time").notNull().defaultNow(),
    mealCount: integer("meal_count").notNull().default(1), // Number of meals
    guestMealCount: integer("guest_meal_count").notNull().default(0), // Number of guest meals
    comment: text("comment"), // Optional comment for meal details
    price: integer("price"), // Optional: Track price if needed
    date: timestamp("date").notNull().defaultNow(), // Date of the meal entry
    isApproved: boolean("is_approved").notNull().default(false), // Approval status
  },
  (table) => ({
    uniqueTeamMeal: unique().on(
      table.teamId,
      table.userId,
      table.mealType,
      table.date
    ),
  })
);



export const activityLogs = pgTable("activity_logs", {
  id: serial("id").primaryKey(),
  teamId: varchar("team_id")
    .notNull()
    .references(() => teams.teamCode),
  userId: integer("user_id").references(() => users.id),
  action: text("action").notNull(),
  timestamp: timestamp("timestamp").notNull().defaultNow(),
  ipAddress: varchar("ip_address", { length: 45 }),
});

export const invitations = pgTable("invitations", {
  id: serial("id").primaryKey(),
  teamId: varchar("team_id")
    .notNull()
    .references(() => teams.teamCode),
  email: varchar("email", { length: 255 }).notNull(),
  role: varchar("role", { length: 50 }).notNull(),
  invitedBy: integer("invited_by")
    .notNull()
    .references(() => users.id),
  invitedAt: timestamp("invited_at").notNull().defaultNow(),
  status: varchar("status", { length: 20 }).notNull().default("pending"),
});

export const teamsRelations = relations(teams, ({ many }) => ({
  teamMembers: many(teamMembers),
  activityLogs: many(activityLogs),
  invitations: many(invitations),
}));

export const usersRelations = relations(users, ({ many }) => ({
  teamMembers: many(teamMembers),
  invitationsSent: many(invitations),
}));

export const invitationsRelations = relations(invitations, ({ one }) => ({
  team: one(teams, {
    fields: [invitations.teamId],
    references: [teams.teamCode],
  }),
  invitedBy: one(users, {
    fields: [invitations.invitedBy],
    references: [users.id],
  }),
}));

export const teamMembersRelations = relations(teamMembers, ({ one }) => ({
  user: one(users, {
    fields: [teamMembers.userId],
    references: [users.id],
  }),
  team: one(teams, {
    fields: [teamMembers.teamId],
    references: [teams.teamCode],
  }),
}));

export const activityLogsRelations = relations(activityLogs, ({ one }) => ({
  team: one(teams, {
    fields: [activityLogs.teamId],
    references: [teams.teamCode],
  }),
  user: one(users, {
    fields: [activityLogs.userId],
    references: [users.id],
  }),
}));

export const teamMealDetailsRelations = relations(
  teamMealDetails,
  ({ one }) => ({
    team: one(teams, {
      fields: [teamMealDetails.teamId],
      references: [teams.teamCode],
    }),
    user: one(users, {
      fields: [teamMealDetails.userId],
      references: [users.id],
    }),
  })
);


export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;
export type Team = typeof teams.$inferSelect;
export type NewTeam = typeof teams.$inferInsert;
export type TeamMember = typeof teamMembers.$inferSelect;
export type NewTeamMember = typeof teamMembers.$inferInsert;
export type ActivityLog = typeof activityLogs.$inferSelect;
export type NewActivityLog = typeof activityLogs.$inferInsert;
export type Invitation = typeof invitations.$inferSelect;
export type NewInvitation = typeof invitations.$inferInsert;
export type TeamDataWithMembers = Team & {
  teamMembers: (TeamMember & {
    user: Pick<User, 'id' | 'name' | 'email'>;
  })[];
};

export enum ActivityType {
  SIGN_UP = 'SIGN_UP',
  SIGN_IN = 'SIGN_IN',
  SIGN_OUT = 'SIGN_OUT',
  UPDATE_PASSWORD = 'UPDATE_PASSWORD',
  DELETE_ACCOUNT = 'DELETE_ACCOUNT',
  UPDATE_ACCOUNT = 'UPDATE_ACCOUNT',
  CREATE_TEAM = 'CREATE_TEAM',
  REMOVE_TEAM_MEMBER = 'REMOVE_TEAM_MEMBER',
  INVITE_TEAM_MEMBER = 'INVITE_TEAM_MEMBER',
  ACCEPT_INVITATION = 'ACCEPT_INVITATION',
}

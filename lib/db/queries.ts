import { desc, and, eq, isNull } from 'drizzle-orm';
import { db } from './drizzle';
import { activityLogs, scheduleMealDetails, teamMembers, teams, users } from './schema';
import { cookies } from 'next/headers';
import { verifyToken } from '@/lib/auth/session';

export async function getUser() {
  const sessionCookie = (await cookies()).get('session');
  if (!sessionCookie || !sessionCookie.value) {
    return null;
  }

  const sessionData = await verifyToken(sessionCookie.value);
  if (
    !sessionData ||
    !sessionData.user ||
    typeof sessionData.user.id !== 'number'
  ) {
    return null;
  }

  if (new Date(sessionData.expires) < new Date()) {
    return null;
  }

  const user = await db
    .select()
    .from(users)
    .where(and(eq(users.id, sessionData.user.id), isNull(users.deletedAt)))
    .limit(1);

  if (user.length === 0) {
    return null;
  }

  return user[0];
}

export async function getTeamByStripeCustomerId(customerId: string) {
  const result = await db
    .select()
    .from(teams)
    .where(eq(teams.stripeCustomerId, customerId))
    .limit(1);

  return result.length > 0 ? result[0] : null;
}

export async function updateTeamSubscription(
  teamId: number,
  subscriptionData: {
    stripeSubscriptionId: string | null;
    stripeProductId: string | null;
    planName: string | null;
    subscriptionStatus: string;
  }
) {
  await db
    .update(teams)
    .set({
      ...subscriptionData,
      updatedAt: new Date(),
    })
    .where(eq(teams.id, teamId));
}

export async function getUserWithTeam(userId: number) {
  const result = await db
    .select({
      user: users,
      teamId: teamMembers.teamId,
    })
    .from(users)
    .leftJoin(teamMembers, eq(users.id, teamMembers.userId))
    .where(eq(users.id, userId))
    .limit(1);

  return result[0];
}

export async function getActivityLogs() {
  const user = await getUser();
  if (!user) {
    throw new Error('User not authenticated');
  }

  return await db
    .select({
      id: activityLogs.id,
      action: activityLogs.action,
      timestamp: activityLogs.timestamp,
      ipAddress: activityLogs.ipAddress,
      userName: users.name,
    })
    .from(activityLogs)
    .leftJoin(users, eq(activityLogs.userId, users.id))
    .where(eq(activityLogs.userId, user.id))
    .orderBy(desc(activityLogs.timestamp))
    .limit(10);
}

export async function getTeamForUser(userId: number) {
  const result = await db.query.users.findFirst({
    where: eq(users.id, userId),
    with: {
      teamMembers: {
        with: {
          team: {
            with: {
              teamMembers: {
                with: {
                  user: {
                    columns: {
                      id: true,
                      name: true,
                      email: true,
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
  });

  return result?.teamMembers[0]?.team || null;
}




// export async function getTeamForUser(userId: number) {
//   const result = await db.query.users.findFirst({
//     where: eq(users.id, userId),
//     with: {
//       teamMembers: {
//         with: {
//           team: {
//             with: {
//               teamMembers: {
//                 with: {
//                   user: {
//                     columns: {
//                       id: true,
//                       name: true,
//                       email: true,
//                     },
//                   },
//                 },
//               },
//             },
//           },
//         },
//       },
//     },
//   });

//   return result?.teamMembers[0]?.team || null;
// }

export async function getUsersAllTeams(userId: number) {
  const result =  await db.query.users.findMany({
    where: eq(users.id, userId),
    with: {
      teamMembers: {
        with: {
          team: {
            with: {
              teamMembers: {
                with: {
                  user: {
                    columns: {
                      id: true,
                      name: true,
                      email: true,
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
  });
  return result[0]?.teamMembers.map((tm) => tm.team) || [];
}


export async function getTeamDetail(scheduleId: number) {
  const user = await getUser();
  if (!user) {
    throw new Error("User not authenticated");
  }

  const team = await db.query.teams.findFirst({
    where: and(eq(teams.id, scheduleId)),
    with: {
      teamMembers: {
        with: {
          user: {
            columns: {
              id: true,
              name: true,
              email: true,
            },
          },
        },
      },
    },
  });

  // check if user is a member of the team
  if (!team || !team.teamMembers.some((tm) => tm.userId === user.id)) {
    throw new Error("Team not found or user is not a member of the team");
  }

  if (!team) {
    throw new Error("Team not found or user is not a member of the team");
  }

  return team;
}

// create meal for a user

export async function createUserMeal(
  teamId: number,
  meal: {
    mealTime: Date;
    mealType: "breakfast" | "lunch" | "dinner";
  }
) {
  const user = await getUser();
  if (!user) {
    throw new Error("User not authenticated");
  }

  const team = await db.query.teams.findFirst({
    where: eq(teams.id, teamId),
    with: {
      teamMembers: {
        where: eq(teamMembers.userId, user.id),
      },
    },
  });

  if (!team || team.teamMembers.length === 0) {
    throw new Error("User is not a member of the team");
  }

  const mealDate = new Date(meal.mealTime);
  const currentDate = new Date();
  currentDate.setHours(0, 0, 0, 0); // Set to start of the day

  if (mealDate <= currentDate) {
    throw new Error("Meal date must be a future date");
  }

  return await db
    .insert(scheduleMealDetails)
    .values({
      scheduleId: teamId,
      userId: user.id,
      ...meal,
    })
    .execute();
}
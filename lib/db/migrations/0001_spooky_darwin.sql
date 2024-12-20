ALTER TABLE "schedules" RENAME COLUMN "is_verified" TO "is_active_schedule";--> statement-breakpoint
ALTER TABLE "team_members" RENAME COLUMN "is_verified" TO "is_verified_member";--> statement-breakpoint
ALTER TABLE "teams" RENAME COLUMN "is_verified" TO "is_active_team";--> statement-breakpoint
ALTER TABLE "users" RENAME COLUMN "is_verified" TO "is_deleted_user";--> statement-breakpoint
ALTER TABLE "team_members" ALTER COLUMN "is_verified_member" SET DEFAULT false;--> statement-breakpoint
ALTER TABLE "team_members" ADD COLUMN "is_active_member" boolean DEFAULT true NOT NULL;
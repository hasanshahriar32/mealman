ALTER TABLE "teams" DROP CONSTRAINT "teams_team_code_unique";--> statement-breakpoint
ALTER TABLE "invitations" DROP CONSTRAINT "invitations_team_id_teams_team_code_fk";
--> statement-breakpoint
ALTER TABLE "team_members" DROP CONSTRAINT "team_members_team_id_teams_team_code_fk";
--> statement-breakpoint
ALTER TABLE "teams" DROP CONSTRAINT "teams_admin_id_users_id_fk";
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "invitations" ADD CONSTRAINT "invitations_team_id_teams_id_fk" FOREIGN KEY ("team_id") REFERENCES "public"."teams"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "team_members" ADD CONSTRAINT "team_members_team_id_teams_id_fk" FOREIGN KEY ("team_id") REFERENCES "public"."teams"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
ALTER TABLE "teams" DROP COLUMN IF EXISTS "team_code";--> statement-breakpoint
ALTER TABLE "teams" DROP COLUMN IF EXISTS "admin_id";--> statement-breakpoint
ALTER TABLE "teams" DROP COLUMN IF EXISTS "start_date";--> statement-breakpoint
ALTER TABLE "teams" DROP COLUMN IF EXISTS "end_date";
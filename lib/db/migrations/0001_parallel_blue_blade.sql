ALTER TABLE "invitations" DROP CONSTRAINT "invitations_team_id_teams_id_fk";
--> statement-breakpoint
ALTER TABLE "team_members" DROP CONSTRAINT "team_members_team_id_teams_id_fk";
--> statement-breakpoint
ALTER TABLE "teams" ADD COLUMN "team_code" varchar(5);--> statement-breakpoint
ALTER TABLE "teams" ADD COLUMN "admin_id" integer NOT NULL;--> statement-breakpoint
ALTER TABLE "teams" ADD COLUMN "start_date" timestamp;--> statement-breakpoint
ALTER TABLE "teams" ADD COLUMN "end_date" timestamp;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "invitations" ADD CONSTRAINT "invitations_team_id_teams_team_code_fk" FOREIGN KEY ("team_id") REFERENCES "public"."teams"("team_code") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "team_members" ADD CONSTRAINT "team_members_team_id_teams_team_code_fk" FOREIGN KEY ("team_id") REFERENCES "public"."teams"("team_code") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "teams" ADD CONSTRAINT "teams_admin_id_users_id_fk" FOREIGN KEY ("admin_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
ALTER TABLE "teams" ADD CONSTRAINT "teams_team_code_unique" UNIQUE("team_code");
DO $$ BEGIN
 CREATE TYPE "public"."meal_type" AS ENUM('breakfast', 'lunch', 'dinner');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "team_meal_details" (
	"id" serial PRIMARY KEY NOT NULL,
	"team_id" varchar NOT NULL,
	"user_id" integer NOT NULL,
	"meal_type" "meal_type" NOT NULL,
	"meal_time" timestamp DEFAULT now() NOT NULL,
	"meal_count" integer DEFAULT 1 NOT NULL,
	"guest_meal_count" integer DEFAULT 0 NOT NULL,
	"comment" text,
	"price" integer,
	"date" timestamp DEFAULT now() NOT NULL,
	"is_approved" boolean DEFAULT false NOT NULL
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "team_meal_details" ADD CONSTRAINT "team_meal_details_team_id_teams_team_code_fk" FOREIGN KEY ("team_id") REFERENCES "public"."teams"("team_code") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "team_meal_details" ADD CONSTRAINT "team_meal_details_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

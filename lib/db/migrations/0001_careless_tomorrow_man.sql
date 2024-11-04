ALTER TABLE "teams" ALTER COLUMN "start_date" SET DEFAULT now();--> statement-breakpoint
ALTER TABLE "teams" ALTER COLUMN "start_date" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "teams" ALTER COLUMN "end_date" SET DEFAULT now();--> statement-breakpoint
ALTER TABLE "teams" ALTER COLUMN "end_date" SET NOT NULL;
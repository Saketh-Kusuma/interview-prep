CREATE SCHEMA "interview_prep";
--> statement-breakpoint
CREATE TABLE "interview_prep"."subtopic_state" (
	"user_id" uuid NOT NULL,
	"subtopic_id" text NOT NULL,
	"status" smallint DEFAULT 0 NOT NULL,
	"note" text,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "subtopic_state_user_id_subtopic_id_pk" PRIMARY KEY("user_id","subtopic_id")
);
--> statement-breakpoint
CREATE TABLE "interview_prep"."users" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"firebase_uid" text NOT NULL,
	"email" text,
	"display_name" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "users_firebase_uid_unique" UNIQUE("firebase_uid")
);
--> statement-breakpoint
ALTER TABLE "interview_prep"."subtopic_state" ADD CONSTRAINT "subtopic_state_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "interview_prep"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "subtopic_state_user_updated_idx" ON "interview_prep"."subtopic_state" USING btree ("user_id","updated_at");
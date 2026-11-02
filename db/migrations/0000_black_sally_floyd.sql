CREATE TABLE "art_images" (
	"id" serial PRIMARY KEY NOT NULL,
	"art_id" text NOT NULL,
	"kind" text NOT NULL,
	"file" text NOT NULL,
	"alt" text NOT NULL,
	"caption" text DEFAULT '' NOT NULL,
	"author" text NOT NULL,
	"license" text NOT NULL,
	"source_url" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "art_pins" (
	"id" serial PRIMARY KEY NOT NULL,
	"art_id" text NOT NULL,
	"lat" double precision NOT NULL,
	"lng" double precision NOT NULL,
	"label" text NOT NULL,
	"approximate" boolean DEFAULT false NOT NULL
);
--> statement-breakpoint
CREATE TABLE "art_sources" (
	"art_id" text NOT NULL,
	"source_id" text NOT NULL,
	CONSTRAINT "art_sources_art_id_source_id_pk" PRIMARY KEY("art_id","source_id")
);
--> statement-breakpoint
CREATE TABLE "art_states" (
	"art_id" text NOT NULL,
	"state" text NOT NULL,
	CONSTRAINT "art_states_art_id_state_pk" PRIMARY KEY("art_id","state")
);
--> statement-breakpoint
CREATE TABLE "arts" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"category" text NOT NULL,
	"tagline" text NOT NULL,
	"color" text NOT NULL,
	"motif" text NOT NULL,
	"facts" jsonb NOT NULL,
	"art" jsonb NOT NULL,
	"artist" jsonb NOT NULL,
	"place" jsonb NOT NULL,
	"history" jsonb NOT NULL,
	"future" jsonb NOT NULL,
	"review_status" text DEFAULT 'draft' NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "sources" (
	"id" text PRIMARY KEY NOT NULL,
	"title" text NOT NULL,
	"url" text NOT NULL,
	"checked" boolean DEFAULT false NOT NULL,
	CONSTRAINT "sources_url_unique" UNIQUE("url")
);
--> statement-breakpoint
ALTER TABLE "art_images" ADD CONSTRAINT "art_images_art_id_arts_id_fk" FOREIGN KEY ("art_id") REFERENCES "public"."arts"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "art_pins" ADD CONSTRAINT "art_pins_art_id_arts_id_fk" FOREIGN KEY ("art_id") REFERENCES "public"."arts"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "art_sources" ADD CONSTRAINT "art_sources_art_id_arts_id_fk" FOREIGN KEY ("art_id") REFERENCES "public"."arts"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "art_sources" ADD CONSTRAINT "art_sources_source_id_sources_id_fk" FOREIGN KEY ("source_id") REFERENCES "public"."sources"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "art_states" ADD CONSTRAINT "art_states_art_id_arts_id_fk" FOREIGN KEY ("art_id") REFERENCES "public"."arts"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
CREATE UNIQUE INDEX "art_images_unique" ON "art_images" USING btree ("art_id","kind");--> statement-breakpoint
CREATE UNIQUE INDEX "art_pins_unique" ON "art_pins" USING btree ("art_id","lat","lng","label");--> statement-breakpoint
CREATE INDEX "art_sources_source_idx" ON "art_sources" USING btree ("source_id");--> statement-breakpoint
CREATE INDEX "art_states_state_idx" ON "art_states" USING btree ("state");--> statement-breakpoint
CREATE INDEX "arts_category_idx" ON "arts" USING btree ("category");
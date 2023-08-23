CREATE TABLE "public.users" (
	"id" serial NOT NULL,
	"email" TEXT NOT NULL UNIQUE,
	"password" TEXT NOT NULL,
	CONSTRAINT "users_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "public.infos" (
	"id" serial NOT NULL,
	"firstName" TEXT NOT NULL,
	"lastName" TEXT NOT NULL,
	"bio" TEXT,
	"userId" integer NOT NULL,
	"imageUrl" TEXT,
	CONSTRAINT "infos_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);




ALTER TABLE "infos" ADD CONSTRAINT "infos_fk0" FOREIGN KEY ("userId") REFERENCES "users"("id");




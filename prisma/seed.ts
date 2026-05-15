import { PrismaClient } from "@prisma/client";
import { auth } from "../src/lib/auth";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding admin user...");

  // Check if admin already exists
  const existingUser = await prisma.user.findUnique({
    where: {
      email: "abdulahadafridi440@gmail.com",
    },
  });

  if (!existingUser) {
    // Use Better Auth's API to create the user — this properly creates
    // both the User record and the Account record (with hashed password)
    await auth.api.signUpEmail({
      body: {
        name: "Abdul Ahad",
        email: "abdulahadafridi440@gmail.com",
        password: "admin123456",
      },
    });

    console.log("✅ Admin user created successfully!");
  } else {
    console.log("⚠️ Admin already exists, skipping creation.");
  }

  // Ensure SiteSettings exist
  await prisma.siteSettings.upsert({
    where: { id: "main" },
    update: {},
    create: { id: "main" },
  });

  console.log("✅ Site settings initialized!");
}

main()
  .catch((e) => {
    console.error("❌ Seed error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
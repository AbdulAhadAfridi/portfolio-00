import { PrismaClient } from "@prisma/client";
import { auth } from "../src/lib/auth";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding admin user...");

  const adminEmail = process.env.ADMIN_EMAIL;
  const adminPassword = process.env.ADMIN_PASSWORD;

  if (!adminEmail || !adminPassword) {
    throw new Error("ADMIN_EMAIL and ADMIN_PASSWORD must be set in .env.local");
  }

  // Check if admin already exists
  const existingUser = await prisma.user.findUnique({
    where: {
      email: adminEmail,
    },
  });

  if (!existingUser) {
    // Use Better Auth's API to create the user — this properly creates
    // both the User record and the Account record (with hashed password)
    await auth.api.signUpEmail({
      body: {
        name: "Abdul Ahad",
        email: adminEmail,
        password: adminPassword,
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
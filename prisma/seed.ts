import { PrismaClient } from "@prisma/client";
import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";

const prisma = new PrismaClient();

const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  emailAndPassword: {
    enabled: true,
  },
});

async function main() {
  console.log("🌱 Seeding admin user...");

  // Create admin user via Better Auth signup
  const res = await auth.api.signUpEmail({
    body: {
      name: "Abdul Ahad",
      email: "abdulahadafridi@gmail.com",
      password: "admin123456",
    },
  });

  if (res) {
    console.log("✅ Admin user created successfully!");
    console.log("   Email: abdulahadafridi@gmail.com");
    console.log("   Password: admin123456");
    console.log("   ⚠️  Change your password after first login!");
  }

  // Also ensure SiteSettings exist
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

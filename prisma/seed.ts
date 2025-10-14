import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  for (let i = 0; i <= 50; i++) {
    await prisma.post.create({
      data: {
        title: `post${i}`,
        content: `This is the content for post number ${i}.`,
      },
    });
  }
  console.log("50 posts created");
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
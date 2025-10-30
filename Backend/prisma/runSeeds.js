import fs from "fs";
import path from "path";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
    const seedDir = path.resolve("./prisma/seeds");
    const files = fs
        .readdirSync(seedDir)
        .filter((file) => file.endsWith(".js"))
        .sort();

    console.log(`\nRunning ${files.length} seed files...\n`);

    for (const file of files) {
        console.log(`Executing ${file}`);
        const seedModule = await import(`./seeds/${file}`);
        if (typeof seedModule.default === "function") {
            await seedModule.default(prisma);
        } else if (typeof seedModule.main === "function") {
            await seedModule.main(prisma);
        } else {
            console.warn(`${file} does not export a default or main() function`);
        }
    }

    console.log("\nAll seed files executed successfully!");
}

main()
    .catch((e) => {
        console.error("Seed execution failed:", e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });

export default async function (prisma) {
    const roles = ["REGULAR", "STUDENT", "TEACHER", "ADMIN" ];

    for (const name of roles) {
        await prisma.role.upsert({
            where: { name },
            update: {},
            create: { name },
        });
    }

    console.log("Roles seeded");
}

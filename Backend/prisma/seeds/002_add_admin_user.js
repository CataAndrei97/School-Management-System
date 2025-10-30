import bcrypt from "bcryptjs";

export default async function (prisma) {
    const adminRole = await prisma.role.findUnique({ where: { name: "ADMIN" } });

    const password = await bcrypt.hash("Admin123", 10);

    await prisma.user.upsert({
        where: { email: "admin@a.com" },
        update: {},
        create: {
            email: "admin@a.com",
            username: "admin",
            password,
            roleId: adminRole.id,
        },
    });

    console.log("Admin user created");
}

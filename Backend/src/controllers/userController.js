import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const updateUserRole = async (req, res) => {
    try {
        const { userId, roleName } = req.body;

        if (req.user.role.name !== "ADMIN") {
            return res.status(403).json({ message: "Forbidden" });
        }

        const role = await prisma.role.findUnique({ where: { name: roleName } });
        if (!role) {
            return res.status(404).json({ message: "Role not found" });
        }

        const updatedUser = await prisma.user.update({
            where: { id: userId },
            data: { roleId: role.id },
            include: { role: true },
        });

        res.json(updatedUser);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" });
    }
};

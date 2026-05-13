import {prisma} from '../config/prismaClient.js'

export const getAllCategories = async (req, res) => {
    try {
        const categories = await prisma.category.findMany({
            include: {
                accommodations: true
            }
        });
        const result = categories.map(category => ({
            id: category.id,
            name: category.name,
            icon: category.icon,
            numOfAccommodations: category.accommodations.length
        }));

        res.status(200).json(result);
    } catch (error) {
        console.error("Error fetching categories:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

export const createCategory = async (req, res) => {
    const { name, icon } = req.body;
    try {
        const newCategory = await prisma.category.create({
            data: { name, icon },
        });
        res.status(201).json(newCategory);
    } catch (error) {
        console.error("Error creating category:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

export const getCategoryById = async (req, res) => {
    const { id } = req.params;
    try {
        const category = await prisma.category.findUnique({
            where: { id: parseInt(id) },
            include: {
                accommodations: true
            }
        });
        if (!category) {
            return res.status(404).json({ error: "Category not found" });
        }
        res.status(200).json(category);
    } catch (error) {
        console.error("Error fetching category:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

export const deleteCategory = async (req, res) => {
    const {id} = req.params;
    try {
    const category = await prisma.category.findUnique({
      where: { id: parseInt(id) },
    });
    if (!category) {
      return res.status(404).json({ error: "Category not found" });
    }
    await prisma.category.delete({
        where: { id: parseInt(id) },
    });
    res.status(200).json({message: "Category deleted!"});

  } catch (error) {
    console.error("Error deleting category:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
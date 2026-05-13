import {prisma} from '../config/prismaClient.js'

export const createFeature = async (req, res) => {
    const { name, icon } = req.body;
    try {
        const newFeature = await prisma.feature.create({
            data: { name, icon },
        });
        res.status(201).json(newFeature);
    } catch (error) {
        console.error("Error creating feature:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

export const getAllFeatures = async (req, res) => {
    try {
        const features = await prisma.feature.findMany({
            include: {
                accomodations: true
            }
        });
        const result = features.map(feature => ({
            id: feature.id,
            name: feature.name,
            icon: feature.icon,
            numOfAccommodations: feature.accomodations ? feature.accomodations.length : 0
        }));
        res.status(200).json(result);
    } catch (error) {
        console.error("Error fetching features:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}
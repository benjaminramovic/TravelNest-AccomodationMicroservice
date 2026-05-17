import { parse } from 'dotenv';
import imageKit from '../config/imageKit.js';
import {prisma} from '../config/prismaClient.js'


export const getAllAccommodations = async (req, res) => {
  try {
    const accommodations = await prisma.accommodation.findMany({
        include: {
            category: true,
            features: {
                include: {
                    feature: true
                }
            }
        
        }
    });
    const result = accommodations.map(accommodation => ({
        id: accommodation.id,
        name: accommodation.name,
        description: accommodation.description,
        minPrice: accommodation.minPrice,
        address: accommodation.address,
        city: accommodation.city,
        country: accommodation.country,
        rate: accommodation.rate,
        maxGuests: accommodation.maxGuests,
        latitude: accommodation.latitude,
        longitude: accommodation.longitude,
        category: accommodation.category.name,
        features: accommodation.features.map(af => af.feature.name)
    }));

    res.status(200).json(result);
  } catch (error) {
    console.error("Error fetching accommodations:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getAccommodationById = async (req, res) => {
  const { id } = req.params;
  try {
    const accommodation = await prisma.accommodation.findUnique({
      where: { id: parseInt(id) },
    });
    if (!accommodation) {
      return res.status(404).json({ error: "Accommodation not found" });
    }
    res.status(200).json(accommodation);
  } catch (error) {
    console.error("Error fetching accommodation:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const createAccommodation = async (req, res) => {
  const { name, description, minPrice, address, city, country, rate, maxGuests, latitude, longitude, categoryId, featureIds } = req.body;
  try {
    //upload images
    const uploadedImages = await Promise.all(
      req.files.map(async (file) => {
        const result = await imageKit.upload({
          file: file.buffer.toString("base64"), 
          fileName: file.originalname,
          folder: "accommodations"
        });

        return result.url;
      })
    );
    const featuresIdsJson = JSON.parse(featureIds);

    const newAccommodation = await prisma.accommodation.create({
      data: { 
        name, 
        description, 
        minPrice: parseFloat(minPrice), 
        address, 
        city, 
        country, 
        rate: parseFloat(rate), 
        maxGuests: parseInt(maxGuests), 
        latitude: parseFloat(latitude), 
        longitude: parseFloat(longitude), 
        category: {
          connect: {
            id: parseInt(categoryId)
          }
        },
        images: {
          create: uploadedImages.map((url) => ({
            url
           
            
          }))
        },
        features: {
            create: featuresIdsJson.map((featureId) => ({
                feature: {
                    connect: {
                        id: parseInt(featureId)
                    }
                }
            }))
        }
      },
      include: {
        images: true
      }
    });
    res.status(201).json(newAccommodation);
  } catch (error) {
    console.error("Error creating accommodation:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

export const deleteAccommodation = async (req, res) => {
    const {id} = req.params;
    try {
    const accommodation = await prisma.accommodation.findUnique({
      where: { id: parseInt(id) },
    });
    if (!accommodation) {
      return res.status(404).json({ error: "Accommodation not found" });
    }
    await prisma.accommodation.delete({
        where: { id: parseInt(id) },
    });
    res.status(200).json({message: "Accommodation deleted!"});

  } catch (error) {
    console.error("Error deleting accommodation:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
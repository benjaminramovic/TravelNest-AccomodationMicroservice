import imageKit from '../config/imageKit.js';
import {prisma} from '../config/prismaClient.js'

export const getAllRooms = async (req, res) => {
    try {
        const rooms = await prisma.room.findMany({
            include: {
                accommodation: true
            }
        });
        const result = rooms.map(room => ({
            id: room.id,
            name: room.name,
            description: room.description,
            price: room.price,
            availability: room.availability,
            floor: room.floor,
            capacity: room.capacity,
            accommodationName: room.accommodation ? room.accommodation.name : null
        }));
        res.status(200).json(result);
    } catch (error) {
        console.error("Error fetching rooms:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

export const getRoomById = async (req, res) => {
  const { id } = req.params;
  try {
    const room = await prisma.room.findUnique({
      where: { id: parseInt(id) },
    });
    if (!room) {
      return res.status(404).json({ error: "Room not found" });
    }
    res.status(200).json(room);
  } catch (error) {
    console.error("Error fetching room:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const createRoom = async (req, res) => {
  const { name, description, price, availability, floor, capacity, accommodationId } = req.body;
  try {
    //upload images
    const uploadedImages = await Promise.all(
      req.files.map(async (file) => {
        const result = await imageKit.upload({
          file: file.buffer.toString("base64"), 
          fileName: file.originalname,
          folder: "rooms"
        });

        return result.url;
      })
    );
    //const featuresIdsJson = JSON.parse(featureIds);

    const newRoom = await prisma.room.create({
      data: { 
        name, 
        description, 
        price: parseFloat(price), 
        capacity: parseInt(capacity), 
        availability: Boolean(availability), 
        floor: parseInt(floor),
        accommodation: {
          connect: {
            id: parseInt(accommodationId)
          }
        },
        images: {
          create: uploadedImages.map((url) => ({
            url
           
            
          }))
        },
        // features: {
        //     create: featuresIdsJson.map((featureId) => ({
        //         feature: {
        //             connect: {
        //                 id: parseInt(featureId)
        //             }
        //         }
        //     }))
        // }
      },
      include: {
        images: true
      }
    });
    res.status(201).json(newRoom);
  } catch (error) {
    console.error("Error creating room:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

export const deleteRoom = async (req, res) => {
    const {id} = req.params;
    try {
    const room = await prisma.room.findUnique({
      where: { id: parseInt(id) },
    });
    if (!room) {
      return res.status(404).json({ error: "Room not found" });
    }
    await prisma.room.delete({
        where: { id: parseInt(id) },
    });
    res.status(200).json({message: "Room deleted!"});

  } catch (error) {
    console.error("Error deleting room:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}


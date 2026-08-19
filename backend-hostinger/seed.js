import mongoose from "mongoose";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import dns from "node:dns";
import { Product } from "./models/Product.js";
import { Admin } from "./models/Admin.js";

try {
  dns.setServers(["8.8.8.8", "1.1.1.1"]);
} catch (e) {}

dotenv.config();

const initialProducts = [
  // LED Bulbs
  {
    title: "Eveready 9W LED Bulb B22 6500K Cool Day Light (4 Bulbs Value Pack)",
    price: "₹299",
    mrp: "₹499",
    off: "40% off",
    img: "https://doc-duplicator-deluxe.lovable.app/__l5e/assets/product-3.png",
    category: "ledBulbs",
    brand: "Eveready",
    inStock: true,
    isFeatured: true,
  },
  {
    title: "Surya Turbo Inverter Lamp 10W B22 — Upto 4 Hrs Backup, 25000 Hrs Life",
    price: "₹549",
    mrp: "₹899",
    off: "39% off",
    img: "https://doc-duplicator-deluxe.lovable.app/__l5e/assets/product-new-29.png",
    category: "ledBulbs",
    brand: "Surya",
    inStock: true,
  },

  // Torches
  {
    title: "MZ M982 Pro LED Torch 200W High Power Rechargeable Telescopic Zoom",
    price: "₹1,299",
    mrp: "₹1,799",
    off: "28% off",
    img: "https://doc-duplicator-deluxe.lovable.app/__l5e/assets/product-4.png",
    category: "torches",
    brand: "MZ",
    inStock: true,
    isFeatured: true,
  },
  {
    title: "MZ M035-C LED Torch 120 Lumen Rechargeable Long Range Focus Beam",
    price: "₹499",
    mrp: "₹799",
    off: "37% off",
    img: "https://doc-duplicator-deluxe.lovable.app/__l5e/assets/product-5.png",
    category: "torches",
    brand: "MZ",
    inStock: true,
  },
  {
    title: "PowerCell LED Torch 9712B 0.75W Bright White Light",
    price: "₹149",
    mrp: "₹249",
    off: "40% off",
    img: "https://doc-duplicator-deluxe.lovable.app/__l5e/assets/product-8.png",
    category: "torches",
    brand: "PowerCell",
    inStock: true,
  },
  {
    title: "Unibeam Dhurandar LED Torch — Rahe Kare Roshan",
    price: "₹179",
    mrp: "₹299",
    off: "40% off",
    img: "https://doc-duplicator-deluxe.lovable.app/__l5e/assets/product-9.png",
    category: "torches",
    brand: "Unibeam",
    inStock: true,
  },
  {
    title: "Eveready DL40 0.5W Torch — Give Me Red (Free 3 AA Batteries)",
    price: "₹199",
    mrp: "₹299",
    off: "33% off",
    img: "https://doc-duplicator-deluxe.lovable.app/__l5e/assets/product-10.png",
    category: "torches",
    brand: "Eveready",
    inStock: true,
  },
  {
    title: "LAMAT LM-7704 Metal Torch 120W Zooming Head 1200mAh Type-C",
    price: "₹599",
    mrp: "₹999",
    off: "40% off",
    img: "https://doc-duplicator-deluxe.lovable.app/__l5e/assets/product-new-15.png",
    category: "torches",
    brand: "LAMAT",
    inStock: true,
  },
  {
    title: "Ujjwal Kisan 5 Star Rechargeable Torch 68mm Watt Reflector",
    price: "₹899",
    mrp: "₹1,299",
    off: "31% off",
    img: "https://doc-duplicator-deluxe.lovable.app/__l5e/assets/product-new-16.png",
    category: "torches",
    brand: "Ujjwal Kisan",
    inStock: true,
  },
  {
    title: "Mono Onlite Dodo Upgraded Classic Rechargeable Torch (12W + 10W)",
    price: "₹249",
    mrp: "₹399",
    off: "38% off",
    img: "https://doc-duplicator-deluxe.lovable.app/__l5e/assets/product-new-18.png",
    category: "torches",
    brand: "Onlite",
    inStock: true,
  },

  // Kitchen Appliances
  {
    title: "Vioia Portable Geyser — Instant Water Heater for Hard & Soft Water",
    price: "₹1,999",
    mrp: "₹2,999",
    off: "33% off",
    img: "https://doc-duplicator-deluxe.lovable.app/__l5e/assets/product-6.png",
    category: "kitchenAppliances",
    brand: "Vioia",
    inStock: true,
    isFeatured: true,
  },
  {
    title: "Spare King G-Coil Hot Plate 1 Year Warranty — Fast Heating Stainless Steel",
    price: "₹1,850",
    mrp: "₹2,499",
    off: "26% off",
    img: "https://doc-duplicator-deluxe.lovable.app/__l5e/assets/product-7.png",
    category: "kitchenAppliances",
    brand: "Spare King",
    inStock: true,
  },
  {
    title: "BLU Berry Infrared Cooker — Crystal Glass, 4-Digit Display, Time Control",
    price: "₹2,499",
    mrp: "₹3,499",
    off: "29% off",
    img: "https://doc-duplicator-deluxe.lovable.app/__l5e/assets/product-new-12.png",
    category: "kitchenAppliances",
    brand: "BLU Berry",
    inStock: true,
  },
  {
    title: "Fortuner Electric Immersion Water Heater — Shockproof (1 Year Warranty)",
    price: "₹499",
    mrp: "₹799",
    off: "38% off",
    img: "https://doc-duplicator-deluxe.lovable.app/__l5e/assets/product-new-17.png",
    category: "kitchenAppliances",
    brand: "Fortuner",
    inStock: true,
  },
  {
    title: "BLU BL-102 Fan Heater — Winter Solution (1 Year Warranty)",
    price: "₹1,299",
    mrp: "₹1,999",
    off: "35% off",
    img: "https://doc-duplicator-deluxe.lovable.app/__l5e/assets/product-new-21.png",
    category: "kitchenAppliances",
    brand: "BLU",
    inStock: true,
  },
  {
    title: "Standard Etna Pro Immersion Heater 1500W — 2 Year Warranty",
    price: "₹599",
    mrp: "₹899",
    off: "33% off",
    img: "https://doc-duplicator-deluxe.lovable.app/__l5e/assets/product-new-30.png",
    category: "kitchenAppliances",
    brand: "Standard",
    inStock: true,
  },
  {
    title: "Surya Sizzle Storage Water Heater / Geyser — Power Saver",
    price: "₹6,499",
    mrp: "₹8,999",
    off: "28% off",
    img: "https://doc-duplicator-deluxe.lovable.app/__l5e/assets/product-new-31.png",
    category: "kitchenAppliances",
    brand: "Surya",
    inStock: true,
  },

  // Street Lights & Heavy Lighting
  {
    title: "Reliable Evoke LED Street Light 36W IP65 Streetlight",
    price: "₹1,499",
    mrp: "₹2,199",
    off: "32% off",
    img: "https://doc-duplicator-deluxe.lovable.app/__l5e/assets/product-11.png",
    category: "streetLights",
    brand: "Reliable",
    inStock: true,
  },
  {
    title: "Reliable Evoke LED Street Light 50W IP65 Streetlight",
    price: "₹1,899",
    mrp: "₹2,699",
    off: "30% off",
    img: "https://doc-duplicator-deluxe.lovable.app/__l5e/assets/product-11.png",
    category: "streetLights",
    brand: "Reliable",
    inStock: true,
  },
  {
    title: "Reliable 100W LED Streetlight IP65 — 50,000+ Hours Life Span",
    price: "₹2,899",
    mrp: "₹3,999",
    off: "28% off",
    img: "https://doc-duplicator-deluxe.lovable.app/__l5e/assets/product-11.png",
    category: "streetLights",
    brand: "Reliable",
    inStock: true,
  },
  {
    title: "Sturmax 50W LED Flood Light IP66 — Outdoor Weatherproof",
    price: "₹1,199",
    mrp: "₹1,799",
    off: "33% off",
    img: "https://doc-duplicator-deluxe.lovable.app/__l5e/assets/product-new-19.png",
    category: "streetLights",
    brand: "Sturmax",
    inStock: true,
  },

  // Fans
  {
    title: "Fortuner Rockey 2.0 Pro Ceiling Fan 1200mm (48\") Smoke Brown — 405 RPM, 2 Year Warranty",
    price: "₹1,999",
    mrp: "₹2,899",
    off: "31% off",
    img: "https://doc-duplicator-deluxe.lovable.app/__l5e/assets/product-new-13.png",
    category: "fans",
    brand: "Fortuner",
    inStock: true,
  },
  {
    title: "BLU Mini Hanging Motor Fan — High Speed, CRC Stamping, Aerodynamic Blades",
    price: "₹1,299",
    mrp: "₹1,799",
    off: "28% off",
    img: "https://doc-duplicator-deluxe.lovable.app/__l5e/assets/product-new-22.png",
    category: "fans",
    brand: "BLU",
    inStock: true,
  },

  // Speakers / Announce
  {
    title: "Rock Light S182-D Megaphone Bhopu 300W — 16 Voice, Bluetooth, USB, Double Battery",
    price: "₹2,199",
    mrp: "₹2,999",
    off: "27% off",
    img: "https://doc-duplicator-deluxe.lovable.app/__l5e/assets/product-new-14.png",
    category: "speakers",
    brand: "Rock Light",
    inStock: true,
  },

  // Cooler Motors
  {
    title: "Nerco 1\" Popular Cooler Motor with Ring — 105W, Powder Coated (1 Season Warranty)",
    price: "₹1,449",
    mrp: "₹1,999",
    off: "28% off",
    img: "https://doc-duplicator-deluxe.lovable.app/__l5e/assets/product-new-20.png",
    category: "coolerParts",
    brand: "Nerco",
    inStock: true,
  },

  // DTH / Set Top Box
  {
    title: "BlueSky Digital Set Top Box — Direct to Home HD DVB Receiver with Remote",
    price: "₹1,199",
    mrp: "₹1,799",
    off: "33% off",
    img: "https://doc-duplicator-deluxe.lovable.app/__l5e/assets/product-new-23.png",
    category: "dthDevices",
    brand: "BlueSky",
    inStock: true,
  },

  // Decorative Lights
  {
    title: "LED Fairy String Lights — Warm White, Long Wire Rice Lights for Decoration",
    price: "₹199",
    mrp: "₹399",
    off: "50% off",
    img: "https://doc-duplicator-deluxe.lovable.app/__l5e/assets/product-new-24.png",
    category: "decorLights",
    brand: "General",
    inStock: true,
  },

  // Electrical Accessories
  {
    title: "Eveready Everprotect Neo X2 Spike Guard — Fire Retardant, 2m Wire, 4 Sockets",
    price: "₹649",
    mrp: "₹899",
    off: "27% off",
    img: "https://doc-duplicator-deluxe.lovable.app/__l5e/assets/product-new-25.png",
    category: "electricalAccessories",
    brand: "Eveready",
    inStock: true,
  },

  // Automotive Engine Oils
  {
    title: "Havnol Force 15W40 API CI-4 Diesel Engine Oil — Heavy Duty (1 L)",
    price: "₹399",
    mrp: "₹549",
    off: "27% off",
    img: "https://doc-duplicator-deluxe.lovable.app/__l5e/assets/product-new-26.png",
    category: "engineOils",
    brand: "Havnol",
    inStock: true,
  },
  {
    title: "Castrol Activ 20W40 4T Motorcycle Engine Oil — Actibond Technology (1 L)",
    price: "₹499",
    mrp: "₹650",
    off: "23% off",
    img: "https://doc-duplicator-deluxe.lovable.app/__l5e/assets/product-new-27.png",
    category: "engineOils",
    brand: "Castrol",
    inStock: true,
  },
  {
    title: "Servo Pride TC 15W-40 Premium Diesel Engine Oil — API CH-4 (3 L)",
    price: "₹1,299",
    mrp: "₹1,650",
    off: "21% off",
    img: "https://doc-duplicator-deluxe.lovable.app/__l5e/assets/product-new-28.png",
    category: "engineOils",
    brand: "Servo",
    inStock: true,
  },
];

const seedDB = async () => {
  try {
    console.log("Connecting to MongoDB Atlas...");
    await mongoose.connect(process.env.MONGODB_URI, {
      serverSelectionTimeoutMS: 5000,
    });
    console.log("Connected to MongoDB Atlas!");

    let addedCount = 0;
    for (const prod of initialProducts) {
      const res = await Product.updateOne(
        { title: prod.title },
        { $setOnInsert: prod },
        { upsert: true }
      );
      if (res.upsertedCount > 0) addedCount++;
    }
    console.log(`✅ Upserted ${initialProducts.length} items (${addedCount} newly added to MongoDB)!`);

    // Ensure Admin account exists
    const username = process.env.ADMIN_USERNAME || "admin";
    const password = process.env.ADMIN_PASSWORD || "admin123";
    const existingAdmin = await Admin.findOne({ username });
    if (!existingAdmin) {
      const hashedPassword = await bcrypt.hash(password, 10);
      await Admin.create({ username, password: hashedPassword });
      console.log(`✅ Created Admin user: '${username}'`);
    }

    console.log("🎉 Seeding & Sync Complete!");
    process.exit(0);
  } catch (error) {
    console.error("❌ Error seeding database:", error);
    process.exit(1);
  }
};

seedDB();

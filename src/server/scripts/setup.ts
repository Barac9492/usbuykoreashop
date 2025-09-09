import { db } from "~/server/db";
import bcrypt from "bcryptjs";
import { priceUpdateAgent } from "~/server/agents/priceUpdateAgent";

async function setup() {
  console.log("Starting database setup...");

  // First, clean up all existing data to ensure only K-cosmetics remain
  console.log("Cleaning up existing database data...");
  
  // Delete records in the correct order to respect foreign key constraints
  // Start with records that have the most dependencies and work backwards
  await db.escrowTransaction.deleteMany({});
  await db.purchaseRequest.deleteMany({});
  await db.shopperProfile.deleteMany({});
  await db.productPrice.deleteMany({});
  await db.product.deleteMany({});
  await db.category.deleteMany({});
  await db.user.deleteMany({});
  await db.store.deleteMany({});
  
  console.log("Database cleaned up successfully!");

  // Create categories (ONLY COSMETICS/K-BEAUTY)
  const cosmeticsCategory = await db.category.upsert({
    where: { name: "Cosmetics" },
    update: {},
    create: {
      name: "Cosmetics",
      description: "K-beauty and cosmetics products from Korea",
    },
  });

  // Create stores (Focus on Korean stores and US equivalents)
  const sephoraUS = await db.store.upsert({
    where: { name: "Sephora US" },
    update: {},
    create: {
      name: "Sephora US",
      country: "US",
      website: "https://sephora.com",
      logoUrl: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=100&h=100&fit=crop&crop=center",
    },
  });

  const ultaUS = await db.store.upsert({
    where: { name: "Ulta Beauty" },
    update: {},
    create: {
      name: "Ulta Beauty",
      country: "US",
      website: "https://ulta.com",
      logoUrl: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=100&h=100&fit=crop&crop=center",
    },
  });

  const oliveYoungKR = await db.store.upsert({
    where: { name: "Olive Young" },
    update: {},
    create: {
      name: "Olive Young",
      country: "Korea",
      website: "https://oliveyoung.co.kr",
      logoUrl: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=100&h=100&fit=crop&crop=center",
    },
  });

  const coupangKR = await db.store.upsert({
    where: { name: "Coupang" },
    update: {},
    create: {
      name: "Coupang",
      country: "Korea",
      website: "https://coupang.com",
      logoUrl: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=100&h=100&fit=crop&crop=center",
    },
  });

  const gmarketKR = await db.store.upsert({
    where: { name: "Gmarket" },
    update: {},
    create: {
      name: "Gmarket",
      country: "Korea",
      website: "https://gmarket.co.kr",
      logoUrl: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=100&h=100&fit=crop&crop=center",
    },
  });

  // Create comprehensive K-beauty product catalog
  const products = [
    // Cleansers
    {
      id: 1,
      name: "COSRX Low pH Good Morning Gel Cleanser",
      description: "Gentle morning cleanser with tea tree oil and BHA. Perfect for sensitive skin, maintains skin's natural pH balance while removing impurities.",
      imageUrl: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=400&h=400&fit=crop&crop=center",
      brand: "COSRX",
      model: "Low pH Good Morning Gel Cleanser",
    },
    {
      id: 2,
      name: "Banila Co Clean It Zero Cleansing Balm",
      description: "Sherbet-textured cleansing balm that melts away makeup and sunscreen. Contains papaya extract for gentle exfoliation.",
      imageUrl: "https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=400&h=400&fit=crop&crop=center",
      brand: "Banila Co",
      model: "Clean It Zero Original",
    },
    {
      id: 3,
      name: "The Face Shop Rice Water Bright Cleansing Foam",
      description: "Rich foaming cleanser with rice water that brightens and purifies skin while maintaining moisture balance.",
      imageUrl: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=400&fit=crop&crop=center",
      brand: "The Face Shop",
      model: "Rice Water Bright Cleansing Foam",
    },

    // Toners & Essences
    {
      id: 4,
      name: "COSRX Snail 96 Mucin Power Essence",
      description: "Highly concentrated snail secretion filtrate essence for skin repair and hydration. Helps with acne scars and skin texture.",
      imageUrl: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=400&h=400&fit=crop&crop=center",
      brand: "COSRX",
      model: "Snail 96 Mucin Power Essence",
    },
    {
      id: 5,
      name: "Klairs Supple Preparation Facial Toner",
      description: "Alcohol-free toner with hyaluronic acid and beta-glucan. Deeply hydrates and prepares skin for next skincare steps.",
      imageUrl: "https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=400&h=400&fit=crop&crop=center",
      brand: "Klairs",
      model: "Supple Preparation Facial Toner",
    },
    {
      id: 6,
      name: "Missha Time Revolution First Treatment Essence",
      description: "Fermented yeast extract essence that improves skin texture and radiance. Often called the 'affordable SK-II alternative'.",
      imageUrl: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=400&fit=crop&crop=center",
      brand: "Missha",
      model: "Time Revolution First Treatment Essence",
    },

    // Serums & Treatments
    {
      id: 7,
      name: "The Ordinary Niacinamide 10% + Zinc 1%",
      description: "High-strength vitamin B3 serum that reduces appearance of blemishes and congestion. Regulates sebum production.",
      imageUrl: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=400&h=400&fit=crop&crop=center",
      brand: "The Ordinary",
      model: "Niacinamide 10% + Zinc 1%",
    },
    {
      id: 8,
      name: "Some By Mi Red Tea Tree Spot Treatment",
      description: "Targeted treatment for blemishes with red tea tree extract and niacinamide. Calms irritation and reduces redness.",
      imageUrl: "https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=400&h=400&fit=crop&crop=center",
      brand: "Some By Mi",
      model: "Red Tea Tree Spot Treatment",
    },
    {
      id: 9,
      name: "Purito Vitamin C Serum",
      description: "Gentle vitamin C serum with niacinamide and sodium hyaluronate. Brightens skin without irritation.",
      imageUrl: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=400&fit=crop&crop=center",
      brand: "Purito",
      model: "Vitamin C Serum",
    },

    // Moisturizers
    {
      id: 10,
      name: "Laneige Water Sleeping Mask",
      description: "Overnight hydrating mask with Hydro Ionized Mineral Water. Delivers intense moisture while you sleep.",
      imageUrl: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=400&h=400&fit=crop&crop=center",
      brand: "Laneige",
      model: "Water Sleeping Mask",
    },
    {
      id: 11,
      name: "Beauty of Joseon Dynasty Cream",
      description: "Rich anti-aging cream with traditional Korean herbal ingredients including ginseng and orchid extract.",
      imageUrl: "https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=400&h=400&fit=crop&crop=center",
      brand: "Beauty of Joseon",
      model: "Dynasty Cream",
    },
    {
      id: 12,
      name: "Etude House SoonJung 2x Barrier Intensive Cream",
      description: "Gentle moisturizer for sensitive skin with madecassoside and panthenol. Strengthens skin barrier.",
      imageUrl: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=400&fit=crop&crop=center",
      brand: "Etude House",
      model: "SoonJung 2x Barrier Intensive Cream",
    },

    // Sunscreens
    {
      id: 13,
      name: "Beauty of Joseon Relief Sun Rice + Probiotics",
      description: "Chemical sunscreen SPF50+ PA++++ with rice bran and probiotics. Lightweight, non-greasy formula.",
      imageUrl: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=400&h=400&fit=crop&crop=center",
      brand: "Beauty of Joseon",
      model: "Relief Sun Rice + Probiotics SPF50+",
    },
    {
      id: 14,
      name: "Purito Daily Go-To Sunscreen",
      description: "Broad spectrum SPF50+ PA++++ sunscreen with hyaluronic acid. Perfect for daily use under makeup.",
      imageUrl: "https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=400&h=400&fit=crop&crop=center",
      brand: "Purito",
      model: "Daily Go-To Sunscreen SPF50+",
    },
    {
      id: 15,
      name: "Innisfree Daily UV Defense Sunscreen",
      description: "Mineral sunscreen with Jeju green tea extract. Provides broad spectrum protection without white cast.",
      imageUrl: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=400&fit=crop&crop=center",
      brand: "Innisfree",
      model: "Daily UV Defense Sunscreen SPF50+",
    },

    // Masks & Treatments
    {
      id: 16,
      name: "Dr. Jart+ Cicapair Tiger Grass Mask",
      description: "Soothing sheet mask with centella asiatica to calm irritated and sensitive skin. Reduces redness instantly.",
      imageUrl: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=400&h=400&fit=crop&crop=center",
      brand: "Dr. Jart+",
      model: "Cicapair Tiger Grass Mask",
    },
    {
      id: 17,
      name: "Holika Holika Pure Essence Mask Sheet",
      description: "Variety pack of essence-soaked sheet masks targeting different skin concerns with natural ingredients.",
      imageUrl: "https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=400&h=400&fit=crop&crop=center",
      brand: "Holika Holika",
      model: "Pure Essence Mask Sheet",
    },
    {
      id: 18,
      name: "Skinfood Black Sugar Mask Wash Off",
      description: "Exfoliating mask with black sugar that removes dead skin cells while moisturizing with botanical oils.",
      imageUrl: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=400&fit=crop&crop=center",
      brand: "Skinfood",
      model: "Black Sugar Mask Wash Off",
    },

    // Premium Products
    {
      id: 19,
      name: "Sulwhasoo First Care Activating Serum",
      description: "Luxury Korean skincare with traditional herbal ingredients. Activates skin's natural renewal process.",
      imageUrl: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=400&h=400&fit=crop&crop=center",
      brand: "Sulwhasoo",
      model: "First Care Activating Serum",
    },
    {
      id: 20,
      name: "Whoo Gongjinhyang Essential Moisturizing Balancer",
      description: "Premium anti-aging toner with royal court beauty secrets. Contains deer antler and wild ginseng extracts.",
      imageUrl: "https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=400&h=400&fit=crop&crop=center",
      brand: "The History of Whoo",
      model: "Gongjinhyang Essential Moisturizing Balancer",
    },

    // Makeup
    {
      id: 21,
      name: "Etude House Dear Darling Water Gel Tint",
      description: "Long-lasting water gel lip tint with vibrant color payoff. Lightweight formula that doesn't dry out lips.",
      imageUrl: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=400&fit=crop&crop=center",
      brand: "Etude House",
      model: "Dear Darling Water Gel Tint",
    },
    {
      id: 22,
      name: "Missha M Perfect Cover BB Cream",
      description: "Full coverage BB cream with SPF42 PA+++. Provides natural coverage while treating skin with botanical extracts.",
      imageUrl: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=400&h=400&fit=crop&crop=center",
      brand: "Missha",
      model: "M Perfect Cover BB Cream",
    },
    {
      id: 23,
      name: "3CE Multi Eye Color Palette",
      description: "Versatile eyeshadow palette with highly pigmented shades. Perfect for creating both natural and dramatic looks.",
      imageUrl: "https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=400&h=400&fit=crop&crop=center",
      brand: "3CE",
      model: "Multi Eye Color Palette",
    },

    // Hair Care
    {
      id: 24,
      name: "Mise En Scene Perfect Serum",
      description: "Hair treatment serum with argan oil and camellia oil. Repairs damaged hair and adds shine without greasiness.",
      imageUrl: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=400&fit=crop&crop=center",
      brand: "Mise En Scene",
      model: "Perfect Serum",
    },
    {
      id: 25,
      name: "Nature Republic Argan Essential Deep Care Hair Pack",
      description: "Intensive hair mask with Moroccan argan oil. Deeply nourishes dry and damaged hair for silky smoothness.",
      imageUrl: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=400&h=400&fit=crop&crop=center",
      brand: "Nature Republic",
      model: "Argan Essential Deep Care Hair Pack",
    },
  ];

  // Create all products
  const createdProducts = [];
  for (const productData of products) {
    const product = await db.product.upsert({
      where: { id: productData.id },
      update: {},
      create: {
        id: productData.id,
        name: productData.name,
        description: productData.description,
        imageUrl: productData.imageUrl,
        brand: productData.brand,
        model: productData.model,
        categoryId: cosmeticsCategory.id,
      },
    });
    createdProducts.push(product);
  }

  // Create comprehensive price data with realistic Korean vs US pricing
  const priceData = [
    // Cleansers
    { productId: 1, country: "US", price: 12, currency: "USD", storeId: sephoraUS.id, url: "https://sephora.com/cosrx-low-ph-cleanser" },
    { productId: 1, country: "Korea", price: 7500, currency: "KRW", storeId: oliveYoungKR.id, url: "https://oliveyoung.co.kr/cosrx-cleanser" }, // ~$5.64

    { productId: 2, country: "US", price: 22, currency: "USD", storeId: ultaUS.id, url: "https://ulta.com/banila-co-clean-it-zero" },
    { productId: 2, country: "Korea", price: 16000, currency: "KRW", storeId: oliveYoungKR.id, url: "https://oliveyoung.co.kr/banila-co" }, // ~$12.03

    { productId: 3, country: "US", price: 8, currency: "USD", storeId: ultaUS.id, url: "https://ulta.com/face-shop-rice-water" },
    { productId: 3, country: "Korea", price: 4500, currency: "KRW", storeId: oliveYoungKR.id, url: "https://oliveyoung.co.kr/thefaceshop" }, // ~$3.38

    // Toners & Essences
    { productId: 4, country: "US", price: 25, currency: "USD", storeId: ultaUS.id, url: "https://ulta.com/cosrx-snail-mucin" },
    { productId: 4, country: "Korea", price: 12000, currency: "KRW", storeId: oliveYoungKR.id, url: "https://oliveyoung.co.kr/cosrx-snail" }, // ~$9.02

    { productId: 5, country: "US", price: 16, currency: "USD", storeId: sephoraUS.id, url: "https://sephora.com/klairs-toner" },
    { productId: 5, country: "Korea", price: 9500, currency: "KRW", storeId: oliveYoungKR.id, url: "https://oliveyoung.co.kr/klairs" }, // ~$7.14

    { productId: 6, country: "US", price: 35, currency: "USD", storeId: sephoraUS.id, url: "https://sephora.com/missha-first-treatment" },
    { productId: 6, country: "Korea", price: 18000, currency: "KRW", storeId: oliveYoungKR.id, url: "https://oliveyoung.co.kr/missha" }, // ~$13.53

    // Serums & Treatments
    { productId: 7, country: "US", price: 7, currency: "USD", storeId: ultaUS.id, url: "https://ulta.com/ordinary-niacinamide" },
    { productId: 7, country: "Korea", price: 4200, currency: "KRW", storeId: coupangKR.id, url: "https://coupang.com/ordinary-niacinamide" }, // ~$3.16

    { productId: 8, country: "US", price: 14, currency: "USD", storeId: ultaUS.id, url: "https://ulta.com/some-by-mi-spot" },
    { productId: 8, country: "Korea", price: 8500, currency: "KRW", storeId: oliveYoungKR.id, url: "https://oliveyoung.co.kr/somebymi" }, // ~$6.39

    { productId: 9, country: "US", price: 18, currency: "USD", storeId: sephoraUS.id, url: "https://sephora.com/purito-vitamin-c" },
    { productId: 9, country: "Korea", price: 11000, currency: "KRW", storeId: oliveYoungKR.id, url: "https://oliveyoung.co.kr/purito" }, // ~$8.27

    // Moisturizers
    { productId: 10, country: "US", price: 34, currency: "USD", storeId: sephoraUS.id, url: "https://sephora.com/laneige-sleeping-mask" },
    { productId: 10, country: "Korea", price: 18000, currency: "KRW", storeId: oliveYoungKR.id, url: "https://oliveyoung.co.kr/laneige" }, // ~$13.53

    { productId: 11, country: "US", price: 18, currency: "USD", storeId: ultaUS.id, url: "https://ulta.com/beauty-of-joseon-cream" },
    { productId: 11, country: "Korea", price: 8000, currency: "KRW", storeId: oliveYoungKR.id, url: "https://oliveyoung.co.kr/beauty-of-joseon" }, // ~$6.02

    { productId: 12, country: "US", price: 13, currency: "USD", storeId: ultaUS.id, url: "https://ulta.com/etude-house-soonjung" },
    { productId: 12, country: "Korea", price: 7200, currency: "KRW", storeId: oliveYoungKR.id, url: "https://oliveyoung.co.kr/etudehouse" }, // ~$5.41

    // Sunscreens
    { productId: 13, country: "US", price: 15, currency: "USD", storeId: ultaUS.id, url: "https://ulta.com/beauty-joseon-sunscreen" },
    { productId: 13, country: "Korea", price: 8800, currency: "KRW", storeId: oliveYoungKR.id, url: "https://oliveyoung.co.kr/beauty-joseon-sun" }, // ~$6.62

    { productId: 14, country: "US", price: 12, currency: "USD", storeId: sephoraUS.id, url: "https://sephora.com/purito-sunscreen" },
    { productId: 14, country: "Korea", price: 6500, currency: "KRW", storeId: oliveYoungKR.id, url: "https://oliveyoung.co.kr/purito-sun" }, // ~$4.89

    { productId: 15, country: "US", price: 16, currency: "USD", storeId: sephoraUS.id, url: "https://sephora.com/innisfree-sunscreen" },
    { productId: 15, country: "Korea", price: 9200, currency: "KRW", storeId: oliveYoungKR.id, url: "https://oliveyoung.co.kr/innisfree-sun" }, // ~$6.92

    // Masks & Treatments
    { productId: 16, country: "US", price: 7, currency: "USD", storeId: sephoraUS.id, url: "https://sephora.com/dr-jart-cicapair-mask" },
    { productId: 16, country: "Korea", price: 3500, currency: "KRW", storeId: oliveYoungKR.id, url: "https://oliveyoung.co.kr/drjart" }, // ~$2.63

    { productId: 17, country: "US", price: 15, currency: "USD", storeId: ultaUS.id, url: "https://ulta.com/holika-holika-masks" },
    { productId: 17, country: "Korea", price: 8000, currency: "KRW", storeId: oliveYoungKR.id, url: "https://oliveyoung.co.kr/holika-holika" }, // ~$6.02

    { productId: 18, country: "US", price: 10, currency: "USD", storeId: ultaUS.id, url: "https://ulta.com/skinfood-black-sugar" },
    { productId: 18, country: "Korea", price: 5500, currency: "KRW", storeId: oliveYoungKR.id, url: "https://oliveyoung.co.kr/skinfood" }, // ~$4.14

    // Premium Products
    { productId: 19, country: "US", price: 85, currency: "USD", storeId: sephoraUS.id, url: "https://sephora.com/sulwhasoo-serum" },
    { productId: 19, country: "Korea", price: 65000, currency: "KRW", storeId: oliveYoungKR.id, url: "https://oliveyoung.co.kr/sulwhasoo" }, // ~$48.87

    { productId: 20, country: "US", price: 120, currency: "USD", storeId: sephoraUS.id, url: "https://sephora.com/whoo-balancer" },
    { productId: 20, country: "Korea", price: 85000, currency: "KRW", storeId: gmarketKR.id, url: "https://gmarket.co.kr/whoo" }, // ~$63.91

    // Makeup
    { productId: 21, country: "US", price: 6, currency: "USD", storeId: ultaUS.id, url: "https://ulta.com/etude-house-lip-tint" },
    { productId: 21, country: "Korea", price: 3200, currency: "KRW", storeId: oliveYoungKR.id, url: "https://oliveyoung.co.kr/etudehouse-tint" }, // ~$2.41

    { productId: 22, country: "US", price: 16, currency: "USD", storeId: ultaUS.id, url: "https://ulta.com/missha-bb-cream" },
    { productId: 22, country: "Korea", price: 8500, currency: "KRW", storeId: oliveYoungKR.id, url: "https://oliveyoung.co.kr/missha-bb" }, // ~$6.39

    { productId: 23, country: "US", price: 28, currency: "USD", storeId: sephoraUS.id, url: "https://sephora.com/3ce-eyeshadow-palette" },
    { productId: 23, country: "Korea", price: 18000, currency: "KRW", storeId: oliveYoungKR.id, url: "https://oliveyoung.co.kr/3ce" }, // ~$13.53

    // Hair Care
    { productId: 24, country: "US", price: 12, currency: "USD", storeId: ultaUS.id, url: "https://ulta.com/mise-en-scene-serum" },
    { productId: 24, country: "Korea", price: 6800, currency: "KRW", storeId: oliveYoungKR.id, url: "https://oliveyoung.co.kr/mise-en-scene" }, // ~$5.11

    { productId: 25, country: "US", price: 8, currency: "USD", storeId: ultaUS.id, url: "https://ulta.com/nature-republic-hair-pack" },
    { productId: 25, country: "Korea", price: 4200, currency: "KRW", storeId: oliveYoungKR.id, url: "https://oliveyoung.co.kr/nature-republic" }, // ~$3.16
  ];

  for (const price of priceData) {
    await db.productPrice.create({
      data: {
        productId: price.productId,
        country: price.country,
        price: price.price,
        currency: price.currency,
        storeId: price.storeId,
        productUrl: price.url,
        isAvailable: true,
      },
    });
  }

  // Create sample users for testing
  const hashedPassword = await bcrypt.hash("password123", 10);

  // Sample US buyer
  const buyer = await db.user.upsert({
    where: { email: "buyer@example.com" },
    update: {},
    create: {
      email: "buyer@example.com",
      passwordHash: hashedPassword,
      role: "buyer",
      status: "verified",
      firstName: "Sarah",
      lastName: "Johnson",
      phoneNumber: "+1-555-0123",
      country: "US",
    },
  });

  // Sample Korean shopper
  const shopper = await db.user.upsert({
    where: { email: "shopper@example.com" },
    update: {},
    create: {
      email: "shopper@example.com",
      passwordHash: hashedPassword,
      role: "shopper",
      status: "verified",
      firstName: "김",
      lastName: "민수",
      phoneNumber: "+82-10-1234-5678",
      country: "Korea",
    },
  });

  // Create shopper profile
  await db.shopperProfile.upsert({
    where: { userId: shopper.id },
    update: {},
    create: {
      userId: shopper.id,
      applicationStatus: "approved",
      koreanAddress: "서울특별시 강남구 테헤란로 123",
      koreanPhoneNumber: "+82-10-1234-5678",
      identityVerified: true,
      rating: 4.8,
      completedPurchases: 25,
      approvedAt: new Date(),
    },
  });

  // Create Korean shopper profiles to match the avatar selection
  const koreanShoppers = [
    {
      email: "jimin.kbeauty@seoul.kr",
      firstName: "지민",
      lastName: "김",
      personality: "K-Beauty Enthusiast", 
      specialty: "Skincare & Cosmetics",
      description: "Obsessed with the latest K-beauty trends and knows every Olive Young secret!",
      rating: 4.9,
      completedPurchases: 156,
      koreanAddress: "서울특별시 중구 명동길 74",
      koreanPhone: "+82-10-2345-6789"
    },
    {
      email: "hyunwoo.market@seoul.kr", 
      firstName: "현우",
      lastName: "박",
      personality: "Savvy Market Navigator",
      specialty: "Fashion & Accessories", 
      description: "Master of finding the best deals in Seoul's bustling markets and underground shops.",
      rating: 4.8,
      completedPurchases: 203,
      koreanAddress: "서울특별시 중구 동대문시장길 30",
      koreanPhone: "+82-10-3456-7890"
    },
    {
      email: "subin.culture@seoul.kr",
      firstName: "수빈", 
      lastName: "이",
      personality: "Culture Connector",
      specialty: "Cultural Items & Gifts",
      description: "Bridges Korean culture with modern trends, specializing in traditional meets contemporary.",
      rating: 4.9,
      completedPurchases: 89,
      koreanAddress: "서울특별시 종로구 인사동길 12", 
      koreanPhone: "+82-10-4567-8901"
    },
    {
      email: "minjae.tech@seoul.kr",
      firstName: "민재",
      lastName: "최", 
      personality: "Tech Trendsetter",
      specialty: "Tech & Lifestyle",
      description: "Always first to discover the latest Korean tech gadgets and lifestyle innovations.",
      rating: 4.7,
      completedPurchases: 134,
      koreanAddress: "서울특별시 강남구 테헤란로 152",
      koreanPhone: "+82-10-5678-9012"
    }
  ];

  for (const shopperData of koreanShoppers) {
    const shopperUser = await db.user.upsert({
      where: { email: shopperData.email },
      update: {},
      create: {
        email: shopperData.email,
        passwordHash: hashedPassword,
        role: "shopper",
        status: "verified", 
        firstName: shopperData.firstName,
        lastName: shopperData.lastName,
        phoneNumber: shopperData.koreanPhone,
        country: "Korea",
      },
    });

    await db.shopperProfile.upsert({
      where: { userId: shopperUser.id },
      update: {},
      create: {
        userId: shopperUser.id,
        applicationStatus: "approved",
        koreanAddress: shopperData.koreanAddress,
        koreanPhoneNumber: shopperData.koreanPhone,
        identityVerified: true,
        rating: shopperData.rating,
        completedPurchases: shopperData.completedPurchases,
        vettingNotes: `${shopperData.personality} - ${shopperData.specialty}. ${shopperData.description}`,
        approvedAt: new Date(),
      },
    });
  }

  // Sample purchase request
  const purchaseRequest = await db.purchaseRequest.create({
    data: {
      buyerId: buyer.id,
      productId: createdProducts[9].id, // Laneige Water Sleeping Mask
      shopperId: shopper.id,
      quantity: 2,
      maxPriceUSD: 30,
      specialInstructions: "Please include gift receipt and bubble wrap carefully",
      status: "accepted",
      legalNoticeAcknowledged: true,
      shopperLegalAcknowledged: true,
      acceptedAt: new Date(),
    },
  });

  // Sample escrow transaction
  await db.escrowTransaction.create({
    data: {
      purchaseRequestId: purchaseRequest.id,
      buyerId: buyer.id,
      shopperId: shopper.id,
      depositAmount: 30,
      serviceFee: 3,
      shippingFee: 12,
      totalAmount: 45,
      status: "deposited",
      paymentMethod: "credit_card",
    },
  });

  console.log("Database setup completed successfully!");
  console.log("Sample accounts created:");
  console.log("- Buyer: buyer@example.com / password123");
  console.log("- Shopper: shopper@example.com / password123");
  console.log("- Korean Shoppers: jimin.kbeauty@seoul.kr, hyunwoo.market@seoul.kr, subin.culture@seoul.kr, minjae.tech@seoul.kr / password123");

  // Start the price update agent
  console.log("Starting price update agent...");
  priceUpdateAgent.start();
  console.log("Price update agent started - will update product prices every 2 hours");
}

setup()
  .then(() => {
    console.log("setup.ts complete");
    process.exit(0);
  })
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

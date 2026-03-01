-- Seed Price History Data
-- Run this in Supabase SQL Editor to populate price history
-- Based on your Excel data with price changes over time

-- January 1, 2026 - Initial Prices
INSERT INTO price_history (product_id, price, effective_from) VALUES
-- Biscuits
((SELECT id FROM products WHERE name='Bingo' AND category='Biscuits' LIMIT 1), 7.00, '2026-01-01'),
((SELECT id FROM products WHERE name='Breadstix' AND category='Biscuits' LIMIT 1), 8.00, '2026-01-01'),
((SELECT id FROM products WHERE name='Combi' AND category='Biscuits' LIMIT 1), 8.00, '2026-01-01'),
((SELECT id FROM products WHERE name='Cream-O' AND category='Biscuits' LIMIT 1), 9.00, '2026-01-01'),
((SELECT id FROM products WHERE name='Dowee Donut' AND category='Biscuits' LIMIT 1), 11.00, '2026-01-01'),
((SELECT id FROM products WHERE name='Eggnog' AND category='Biscuits' LIMIT 1), 8.00, '2026-01-01'),
((SELECT id FROM products WHERE name='Fita' AND category='Biscuits' LIMIT 1), 8.00, '2026-01-01'),
((SELECT id FROM products WHERE name='Fudgee Bar' AND category='Biscuits' LIMIT 1), 9.00, '2026-01-01'),
((SELECT id FROM products WHERE name='Hansel' AND category='Biscuits' LIMIT 1), 8.00, '2026-01-01'),
((SELECT id FROM products WHERE name='HI-RO' AND category='Biscuits' LIMIT 1), 8.00, '2026-01-01'),
((SELECT id FROM products WHERE name='Magic Chips' AND category='Biscuits' LIMIT 1), 9.00, '2026-01-01'),
((SELECT id FROM products WHERE name='Oreo' AND category='Biscuits' LIMIT 1), 9.00, '2026-01-01'),
((SELECT id FROM products WHERE name='Presto' AND category='Biscuits' LIMIT 1), 8.00, '2026-01-01'),
((SELECT id FROM products WHERE name='Pretzels' AND category='Biscuits' LIMIT 1), 9.00, '2026-01-01'),
((SELECT id FROM products WHERE name='Rebisco' AND category='Biscuits' LIMIT 1), 8.00, '2026-01-01'),
((SELECT id FROM products WHERE name='Richoco' AND category='Biscuits' LIMIT 1), 12.00, '2026-01-01'),
((SELECT id FROM products WHERE name='Skyflakes' AND category='Biscuits' LIMIT 1), 8.00, '2026-01-01'),
((SELECT id FROM products WHERE name='Sumo' AND category='Biscuits' LIMIT 1), 8.00, '2026-01-01'),
((SELECT id FROM products WHERE name='Topps' AND category='Biscuits' LIMIT 1), 9.00, '2026-01-01'),
((SELECT id FROM products WHERE name='Wafer' AND category='Biscuits' LIMIT 1), 4.00, '2026-01-01'),

-- Bleach
((SELECT id FROM products WHERE name='Chlorine' AND category='Bleach' LIMIT 1), 1.00, '2026-01-01'),
((SELECT id FROM products WHERE name='Zonrox Color (225ml)' AND category='Bleach' LIMIT 1), 28.00, '2026-01-01'),
((SELECT id FROM products WHERE name='Zonrox Color (95ml)' AND category='Bleach' LIMIT 1), 15.00, '2026-01-01'),
((SELECT id FROM products WHERE name='Zonrox Orig (100ml)' AND category='Bleach' LIMIT 1), 11.00, '2026-01-01'),
((SELECT id FROM products WHERE name='Zonrox Orig (1L)' AND category='Bleach' LIMIT 1), 45.00, '2026-01-01'),
((SELECT id FROM products WHERE name='Zonrox Orig (250ml)' AND category='Bleach' LIMIT 1), 17.00, '2026-01-01'),
((SELECT id FROM products WHERE name='Zonrox Orig (500ml)' AND category='Bleach' LIMIT 1), 26.00, '2026-01-01'),

-- Bodycare
((SELECT id FROM products WHERE name='Band Aid' AND category='Bodycare' LIMIT 1), 2.00, '2026-01-01'),
((SELECT id FROM products WHERE name='Bioderm' AND category='Bodycare' LIMIT 1), 17.00, '2026-01-01'),
((SELECT id FROM products WHERE name='Carefree' AND category='Bodycare' LIMIT 1), 3.00, '2026-01-01'),
((SELECT id FROM products WHERE name='Charmee Napkin' AND category='Bodycare' LIMIT 1), 4.00, '2026-01-01'),
((SELECT id FROM products WHERE name='Charmee Pantyliner' AND category='Bodycare' LIMIT 1), 2.00, '2026-01-01'),
((SELECT id FROM products WHERE name='Colgate' AND category='Bodycare' LIMIT 1), 10.00, '2026-01-01'),
((SELECT id FROM products WHERE name='Colgate Charcoal' AND category='Bodycare' LIMIT 1), 12.00, '2026-01-01'),
((SELECT id FROM products WHERE name='Colgate Toothbrush' AND category='Bodycare' LIMIT 1), 20.00, '2026-01-01'),
((SELECT id FROM products WHERE name='Cotton' AND category='Bodycare' LIMIT 1), 6.00, '2026-01-01'),
((SELECT id FROM products WHERE name='Fresh Toothbrush' AND category='Bodycare' LIMIT 1), 15.00, '2026-01-01'),
((SELECT id FROM products WHERE name='Tawas' AND category='Bodycare' LIMIT 1), 12.00, '2026-01-01'),
((SELECT id FROM products WHERE name='Gentle Cottonbuds' AND category='Bodycare' LIMIT 1), 15.00, '2026-01-01'),
((SELECT id FROM products WHERE name='Gillette' AND category='Bodycare' LIMIT 1), 30.00, '2026-01-01'),
((SELECT id FROM products WHERE name='Sister Pantyliner' AND category='Bodycare' LIMIT 1), 2.00, '2026-01-01'),
((SELECT id FROM products WHERE name='Happy Cotton Buds' AND category='Bodycare' LIMIT 1), 6.00, '2026-01-01'),
((SELECT id FROM products WHERE name='Kojic' AND category='Bodycare' LIMIT 1), 30.00, '2026-01-01'),
((SELECT id FROM products WHERE name='Modess' AND category='Bodycare' LIMIT 1), 6.00, '2026-01-01'),
((SELECT id FROM products WHERE name='Rexona' AND category='Bodycare' LIMIT 1), 8.00, '2026-01-01'),
((SELECT id FROM products WHERE name='Safeguard' AND category='Bodycare' LIMIT 1), 21.00, '2026-01-01'),
((SELECT id FROM products WHERE name='Silka' AND category='Bodycare' LIMIT 1), 18.00, '2026-01-01'),
((SELECT id FROM products WHERE name='Sister Napkin' AND category='Bodycare' LIMIT 1), 4.00, '2026-01-01'),
((SELECT id FROM products WHERE name='Whisper Napkin' AND category='Bodycare' LIMIT 1), 6.00, '2026-01-01'),

-- Candies
((SELECT id FROM products WHERE name='BarNuts' AND category='Candies' LIMIT 1), 2.00, '2026-01-01'),
((SELECT id FROM products WHERE name='Candy Burst' AND category='Candies' LIMIT 1), 5.00, '2026-01-01'),
((SELECT id FROM products WHERE name='Champi' AND category='Candies' LIMIT 1), 1.00, '2026-01-01'),
((SELECT id FROM products WHERE name='Choco Fun Cup' AND category='Candies' LIMIT 1), 2.00, '2026-01-01'),
((SELECT id FROM products WHERE name='Chubby' AND category='Candies' LIMIT 1), 2.00, '2026-01-01'),
((SELECT id FROM products WHERE name='Cloud 9' AND category='Candies' LIMIT 1), 10.00, '2026-01-01'),
((SELECT id FROM products WHERE name='Fres' AND category='Candies' LIMIT 1), 1.00, '2026-01-01'),
((SELECT id FROM products WHERE name='Frutos' AND category='Candies' LIMIT 1), 1.00, '2026-01-01'),
((SELECT id FROM products WHERE name='Jellyace' AND category='Candies' LIMIT 1), 1.00, '2026-01-01'),
((SELECT id FROM products WHERE name='Judge' AND category='Candies' LIMIT 1), 1.00, '2026-01-01'),
((SELECT id FROM products WHERE name='SnS Candies' AND category='Candies' LIMIT 1), 5.00, '2026-01-01'),
((SELECT id FROM products WHERE name='Kopiko' AND category='Candies' LIMIT 1), 1.00, '2026-01-01'),
((SELECT id FROM products WHERE name='Snowbear' AND category='Candies' LIMIT 1), 1.00, '2026-01-01'),
((SELECT id FROM products WHERE name='Krim Stix' AND category='Candies' LIMIT 1), 2.00, '2026-01-01'),
((SELECT id FROM products WHERE name='Lollipop' AND category='Candies' LIMIT 1), 2.00, '2026-01-01'),
((SELECT id FROM products WHERE name='Maxx' AND category='Candies' LIMIT 1), 1.00, '2026-01-01'),
((SELECT id FROM products WHERE name='MM''s' AND category='Candies' LIMIT 1), 15.00, '2026-01-01'),
((SELECT id FROM products WHERE name='Nips' AND category='Candies' LIMIT 1), 2.00, '2026-01-01'),
((SELECT id FROM products WHERE name='Pochi' AND category='Candies' LIMIT 1), 1.00, '2026-01-01'),
((SELECT id FROM products WHERE name='Skittles' AND category='Candies' LIMIT 1), 15.00, '2026-01-01'),
((SELECT id FROM products WHERE name='Tambal2' AND category='Candies' LIMIT 1), 2.00, '2026-01-01'),
((SELECT id FROM products WHERE name='Tattoo' AND category='Candies' LIMIT 1), 1.00, '2026-01-01'),
((SELECT id FROM products WHERE name='V-Fresh' AND category='Candies' LIMIT 1), 1.00, '2026-01-01'),
((SELECT id FROM products WHERE name='Whistle' AND category='Candies' LIMIT 1), 2.00, '2026-01-01'),
((SELECT id FROM products WHERE name='White Rabbit' AND category='Candies' LIMIT 1), 1.00, '2026-01-01'),
((SELECT id FROM products WHERE name='BengBeng' AND category='Candies' LIMIT 1), 10.00, '2026-01-01'),
((SELECT id FROM products WHERE name='Mallows' AND category='Candies' LIMIT 1), 2.00, '2026-01-01'),

-- Canned
((SELECT id FROM products WHERE name='555 Sardines' AND category='Canned' LIMIT 1), 27.00, '2026-01-01'),
((SELECT id FROM products WHERE name='555 Tuna' AND category='Canned' LIMIT 1), 32.00, '2026-01-01'),
((SELECT id FROM products WHERE name='Angel Evap' AND category='Canned' LIMIT 1), 35.00, '2026-01-01'),
((SELECT id FROM products WHERE name='Argentina Beef Loaf' AND category='Canned' LIMIT 1), 23.00, '2026-01-01'),
((SELECT id FROM products WHERE name='Argentina Corned Beef' AND category='Canned' LIMIT 1), 40.00, '2026-01-01'),
((SELECT id FROM products WHERE name='Argentina Giniling' AND category='Canned' LIMIT 1), 30.00, '2026-01-01'),
((SELECT id FROM products WHERE name='Century Tuna' AND category='Canned' LIMIT 1), 40.00, '2026-01-01'),
((SELECT id FROM products WHERE name='Doreen Condensed' AND category='Canned' LIMIT 1), 47.00, '2026-01-01'),
((SELECT id FROM products WHERE name='Family Sardines' AND category='Canned' LIMIT 1), 27.00, '2026-01-01'),
((SELECT id FROM products WHERE name='Purefoods Luncheon Meat (S)' AND category='Canned' LIMIT 1), 37.00, '2026-01-01'),
((SELECT id FROM products WHERE name='Freska Tuna' AND category='Canned' LIMIT 1), 30.00, '2026-01-01'),
((SELECT id FROM products WHERE name='Holiday Beef Loaf' AND category='Canned' LIMIT 1), 23.00, '2026-01-01'),
((SELECT id FROM products WHERE name='Purefoods Luncheon Meat (B)' AND category='Canned' LIMIT 1), 87.00, '2026-01-01'),
((SELECT id FROM products WHERE name='Holiday Carne Norte' AND category='Canned' LIMIT 1), 32.00, '2026-01-01'),
((SELECT id FROM products WHERE name='Holiday Corned Beef 150' AND category='Canned' LIMIT 1), 38.00, '2026-01-01'),
((SELECT id FROM products WHERE name='Holiday Corned Beef 215' AND category='Canned' LIMIT 1), 55.00, '2026-01-01'),
((SELECT id FROM products WHERE name='Jersey Condensed' AND category='Canned' LIMIT 1), 45.00, '2026-01-01'),
((SELECT id FROM products WHERE name='Jersey Evap' AND category='Canned' LIMIT 1), 33.00, '2026-01-01'),
((SELECT id FROM products WHERE name='Mega Sardines' AND category='Canned' LIMIT 1), 27.00, '2026-01-01'),
((SELECT id FROM products WHERE name='Senorita Sardines' AND category='Canned' LIMIT 1), 27.00, '2026-01-01'),
((SELECT id FROM products WHERE name='Youngs Town Sardines' AND category='Canned' LIMIT 1), 25.00, '2026-01-01'),

-- Chips
((SELECT id FROM products WHERE name='Cheese Ring' AND category='Chips' LIMIT 1), 9.00, '2026-01-01'),
((SELECT id FROM products WHERE name='Cheezy' AND category='Chips' LIMIT 1), 9.00, '2026-01-01'),
((SELECT id FROM products WHERE name='Clover' AND category='Chips' LIMIT 1), 9.00, '2026-01-01'),
((SELECT id FROM products WHERE name='Cracklings' AND category='Chips' LIMIT 1), 8.00, '2026-01-01'),
((SELECT id FROM products WHERE name='Fish Cracker' AND category='Chips' LIMIT 1), 8.00, '2026-01-01'),
((SELECT id FROM products WHERE name='Fishda' AND category='Chips' LIMIT 1), 8.00, '2026-01-01'),
((SELECT id FROM products WHERE name='Martys' AND category='Chips' LIMIT 1), 8.00, '2026-01-01'),
((SELECT id FROM products WHERE name='Moby' AND category='Chips' LIMIT 1), 9.00, '2026-01-01'),
((SELECT id FROM products WHERE name='Nova' AND category='Chips' LIMIT 1), 18.00, '2026-01-01'),
((SELECT id FROM products WHERE name='Oishi Prawn' AND category='Chips' LIMIT 1), 8.00, '2026-01-01'),
((SELECT id FROM products WHERE name='Onion Rings' AND category='Chips' LIMIT 1), 8.00, '2026-01-01'),
((SELECT id FROM products WHERE name='V Cut' AND category='Chips' LIMIT 1), 18.00, '2026-01-01'),
((SELECT id FROM products WHERE name='Patata' AND category='Chips' LIMIT 1), 8.00, '2026-01-01'),
((SELECT id FROM products WHERE name='Piattos' AND category='Chips' LIMIT 1), 17.00, '2026-01-01'),
((SELECT id FROM products WHERE name='Pillows' AND category='Chips' LIMIT 1), 10.00, '2026-01-01'),
((SELECT id FROM products WHERE name='Rinbee' AND category='Chips' LIMIT 1), 8.00, '2026-01-01'),
((SELECT id FROM products WHERE name='Spicy Seafood Curls' AND category='Chips' LIMIT 1), 8.00, '2026-01-01'),
((SELECT id FROM products WHERE name='Sweet Corn' AND category='Chips' LIMIT 1), 9.00, '2026-01-01'),

-- Cigarettes
((SELECT id FROM products WHERE name='Chesterfield Red' AND category='Cigarettes' LIMIT 1), 8.00, '2026-01-01'),
((SELECT id FROM products WHERE name='Hope' AND category='Cigarettes' LIMIT 1), 9.00, '2026-01-01'),
((SELECT id FROM products WHERE name='Marlboro Ice Blast' AND category='Cigarettes' LIMIT 1), 10.00, '2026-01-01'),
((SELECT id FROM products WHERE name='Marlboro Red' AND category='Cigarettes' LIMIT 1), 10.00, '2026-01-01'),
((SELECT id FROM products WHERE name='Mighty Green' AND category='Cigarettes' LIMIT 1), 9.00, '2026-01-01'),
((SELECT id FROM products WHERE name='Mighty Red' AND category='Cigarettes' LIMIT 1), 9.00, '2026-01-01'),
((SELECT id FROM products WHERE name='Winston' AND category='Cigarettes' LIMIT 1), 10.00, '2026-01-01'),

-- Condiments
((SELECT id FROM products WHERE name='Black Beans' AND category='Condiments' LIMIT 1), 25.00, '2026-01-01'),
((SELECT id FROM products WHERE name='Coco Mama' AND category='Condiments' LIMIT 1), 35.00, '2026-01-01'),
((SELECT id FROM products WHERE name='Cornstarch' AND category='Condiments' LIMIT 1), 3.00, '2026-01-01'),
((SELECT id FROM products WHERE name='Crispy Fry' AND category='Condiments' LIMIT 1), 20.00, '2026-01-01'),
((SELECT id FROM products WHERE name='Del Monte (115ml)' AND category='Condiments' LIMIT 1), 22.00, '2026-01-01'),
((SELECT id FROM products WHERE name='Del Monte (200ml)' AND category='Condiments' LIMIT 1), 27.00, '2026-01-01'),
((SELECT id FROM products WHERE name='Ginisa Mix' AND category='Condiments' LIMIT 1), 5.00, '2026-01-01'),
((SELECT id FROM products WHERE name='Ground Pepper' AND category='Condiments' LIMIT 1), 1.00, '2026-01-01'),
((SELECT id FROM products WHERE name='Knorr Cubes' AND category='Condiments' LIMIT 1), 8.00, '2026-01-01'),
((SELECT id FROM products WHERE name='Laurel Leaves' AND category='Condiments' LIMIT 1), 1.00, '2026-01-01'),
((SELECT id FROM products WHERE name='Spreads' AND category='Condiments' LIMIT 1), 15.00, '2026-01-01'),
((SELECT id FROM products WHERE name='Magic Sarap' AND category='Condiments' LIMIT 1), 7.00, '2026-01-01'),
((SELECT id FROM products WHERE name='Oil' AND category='Condiments' LIMIT 1), 10.00, '2026-01-01'),
((SELECT id FROM products WHERE name='Soy Sauce Sachet' AND category='Condiments' LIMIT 1), 3.00, '2026-01-01'),
((SELECT id FROM products WHERE name='Oyster Sauce' AND category='Condiments' LIMIT 1), 7.00, '2026-01-01'),
((SELECT id FROM products WHERE name='Papa Ketchup' AND category='Condiments' LIMIT 1), 12.00, '2026-01-01'),
((SELECT id FROM products WHERE name='Salt' AND category='Condiments' LIMIT 1), 2.00, '2026-01-01'),
((SELECT id FROM products WHERE name='Sinigang11' AND category='Condiments' LIMIT 1), 8.00, '2026-01-01'),
((SELECT id FROM products WHERE name='Soy Sauce (100ml)' AND category='Condiments' LIMIT 1), 9.00, '2026-01-01'),
((SELECT id FROM products WHERE name='Soy Sauce (200ml)' AND category='Condiments' LIMIT 1), 12.00, '2026-01-01'),
((SELECT id FROM products WHERE name='Star Anise' AND category='Condiments' LIMIT 1), 2.00, '2026-01-01'),
((SELECT id FROM products WHERE name='Sugar' AND category='Condiments' LIMIT 1), 2.00, '2026-01-01'),
((SELECT id FROM products WHERE name='Tasty Boy' AND category='Condiments' LIMIT 1), 13.00, '2026-01-01'),
((SELECT id FROM products WHERE name='UFC Ketchup' AND category='Condiments' LIMIT 1), 12.00, '2026-01-01'),
((SELECT id FROM products WHERE name='Vetsin' AND category='Condiments' LIMIT 1), 5.00, '2026-01-01'),
((SELECT id FROM products WHERE name='Vinegar (100ml)' AND category='Condiments' LIMIT 1), 7.00, '2026-01-01'),
((SELECT id FROM products WHERE name='Vinegar (200ml)' AND category='Condiments' LIMIT 1), 9.00, '2026-01-01'),
((SELECT id FROM products WHERE name='Vinegar Sachet' AND category='Condiments' LIMIT 1), 2.00, '2026-01-01'),
((SELECT id FROM products WHERE name='Whole Pepper' AND category='Condiments' LIMIT 1), 1.00, '2026-01-01'),

-- Detergent
((SELECT id FROM products WHERE name='Cathy' AND category='Detergent' LIMIT 1), 15.00, '2026-01-01'),
((SELECT id FROM products WHERE name='Champion/Speed/Surf' AND category='Detergent' LIMIT 1), 7.00, '2026-01-01'),
((SELECT id FROM products WHERE name='Perla' AND category='Detergent' LIMIT 1), 17.00, '2026-01-01'),
((SELECT id FROM products WHERE name='Ariel' AND category='Detergent' LIMIT 1), 16.00, '2026-01-01'),
((SELECT id FROM products WHERE name='Surf Powder' AND category='Detergent' LIMIT 1), 8.00, '2026-01-01'),
((SELECT id FROM products WHERE name='Tide Powder' AND category='Detergent' LIMIT 1), 16.00, '2026-01-01'),
((SELECT id FROM products WHERE name='Wings' AND category='Detergent' LIMIT 1), 7.00, '2026-01-01'),
((SELECT id FROM products WHERE name='Surf Fabcon' AND category='Detergent' LIMIT 1), 7.00, '2026-01-01'),
((SELECT id FROM products WHERE name='Joy Dishwashing' AND category='Detergent' LIMIT 1), 7.00, '2026-01-01'),
((SELECT id FROM products WHERE name='Downy Fabcon' AND category='Detergent' LIMIT 1), 8.00, '2026-01-01'),
((SELECT id FROM products WHERE name='Smart Paste/Winner' AND category='Detergent' LIMIT 1), 27.00, '2026-01-01'),
((SELECT id FROM products WHERE name='Scotch Brite Pad B' AND category='Detergent' LIMIT 1), 20.00, '2026-01-01'),
((SELECT id FROM products WHERE name='Scotch Brite Pad S' AND category='Detergent' LIMIT 1), 13.00, '2026-01-01'),
((SELECT id FROM products WHERE name='Scotch Brite Sponge S' AND category='Detergent' LIMIT 1), 23.00, '2026-01-01'),
((SELECT id FROM products WHERE name='Scotch Brite Stainless' AND category='Detergent' LIMIT 1), 27.00, '2026-01-01'),
((SELECT id FROM products WHERE name='Scotch Brite Sponge B' AND category='Detergent' LIMIT 1), 38.00, '2026-01-01'),

-- Fresh
((SELECT id FROM products WHERE name='Garlic' AND category='Fresh' LIMIT 1), 8.00, '2026-01-01'),
((SELECT id FROM products WHERE name='Sili' AND category='Fresh' LIMIT 1), 5.00, '2026-01-01'),
((SELECT id FROM products WHERE name='Onion' AND category='Fresh' LIMIT 1), 10.00, '2026-01-01'),
((SELECT id FROM products WHERE name='Egg' AND category='Fresh' LIMIT 1), 10.00, '2026-01-01'),

-- Grains
((SELECT id FROM products WHERE name='Conchita Orange' AND category='Grains' LIMIT 1), 65.00, '2026-01-01'),
((SELECT id FROM products WHERE name='Ganador' AND category='Grains' LIMIT 1), 60.00, '2026-01-01'),
((SELECT id FROM products WHERE name='Ivory' AND category='Grains' LIMIT 1), 58.00, '2026-01-01'),
((SELECT id FROM products WHERE name='Mia' AND category='Grains' LIMIT 1), 55.00, '2026-01-01'),
((SELECT id FROM products WHERE name='Palawan' AND category='Grains' LIMIT 1), 55.00, '2026-01-01'),
((SELECT id FROM products WHERE name='Bea' AND category='Grains' LIMIT 1), 60.00, '2026-01-01'),

-- Haircare
((SELECT id FROM products WHERE name='Cream Silk' AND category='Haircare' LIMIT 1), 8.00, '2026-01-01'),
((SELECT id FROM products WHERE name='Gard' AND category='Haircare' LIMIT 1), 7.00, '2026-01-01'),
((SELECT id FROM products WHERE name='H&S' AND category='Haircare' LIMIT 1), 8.00, '2026-01-01'),
((SELECT id FROM products WHERE name='Keratin Conditioner' AND category='Haircare' LIMIT 1), 8.00, '2026-01-01'),
((SELECT id FROM products WHERE name='Keratin Shampoo' AND category='Haircare' LIMIT 1), 7.00, '2026-01-01'),
((SELECT id FROM products WHERE name='Michael Gel' AND category='Haircare' LIMIT 1), 4.00, '2026-01-01'),
((SELECT id FROM products WHERE name='Palmolive' AND category='Haircare' LIMIT 1), 8.00, '2026-01-01'),
((SELECT id FROM products WHERE name='Pantene' AND category='Haircare' LIMIT 1), 8.00, '2026-01-01'),
((SELECT id FROM products WHERE name='Sunsilk' AND category='Haircare' LIMIT 1), 8.00, '2026-01-01'),
((SELECT id FROM products WHERE name='Dove' AND category='Haircare' LIMIT 1), 8.00, '2026-01-01'),
((SELECT id FROM products WHERE name='Hairworks Gel' AND category='Haircare' LIMIT 1), 3.00, '2026-01-01'),

-- Hot_Cold
((SELECT id FROM products WHERE name='Hot Water' AND category='Hot_Cold' LIMIT 1), 1.00, '2026-01-01'),
((SELECT id FROM products WHERE name='Ice' AND category='Hot_Cold' LIMIT 1), 4.00, '2026-01-01'),

-- Liquor
((SELECT id FROM products WHERE name='Emperador Brandy' AND category='Liquor' LIMIT 1), 70.00, '2026-01-01'),
((SELECT id FROM products WHERE name='Emperador Light' AND category='Liquor' LIMIT 1), 150.00, '2026-01-01'),
((SELECT id FROM products WHERE name='Gin Frasco' AND category='Liquor' LIMIT 1), 145.00, '2026-01-01'),
((SELECT id FROM products WHERE name='Gin Frasquito' AND category='Liquor' LIMIT 1), 80.00, '2026-01-01'),
((SELECT id FROM products WHERE name='GSM Blue Light Gin' AND category='Liquor' LIMIT 1), 130.00, '2026-01-01'),
((SELECT id FROM products WHERE name='GSM Blue Mojito' AND category='Liquor' LIMIT 1), 150.00, '2026-01-01'),
((SELECT id FROM products WHERE name='Kulafu' AND category='Liquor' LIMIT 1), 50.00, '2026-01-01'),
((SELECT id FROM products WHERE name='Tanduay' AND category='Liquor' LIMIT 1), 80.00, '2026-01-01'),

-- Medicine
((SELECT id FROM products WHERE name='Alaxan FR' AND category='Medicine' LIMIT 1), 10.00, '2026-01-01'),
((SELECT id FROM products WHERE name='Amoxicillin' AND category='Medicine' LIMIT 1), 9.00, '2026-01-01'),
((SELECT id FROM products WHERE name='Biogesic' AND category='Medicine' LIMIT 1), 6.00, '2026-01-01'),
((SELECT id FROM products WHERE name='Diatabs' AND category='Medicine' LIMIT 1), 10.00, '2026-01-01'),
((SELECT id FROM products WHERE name='Flanax' AND category='Medicine' LIMIT 1), 25.00, '2026-01-01'),
((SELECT id FROM products WHERE name='Kremil-S' AND category='Medicine' LIMIT 1), 11.00, '2026-01-01'),
((SELECT id FROM products WHERE name='Lomotil' AND category='Medicine' LIMIT 1), 17.00, '2026-01-01'),
((SELECT id FROM products WHERE name='Mefenamic' AND category='Medicine' LIMIT 1), 5.00, '2026-01-01'),
((SELECT id FROM products WHERE name='Neozep' AND category='Medicine' LIMIT 1), 9.00, '2026-01-01'),
((SELECT id FROM products WHERE name='Rexidol' AND category='Medicine' LIMIT 1), 8.00, '2026-01-01'),
((SELECT id FROM products WHERE name='Saridon' AND category='Medicine' LIMIT 1), 9.00, '2026-01-01'),
((SELECT id FROM products WHERE name='Tuseran Forte' AND category='Medicine' LIMIT 1), 12.00, '2026-01-01'),
((SELECT id FROM products WHERE name='Cetirizine' AND category='Medicine' LIMIT 1), 5.00, '2026-01-01'),

-- Miscellaneous
((SELECT id FROM products WHERE name='Baygon' AND category='Miscellaneous' LIMIT 1), 6.00, '2026-01-01'),
((SELECT id FROM products WHERE name='Lighter' AND category='Miscellaneous' LIMIT 1), 8.00, '2026-01-01'),
((SELECT id FROM products WHERE name='Match' AND category='Miscellaneous' LIMIT 1), 3.00, '2026-01-01'),
((SELECT id FROM products WHERE name='Rug' AND category='Miscellaneous' LIMIT 1), 3.00, '2026-01-01'),
((SELECT id FROM products WHERE name='Shoes Glue' AND category='Miscellaneous' LIMIT 1), 8.00, '2026-01-01'),
((SELECT id FROM products WHERE name='Star Wax' AND category='Miscellaneous' LIMIT 1), 22.00, '2026-01-01'),
((SELECT id FROM products WHERE name='Plastic Cup' AND category='Miscellaneous' LIMIT 1), 1.00, '2026-01-01'),
((SELECT id FROM products WHERE name='Scotch Tape' AND category='Miscellaneous' LIMIT 1), 6.00, '2026-01-01'),
((SELECT id FROM products WHERE name='Butane' AND category='Miscellaneous' LIMIT 1), 28.00, '2026-01-01'),
((SELECT id FROM products WHERE name='Candle5' AND category='Miscellaneous' LIMIT 1), 5.00, '2026-01-01'),
((SELECT id FROM products WHERE name='Candle10' AND category='Miscellaneous' LIMIT 1), 10.00, '2026-01-01'),
((SELECT id FROM products WHERE name='Blade' AND category='Miscellaneous' LIMIT 1), 5.00, '2026-01-01'),
((SELECT id FROM products WHERE name='Sako5' AND category='Miscellaneous' LIMIT 1), 5.00, '2026-01-01'),
((SELECT id FROM products WHERE name='Sako10' AND category='Miscellaneous' LIMIT 1), 10.00, '2026-01-01'),

-- Noodles
((SELECT id FROM products WHERE name='Beef Labuyo' AND category='Noodles' LIMIT 1), 11.00, '2026-01-01'),
((SELECT id FROM products WHERE name='Beef/Chicken' AND category='Noodles' LIMIT 1), 10.00, '2026-01-01'),
((SELECT id FROM products WHERE name='Bihon' AND category='Noodles' LIMIT 1), 23.00, '2026-01-01'),
((SELECT id FROM products WHERE name='Cup Noodles' AND category='Noodles' LIMIT 1), 25.00, '2026-01-01'),
((SELECT id FROM products WHERE name='Misua' AND category='Noodles' LIMIT 1), 3.00, '2026-01-01'),
((SELECT id FROM products WHERE name='Odong' AND category='Noodles' LIMIT 1), 4.00, '2026-01-01'),
((SELECT id FROM products WHERE name='Pancit Canton' AND category='Noodles' LIMIT 1), 13.00, '2026-01-01'),
((SELECT id FROM products WHERE name='Sotanghon' AND category='Noodles' LIMIT 1), 15.00, '2026-01-01'),
((SELECT id FROM products WHERE name='Cup Sotanghon/Bihon' AND category='Noodles' LIMIT 1), 23.00, '2026-01-01'),

-- Powdered
((SELECT id FROM products WHERE name='Bear Brand' AND category='Powdered' LIMIT 1), 12.00, '2026-01-01'),
((SELECT id FROM products WHERE name='Blanca Twin' AND category='Powdered' LIMIT 1), 15.00, '2026-01-01'),
((SELECT id FROM products WHERE name='Coffee Stick' AND category='Powdered' LIMIT 1), 4.00, '2026-01-01'),
((SELECT id FROM products WHERE name='Energen' AND category='Powdered' LIMIT 1), 10.00, '2026-01-01'),
((SELECT id FROM products WHERE name='Kopiko Black' AND category='Powdered' LIMIT 1), 8.00, '2026-01-01'),
((SELECT id FROM products WHERE name='Kopiko Brown' AND category='Powdered' LIMIT 1), 8.00, '2026-01-01'),
((SELECT id FROM products WHERE name='Milo' AND category='Powdered' LIMIT 1), 10.00, '2026-01-01'),
((SELECT id FROM products WHERE name='Nescafe Single' AND category='Powdered' LIMIT 1), 9.00, '2026-01-01'),
((SELECT id FROM products WHERE name='Nescafe Twin' AND category='Powdered' LIMIT 1), 15.00, '2026-01-01'),
((SELECT id FROM products WHERE name='Nestea' AND category='Powdered' LIMIT 1), 21.00, '2026-01-01'),
((SELECT id FROM products WHERE name='Tablia' AND category='Powdered' LIMIT 1), 9.00, '2026-01-01'),
((SELECT id FROM products WHERE name='Tang' AND category='Powdered' LIMIT 1), 20.00, '2026-01-01'),

-- Refreshment
((SELECT id FROM products WHERE name='12oz Mtn Dew' AND category='Refreshment' LIMIT 1), 15.00, '2026-01-01'),
((SELECT id FROM products WHERE name='8oz (Coke/Sprite/Royal)' AND category='Refreshment' LIMIT 1), 10.00, '2026-01-01'),
((SELECT id FROM products WHERE name='8oz Mtn Dew' AND category='Refreshment' LIMIT 1), 10.00, '2026-01-01'),
((SELECT id FROM products WHERE name='C2' AND category='Refreshment' LIMIT 1), 15.00, '2026-01-01'),
((SELECT id FROM products WHERE name='Chuckie' AND category='Refreshment' LIMIT 1), 15.00, '2026-01-01'),
((SELECT id FROM products WHERE name='DutchMill' AND category='Refreshment' LIMIT 1), 15.00, '2026-01-01'),
((SELECT id FROM products WHERE name='Ice Pop' AND category='Refreshment' LIMIT 1), 5.00, '2026-01-01'),
((SELECT id FROM products WHERE name='Litro (Coke, Royal, Sprite)' AND category='Refreshment' LIMIT 1), 45.00, '2026-01-01'),
((SELECT id FROM products WHERE name='Mismo' AND category='Refreshment' LIMIT 1), 20.00, '2026-01-01'),
((SELECT id FROM products WHERE name='Nature''s Spring 500' AND category='Refreshment' LIMIT 1), 15.00, '2026-01-01'),
((SELECT id FROM products WHERE name='Yakult' AND category='Refreshment' LIMIT 1), 13.00, '2026-01-01'),
((SELECT id FROM products WHERE name='Zest-O' AND category='Refreshment' LIMIT 1), 10.00, '2026-01-01');

-- ============================================================
-- PRICE CHANGES AFTER JANUARY 1, 2026
-- ============================================================

-- January 10, 2026 - Price changes
-- Close previous prices (Jan 1-9) and add new prices (Jan 10+)

-- First, update the Jan 1 entry to close on Jan 9
UPDATE price_history 
SET effective_to = '2026-01-09'
WHERE effective_from = '2026-01-01' 
AND product_id = (SELECT id FROM products WHERE name='Purefoods Luncheon Meat (B)' AND category='Canned' LIMIT 1);

UPDATE price_history 
SET effective_to = '2026-01-09'
WHERE effective_from = '2026-01-01' 
AND product_id = (SELECT id FROM products WHERE name='Purefoods Luncheon Meat (S)' AND category='Canned' LIMIT 1);

UPDATE price_history 
SET effective_to = '2026-01-09'
WHERE effective_from = '2026-01-01' 
AND product_id = (SELECT id FROM products WHERE name='Alpine Evap' AND category='Canned' LIMIT 1);

-- Insert new prices effective from January 10, 2026
INSERT INTO price_history (product_id, price, effective_from) VALUES
((SELECT id FROM products WHERE name='Purefoods Luncheon Meat (B)' AND category='Canned' LIMIT 1), 90.00, '2026-01-10'),
((SELECT id FROM products WHERE name='Purefoods Luncheon Meat (S)' AND category='Canned' LIMIT 1), 45.00, '2026-01-10'),
((SELECT id FROM products WHERE name='Alpine Evap' AND category='Canned' LIMIT 1), 45.00, '2026-01-10');

-- January 22, 2026 - Fiesta Beef Loaf price change
UPDATE price_history 
SET effective_to = '2026-01-21'
WHERE effective_from = '2026-01-01' 
AND product_id = (SELECT id FROM products WHERE name='Fiesta Beef Loaf' AND category='Canned' LIMIT 1);

INSERT INTO price_history (product_id, price, effective_from) VALUES
((SELECT id FROM products WHERE name='Fiesta Beef Loaf' AND category='Canned' LIMIT 1), 25.00, '2026-01-22');

-- January 23, 2026 - Polvoron price
INSERT INTO price_history (product_id, price, effective_from) VALUES
((SELECT id FROM products WHERE name='Polvoron' AND category='Candies' LIMIT 1), 2.00, '2026-01-23');

-- January 24, 2026 - Kojic price change
UPDATE price_history 
SET effective_to = '2026-01-23'
WHERE effective_from = '2026-01-01' 
AND product_id = (SELECT id FROM products WHERE name='Kojic' AND category='Bodycare' LIMIT 1);

INSERT INTO price_history (product_id, price, effective_from) VALUES
((SELECT id FROM products WHERE name='Kojic' AND category='Bodycare' LIMIT 1), 35.00, '2026-01-24');

-- February 1, 2026 - Bodycare price changes (Efficascent)
UPDATE price_history 
SET effective_to = '2026-01-31'
WHERE effective_from = '2026-01-01' 
AND product_id = (SELECT id FROM products WHERE name='Efficascent G' AND category='Bodycare' LIMIT 1);

UPDATE price_history 
SET effective_to = '2026-01-31'
WHERE effective_from = '2026-01-01' 
AND product_id = (SELECT id FROM products WHERE name='Efficasent W' AND category='Bodycare' LIMIT 1);

INSERT INTO price_history (product_id, price, effective_from) VALUES
((SELECT id FROM products WHERE name='Efficascent G' AND category='Bodycare' LIMIT 1), 35.00, '2026-02-01'),
((SELECT id FROM products WHERE name='Efficasent W' AND category='Bodycare' LIMIT 1), 40.00, '2026-02-01');

-- February 1, 2026 - Calcheese (Biscuits)
INSERT INTO price_history (product_id, price, effective_from) VALUES
((SELECT id FROM products WHERE name='Calcheese' AND category='Biscuits' LIMIT 1), 15.00, '2026-02-01');

-- February 2, 2026 - Cigarettes price changes (Mighty)
UPDATE price_history 
SET effective_to = '2026-02-01'
WHERE effective_from = '2026-01-01' 
AND product_id = (SELECT id FROM products WHERE name='Winston' AND category='Cigarettes' LIMIT 1);

UPDATE price_history 
SET effective_to = '2026-02-01'
WHERE effective_from = '2026-01-01' 
AND product_id = (SELECT id FROM products WHERE name='Mighty Red' AND category='Cigarettes' LIMIT 1);

UPDATE price_history 
SET effective_to = '2026-02-01'
WHERE effective_from = '2026-01-01' 
AND product_id = (SELECT id FROM products WHERE name='Mighty Green' AND category='Cigarettes' LIMIT 1);

INSERT INTO price_history (product_id, price, effective_from) VALUES
((SELECT id FROM products WHERE name='Winston' AND category='Cigarettes' LIMIT 1), 11.00, '2026-02-02'),
((SELECT id FROM products WHERE name='Mighty Red' AND category='Cigarettes' LIMIT 1), 10.00, '2026-02-02'),
((SELECT id FROM products WHERE name='Mighty Green' AND category='Cigarettes' LIMIT 1), 10.00, '2026-02-02');

-- February 5, 2026 - Monggo (Grains)
UPDATE price_history 
SET effective_to = '2026-02-04'
WHERE effective_from = '2026-01-01' 
AND product_id = (SELECT id FROM products WHERE name='Monggo' AND category='Grains' LIMIT 1);

INSERT INTO price_history (product_id, price, effective_from) VALUES
((SELECT id FROM products WHERE name='Monggo' AND category='Grains' LIMIT 1), 30.00, '2026-02-05');

-- February 9, 2026 - Medicine price changes
UPDATE price_history 
SET effective_to = '2026-02-08'
WHERE effective_from = '2026-01-01' 
AND product_id = (SELECT id FROM products WHERE name='Decolgen' AND category='Medicine' LIMIT 1);

UPDATE price_history 
SET effective_to = '2026-02-08'
WHERE effective_from = '2026-01-01' 
AND product_id = (SELECT id FROM products WHERE name='Medicol' AND category='Medicine' LIMIT 1);

INSERT INTO price_history (product_id, price, effective_from) VALUES
((SELECT id FROM products WHERE name='Decolgen' AND category='Medicine' LIMIT 1), 10.00, '2026-02-09'),
((SELECT id FROM products WHERE name='Medicol' AND category='Medicine' LIMIT 1), 9.00, '2026-02-09');

-- February 14, 2026 - Grains price changes (Ganador, Ivory, Mia)
UPDATE price_history 
SET effective_to = '2026-02-13'
WHERE effective_from = '2026-01-01' 
AND product_id = (SELECT id FROM products WHERE name='Ganador' AND category='Grains' LIMIT 1);

UPDATE price_history 
SET effective_to = '2026-02-13'
WHERE effective_from = '2026-01-01' 
AND product_id = (SELECT id FROM products WHERE name='Ivory' AND category='Grains' LIMIT 1);

UPDATE price_history 
SET effective_to = '2026-02-13'
WHERE effective_from = '2026-01-01' 
AND product_id = (SELECT id FROM products WHERE name='Mia' AND category='Grains' LIMIT 1);

INSERT INTO price_history (product_id, price, effective_from) VALUES
((SELECT id FROM products WHERE name='Ganador' AND category='Grains' LIMIT 1), 65.00, '2026-02-14'),
((SELECT id FROM products WHERE name='Ivory' AND category='Grains' LIMIT 1), 63.00, '2026-02-14'),
((SELECT id FROM products WHERE name='Mia' AND category='Grains' LIMIT 1), 58.00, '2026-02-14');

-- February 25, 2026 - Tanduay Select (Liquor)
INSERT INTO price_history (product_id, price, effective_from) VALUES
((SELECT id FROM products WHERE name='Tanduay Select' AND category='Liquor' LIMIT 1), 170.00, '2026-02-25');

-- Also update the legacy prices table to have current prices
-- This ensures backward compatibility with any queries using the prices table
INSERT INTO prices (product_id, price) 
SELECT ph.product_id, ph.price
FROM price_history ph
WHERE ph.effective_to IS NULL
ON CONFLICT (product_id) DO UPDATE SET price = EXCLUDED.price;

-- MySQL dump 10.13  Distrib 8.0.28, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: vc
-- ------------------------------------------------------
-- Server version	8.0.28

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `followed_vacations`
--

DROP TABLE IF EXISTS `followed_vacations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `followed_vacations` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `vacation_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `user_id_idx` (`user_id`),
  KEY `vacation_id_idx` (`vacation_id`),
  CONSTRAINT `user_id` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `vacation_id` FOREIGN KEY (`vacation_id`) REFERENCES `vacations` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=266 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `followed_vacations`
--

LOCK TABLES `followed_vacations` WRITE;
/*!40000 ALTER TABLE `followed_vacations` DISABLE KEYS */;
INSERT INTO `followed_vacations` VALUES (234,8,17),(235,9,6),(236,11,17),(237,12,17),(238,13,17),(240,11,18),(257,8,21),(258,8,5);
/*!40000 ALTER TABLE `followed_vacations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_name` varchar(45) NOT NULL,
  `first_name` varchar(45) NOT NULL,
  `last_name` varchar(45) NOT NULL,
  `role` varchar(45) DEFAULT NULL,
  `password` varchar(45) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'Ruslashka','Ruslan','Cherniavsky','user','1234'),(2,'Barabashka','Baraban','Shka','user','1234'),(3,'test_name_user','test_name1','test_name2','user','1234'),(4,'user','user','user','user','b59c67bf196a4758191e42f76670ceba'),(5,'aaa','sss','ddd','user','124'),(6,'jack','rus','lan','user','9e1e06ec8e02f0a0074f2fcc6b26303b'),(7,'aa','aa','aa','user','698d51a19d8a121ce581499d7b701668'),(8,'dex','dex','dex','user','b59c67bf196a4758191e42f76670ceba'),(9,'vax','vax','vax','user','934b535800b1cba8f96a5d72f72f1611'),(10,'admin','admin','admin','admin','b59c67bf196a4758191e42f76670ceba'),(11,'dux','dux','dux','user','b59c67bf196a4758191e42f76670ceba'),(12,'dox','dox','dox','user','b59c67bf196a4758191e42f76670ceba'),(13,'dax','dax','dax','user','b59c67bf196a4758191e42f76670ceba'),(15,'gagag','gagag','gagag','user','e1064a500b2640ff0a74439f1758c6aa');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `vacations`
--

DROP TABLE IF EXISTS `vacations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `vacations` (
  `id` int NOT NULL AUTO_INCREMENT,
  `destination` varchar(45) DEFAULT NULL,
  `description` varchar(1000) DEFAULT NULL,
  `picture` varchar(1000) DEFAULT NULL,
  `date_start` date DEFAULT NULL,
  `date_end` date DEFAULT NULL,
  `price` int DEFAULT NULL,
  `time_created` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=32 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `vacations`
--

LOCK TABLES `vacations` WRITE;
/*!40000 ALTER TABLE `vacations` DISABLE KEYS */;
INSERT INTO `vacations` VALUES (5,'River of Flowers','Keukenhof or Garden of Europe is one of the biggest flower gardens in the world. One part of this magical place blooms like a river flowing with tulip bulbs. This River of Flowers is an unforgettable sight that truly looks like heaven on earth.','https://ak.jogurucdn.com/media/image/p15/media_gallery-2016-10-25-9-5_35c59c26e4a7f8baea73193b0523c258.jpg','1985-03-11','1985-04-11',7890,'2022-07-08 18:35:15'),(6,'Tunnel of Love','Deep in the forest of Ukraine, lies this luscious green passage that looks like it is right out of a dream. It used to be a tunnel for a private train that led up to a factory. It has now transformed into a romantic haven for lovers. Checkout some other romantic getaways here - the best honeymoon destinations in the world.','https://ak.jogurucdn.com/media/image/p15/media_gallery-2016-10-25-9-6_73ceed2f4be627b6ad98e182b2840588.jpg','1986-03-11','1986-03-12',1570,'2022-07-08 13:35:15'),(7,'Tunnel of Light','The Tunnel of Light is caused by some minerals that emit this glow within the Antelope Canyon in Arizona. The light enhances the contours of this incredible geological formation.','https://ak.jogurucdn.com/media/image/p15/media_gallery-2016-10-25-9-7_e6a935d22aaaca6eee7037e700d8a077.jpg','1987-05-10','1987-08-10',11000,'2022-07-08 14:35:15'),(8,'Wat Rong Khun','Better known as the White Temple, Wat Rong Khun looks like God\'s abode. This buddhist temple is private owned and perhaps the most unconventional worship to the lord.','https://ak.jogurucdn.com/media/image/p15/media_gallery-2016-10-25-9-8_610077f54b40c7255a3d893ba69853db.jpg','1999-05-12','1999-06-12',6800,'2022-07-08 15:35:15'),(14,'South Island, New','New Zealand\'s South Island brims with majestic landscapes at every turn, from dramatic mountains to spectacular fjords. Here, you can admire the mountains of Fiordland National Park, a UNESCO World Heritage Site, from hiking trails or a boat on Milford Sound','https://travel.usnews.com/dims4/USNEWS/a798492/2147483647/resize/445x280%5E%3E/crop/445x280/quality/85/?url=https://travel.usnews.com/images/edited_south_island_nz_getty_irma_ferreira_445x280_dxgXWlc.jpg','2022-10-10','2022-10-10',7600,'2022-07-08 17:30:51'),(16,'Tahiti','Travel to this island – the largest in French Polynesia – if you\'ve been dreaming of a vacation spent lazing in a lavish overwater bungalow. Beyond the posh resorts, Tahiti boasts black sand and golden beaches, a bustling capital and prime snorkeling and surfing conditions. If you\'re looking for more cultural experiences, check out some of the island\'s ancient temples or shop at its traditional indoor markets. To save money, opt to stay in a vacation rental','https://travel.usnews.com/dims4/USNEWS/a600cb2/2147483647/resize/445x280%5E%3E/crop/445x280/quality/85/?url=https://travel.usnews.com/images/tahiti_main_getty_samantha_t_photography_edited_445x280_v43QKbF.jpg','2022-10-02','2022-10-07',80000,'2022-07-08 18:42:09'),(17,'London','London is a world unto itself. The eclectic neighborhoods, which are home to a blend of historical landmarks and modern-day attractions, can keep you occupied for days. If it\'s your first time in London, plan to see the top spots, such as the Tower of London, the Tate Modern art institution, Buckingham Palace, Borough Market and the British Museum, before sitting down to a classic afternoon tea or checking out a local pub. The best time to travel to London is during the warmer months, but be warned that this is also the busiest and most expensive time of year','https://travel.usnews.com/dims4/USNEWS/0e6734a/2147483647/resize/445x280%5E%3E/crop/445x280/quality/85/?url=https://travel.usnews.com/images/482151882_HjS9rWb.jpg','2022-09-09','2022-09-10',800000,'2022-07-08 18:42:57'),(18,'Rome','When you visit the Eternal City, prepare to cross a few must-see attractions – including the Colosseum, the Trevi Fountain and the Pantheon – off of your bucket list. Travelers can see additional treasures, such as St. Peter\'s Basilica and the Sistine Chapel, in nearby Vatican City. Escape the tourist crowds by taking a twilight stroll along the cobblestone streets of Trastevere, or head to Mercato Centrale Roma to sample local delicacies like gelato and pizza. Before leaving, peruse some of Rome\'s lesser-known museums, art galleries and boutiques.','https://travel.usnews.com/dims4/USNEWS/981979e/2147483647/resize/445x280%5E%3E/crop/445x280/quality/85/?url=https://travel.usnews.com/images/main_image_cropped_rome_445x280_f0qQD4i.jpg','2022-07-07','2022-07-09',4000,'2022-07-08 18:43:54'),(19,'Tokyo','Simply setting foot in Japan\'s cosmopolitan capital is an experience within itself. A city known for its bustling streets and flashing neon signs, Tokyo has an electric energy and plenty of attractions to discover. Foodies won\'t be let down by the city\'s fresh sushi and hearty ramen. Budding photographers and adrenaline junkies will love taking in the sweeping panoramas from the top of the Tokyo Skytree. Shopaholics will find plenty of must-have designer products in Ginza. And for history buffs, Tokyo offers centuries-old temples and shrines to explore','https://travel.usnews.com/dims4/USNEWS/41b8fe6/2147483647/resize/445x280%5E%3E/crop/445x280/quality/85/?url=https://travel.usnews.com/images/gettyimages-edited_445x280_13NCYXq.jpg','2022-09-09','2022-10-09',900000,'2022-07-08 18:44:42'),(20,'Banff','An Alberta town full of acclaimed restaurants, breweries, boutiques and art galleries, Banff makes for an exciting vacation in every season. Vacationers can spend their days hiking, relaxing in hot springs and boating on scenic lakes. Banff\'s location within the Canadian Rockies also makes it easy for visitors to access Banff National Park, which boasts some of the world\'s most beautiful vistas. Inside the park, travelers can admire sweeping views of the Bow Valley from the Banff Gondola or while schussing the slopes at the park\'s three ski resorts','https://travel.usnews.com/dims4/USNEWS/b2db457/2147483647/resize/445x280%5E%3E/crop/445x280/quality/85/?url=https://travel.usnews.com/images/banff-main-2016_445x280_h8QJTA3.jpg','2022-06-06','2022-06-07',300000,'2022-07-08 18:45:35'),(21,'Grand Canyon','Measuring roughly 277 miles long, 18 miles wide and about a mile deep, the Grand Canyon offers plenty of outdoor activities for everyone from day-trippers to adventure junkies. Hike along the national park\'s popular Rim and Bright Angel trails for unparalleled vistas, cool off with a whitewater rafting excursion down the Colorado River or view the dramatic Arizona landscape from above during a helicopter tour. If you\'re feeling especially daring, sign up for a skydiving excursion above the canyon','https://travel.usnews.com/dims4/USNEWS/7d95859/2147483647/resize/445x280%5E%3E/crop/445x280/quality/85/?url=https://travel.usnews.com/images/grand_canyon_main_2014_-_shutterstock-kojihirano_kUxSzuP.jpg','2022-08-08','2022-08-09',60000,'2022-07-08 18:50:39'),(22,'Machu Picchu','A visit to the \"Lost City of the Incas\" is not for the faint of heart, but it is often described as a life-changing experience (once you acclimate to the altitude). While the four-day hike along the Inca Trail is challenging, arriving at the Peruvian site during sunrise is well worth the effort, according to past travelers. If you\'re not up for the trek, you can also hop on a PeruRail train to the mountain base for an easier route to the top.','https://travel.usnews.com/dims4/USNEWS/4b9c8c1/2147483647/resize/445x280%5E%3E/crop/445x280/quality/85/?url=https://travel.usnews.com/images/main_mp_image_445x280_7oXslPi.jpg','2022-10-08','2022-10-09',80900,'2022-07-13 12:50:05'),(23,'Victoria Falls','Considered to be the largest waterfall on earth, Victoria Falls in southern Africa is one of the Seven Natural Wonders of the World. Straddling the border between Zambia and Zimbabwe, this powerful waterfall is best viewed from Knife Edge Bridge or Livingstone Island. However, adventurous travelers can also see these magnificent falls from above on a helicopter tour, or from below while whitewater rafting on the Zambezi River. If you\'re feeling particularly brave, don your swimsuit for a soak in Devil\'s Pool, a natural infinity pool located on the edge of the falls.','https://travel.usnews.com/dims4/USNEWS/6711694/2147483647/resize/445x280%5E%3E/crop/445x280/quality/85/?url=https://travel.usnews.com/images/victoria_falls_cropped_445x280_urQE1cw.jpg','2022-11-12','2022-12-12',76000,'2022-07-08 18:52:18'),(26,'Test','Test !@#$%^&*()  12345 67890 qwertyuiopp\';lkjhgfdsazx cvbnm,./ \" \' ! ~ ` ','https://icon-library.com/images/no-picture-available-icon/no-picture-available-icon-1.jpg','2022-05-16','2022-05-23',707999,'2022-07-15 16:06:22');
/*!40000 ALTER TABLE `vacations` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-07-15 23:26:08

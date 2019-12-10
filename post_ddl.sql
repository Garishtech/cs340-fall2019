/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
------------
--Table structure for customer
-------------

DROP TABLE IF EXISTS `customer`; 
CREATE TABLE `customer`(
	`customer_id`	int(11)		NOT NULL	AUTO_INCREMENT,
	`first_name`	varchar(255)	NOT NULL,
	`last_name`	varchar(255)	NOT NULL,
	`aid`		int(11)		NOT NULL,
	PRIMARY KEY (`customer_id`),
	CONSTRAINT `customer_address` FOREIGN KEY(`aid`) REFERENCES `address`(`address_id`)
)ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=latin1;


LOCK TABLES `customer` WRITE;
/*!40000 ALTER TABLE `customer` DISABLE KEYS */;
INSERT INTO `customer` VALUES 
	(10, 'John', 'Smith', 10),
	(11, 'Jane', 'Smith', 10),
	(20, 'Dylan', 'Forbes', 20),
	(24, 'Diana', 'Melina', 24);
/*!40000 ALTER TABLE `customer` ENABLE KEYS */;
UNLOCK TABLES;

-------------
-- Table sctructure for address
------------

DROP TABLE IF EXISTS `address`;
CREATE TABLE `address`(
	`address_id`	int(11)		NOT NULL	AUTO_INCREMENT,
	`house_number`	int(11)		NOT NULL,
	`street`	varchar(255)	NOT NULL,
	`city`		varchar(255)	NOT NULL,
	`state`		varchar(255)	NOT NULL,
	`zip_code`	int(11)		NOT NULL,
	PRIMARY KEY(`address_id`)
)ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=latin1;

LOCK TABLES `address` WRITE;
/*!40000 ALTER TABLE `address` DISABLE KEYS */;
INSERT INTO `address` VALUES
	(10, 2632, 'NW 30th ST', 'Corvallis', 'Oregon', 97330),
	(20, 1004, 'SW Main ST', 'Portland', 'Oregon', 97080),
	(24, 02496, 'S 4th ST', 'Somewhere', 'Alaska', 45006);
/*!40000 ALTER TABLE `address` ENABLE KEYS */;
UNLOCK TABLES;
---------------------------------------------------

DROP TABLE IF EXISTS `post_company`;
CREATE TABLE `post_company`(
	`post_company_id` int(11)	NOT NULL	AUTO_INCREMENT,
	`name`		varchar(255)	NOT NULL,
	PRIMARY KEY(`post_company_id`)
)ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=latin1;



LOCK TABLES `post_company` WRITE;
/*!40000 ALTER TABLE `post_company` DISABLE KEYS */;
INSERT INTO `post_company` VALUES
	(4, 'USPS');
/*!40000 ALTER TABLE `post_company` ENABLE KEYS */;
UNLOCK TABLES;


---------------
-- Table structure for package
--------------


DROP TABLE IF EXISTS `package`;
CREATE TABLE `package`(
	`package_id`	int(11)		NOT NULL	AUTO_INCREMENT,
	`content`	varchar(255)	NOT NULL,
	`delivered`	boolean		NOT NULL	DEFAULT 0,
	`cid`		int(11)		DEFAULT NULL,
	`pcid`		int(11)		DEFAULT NULL,
	`aid`		int(11)		DEFAULT NULL,
	PRIMARY KEY (`package_id`),
	KEY `cid`(`cid`),
	CONSTRAINT `package_customer` FOREIGN KEY (`cid`) REFERENCES `customer`(`customer_id`) ON DELETE SET NULL ON UPDATE CASCADE,
	CONSTRAINT `package_post_company` FOREIGN KEY (`pcid`) REFERENCES `post_company`(`post_company_id`) ON DELETE SET NULL ON UPDATE CASCADE,
	CONSTRAINT `package_address` FOREIGN KEY (`aid`) REFERENCES `address` (`address_id`) ON DELETE SET NULL ON UPDATE CASCADE
)ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=latin1;



LOCK TABLES `package` WRITE;
/*!40000 ALTER TABLE `package` DISABLE KEYS */;
INSERT INTO `package` VALUES
	(556, 'Toothbrush', 0, 11, 4, 10),
	(762, 'Google Pixel 3a', 1, 20, 4, 20);
/*!40000 ALTER TABLE `package` ENABLE KEYS */;
UNLOCK TABLES;
-------------
-- Table structure for post company
------------


------------
-- Table structure for address to post company many-to-many relationship
------------

DROP TABLE IF EXISTS `address_to_post_company`;
CREATE TABLE `address_to_post_company`(
	`aid`	int(11)		NOT NULL,
	`pcid`	int(11)		NOT NULL,
	CONSTRAINT `atpc_aid` FOREIGN KEY (`aid`) REFERENCES `address`(`address_id`),
	CONSTRAINT `atpc_pcid` FOREIGN KEY (`pcid`) REFERENCES `post_company`(`post_company_id`)
)ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=latin1;

LOCK TABLES `address_to_post_company` WRITE;
/*!40000 ALTER TABLE `address_to_post_company` DISABLE KEYS */;
INSERT INTO `address_to_post_company` VALUES
	(10, 4),
	(20, 4),
	(24, 4);
/*!40000 ALTER TABLE `address_to_post_company` ENABLE KEYS */;
UNLOCK TABLES;


/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

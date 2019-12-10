--Insert

--Create new Customer
INSERT INTO `customer`(`customer_id`, `first_name`, `last_name`, `aid`) VALUES (10, 'John', 'Smith', 10)

--Create new Address
INSERT INTO `address`(`address_id`, `house_number`, `street`, `city`, `state`, `zip_code`) VALUES (10,2632,'NW 30th ST','Corvallis','Oregon',97330)

--Create new Package
INSERT INTO `package`(`package_id`, `content`, `delivered`, `cid`, `pcid`, `aid`) VALUES (1,'Headphones',0,10,2,10)

--Create new Post-company
INSERT INTO `post_company`(`post_company_id`, `name`) VALUES (1,'UPS')


--SELECT

--Get all customers
SELECT `customer_id`, `first_name`, `last_name`, `aid` FROM `customer` WHERE 1

--Get all address'
SELECT `address_id`, `house_number`, `street`, `city`, `state`, `zip_code` FROM `address` WHERE 1

--Update

--Update customer
UPDATE `customer` SET `customer_id`=10,`first_name`='John',`last_name`='Not Smith',`aid`=10 WHERE 1

--Update address
UPDATE `address` SET `address_id`=10,`house_number`=123,`street`='1st ST',`city`='Corvallis',`state`='Oregon',`zip_code`=97330 WHERE 1

--Delete

--Delete customer
DELETE FROM `customer` WHERE customer_id=10

--Delete address
DELETE FROM `address` WHERE address_id=10


-- get all customers to fill the table on the customer page
SELECT first_name, last_name, customer_id FROM customer

--get all addresses and fill the table on the address page
SELECT house_number, street, city, state, zip_code, address_id FROM address

--get all packages and fill the table on the package page
SELECT content, delivered, package_id FROM package

--get all post companies to fill the table on the post company page
SELECT name, post_company_id FROM post_company

--get all the address-to-post-company entries to fill the many-to-many page to show what addresses what
--post companies deliver to
SELECT aid as address_id, pcid as post_company_id FROM address_to_post_company

--Delete a post company from the database via an ID
DELETE FROM post_company WHERE post_company_id = ?

--Delete a package from the database via an ID
DELETE FROM package WHERE package_id = ?

--Delete a customer, and any packages associated with that customer
DELETE package, customer FROM package INNER JOIN customer WHERE (package.cid=customer.customer_id AND cid=?) OR customer.customer_id = ?

--Delete a customer with no packages
DELETE FROM customer WHERE customer_id=?

--Delete an address to post company relationship entry
DELETE FROM address_to_post_company WHERE aid=? AND pcid=?

--add a new customer
INSERT INTO customer (first_name, last_name, aid) VALUES (?,?,?)

--add a new address
INSERT INTO address (house_number, street, city, state, zip_code) VALUES (?,?,?,?,?)

-- add a new package
INSERT INTO package (content, delivered, cid, pcid, aid) VALUES (?,0,?,?,?)

--add a new post company
INSERT INTO post_company (name) VALUES (?)

--add a new address-to-post-company relationship
INSERT INTO address_to_post_company (aid, pcid) VALUES (?,?)

--Update an address
UPDATE address SET house_number=?, street=?, city=?, state=?, zip_code=? WHERE address_id=?





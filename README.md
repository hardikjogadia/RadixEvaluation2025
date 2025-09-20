Exercise: Building a Vendor Module with Node.js (B2B Marketplace)
Objective
The aim of this exercise is to create a vendor module for a B2B marketplace using
Node.js and Express.js. The module must support CRUD operations on vendor records,
logo upload, password hashing, validations, JWT authentication, ORM integration, and
error handling.

Create Below User for MongoDb
db.createUser({user: "vendorAdminUser",pwd: passwordPrompt(), roles: [ { role: "readWrite", db: "vendor" } ]})
MongoDb Port: 27017
Database: vendor
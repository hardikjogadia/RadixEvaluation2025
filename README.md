# Building a Vendor Module with Node.js (B2B Marketplace)

## Objective

The aim of this exercise is to create a vendor module for a B2B marketplace using Node.js and Express.js. The module must support:

- CRUD operations on vendor records
- Logo upload
- Password hashing
- Validations
- JWT authentication
- ORM integration
- Error handling

## MongoDB Setup

### Installing MongoDB in Docker

```bash
docker run -d \
  --name mongodb \
  -p 27017:27017 \
  -e MONGO_INITDB_ROOT_USERNAME=mongo \
  -e MONGO_INITDB_ROOT_PASSWORD=mongo \
  mongo
```

### Connect to MongoDB

```bash
docker exec -it mongodb mongosh -u mongo -p mongo
```

### Create Database User

```javascript
db.createUser({
  user: "vendorAdminUser",
  pwd: "vendor12345",
  roles: [{ role: "readWrite", db: "vendor" }]
})
```

### Insert Admin User

```javascript
db.vendormasters.insertOne({
  company_name: 'Admin',
  contact_person: 'Admin',
  email: 'admin@admin.com',
  password: '$2b$12$ZMEFFVfrGHt17sqzG3loOuveLkTxTpccXAk8lstgHtcyJVw0ytGM2',
  phone: 9999999999,
  business: 'Wholesaler',
  country: 'India',
  gst_no: '22CCCCC2222C1Z5',
  address: 'India',
  isVerified: true
});
```

## Database Configuration

- **MongoDB Port:** 27017
- **Database:** vendor
- **Table:** vendormasters
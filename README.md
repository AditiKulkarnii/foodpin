## FoodMine : *Quick Food, Faster Delivery - End your craving!*


## 📑 Synopsis 

- A food ordering system with an easy UI for a seamless experience from selection to payment. Along side with an admin panel to manage food and user levels. Fast service with quick data retrieval. 
- Optimize fast data retrieval for food item listings using `Redis caching` in memory database.
- Limit API request using `custom Rate Limiter` based on `Token Bucket Rate Limiting Algorithm` , reducing server load by `70%` 


## 📜 Features

1. **Authentication and Authorization:**
   - Secure user authentication with JWT tokens and Bcrypt.js for Password hasing.
   - Two role base system : User and Admin

2. **User Functionality:**
   - Browse food items and manage cart.
   - View live location and update address.
   - Make payments via PayPal and receive confirmation emails.
   - Access order history.
   - Update Profile

3. **Admin Functionality:**
   - Add, update, or delete food items.
   - View all user orders.
   - Manage user details.

## Tech Stack

**Client:** 
* React
* Context API
* CSS

**Server:** 
* NodeJs
* Express
* Cloudinary
* PayPal Payment
* Nodemailer


**Database:**
* MongoDB
* Redis 




<<<<<<< HEAD

# Blood_Bank_Mng_Sys

=======
# Blood_Bank_mng_sys
Abstract
The Blood Bank Management System is a web-based application designed to efficiently manage blood stock levels by tracking donations and transfusions. The system consists of three interrelated tables: Blood Group Stock, Donor, and Patient. The Blood Group Stock table maintains the available units of each blood group, which dynamically updates based on donor contributions and patient transfusions. When a donor's details are entered, the stock for their blood group increases by the number of units donated. Similarly, when patient details are recorded, the stock decreases accordingly. Additionally, stock levels can be manually adjusted when required. The system also supports full CRUD (Create, Read, Update, Delete) operations for both donors and patients, ensuring efficient data management.
Scope & Objectives
•	Automated Stock Management: Ensures real-time updates to blood stock levels based on donations and transfusions.
•	Donor & Patient Management: Facilitates easy record-keeping and retrieval of donor and patient information.
•	Manual Stock Adjustment: Allows authorized users to modify stock levels manually when needed.
•	User-Friendly Interface: Provides an intuitive web-based UI for seamless interaction.
•	Secure & Scalable: Implements authentication and database integrity to prevent unauthorized modifications.
Technology Stack
•	Frontend: EJS (Embedded JavaScript) for dynamic templating.
•	Backend: Node.js with Express.js for handling server-side logic.
•	Database: MySQL for storing and managing blood stock, donor, and patient data.

following node packages were installed: 
npm i express
npm i bcrypt jsonwebtoken
npm i nodemon
npm i cookie-parser
npm i dotenv
npm i ejs
npm i mysql2
>>>>>>> e70655f (Update README.md)
